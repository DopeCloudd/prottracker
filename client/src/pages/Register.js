import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { register } from "../actions/auth";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Checkbox, CircularProgress, FormControlLabel, FormHelperText, Grid, Link, Typography } from "@mui/material";

const Container = styled.div`
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
  padding: 60px;
  background-color: #171717;
  box-shadow: 0px 0px 15px 2px #0c0c0c;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

function Register() {
    // State for loading request
    const [loading, setLoading] = useState(false);
    // For translation
    const { t } = useTranslation();
    // For navigation
    const navigate = useNavigate();
    // Go to login page
    const handleButtonLogin = () => {
        navigate("/login");
    };
    // Yup validation scheme for email, password, firstname, lastname, terms fields
    const schema = yup.object({
        firstName: yup.string().required('Le prénom est requis'),
        lastName: yup.string().required('Le nom est requis'),
        email: yup.string().email('L\'email n\'est pas valide').required('L\'email est requis'),
        password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe doivent correspondre').required('La confirmation du mot de passe est requise'),
        acceptTerms: yup.bool().oneOf([true], 'Vous devez accepter les conditions pour continuer'),
    }).required();
    // Initializing react-hook-form with yupResolver and the yup schema
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // Use dispatch
    const dispatch = useDispatch();
    // Function to be executed on form submission
    const onSubmit = data => {
        setLoading(true);
        dispatch(register(data.lastName, data.firstName, data.email, data.password))
            .then(() => {
                navigate("/login");
            })
            .catch(() => {
                setLoading(false);
            });
    };
    // Get if user is logged in
    const { isLoggedIn } = useSelector(state => state.auth);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Wrapper>
                <Box>
                    <Typography variant="h4" align="center" margin="dense">
                        {t('register.title')}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={t('register.surname')}
                                        autoComplete="given-name"
                                        autoFocus
                                        color="green"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName ? errors.firstName.message : ''}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={t('register.name')}
                                        autoComplete="family-name"
                                        color="green"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName ? errors.lastName.message : ''}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={t('register.email')}
                                        autoComplete="email"
                                        autoFocus
                                        color="green"
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ''}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={t('register.password')}
                                        type="password"
                                        autoComplete="current-password"
                                        color="green"
                                        error={!!errors.password}
                                        helperText={errors.password ? errors.password.message : ''}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={t('register.confirm')}
                                        type="password"
                                        color="green"
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="acceptTerms"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <>
                                            <FormControlLabel
                                                control={<Checkbox {...field} color="success" checked={field.value} />}
                                                label={t('register.terms')}
                                            />
                                            {errors.acceptTerms && (
                                                <FormHelperText error>{errors.acceptTerms.message}</FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            {loading ? (
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
                                    <Button type="submit" variant="contained" color="green" fullWidth>
                                        {t('register.button')}
                                    </Button>
                                    <Box mt={2}>
                                        <Grid container>
                                            <Grid item>
                                                <Link sx={{ cursor: 'pointer' }} onClick={handleButtonLogin} variant="body2" color="inherit">
                                                    {t('register.account')}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </form>
                </Box>
            </Wrapper>
        </Container>
    );
}

export default Register;