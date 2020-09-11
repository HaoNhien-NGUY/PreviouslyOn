import React, { useEffect, useState } from 'react';
import { betaseriesAPI } from '../../../services/betaseriesAPI';

export default function Movies() {
    const [allMovies, setAllMovies] = useState(null);

    const showMovies = async () => {
        const res = await betaseriesAPI.getAllMovies();

        if (res.status === 200) {
            setAllMovies(res.data.movies);
        } else {
            console.log(res.data);
        }
    }

    useEffect(() => {
        showMovies();
    }, [])

    return (
        <>
            {allMovies && allMovies.map((e) => {
                return (<>
                    <span>Title: {e.title}</span>
                    <br />
                </>);
            })}
        </>
    )
}