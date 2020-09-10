import axios from 'axios';

class BetaseriesAPI {
    API_URL = process.env.REACT_APP_BETASERIES_API_URL;

    constructor(){
        this.headers = {
            headers : {
                'x-access-token' : '??'
            }
        } 
    }

    login() {

    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };