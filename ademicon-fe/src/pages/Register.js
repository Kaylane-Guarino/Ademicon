import React, { useState } from 'react';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import Logo from "../assets/ademicon.svg";
import { useNavigate } from 'react-router-dom';
import Toastify from '../utils/Toatfy';
import { RegisterApi } from '../api';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (e) => {
        e.preventDefault();
        setShowPassword((show) => !show);
    };

    function handleChange(e) {
        const { name, value } = e.target;

        // Atualiza o estado do email
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // Valida o email
        if (name === "email" && !validateEmail(value)) {
            Toastify({ text: "Email inválido.", type: "error" });
        }
    }

    function RedBar() {
        return (
            <Box
                sx={{
                    height: 20,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255)'
                            : 'rgb(255, 255, 255)',
                }}
            />
        );
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function handleRegister(data) {
        if (!validateEmail(data.email)) {
            Toastify({ text: "Email inválido.", type: "error" });
            return;
        } else if (data.name === "" || data.email === "" || data.password === "") {
            Toastify({ text: "Todos os campos são obrigatórios.", type: "error" });
            return;
        } else {
            Promise.resolve(RegisterApi(data))
                .then(resp => {
                    if (resp !== 201) {
                        Toastify({ text: "Email já está em uso.", type: "error" });
                    } else {
                        Toastify({ text: "Cadastro realizado com sucesso!", type: "success" });
                        navigate("/");
                    }
                })
                .catch(() => Toastify({ text: "Não foi possível realizar o cadastro.", type: "error" }));
        }


    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#f0eded]'>
            <div className='w-full lg:w-150 py-[70px] bg-white rounded-md drop-shadow-lg'>
                <div className='py-5 flex justify-center items-center mb-7'>
                    <img src={Logo} className="w-52" alt="logo" />
                </div>
                <div className='w-full flex items-center justify-center mb-10'>
                    <div className='w-72'>
                        <RedBar />
                        <TextField id="name-input" label="Nome" variant="outlined" className='w-full' onChange={(e) => setData({ ...data, name: e.target.value })} />
                        <RedBar />
                        <TextField id="email-input" label="Email" variant="outlined" className='w-full' onChange={(e) => setData({ ...data, email: e.target.value })} />
                        <RedBar />
                        <FormControl className='w-full' variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                label="Senha"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            onMouseDown={(e) => e.preventDefault()} // Evita o comportamento padrão do mouse
                                        >
                                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="w-full flex justify-center py-5">
                    <button
                        className="w-72 h-14 rounded font-bold text-white bg-gradient-to-r from-orange-ademicon-light to-orange-ademicon"
                        onClick={() => handleRegister(data)}>
                        Entrar
                    </button>
                </div>
                <p className="w-full flex justify-center text-orange-ademicon cursor-pointer hover:underline underline-offset-2" onClick={() => navigate("/")}>
                    Voltar
                </p>
            </div>
        </div>
    );
}

export default Register;
