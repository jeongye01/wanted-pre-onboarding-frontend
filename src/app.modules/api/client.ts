import axios from 'axios';
import { SERVICE_URL } from '../constants/ServiceUrl';
// https://www.pre-onboarding-selection-task.shop/
const client = axios.create({
	baseURL: 'https://www.pre-onboarding-selection-task.shop/',
	headers: {
		Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
	},
});

export default client;
