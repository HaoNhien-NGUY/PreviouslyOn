import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Swiper, { Pagination, Keyboard, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import PosterCard from '../../card/posterCard';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: "15px",
        fontWeight: 100
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    slideCard: {
        padding: '12px',
    }
}));

export default function CenteredGrid() {
    const classes = useStyles();

    useEffect(() => {
        Swiper.use([Pagination, Navigation]);
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            initialSlide: 0,
            resistanceRatio: 0.7,
            threshold: 25,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 24 },
                992: { slidesPerView: 2, spaceBetween: 24 },
                1250: { slidesPerView: 3, spaceBetween: 24 },
                1600: { slidesPerView: 6, spaceBetween: 24 },
            }
        });

    }, []);

    return (
        <>
            <Container maxWidth={'xl'}>
                <Typography className={classes.title} variant="h3" align="left">Séries à découvrir</Typography>
                <div className="swiper-container" >
                    <div className="swiper-wrapper">

                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                        <div className="swiper-slide">
                            <PosterCard />
                        </div>
                    </div>
                </div>
                {/* <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <PosterCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <PosterCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <PosterCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <PosterCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <PosterCard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <PosterCard />
                    </Grid>
                </Grid> */}
            </Container>

        </>
    );
}