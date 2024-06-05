import { Box, Typography } from "@mui/material";
import React from "react";

export default function Privacy() {
  return (
    <Box
      sx={{
        padding: "0 5%",
        pb: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontFamily: "Integral Oblique, sans-serif", mb: 4 }}
      >
        Politique de Confidentialite de MyProtTracker
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        1. Introduction
      </Typography>
      <Typography>
        Bienvenue sur MyProtTracker. Nous nous engageons à protéger et à
        respecter votre vie privée. Cette politique de confidentialité explique
        comment nous collectons, utilisons, stockons et protégeons vos
        informations personnelles lorsque vous utilisez notre site web.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        2. Informations collectees
      </Typography>
      <Typography>
        Nous collectons les informations personnelles suivantes lorsque vous
        vous inscrivez sur notre site : Nom, Prénom et Adresse e-mail
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        3. Methodes de collecte des informations
      </Typography>
      <Typography>
        Ces informations sont collectées via un formulaire d'inscription sur
        notre site web. Nous ne faisons pas appel à des services tiers pour la
        collecte de ces données.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        4. Utilisation des informations collectees
      </Typography>
      <Typography>
        Les informations que nous collectons sont utilisées pour :<br /> Vous
        identifier en tant qu'utilisateur enregistré
        <br /> Vous fournir des services personnalisés sur notre site
        <br /> Vous contacter en cas de besoin
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        5. Protection des donnees
      </Typography>
      <Typography>
        Nous prenons la sécurité de vos informations personnelles très au
        sérieux. Les données sont stockées dans une base de données sécurisée et
        ne sont accessibles que par nous. Les mots de passe des utilisateurs
        sont hachés pour une sécurité accrue.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        6. Droits des utilisateurs
      </Typography>
      <Typography>
        Conformément à la réglementation applicable en matière de protection des
        données personnelles, vous avez le droit de :<br />
        Accéder à vos données personnelles
        <br />
        Demander la rectification de vos données personnelles
        <br />
        Demander la suppression de vos données personnelles
        <br />
        Pour exercer ces droits, veuillez nous contacter par e-mail à l'adresse
        indiquée ci-dessous.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        7. Conservation des donnees
      </Typography>
      <Typography>
        Nous conservons vos informations personnelles aussi longtemps que votre
        compte est actif ou aussi longtemps que nécessaire pour vous fournir nos
        services. Vous pouvez demander la suppression de vos données à tout
        moment.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        8. Cookies
      </Typography>
      <Typography>Nous n'utilisons pas de cookies sur notre site.</Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        9. Modifications de la politique de confidentialite
      </Typography>
      <Typography>
        Nous pouvons mettre à jour cette politique de confidentialité de temps
        en temps. Nous vous notifierons de toute modification par e-mail. Nous
        vous encourageons à consulter régulièrement cette page pour être informé
        de tout changement.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, fontFamily: "Integral, sans-serif" }}
      >
        10. Contact
      </Typography>
      <Typography>
        Pour toute question concernant cette politique de confidentialité, vous
        pouvez nous contacter par e-mail à l'adresse suivante :
        contact@myprottracker.com
      </Typography>
    </Box>
  );
}
