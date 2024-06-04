import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function Profile() {
  // Consume store to get user info
  const { userInfo } = useSelector((state) => state.auth);
  // For navigation
  const navigate = useNavigate();
  // Use dispatch
  const dispatch = useDispatch();

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

  return (
    <Box
      sx={{
        minHeight: "calc(100% - 100px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
        }}
      >
        <Box>
          <Typography variant="h4" align="center" margin="dense">
            Mon compte
          </Typography>
          <form noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={userInfo ? userInfo.firstName : ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Prénom"
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
                  defaultValue={userInfo ? userInfo.name : ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Nom"
                      autoComplete="family-name"
                      color="primary"
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName ? errors.lastName.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={userInfo ? userInfo.email : ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Adresse Email"
                      autoComplete="email"
                      color="primary"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
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
                      label="Mot de Passe"
                      type="password"
                      color="primary"
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
