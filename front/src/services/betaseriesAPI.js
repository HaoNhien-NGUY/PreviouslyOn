import { network } from './network';

class BetaseriesAPI {
    API_URL = process.env.REACT_APP_BETASERIES_API_URL;
    BETASERIES_KEY = process.env.REACT_APP_BETASERIES_KEY;

    config = {
        headers: {
            'x-access-token': '123',
        }
    }

    login(user) {
        return network.post(`${this.API_URL}/members/auth?login=${user.login}&password=${user.password}&key=${this.BETASERIES_KEY}`);
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };