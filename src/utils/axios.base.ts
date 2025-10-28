import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://rickandmortyapi.com/api',
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.response?.data || error.message);
		throw Promise.reject(error);
	}
);

export default apiClient;