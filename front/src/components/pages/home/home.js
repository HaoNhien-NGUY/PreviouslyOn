import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Swiper, { Pagination, Navigation } from 'swiper';
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import Skeleton from '@material-ui/lab/Skeleton';

import 'swiper/swiper-bundle.css';
import './home.css';

import PosterCard from '../../card/posterCard';

const useStyles = makeStyles((theme) => ({
    container: {
        overflowX: 'hidden',
    },
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
    const [showsToDiscover, setShowsToDiscover] = useState([]);

    useEffect(() => {
        Swiper.use([Pagination, Navigation]);
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            spaceBetween: 10,
            initialSlide: 0,
            resistanceRatio: 0,
            threshold: 35,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                600: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
                960: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
                1280: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
                1600: { slidesPerView: 6, spaceBetween: 24, slidesPerGroup: 6 },
            }
        });

        (async () => {
            const response = await betaseriesAPI.getShowsToDiscover();
            if (response.status === 200) {
                setShowsToDiscover(response.data.shows);
                swiper.update();
            }
        })()
    }, []);

    return (
        <>
            <Container className={classes.container} maxWidth={'xl'}>
                <Typography className={classes.title} variant="h3" align="left">Séries à découvrir</Typography>
                <div className="swiper-container" >
                    <div className="swiper-wrapper">
                        {
                            showsToDiscover.length > 0 
                            ?
                            showsToDiscover.map(show => (
                                <div className="swiper-slide">
                                    <PosterCard />
                                </div>
                            ))
                            :
                            [...Array(6)].map((val, i) => (<div className="swiper-slide"><Skeleton variant="rect" width="100%" height="360px" minHeight="360px"></Skeleton></div>))
                        }

                        {/* <div className="swiper-slide">
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
                        </div> */}
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
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