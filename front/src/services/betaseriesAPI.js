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

    getAllShowsWith(params) {
        return network.get(`${API_URL}/shows/list?limit=${params.limit}&start=${params.start}&starting=${params.title}`, { headers: authHeader() });
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

    getUserInfoById(id) {
        return network.get(`${API_URL}/members/infos?id=${id}`, { headers: authHeader() } );
    }

    memberDestroyToken(token) {
        return network.post(`${API_URL}/members/destroy`, {}, { headers: authHeader(token) });
    }

    friendList(id, token, blocked = false) {
        return network.get(`${API_URL}/friends/list`, { params: { id , blocked}, headers: authHeader(token) });
    }

    friendListBlocked(token, blocked = false) {
        return network.get(`${API_URL}/friends/list`, { params: { blocked }, headers: authHeader(token) });
    }

    friendsReceived(token) {
        return network.get(`${API_URL}/friends/requests`, { params: { received: true }, headers: authHeader(token) });
    }
    
    blockFriend(id, token) {
        return network.post(`${API_URL}/friends/block`, { id }, { headers: authHeader(token) });
    }
    
    deblockFriend(id, token) {
        return network.delete(`${API_URL}/friends/block`, { params: { id }, headers: authHeader(token) });
    }

    addFriend(id, token) {
        return network.post(`${API_URL}/friends/friend`, { id }, { headers: authHeader(token) });
    }
    
    deleteFriend(id, token) {
        return network.delete(`${API_URL}/friends/friend`, { params: { id }, headers: authHeader(token) });
    }
    
    findMembers(login) {
        return network.get(`${API_URL}/members/search?login=${login}`, { headers: authHeader() });
    }

    getShowsToDiscover(token = null) {
        return network.get(`${API_URL}/shows/discover?limit=30`, { headers: authHeader(token) });
    }

    getMoviesToDiscover(token = null) {
        return network.get(`${API_URL}/movies/discover`, { params: {limit: 42, type: 'popular'}, headers: authHeader(token) });
    }

    getMovieDetails(id) {
        return network.get(`${API_URL}/movies/movie`, { params: { id }, headers: authHeader() });
    }

    addShowToUser(id, token) {
        return network.post(`${API_URL}/shows/show`, { id }, { headers: authHeader(token) });
    }

    removeShowToUser(id, token) {
        return network.delete(`${API_URL}/shows/show`, { params: { id }, headers: authHeader(token) });
    }

    getShowDetails(id, token = null) {
        return network.get(`${API_URL}/shows/display`, { params: { id }, headers: authHeader(token) });
    }

    archiveShow(id, token) {
        return network.post(`${API_URL}/shows/archive`, { id }, { headers: authHeader(token) });
    }

    unarchiveShow(id, token) {
        return network.delete(`${API_URL}/shows/archive`, { params: { id }, headers: authHeader(token) });
    }

    getShowEpisodes(id, token = null) {
        return network.get(`${API_URL}/shows/episodes`, { params: { id }, headers: authHeader(token) });
    }

    getEpisodeDetails(id, token = null) {
        return network.get(`${API_URL}/episodes/display`, { params: { id }, headers: authHeader(token) });
    }

    addEpisodeWatched(id, token, bulk = true) {
        return network.post(`${API_URL}/episodes/watched`, { id, bulk }, { headers: authHeader(token) });
    }

    removeEpisodeWatched(id, token) {
        return network.delete(`${API_URL}/episodes/watched`, { params: { id }, headers: authHeader(token) });
    }

    getEpisodeComments(id, token = null) {
        return network.get(`${API_URL}/comments/comments`, { params: { id, type: 'episode', order: 'desc' }, headers: authHeader(token) });
    }

    commentEpisode(id, text, token) {
        return network.post(`${API_URL}/comments/comment`, { id, type: 'episode', text }, { headers: authHeader(token) });
    }
}

const betaseriesAPI = new BetaseriesAPI();
Object.freeze(betaseriesAPI);

export { betaseriesAPI };