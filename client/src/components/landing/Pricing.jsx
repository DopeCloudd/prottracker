import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DiscountIcon from "@mui/icons-material/Discount";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const tiers = [
  {
    title: "Power Lift",
    price: "4,99",
    time: "* engagement d'un mois",
    description: [
      "Nos analyses détaillées",
      "Comparaison des produits",
      "Alerte sur vos produits favoris",
      "Historique des prix",
      "Demande d'ajout de produit",
    ],
    buttonText: "S'abonner",
    buttonVariant: "outlined",
    stripeIdProduct: "prod_QCDD4bPwHRCG18",
  },
  {
    title: "Muscle Builder",
    subheader: "Recommendé",
    price: "2,99",
    time: "* engagement pendant 3 mois",
    description: ["Tout Power Lift", "Réduction sur l'abonnement de 40%"],
    buttonText: "S'abonner",
    buttonVariant: "contained",
    stripeIdProduct: "prod_QCrjhRU1NNoBHr",
  },
  {
    title: "Pro Gains",
    subheader: "- 80%",
    price: "0,99",
    time: "* engagement pendant 1 an",
    description: ["Tout Power Lift", "Réduction sur l'abonnement de 80%"],
    buttonText: "S'abonner",
    buttonVariant: "outlined",
    stripeIdProduct: "prod_QCrj2lSpSG7ywY",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleSubscription = (stripeIdProduct) => {
    navigate("/subscription/" + stripeIdProduct);
  };

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Abonnement
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Libérez tout le potentiel de notre application en vous abonnant à
          notre application. Mettez toutes les chances de votre côté pour
          atteindre vos objectifs.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: 4,
                border:
                  tier.title === "Muscle Builder" ? "1px solid" : undefined,
                borderColor:
                  tier.title === "Muscle Builder" ? "primary.main" : undefined,
                background:
                  tier.title === "Muscle Builder"
                    ? "linear-gradient(180deg, rgba(0,110,57,1) 0%, rgba(0,55,29,1) 100%)"
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: tier.title === "Muscle Builder" ? "grey.100" : "",
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === "Muscle Builder" && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                  {tier.title === "Pro Gains" && (
                    <Chip
                      icon={<DiscountIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color:
                      tier.title === "Power Builder" ? "grey.50" : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price}€
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; par mois
                  </Typography>
                </Box>
                {tier.time && (
                  <Typography variant="body1" color="text.secondary">
                    {tier.time}
                  </Typography>
                )}
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: "grey.500",
                  }}
                />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color:
                          tier.title === "Power Builder"
                            ? "primary.light"
                            : "primary.main",
                      }}
                    />
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{
                        color:
                          tier.title === "Power Builder"
                            ? "grey.200"
                            : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  onClick={() => handleSubscription(tier.stripeIdProduct)}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
