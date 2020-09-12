import { network } from './network';

const API_URL = process.env.REACT_APP_BETASERIES_API_URL;
const BETASERIES_KEY = process.env.REACT_APP_BETASERIES_KEY;

const authHeader = (token = false) => {
    const headers = { 'X-BetaSeries-Key': BETASERIES_KEY };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

class BetaseriesAPI {
    login(user) {
        return network.post(`${API_URL}/members/auth?login=${user.login}&password=${user.password}`, {}, { headers: authHeader() });
    }

    getAllShows(params) {
        return network.get(`${API_URL}/shows/list?limit=${params.limit}&start=${params.start}`, { headers: authHeader() });
    }

    getAllMovies() {
        return network.get(`${API_URL}/movies/list`, { headers: authHeader() });
    }

    IsTokenActive(token) {
        return network.get(`${API_URL}/members/is_active`, { headers: authHeader(token) });
    }

    getUserInfo(token) {
        return network.get(`${API_URL}/members/infos`, { headers: authHeader(token) } );
    }

    memberDestroyToken(token) {
        return network.post(`${API_URL}/members/destroy`, {}, { headers: authHeader(token) });
    }

    blockFriend(id, token) {
        return network.post(`${API_URL}/friends/block`, { id }, { headers: authHeader(token) });
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };