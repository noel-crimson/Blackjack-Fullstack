import {useForm} from "@mantine/form";
import {TodoFormValues} from "../../assets/TodoFormValues.ts";

export const useTodoForm = () =>
{
    const form = useForm<TodoFormValues>({
        initialValues: {
            content: "",
            title: "",
            done: false,
        },

        validate: {
            //warunki sprawdzajace
        },
    });
    return form;
}
