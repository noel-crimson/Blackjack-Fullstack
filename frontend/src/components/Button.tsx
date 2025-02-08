import {FC} from "react";

type ButtonProps = {
    onClick: () => void;
    text: string;
}

export const Button: FC<ButtonProps> = ({onClick, text}) => {

    return(
        <button onClick={onClick}>{text}</button>
    )
}