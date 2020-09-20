import React, { useEffect, useState } from 'react';
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button, Box, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import PosterCard from '../../card/posterCard';

const params = {
    limit: 20,
    start: 0
};

const useStyles = makeStyles((theme) => ({
    card: {
        width: '250px',
    },
    center: {
        textAlign: 'center',
    },
    textfield: {
        width: '100%',
        margin: '20px 0',
    }
}));

export default function GetAllShows() {
    const classes = useStyles();
    const [allShows, setAllShows] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showsStarting, setShowsStarting] = useState("");
    const [inputSearch, setInputSearch] = useState("");

    const showShows = async () => {
        const res = await betaseriesAPI.getAllShows(params);

        if (res.status === 200) {
            console.log(res);
            setAllShows(res.data.shows);
            setIsLoading(false);
        } else {
            console.log(res.data);
        }
    }

    useEffect(() => {
        showShows();
    }, []);

    useEffect(() => {
        let timeOut;
        if (inputSearch != "") {
            timeOut = setTimeout(() => {
                betaseriesAPI.getAllShowsWith({ ...params, title: inputSearch }).then(res => {
                    setShowsStarting(res.data.shows);
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    setIsLoading(false);
                });
            }, 2000);
        }
        return () => clearTimeout(timeOut);

    }, [inputSearch]);

    const pagePrev = () => {
        params.start = params.start - 20;
        showShows();
    }

    const pageNext = () => {
        params.start = params.start + 20;
        showShows();
    }

    const handleInput = (event) => {          
        if (event.target.value === "") {
            showShows();
        } else {
            setInputSearch(event.target.value);
            setIsLoading(true);
        }
    }

    // if isLoading ? loading de material : 
    // inputSearch ...

    return (
        <Container className={classes.container} maxWidth={'xl'}>
            <TextField label="Rechercher une série" variant="outlined" className={classes.textfield} onChange={handleInput} />
            {isLoading ? <h1>Loading...</h1>
            :
            (inputSearch === "" ?
                <>
                    <Grid container spacing={4}>
                        {allShows && allShows.map((show) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id} className={classes.card}>
                                    <PosterCard show={show} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box m={5} className={classes.center}>
                        <Box component="span" m={1}>
                            <Button variant="outlined" onClick={pagePrev}>Prev</Button>
                        </Box>

                        {/* <Pagination count={10} shape="rounded" onChange={handlePagination}/> */}

                        <Box component="span" m={1}>
                            <Button variant="outlined" onClick={pageNext}>Next</Button>
                        </Box>
                    </Box>
                </>
                :
                <>
                    <Grid container spacing={4}>
                        {showsStarting && showsStarting.map((show) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id} className={classes.card}>
                                    <PosterCard show={show} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box m={5} className={classes.center}>
                        <Box component="span" m={1}>
                            <Button variant="outlined" onClick={pagePrev}>Prev</Button>
                        </Box>

                        {/* <Pagination count={10} shape="rounded" onChange={handlePagination}/> */}

                        <Box component="span" m={1}>
                            <Button variant="outlined" onClick={pageNext}>Next</Button>
                        </Box>
                    </Box>
                </>)
            }

        </Container>
    )
}