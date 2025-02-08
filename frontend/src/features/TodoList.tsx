import {SimpleGrid} from "@mantine/core";
import {TodoListItem} from "../components/TodoListItem.tsx";
import {TodoType} from "../assets/TodoType.ts";

const data: TodoType[] = [
    {
        id: 1,
        title: "Zrobic projekt",
        content: "Przynajmniej na 3.0",
        done: false
    }
]

export const TodoList = () => {
    return (
        <div style = {{width: '100%'}}>
            <SimpleGrid cols = {{base: 1, sm: 2, lg: 3}}>
                {data.map((item) => <TodoListItem key = {item.id} item = {item} />)}
            </SimpleGrid>
        </div>
    );
}