import {useState, useEffect} from "react";

type BlackjackCardProps = {
    name: string
}

export const BlackjackCard = ({name}:BlackjackCardProps) => {

    return (
        <>
            <img src={`/cardsprites/${name}.png`} alt={name}/>
        </>
    )
}