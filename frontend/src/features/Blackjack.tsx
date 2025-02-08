import {useEffect, useState} from "react";
import {Button} from "../components/Button.tsx";
import {BlackjackCard} from "../components/blackjack/BlackjackCard.tsx";
import React from "react";
import {cardData} from "./blackjack/api/card.ts";
import {CardType} from "../assets/CardType.ts";
import {shuffleDeck} from "./blackjack/api/shuffle-deck.ts";
import {drawCard} from "./blackjack/api/draw-card.ts";
import {countCards} from "./blackjack/api/count-cards.ts";
import {getPlayerScore} from "./blackjack/api/get-player-score.ts";
import {resetPlayerScore} from "./blackjack/api/reset-player-score.ts";
import {BlackjackCardSpread} from "../components/blackjack/BlackjackCardSpread.tsx";
import {resetAllScore} from "./blackjack/api/reset-all-score.ts";
import {getDealerScore} from "./blackjack/api/get-dealer-score.ts";
import {dealerDrawCard} from "./blackjack/api/dealer-draw-card.ts";
import {getDealerHand} from "./blackjack/api/get-dealer-hand.ts";
import {dealerDeleteHand} from "./blackjack/api/dealer-delete-hand.ts";

export const Blackjack = () => {
    const [score, setScore] = useState<number>(0);
    const [dealerScore, setDealerScore] = useState<number>(0);
    const [showDealerHand, setShowDealerHand] = useState<boolean>(false);
    //const [cards, setCards] = useState<string[]>([]);

    const [currentCard, setCurrentCard] = useState<CardType>();
    //const [cards, setCards] = useState<CardType[]>([]);
    const [cardCount, setCardCount] = useState<number>(0);
    const [dealerCards, setDealerCards] = useState<CardType[]>([]);

    const [drawnCards, setDrawnCards] = useState<string[]>([]);
    const [drawnDealerCards, setDrawnDealerCards] = useState<string[]>([]);

    useEffect(() => {
        handleShuffleDeck();
    }, []);

   // useEffect(() => {
    //    console.log("Updated cards:", cards);
    //}, [cards]);

    //const getDeckFromBackend = async () => {
    //    await cardData().then((response) => setCards(response));
    //}

    const getDealerHandFromBackend = async () => {
        const response = await getDealerHand();
        setDealerCards(response);
        return response;
    }

    const getScoreFromBackend = async () => {
        const response = await getPlayerScore();
        setScore(+response);
        if (+response >= 21)
        {
            finishGame();
        }
        return response;
    }

    const getDealerScoreFromBackend = async () => {
        console.log("Inside await - starting, dealerScore " + dealerScore);
        const response = await getDealerScore();
        setDealerScore(+response)

        console.log("Inside await - finished, dealerScore " + dealerScore + ", response " + response);
        return response;
    }

    const handleShuffleDeck = async () =>
    {
        try {
            //console.log("HandleShuffleDeck start");
            await shuffleDeck(); //shuffle deck in backend
            await resetAllScore();
            await dealerDeleteHand();
            setShowDealerHand(false);

            await dealerDrawCard();
            const updatedDealerCards = await getDealerHandFromBackend(); //only gets the first drawn card
            await getDealerScoreFromBackend();
            await dealerDrawCard();

            //await getDeckFromBackend();
            await handleCountCards();
            await getScoreFromBackend();


            setCurrentCard(undefined);
            setDrawnCards([]);
            setDrawnDealerCards([updatedDealerCards[0].name]);
            //console.log("HandleShuffleDeck end");

        }
        catch
        {
            //
        }

    }

    const handleDealerDrawCard = async () => {
        try
        {
            await dealerDrawCard();
            await handleCountCards();
            //await getDeckFromBackend();
        }
        catch {
            //
        }
    }

    const handleDrawCard = async () => {
        try
        {
            await drawCard().then((response) => {
                setCurrentCard(response);
                setDrawnCards((prevCards) => [...prevCards, response.name]);
            })
            //await getDeckFromBackend();
            await handleCountCards();
            await getScoreFromBackend();
        }
        catch {
            //
        }
    }

    const handleCountCards = async () => {
        try {
            await countCards().then((response) => {
                setCardCount(+response);
                return response});
        }
        catch {
            //
        }
    }

    const increaseScore = (cardValue : number) => {
        setScore(score + cardValue);
    }

    const finishGame = async () =>{
        let loopDealerScore = +await getDealerScoreFromBackend();
        while (loopDealerScore < 17)
        {
            console.log("dealerScore is " + loopDealerScore + ", less than 16 so drawing");
            await handleDealerDrawCard();
            loopDealerScore = +await getDealerScoreFromBackend();
        }

        console.log("After await");
        console.log("final dealer score is " + loopDealerScore);
        const updatedDealerHand = await getDealerHandFromBackend();
        setShowDealerHand(true);
        setDrawnDealerCards(updatedDealerHand.map((card) => card.name));
        //console.log("Current displayed dealer hand: " + drawnDealerCards);
        //console.log("Current displayed player hand: " + drawnCards);
    }

    //{currentCard ? <BlackjackCard name = {currentCard.name}/> : "No card drawn yet"}
    return (
        <>
            Cards left: {cardCount} <br/>
            Dealer's hand: <br/>
            {showDealerHand ? <BlackjackCardSpread cards={drawnDealerCards}/> : <BlackjackCardSpread cards={[...drawnDealerCards, "back"]}/>} <br/>
            Your hand: <br/>
            {currentCard ? <BlackjackCardSpread cards={drawnCards}/> : "No card drawn yet"} <br/>

            {showDealerHand && <>
                {(score>dealerScore && score <= 21 || dealerScore > 21 && score <= 21 ? "YOU WIN" : "YOU LOSE")}
                <br/> </>}
            {!showDealerHand && <>
                {(score < 21 ? <Button onClick={() => handleDrawCard()} text={"Draw card"}></Button> : score == 21 ? "WIN" : "BUST")}
                <br/> </>}
            {!showDealerHand && score < 21 && score > 0 && <>
                {(<Button onClick={() => finishGame()} text={"Stop drawing"}></Button>)}
                <br/> </>}
            <Button onClick={() => handleShuffleDeck()} text={"Shuffle"}></Button>
        </>
    );
}