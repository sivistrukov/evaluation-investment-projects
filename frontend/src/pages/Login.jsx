import React from 'react';
import {useNavigate} from "react-router-dom";
import CustomInput from "../components/ui/CustomInput";
import Gap from "../components/ui/Gap";
import {Button} from "@mui/material";

const Login = () => {
    const navigator = useNavigate()
    const onLoginClick = () => {
        let login = document.getElementById('login').value
        let password = document.getElementById('password').value

        if (login === 'admin' && password === 'admin') {
            navigator('/')
            localStorage.setItem("isAuth", "y")
        } else {
            alert('Неверный логин или пароль')
        }
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            width: "95vw",
            flexDirection: "column"
        }}>
            <CustomInput
                id={'login'}
                label={"Логин"}
            />
            <Gap/>
            <CustomInput
                id={'password'}
                label={"Пароль"}
                type={'password'}/>
            <Gap/>
            <Button
                type={"button"}
                variant="contained"
                onClick={onLoginClick}
            >
                Вход
            </Button>
        </div>
    );
};

export default Login;