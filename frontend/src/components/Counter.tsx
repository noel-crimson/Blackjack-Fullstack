type CounterProps = {
    value: number;
}

export const Counter = ({value}: CounterProps) => {
    return <div>{value}</div>
}