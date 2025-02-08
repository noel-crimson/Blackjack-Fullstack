import {IconCalculator, IconListCheck, IconLogout, IconPencilPlus, IconPlayCard7} from "@tabler/icons-react";
import {NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import React from "react";

export const AppNavbar = () => {
    const navigate = useNavigate();


    return (
        <div>
            {/*<NavLink to={'todo'}> TODO </NavLink> |*/}
            {/*<NavLink to={'todo/new'}> DODAJ DO LISTY </NavLink> |*/}
            {/*<NavLink to={'calculator'}> KALKULATOR </NavLink>*/}
            {/*<NavLink
                onClick = {() => navigate('/todo')}
                label="Lista TODO"
                leftSection={<IconListCheck size="1rem" stroke={1.5} />}
            />

            <NavLink
                onClick = {() => navigate('/todo/new')}
                label="Dodaj TODO"
                leftSection={<IconPencilPlus size="1rem" stroke={1.5} />}
            />*/}

            <NavLink
                onClick = {() => navigate('/blackjack')}
                label="Blackjack"
                leftSection={<IconPlayCard7 size="1rem" stroke={1.5} />}
            />

            <NavLink
                onClick = {() => navigate('/logout')}
                label="Log out"
                leftSection={<IconLogout size="1rem" stroke={1.5} />}
            />
        </div>
    )
}