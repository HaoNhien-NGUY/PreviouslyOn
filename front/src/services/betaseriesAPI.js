import axios from 'axios';

class BetaseriesAPI {
    API_URL = process.env.REACT_APP_BETASERIES_API_URL;

    constructor(){
        this.headers = {
            headers : {
                'x-access-token' : '123',
                "Content-type": "application/json"
            }
        }
    }

    login(user) {
        return axios.post(this.API_URL + '/members/auth?login=' + user.username + '&password=' + user.password + '&key=' + process.env.REACT_APP_BETASERIES_KEY);
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };