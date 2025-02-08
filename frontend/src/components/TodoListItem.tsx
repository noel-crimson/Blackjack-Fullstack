import {TodoType} from "../assets/TodoType.ts";
import {Card, Image, Text} from "@mantine/core";
import {CSSProperties, FC, memo} from "react";

interface TodoListItemProps{
    item: TodoType
}

export const TodoListItem: FC<TodoListItemProps> = memo(({item}) =>
    {
        const style : CSSProperties | undefined = item.done?
            {
                border: "1px solid",
                borderColor:
                    "rgba(243,42,173,0.72)"
            } : undefined;
        return (
            <Card
                shadow="sm"
                style = {style}
            >
                <Card.Section >
                    <Image
                        src="https://placehold.co/400x200"
                        h={200}
                        alt={"No way!"}
                    />
                </Card.Section>

                <Text fw={500} size = "lg" mt = "md">
                    {item.title}
                </Text>

                <Text mt="xs" c="dimmed" size = "sm">
                    {item.content}
                </Text>
            </Card>
        )
    }
)