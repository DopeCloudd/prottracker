import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextField, Button, Box, Grid, Link, Typography, CircularProgress} from "@mui/material";
import {loginUser} from "../auth/auth.actions";

function Login() {
    const {loading, userInfo, error} = useSelector((state) => state.auth)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const schema = yup.object({
        email: yup.string().email('L\'email n\'est pas valide').required('L\'email est requis'),
        password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
    }).required();

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(loginUser(data))
    }

    const handleButtonRegister = () => {
        navigate("/register");
    };

    return (
        <Box
            sx={{
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                color: '#EAEDED',
            }}
        >
            <Box
                sx={{
                    width: {xs: '100%', md: '60%'},
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                }}
            >
                <Box>
                    <Typography variant="h4" align="center" mb={2}>
                        {t('login.title')}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label={t('login.email')}
                                    autoComplete="email"
                                    autoFocus
                                    color="primary"
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label={t('login.password')}
                                    type="password"
                                    autoComplete="current-password"
                                    color="primary"
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                            )}
                        />
                        {loading ? (
                            <Box
                                sx={{
                                    pt: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <CircularProgress color="success"/>
                            </Box>
                        ) : (
                            <>
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" fullWidth color="primary">
                                        {t('login.button')}
                                    </Button>
                                </Box>
                                <Box mt={2}>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2" color="inherit">
                                                {t('login.forgotten')}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link sx={{cursor: 'pointer'}} onClick={handleButtonRegister}
                                                  variant="body2" color="inherit">
                                                {t('login.register')}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        )}
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;