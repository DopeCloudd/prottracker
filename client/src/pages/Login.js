import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { login } from "../actions/auth";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid, Link, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  min-height: calc(100% - 100px); 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #EAEDED;
`;

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #171717;
  box-shadow: 0px 0px 15px 2px #0c0c0c;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

function Login() {

    // State to handle axios loading request
    const [loading, setLoading] = useState(false);
    // Const for get the user logged in
    const { isLoggedIn } = useSelector(state => state.auth);
    // For translation
    const { t } = useTranslation();
    // For navigation
    const navigate = useNavigate();
    // Go to the register page
    const handleButtonRegister = () => {
        navigate("/register");
    };
    // Yup validation scheme for email and password fields
    const schema = yup.object({
        email: yup.string().email('L\'email n\'est pas valide').required('L\'email est requis'),
        password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
    }).required();
    // Initializing react-hook-form with yupResolver and the yup schema
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // Get dispatch
    const dispatch = useDispatch();
    // Function to be executed on form submission
    const onSubmit = data => {
        // Set loading
        setLoading(true);
        // Use dispatch to log in the user
        dispatch(login(data.email, data.password))
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                setLoading(false);
            });
    };
    // If the user is already logged in go to home page
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Wrapper>
                <Box>
                    <Typography variant="h4" align="center" margin="dense">
                        {t('login.title')}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                label={t('login.email')}
                                autoComplete="email"
                                autoFocus
                                color="green"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                label={t('login.password')}
                                type="password"
                                autoComplete="current-password"
                                color="green"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                            />}
                        />
                        {
                            loading ? (
                                <Box
                                    sx={{
                                        pt: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CircularProgress color="success" />
                                </Box>
                            ) : (
                                <>
                                    <Box mt={2}>
                                        <Button type="submit" variant="contained" fullWidth color="green">
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
                                                <Link sx={{ cursor: 'pointer' }} onClick={handleButtonRegister} variant="body2" color="inherit">
                                                    {t('login.register')}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                            )
                        }
                    </form>
                </Box >
            </Wrapper >
        </Container >
    );
}

export default Login;