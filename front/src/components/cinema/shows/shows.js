import React, { useEffect, useState } from 'react';
import { betaseriesAPI } from '../../../services/betaseriesAPI';

export default function Shows() {
    const [allShows, setAllShows] = useState(null);

    const showShows = async () => {
        const res = await betaseriesAPI.shows();

        if (res.status === 200) {
            setAllShows(res.data.shows);
        } else {
            console.log(res.data);
        }
    }

    useEffect(() => {
        showShows();
    }, []);

    return (
        <>
            {allShows && allShows.map((e) => {
                console.log(e);
                return (<div key={e.id}>
                    <span>Title: {e.title}</span>
                    <br />
                </div>);
            })}
        </>
    )
}