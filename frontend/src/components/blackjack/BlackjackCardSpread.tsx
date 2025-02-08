import {BlackjackCard} from "./BlackjackCard.tsx";

type BlackjackCardSpreadProps = {
    cards: string[]
}

export const BlackjackCardSpread = ({cards}:BlackjackCardSpreadProps) => {

    return (
        <>
            { cards.map((card) =>
                    (<BlackjackCard name={card}/>)
                )
            }
        </>
    )
}