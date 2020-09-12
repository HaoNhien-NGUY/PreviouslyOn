import { network } from './network';

const API_URL = process.env.REACT_APP_BETASERIES_API_URL;
const BETASERIES_KEY = process.env.REACT_APP_BETASERIES_KEY;

const authHeader = (token = false) => {
    const config = {
        headers: {
            'X-BetaSeries-Key': BETASERIES_KEY,
        }
    }

    if (!token) {
        return config;
    }
    
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

class BetaseriesAPI {
    login(user) {
        return network.post(`${API_URL}/members/auth?login=${user.login}&password=${user.password}`, {}, authHeader());
    }

    getAllShows(params) {
        return network.get(`${API_URL}/shows/list?limit=${params.limit}&start=${params.start}`, authHeader());
    }

    getAllMovies() {
        return network.get(`${API_URL}/movies/list`, authHeader());
    }

    IsTokenActive(token) {
        return network.get(`${API_URL}/members/is_active`, authHeader(token));
    }

    getUserInfo(token) {
        return network.get(`${API_URL}/members/infos`, authHeader(token));
    }

    memberDestroyToken(token) {
        return network.post(`${API_URL}/members/destroy`, {}, authHeader(token));
    }

    blockFriend(id, token) {
        return network.post(`${API_URL}/friends/block`, { id }, authHeader(token));
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };