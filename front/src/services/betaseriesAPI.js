import { network } from './network';

const API_URL = process.env.REACT_APP_BETASERIES_API_URL;
const BETASERIES_KEY = process.env.REACT_APP_BETASERIES_KEY;

const config = {
    headers: {
        'X-BetaSeries-Key': BETASERIES_KEY,
    }
}

class BetaseriesAPI {
    login(user) {
        return network.post(`${API_URL}/members/auth?login=${user.login}&password=${user.password}`, {}, config);
    }

    getAllShows(params) {
        return network.get(`${API_URL}/shows/list?limit=${params.limit}&start=${params.start}`, config);
    }
    
    getAllMovies() {
        return network.get(`${API_URL}/movies/list`, config);
    }

    blockFriend(id, token) {
        config.headers.Authorization = `Bearer ${token}`;
        return network.post(`${API_URL}/friends/block`, { id }, config);
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };