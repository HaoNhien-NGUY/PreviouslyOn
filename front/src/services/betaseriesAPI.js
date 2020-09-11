import axios from 'axios';

class BetaseriesAPI {
    API_URL = process.env.REACT_APP_BETASERIES_API_URL;
    BETASERIES_KEY = process.env.REACT_APP_BETASERIES_KEY;

    config = {
        headers: {
            'x-access-token': '123',
        }
    }

    login(user) {
        return axios.post(`${this.API_URL}/members/auth?login=${user.username}&password=${user.password}&key=${this.BETASERIES_KEY}`);
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };