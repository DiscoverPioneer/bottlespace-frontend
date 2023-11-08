import axios from "axios";
import Cookie from "js-cookie";

import config from "../../config";

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {},
	// timeout: 5000,
});

const axiosAPI = axios.create({
	baseURL:"/api"
});

// Request Interceptor
axiosAPI.interceptors.request.use(
	(axiosConfig) => {
		const reConfig = axiosConfig;
		const usKey = Cookie.get(config.userKey);
		if (usKey) {
			const token = JSON.parse(usKey)?.token;
			if (token) {
				reConfig.headers.Authorization = `Bearer ${token}`;
			}
		}
		reConfig.headers["Content-Type"] = "application/json";
		return reConfig;
	},
	(error) => Promise.reject(error)
);

// Request Interceptor
axiosClient.interceptors.request.use(
	(axiosConfig) => {
		const reConfig = axiosConfig;
		const usKey = Cookie.get(config.userKey);
		if (usKey) {
			const token = JSON.parse(usKey)?.token;
			if (token) {
				reConfig.headers.Authorization = `Bearer ${token}`;
			}
		}
		reConfig.headers["Content-Type"] = "application/json";
		return reConfig;
	},
	(error) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response &&
			(error.response.data.message === "Token Expired." || error.response.status == 401)
		) {
			Cookie.remove(config.userKey);
			window.location.href = "/auth/login";
		}

		if (error.message === "Network Error") {
			const errorMessage = {
				response: {
					data: {
						message:
							"Network Error. Please check if you are connected to the internet.",
					},
				},
			};
			return Promise.reject(errorMessage);
		}

		return Promise.reject(error);
	}
);
export default axiosClient;
export { axiosAPI }
