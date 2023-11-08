//import config from "../config";
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
export const formatErrorResponse = (errorResponse) => ({
	error: errorResponse?.response?.data || errorResponse?.message || "An error occurred",
	isError: true,
});

export const formatSuccessResponse = (data) => ({
	data: data.data,
	isError: false,
});

export const constants = {
	DATE_FOMAT: "MMM DD hh:ss",
};

export const debounce = function debounce(func, timeout = 300) {
	// Source: https://www.freecodecamp.org/news/javascript-debounce-example/
	let timer;
	return function (...args) {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};
export const dynamicLoader = async (func, timeout = 800) => {
	let interval = setInterval(async () => {
		if (!(await func())) {
			return;
		}
		clearInterval(interval);
	}, timeout);
};

