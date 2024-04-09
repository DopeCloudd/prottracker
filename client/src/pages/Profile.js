import styled from "styled-components";
import * as React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import { useState } from "react";

const Container = styled.div`
  min-height: calc(100% - 100px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  /*flex-direction: column;
  align-items: center;
  justify-content: center;*/
  padding: 60px 40px;
  background-color: #171717;
  box-shadow: 0px 0px 15px 2px #0c0c0c;
  border-radius: 10px;
`;

function Profile() {
    // State of loading request
    const [loading, setLoading] = useState(false);
    // For navigation
    const navigate = useNavigate();
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
        dispatch(register(data.lastName, data.firstName, data.email, data.password))
            .then(() => {
                navigate("/login");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };
    // Get current user data
    const { user: currentUser } = useSelector((state) => state.auth);
    // if user is logged in
    const { isLoggedIn } = useSelector(state => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Wrapper>
                <Box>
                    <Typography variant="h4" align="center" margin="dense">
                        Mon compte
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue={currentUser.firstName}
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Prénom"
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
                                    defaultValue={currentUser.name}
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Nom"
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
                                    defaultValue={currentUser.email}
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Adresse Email"
                                        autoComplete="email"
                                        autoFocus
                                        color="green"
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ''}
                                    />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Mot de Passe"
                                        type="password"
                                        color="green"
                                        error={!!errors.password}
                                        helperText={errors.password ? errors.password.message : ''}
                                    />}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Button type="submit" variant="contained" color="green" fullWidth>
                                    Modifier
                                </Button>
                            )}
                        </Box>
                    </form>
                </Box>
            </Wrapper>
        </Container>
    );
}

export default Profile;