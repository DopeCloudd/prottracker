import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DiscountIcon from '@mui/icons-material/Discount';

const tiers = [
    {
        title: 'Starter Strength',
        price: '0',
        time: '* sans engagement',
        description: [
            'Recherche de produits',
            'Variation des prix',
            'Comparaison',
        ],
        buttonText: 'S\'inscrire',
        buttonVariant: 'outlined',
    },
    {
        title: 'Power Builder',
        subheader: 'Recommendé',
        price: '4,99',
        time: '* engagement pendant 3 mois',
        description: [
            'Tout Starter Strength',
            'Alerte sur vos produits favoris',
            'Analyse des produits',
            'Historique des prix détaillés',
            'Demande d\'ajout de produit',
        ],
        buttonText: 'S\'abonner',
        buttonVariant: 'contained',
    },
    {
        title: 'Lifetime Lift',
        subheader: '- 60%',
        price: '1,99',
        time: '* engagement pendant 1 an',
        description: [
            'Tout Power Builder',
            'Réduction sur l\'abonnement',
            'Traitement de vos demandes en priorité',
        ],
        buttonText: 'S\'abonner',
        buttonVariant: 'outlined',
    },
];

export default function Pricing() {
    return (
        <Container
            id="pricing"
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
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
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Pricing
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Quickly build an effective pricing table for your potential customers with
                    this layout. <br/>
                    It&apos;s built with default Material UI components with little
                    customization.
                </Typography>
            </Box>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                {tiers.map((tier) => (
                    <Grid
                        item
                        key={tier.title}
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={4}
                    >
                        <Card
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                                border: tier.title === 'Power Builder' ? '1px solid' : undefined,
                                borderColor:
                                    tier.title === 'Power Builder' ? 'primary.main' : undefined,
                                background:
                                    tier.title === 'Power Builder'
                                        ? 'linear-gradient(180deg, rgba(0,110,57,1) 0%, rgba(0,55,29,1) 100%)'
                                        : undefined,
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        color: tier.title === 'Power Builder' ? 'grey.100' : '',
                                    }}
                                >
                                    <Typography component="h3" variant="h6">
                                        {tier.title}
                                    </Typography>
                                    {tier.title === 'Power Builder' && (
                                        <Chip
                                            icon={<AutoAwesomeIcon/>}
                                            label={tier.subheader}
                                            size="small"
                                            sx={{
                                                background: (theme) =>
                                                    theme.palette.mode === 'light' ? '' : 'none',
                                                backgroundColor: 'primary.contrastText',
                                                '& .MuiChip-label': {
                                                    color: 'primary.dark',
                                                },
                                                '& .MuiChip-icon': {
                                                    color: 'primary.dark',
                                                },
                                            }}
                                        />
                                    )}
                                    {tier.title === 'Lifetime Lift' && (
                                        <Chip
                                            icon={<DiscountIcon/>}
                                            label={tier.subheader}
                                            size="small"
                                            sx={{
                                                background: (theme) =>
                                                    theme.palette.mode === 'light' ? '' : 'none',
                                                backgroundColor: 'primary.contrastText',
                                                '& .MuiChip-label': {
                                                    color: 'primary.dark',
                                                },
                                                '& .MuiChip-icon': {
                                                    color: 'primary.dark',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        color: tier.title === 'Power Builder' ? 'grey.50' : undefined,
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
                                        borderColor: 'grey.500',
                                    }}
                                />
                                {tier.description.map((line) => (
                                    <Box
                                        key={line}
                                        sx={{
                                            py: 1,
                                            display: 'flex',
                                            gap: 1.5,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CheckCircleRoundedIcon
                                            sx={{
                                                width: 20,
                                                color:
                                                    tier.title === 'Power Builder'
                                                        ? 'primary.light'
                                                        : 'primary.main',
                                            }}
                                        />
                                        <Typography
                                            component="text"
                                            variant="subtitle2"
                                            sx={{
                                                color:
                                                    tier.title === 'Power Builder' ? 'grey.200' : undefined,
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
                                    component="a"
                                    href="/material-ui/getting-started/templates/checkout/"
                                    target="_blank"
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