import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

function Form({ handleData }) {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        handleData(data);
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function RedBar() {
        return (
            <Box
                sx={{
                    height: 20,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? 'rgba(255, 255, 255)' : 'rgb(255, 255, 255)'
                }}
            />
        );
    }

    return (
        <div className="w-72">
            <RedBar />
            <TextField
                id="margin-none"
                label="Email"
                variant="outlined"
                className="w-full"
                name="email"
                value={data.email}
                onChange={handleChange}
            />
            <RedBar />
            <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}

export default Form;
