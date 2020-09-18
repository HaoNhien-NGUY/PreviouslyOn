import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../../../store/store';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Swiper, { Pagination, Navigation } from 'swiper';
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import Skeleton from '@material-ui/lab/Skeleton';

import 'swiper/swiper-bundle.css';
import './home.css';

import PosterCard from '../../card/posterCard';
import CardDetails from '../../card/cardDetails';

const useStyles = makeStyles((theme) => ({
    container: {
        overflowX: 'hidden',
        marginBottom: theme.spacing(10),
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

const swiperSettings = {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    spaceBetween: 10,
    initialSlide: 0,
    resistanceRatio: 0,
    threshold: 40,
    longSwipesRatio: 0.1,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
        600: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
        960: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
        1280: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
        1600: { slidesPerView: 6, spaceBetween: 24, slidesPerGroup: 6 },
    }
}

export default function CenteredGrid() {
    const [store, dispatch] = useStore();
    const classes = useStyles();
    const [showsToDiscover, setShowsToDiscover] = useState([]);
    const [moviesToDiscover, setMoviesToDiscover] = useState([]);
    const swiper = useRef();
    const swiper2 = useRef();

    useEffect(() => {
        Swiper.use([Pagination, Navigation]);
        swiper.current = new Swiper('.swiper1', swiperSettings);
        swiper2.current = new Swiper('.swiper2', swiperSettings);
    }, []);

    useEffect(() => {
        if (store.access_token) {

            (async () => {
                const response = await betaseriesAPI.getShowsToDiscover(store.access_token);
                if (response.status === 200) {
                    console.log(response.data);
                    setShowsToDiscover(response.data.shows);
                    swiper.current.update();
                }
            })();

            (async () => {
                const response = await betaseriesAPI.getMoviesToDiscover();
                if (response.status === 200) {
                    const movie = await betaseriesAPI.getMovieDetails(response.data.movies[0].id);
                    // console.log(movie);
                    // setMoviesToDiscover(response.data.shows);
                    swiper2.current.update();
                }
            })();
        }
    }, [store.access_token]);

    return (
        <>
            {/* <CardDetails /> */}
            <Container className={classes.container} maxWidth={'xl'}>
                <Typography className={classes.title} variant="h4" align="left">Séries à découvrir</Typography>
                <div className="swiper-container swiper1" >
                    <div className="swiper-wrapper">
                        {
                            showsToDiscover.length > 0
                                ?
                                showsToDiscover.map(show => (
                                    <div key={show.id} className="swiper-slide">
                                        <PosterCard show={show} />
                                    </div>
                                ))
                                :
                                [...Array(6)].map((val, i) => (
                                    <div key={i} className="swiper-slide">
                                        <Skeleton variant="rect" width="100%" height="360px"></Skeleton>
                                    </div>))
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
            </Container>
            <Container className={classes.container} maxWidth={'xl'}>
                <Typography className={classes.title} variant="h4" align="left">Films à découvrir</Typography>
                <div className="swiper-container swiper2" >
                    <div className="swiper-wrapper">
                        {
                            moviesToDiscover.length > 0
                                ?
                                moviesToDiscover.map(movie => (
                                    <div key={movie.id} className="swiper-slide">
                                        <PosterCard movie={movie} />
                                    </div>
                                ))
                                :
                                [...Array(6)].map((val, i) => (
                                    <div key={i} className="swiper-slide">
                                        <Skeleton variant="rect" width="100%" height="360px"></Skeleton>
                                    </div>))
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
            </Container>
        </>
    );
}