import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";
import { LoginApi } from "../api";
import Toastify from "../utils/Toatfy";
import Logo from "../assets/ademicon.svg";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleChange = (data) => {
        setLogin(prevLogin => ({
            ...prevLogin,
            ...data
        }));
    };

    const handleRegister = () => {
        if (login.email === "" || login.password === "") {
            Toastify({ text: "Todos os campos são obrigatórios.", type: "error" });
        } else {
            Promise.resolve(LoginApi(login))
                .then(resp => {
                    if (resp.status !== 200) {
                        Toastify({ text: "Email ou senha estão incorretos.", type: "error" });
                    } else {
                        navigate("/home");
                        localStorage.setItem('token', resp.data.token);
                    }
                })
                .catch((err) => Toastify({ text: "Erro ao efetuar o login.", type: "error" }));
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#f0eded]'>
            <div className='w-full lg:w-150 py-[70px] bg-white rounded-md drop-shadow-lg'>
                <div className='py-5 flex justify-center items-center mb-7'>
                    <img src={Logo} className="w-52" alt="logo" />
                </div>
                <div className='w-full flex items-center justify-center mb-10'>
                    <Form handleData={handleChange} />
                </div>
                <div className="w-full flex justify-center py-5">
                    <button
                        className="w-72 h-14 rounded font-bold text-white bg-gradient-to-r from-orange-ademicon-light to-orange-ademicon"
                        onClick={handleRegister}
                    >
                        Entrar
                    </button>
                </div>
                <p className="w-full flex justify-center">
                    Ainda não possui uma conta?
                    <span
                        className="text-orange-ademicon cursor-pointer hover:underline underline-offset-2"
                        onClick={() => navigate("/register")}
                    >
                        Registrar-se
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
