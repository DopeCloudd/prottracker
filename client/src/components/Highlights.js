import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BackHandIcon from '@mui/icons-material/BackHand';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import SavingsIcon from '@mui/icons-material/Savings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';

const items = [
    {
        icon: <SavingsIcon/>,
        title: 'Faites des économies',
        description:
            'Faites des économies sur tout vos achats de produits grâçe à notre comparateur et alerte de prix.',
    },
    {
        icon: <TroubleshootIcon/>,
        title: 'Analyse des produits',
        description:
            'Choisissez facilement le produit qui correspond en vous fiant à nos analyses de chaque produit.',
    },
    {
        icon: <BackHandIcon/>,
        title: 'Pas de publicités',
        description:
            'Notre système de monétisation nous permet de ne pas impacter votre expérience avec des publicités.',
    },
    {
        icon: <NotificationsIcon/>,
        title: 'Restez alerté',
        description:
            'Ne loupez aucun deal sur vos produits favoris en restant alerté sur chaque baisse de prix.',
    },
    {
        icon: <FavoriteIcon/>,
        title: 'Sauvegardez vos envies',
        description:
            'Vous pouvez facilement ajouter un produit à vos favoris pour le retrouver rapidement.',
    },
    {
        icon: <AddCircleOutlineIcon/>,
        title: 'Ajoutez vos favoris',
        description:
            'Vous ne trouvez pas votre produit préféré ? Vous pouvez facilement nous le faire savoir.',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                color: 'white',
                bgcolor: '#06090a',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: {xs: 3, sm: 6},
                }}
            >
                <Box
                    sx={{
                        width: {sm: '100%', md: '60%'},
                        textAlign: 'center',
                    }}
                >
                    <Typography component="h2" variant="h4">
                        Avantages
                    </Typography>
                    <Typography variant="body1" sx={{color: 'grey.400'}}>
                        Découvrez pourquoi notre produit se distingue : économies, analyse et expérience. Laissez nous
                        vous faire gagner du temps en comparant et analysant pour vous des milliers de produits.
                    </Typography>
                </Box>
                <Grid container spacing={2.5}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Stack
                                direction="column"
                                color="inherit"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'primary.main',
                                    background: 'transparent',
                                    backgroundColor: 'grey.900',
                                }}
                            >
                                <Box sx={{opacity: '50%'}}>{item.icon}</Box>
                                <div>
                                    <Typography fontWeight="medium" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'grey.400'}}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}