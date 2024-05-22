import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Ne pas afficher le Breadcrumb sur la page d'accueil
    if (location.pathname === '/') {
        return null;
    }

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
                padding: '0 5%',
            }}
        >
            <Link
                to="/"
            >
                <HomeIcon
                    sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        fill: 'white',
                    }}
                />
            </Link>
            {pathnames.map((value, index) => {
                const isLast = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return isLast ? (
                    <Typography color="textPrimary" key={to}>
                        {value}
                    </Typography>
                ) : (
                    <Link color="inherit" to={to} key={to}>
                        {value}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default Breadcrumb;