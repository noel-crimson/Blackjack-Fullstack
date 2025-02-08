import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing.tsx";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import React from "react";
import {Notifications} from "@mantine/notifications";

const theme = createTheme({

});

function App() {

    return (
        <MantineProvider defaultColorScheme={"light"}>
            <Notifications />
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider>
    );

}

export default App
