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

    shows() {
        return network.get(`${API_URL}/shows/list`, config);
    }
    
    movies() {
        return network.get(`${API_URL}/movies/list`, config);
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };