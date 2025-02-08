import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {TodoList} from "./TodoList.tsx";
import {TodoForm} from "./TodoForm.tsx";
import {ErrorPage} from "./ErrorPage.tsx";
import {Calculator} from "./Calculator.tsx";
import {Blackjack} from "./Blackjack.tsx";
import {LoginPage} from "./login/LoginPage.tsx";
import {useIsLogged} from "../hooks/useIsLogged.ts";
import React from "react";
import {LogoutPage} from "./login/LogoutPage.tsx";
import {CreateAccountPage} from "./login/CreateAccountPage.tsx";

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path:"/createaccount",
                element: <CreateAccountPage/>
            },
            {
                path: "*",
                element: <Navigate to="/login" replace/>
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/todo',
                element: <TodoList/>
            },
            {
                path: "/todo/new",
                element: <TodoForm/>
            },
            {
                path:"/todo/:id",
                element: <TodoForm/>
            },
            {
                path:"/calculator",
                element: <Calculator/>
            },
            {
                path:"/blackjack",
                element: <Blackjack/>
            },
            {
                path:"/login",
                element: <Navigate to="/blackjack" replace/>
            },
            {
                path:"/logout",
                element: <LogoutPage/>
            },
            {
                path:"/createaccount",
                element: <CreateAccountPage/>
            },
            {
                path: "*",
                element: <ErrorPage/>
            }
        ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}