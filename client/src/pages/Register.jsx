import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { registerUser } from "../redux/auth/auth.actions";

function Register() {
  const { loading, userInfo, success } = useSelector((state) => state.auth);
  // Use dispatch
  const dispatch = useDispatch();
  // For translation
  const { t } = useTranslation();
  // For navigation
  const navigate = useNavigate();

  // Yup validation scheme for email, password, firstname, lastname, terms fields
  const schema = yup
    .object({
      firstName: yup.string().required("Le prénom est requis"),
      lastName: yup.string().required("Le nom est requis"),
      email: yup
        .string()
        .email("L'email n'est pas valide")
        .required("L'email est requis"),
      password: yup
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .required("Le mot de passe est requis"),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "Les mots de passe doivent correspondre"
        )
        .required("La confirmation du mot de passe est requise"),
      acceptTerms: yup
        .bool()
        .oneOf([true], "Vous devez accepter les conditions pour continuer"),
    })
    .required();
  // Initializing react-hook-form with yupResolver and the yup schema
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/user-profile");
  }, [navigate, userInfo, success]);

  // Function to be executed on form submission
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  // Go to login page
  const handleButtonLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 1,
        color: "#EAEDED",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "transparent",
            border: "1px solid",
            borderColor: "#00A656",
          }}
        >
          <LockOutlinedIcon sx={{ fill: "#00A656" }} />
        </Avatar>
        <Typography variant="h4" align="center" margin="dense">
          {t("register.title")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={t("register.surname")}
                    autoComplete="given-name"
                    autoFocus
                    color="primary"
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={t("register.name")}
                    autoComplete="family-name"
                    color="primary"
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={t("register.email")}
                    autoComplete="email"
                    autoFocus
                    color="primary"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={t("register.password")}
                    type="password"
                    autoComplete="current-password"
                    color="primary"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={t("register.confirm")}
                    type="password"
                    color="primary"
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                  />
                )}
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
                      control={
                        <Checkbox
                          {...field}
                          color="primary"
                          checked={field.value}
                        />
                      }
                      label={t("register.terms")}
                    />
                    {errors.acceptTerms && (
                      <FormHelperText error>
                        {errors.acceptTerms.message}
                      </FormHelperText>
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {t("register.button")}
                </Button>
                <Box mt={2}>
                  <Grid container>
                    <Grid item>
                      <Link
                        sx={{ cursor: "pointer" }}
                        onClick={handleButtonLogin}
                        variant="body2"
                        color="inherit"
                      >
                        {t("register.account")}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
