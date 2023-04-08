import axios from 'axios';
import { SERVICE_URL } from '../constants/ServiceUrl';

const client = axios.create({
	baseURL: 'https://www.pre-onboarding-selection-task.shop/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
	},
});

export default client;
