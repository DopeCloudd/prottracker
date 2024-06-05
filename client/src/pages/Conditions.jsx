import { Box, Typography } from "@mui/material";
import React from "react";

export default function Conditions() {
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
        Conditions Utilisation de MyProtTracker
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        1. Introduction
      </Typography>
      <Typography>
        Bienvenue sur MyProtTracker. En utilisant notre site web, vous acceptez
        de respecter et d'être lié par les présentes Conditions d'Utilisation.
        Veuillez les lire attentivement.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        2. Description des services
      </Typography>
      <Typography>
        MyProtTracker offre les services suivants :<br />
        Comparaison des prix de plusieurs sites marchands pour des produits de
        nutrition sportive.
        <br />
        Analyse et scoring des produits de nutrition sportive via leurs valeurs
        nutritionnelles.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        3. Acces et utilisation
      </Typography>
      <Typography>
        Il n'y a pas de restrictions d'âge ou de localisation pour utiliser
        notre site.
        <br />
        Les comportements suivants sont interdits : violation des droits de
        propriété intellectuelle, spam par e-mail.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        4. Inscription
      </Typography>
      <Typography>
        Les utilisateurs doivent fournir des informations exactes lors de
        l'inscription et les maintenir à jour.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        5. Contenu utilisateur
      </Typography>
      <Typography>
        Les utilisateurs peuvent soumettre des demandes de nouveaux produits par
        e-mail.
        <br />
        Les utilisateurs s'engagent à ne pas soumettre de contenu qui viole les
        droits de propriété intellectuelle d'autrui ou qui constitue du spam.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        6. Propriete intellectuelle
      </Typography>
      <Typography>
        Tous les droits d'auteur et marques relatifs aux contenus et services de
        MyProtTracker appartiennent exclusivement à MyProtTracker.
        <br />
        Les utilisateurs peuvent signaler toute violation de propriété
        intellectuelle en nous contactant par e-mail à
        contact@myprottracker.com.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        7. Limitation de responsabilite
      </Typography>
      <Typography>
        MyProtTracker n'est pas responsable des problèmes techniques, des pertes
        de données ou de tout autre dommage résultant de l'utilisation de notre
        site.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        8. Modification des conditions
      </Typography>
      <Typography>
        Nous pouvons modifier ces Conditions d'Utilisation à tout moment. Les
        utilisateurs seront informés des modifications par e-mail.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        9. Resiliation
      </Typography>
      <Typography>
        Les utilisateurs peuvent résilier leur compte et abonnement à tout
        moment. Cependant, le compte restera actif jusqu'à la fin de la période
        d'abonnement.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, mb: 1, fontFamily: "Integral, sans-serif" }}
      >
        10. Loi applicable
      </Typography>
      <Typography>
        Ces Conditions d'Utilisation sont régies par les lois en vigueur dans le
        pays de résidence de l'utilisateur.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 1, fontFamily: "Integral, sans-serif" }}
      >
        11. Contact
      </Typography>
      <Typography>
        Pour toute question ou préoccupation concernant ces Conditions
        d'Utilisation, veuillez nous contacter par e-mail à
        contact@myprottracker.com.
      </Typography>
    </Box>
  );
}
