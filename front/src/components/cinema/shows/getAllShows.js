import React, { useEffect, useState } from 'react';
import { betaseriesAPI } from '../../../services/betaseriesAPI';

const params = {
    limit: 20,
    start: 0
};

export default function Shows() {
    const [allShows, setAllShows] = useState(null);

    const showShows = async () => {

        const res = await betaseriesAPI.getAllShows(params);

        if (res.status === 200) {
            setAllShows(res.data.shows);
        } else {
            console.log(res.data);
        }
    }

    useEffect(() => {
        showShows();
    }, []);

    const pagePrev = () => {
        params.start = params.start - 20;
        showShows();
    }

    const pageNext = () => {
        params.start = params.start + 20;
        showShows();
    }

    return (
        <>
            {allShows && allShows.map((e) => {
                // console.log(e);
                return (<div key={e.id}>
                    <span>Title: {e.title}</span>
                    <br />
                </div>);
            })}
            <button onClick={pagePrev}>Prev</button>
            <button onClick={pageNext}>Next</button>
        </>
    )
}