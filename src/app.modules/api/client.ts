import axios from 'axios';

const client = axios.create({
	baseURL: 'https://api.kakaobrain.com/v1/pathfinder/music/mylist',
});

export default client;
