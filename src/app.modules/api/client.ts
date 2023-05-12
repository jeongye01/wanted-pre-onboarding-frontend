import { AccessToken } from 'app.modules/constants/AccessToken';
import axios from 'axios';
import { SERVICE_URL } from '../constants/ServiceUrl';
// https://www.pre-onboarding-selection-task.shop/
const client = axios.create({
	baseURL: 'https://www.pre-onboarding-selection-task.shop/',
	headers: {
		Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
	},
});

export default client;
