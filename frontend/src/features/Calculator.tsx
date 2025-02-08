import {Counter} from "../components/Counter.tsx";
import {Button} from "../components/Button.tsx";
import {useState} from "react";

export const Calculator = () => {
    const [counter, setCounter] = useState<number>(0);
    const [mem, setMem] = useState<number>(0);
    const [op, setOp] = useState<string>();

    const setValue = (value : number) => {
        setCounter(counter * 10 + value);
    }

    const prepareOperation = (operation : string) =>
    {
        setMem(counter);
        setOp(operation);
        setCounter(0);
    }

    const evaluate = () =>
    {
        switch (op) {
            case "+":
                setCounter(mem + counter);
                break;
            case "-":
                setCounter(mem - counter);
                setMem(counter);
                break;
            case "x":
                setCounter(mem * counter);
                break;
            case "/":
                if (counter==0)
                {
                    setCounter(0);
                    setMem(0);
                }
                else {
                    setCounter(mem / counter);
                    setMem(counter);
                }
                break;
        }
    }

    const clear = () =>
    {
        setCounter(0);
        setMem(0);
    }

    return (
        <>
            <Counter value={counter}></Counter>
            <Button onClick={() => setValue(1)} text={"1"}></Button>
            <Button onClick={() => setValue(2)} text={"2"}></Button>
            <Button onClick={() => setValue(3)} text={"3"}></Button>
            <Button onClick={() => prepareOperation("+")} text={"+"}></Button>
            <br></br>
            <Button onClick={() => setValue(4)} text={"4"}></Button>
            <Button onClick={() => setValue(5)} text={"5"}></Button>
            <Button onClick={() => setValue(6)} text={"6"}></Button>
            <Button onClick={() => prepareOperation("-")} text={"-"}></Button>
            <br></br>
            <Button onClick={() => setValue(7)} text={"7"}></Button>
            <Button onClick={() => setValue(8)} text={"8"}></Button>
            <Button onClick={() => setValue(9)} text={"9"}></Button>
            <Button onClick={() => prepareOperation("x")} text={"x"}></Button>
            <br></br>
            <Button onClick={clear} text={"C"}></Button>
            <Button onClick={() => setValue(0)} text={"0"}></Button>
            <Button onClick={evaluate} text={"="}></Button>
            <Button onClick={() => prepareOperation("/")} text={"/"}></Button>
            <br></br>
        </>
    )
}

