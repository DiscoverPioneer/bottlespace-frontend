/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookie from "js-cookie";
import ApiClient, { axiosAPI } from "./axiosClient";
import PropTypes from "prop-types";
import { formatErrorResponse, formatSuccessResponse } from "../utils";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import config from "../config";

const axiosCall = config.PROXY_API ? axiosAPI : ApiClient;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [userProfile, setUserProfile] = useState(null);

	const authService = {
		currentUser: Cookie.get(config.userKey) ? JSON.parse(Cookie.get(config.userKey)) : null,
		SetUpdateToken: async (data) => {
			const user = Cookie.get(config.userKey) ? JSON.parse(Cookie.get(config.userKey)) : null;
			if (user) {
				const g = { ...user, ...data };

				Cookie.set(`${config.userKey}`, JSON.stringify(g), 0.125);
			}
		},
		setSession: async (user, expire = 0.125) => {
			Cookie.set(`${config.userKey}`, JSON.stringify(user), expire);
		},
		resetPassword: async (resetHash, password, confirmPassword) => {
			try {
				const response = await axiosCall.post(`/auth/reset-password`, {
					resetHash,
					password,
					confirmPassword,
				});
				if (response.status === 200) {
					return formatSuccessResponse({
						data: response,
					});
				}
				return formatErrorResponse("unable to reset password");
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		forgotPassword: async (email) => {
			try {
				const response = await axiosCall.post(`/auth/forgot-password`, {
          email,
				});
				if (response.status === 200) {
					return formatSuccessResponse({
						data: response,
					});
				}
				return formatErrorResponse("Unable to send reset email");
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		loginCall: async (email, password) => {
			try {
				const response = await axiosCall.post(`/auth/login`, {
					email,
					password,
				});
				if (response.status === 200) {
					const user = {
						...response.data.data,
					};
					if (user.token) {
						await authService.setSession(user, user.expiresIn);
						return formatSuccessResponse({
							data: user.token ? user : response.data.data,
						});
					}
					return formatErrorResponse("NO token");
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		loginSso: async (url) => {
      function getJsonFromUrl(url) {
        if(!url) url = location.search;
        var query = url.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
          var item = part.split("=");
          result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
      }
			try {
        let json = getJsonFromUrl(url)
        const token = json.token
        console.debug({token})
        const response = await axiosCall.get(`/auth/sso/tokens?token=${token}`);
        console.debug({response})
				if (response.status === 200) {
					const user = {
						...response.data.data,
					};
					if (user.token) {
						await authService.setSession(user, user.expiresIn);
						return formatSuccessResponse({
							data: user.token ? user : response.data.data,
						});
					}
					return formatErrorResponse("NO token");
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		searchUsers: async (firstName, lastName, email) => {
			try {
				const response = await axiosCall.post(`/search-users`, {
					firstName,
					lastName,
					email,
				});
				if (response.status === 200) {
					//const data = response.data.data;
					//setResults && setResults(data.data)
					return formatSuccessResponse({ data: response.data }); //{ data: response.data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchUsers: async (page = 1, limit = 10, setUsers, setPages) => {
			try {
				const response = await axiosCall.get(`/users?page=${page}&limit=${limit}`);
				if (response.status === 200) {
					const data = response.data.data;
					setUsers && setUsers(data.data);
					setPages && setPages(data.pages);
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchUserCount: async (setCount) => {
			try {
				const response = await axiosCall.get(`/count/users`);
				if (response.status === 200) {
					const data = response.data.data;
					setCount && setCount(data.data);
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchLocalityCount: async (setCount) => {
			try {
				const response = await axiosCall.get(`/count/localities`);
				if (response.status === 200) {
					const data = response.data.data;
					setCount && setCount(data.data);
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchIncidentCount: async (setCount) => {
			try {
				const response = await axiosCall.get(`/count/incidents`);
				if (response.status === 200) {
					const data = response.data.data;
					setCount && setCount(data.data);
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchUserById: async (Id) => {
			try {
				const response = await axiosCall.get(`/users/${Id}`);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		createNewUser: async (firstName, lastName, email, phoneNumber, role, password) => {
			try {
				const response = await axiosCall.post(`/users/`, {
					firstName,
					lastName,
					email,
					phoneNumber,
					role,
					password,
				});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		updateUserData: async (id, payload) => {
			const { firstName, lastName, phoneNumber, role } = payload;
			try {
				const response = await axiosCall.patch(`/users/${id}`, {
					firstName,
					lastName,
					phoneNumber,
				});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchLocalities: async (page = 1, limit = 10) => {
			try {
				const response = await axiosCall.get(`/localities?page=${page}&limit=${limit}`);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchLocalityById: async (Id) => {
			try {
				const response = await axiosCall.get(`/localities/${Id}`);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchUserLocalities: async (id, page = 1, limit = 10) => {
			try {
				const response = await axiosCall.get(
					`/localities/for-user/${id}?page=${page}&limit=${limit}`
				);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		createNewLocality: async (name, state, longitude, latitude) => {
			try {
				const response = await axiosCall.post(`/localities`, {
					name,
					state,
					longitude,
					latitude,
				});
				const data = response.data.data;
				return formatSuccessResponse({ data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		updateNewLocality: async (id, data) => {
			const {
				name,
				state,
				longitude,
				latitude,
				subscriber_only_comments,
				facebook_graph_token,
				twitter_access_token,
				twitter_access_token_secret,
				twitter_api_key,
				twitter_api_secret,
        twitter_bearer_token,
        twitter_page_name,
				news_rss_feed_url,
			} = data;
			try {
				const response = await axiosCall.patch(`/localities/${id}`, {
					name,
					state,
					longitude: String(longitude),
					latitude: String(latitude),
					subscriber_only_comments,
					facebook_graph_token,
					twitter_access_token,
					twitter_access_token_secret,
					twitter_api_key,
					twitter_api_secret,
          twitter_page_name,
          twitter_bearer_token,
					news_rss_feed_url,
				});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchLocalityUsers: async (id, page = 1, limit = 10, setUsers, setPages) => {
			try {
				const response = await axiosCall.get(
					`/localities/${id}/admins?page=${page}&limit=${limit}`
				);
				if (response.status === 200) {
					const data = response.data.data;
					setUsers && setUsers(data.data);
					setPages && setPages(data.pages);
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchLocalityPushSetup: async (localityId) => {
			try {
				const response = await axiosCall.get(
					`/localities/${localityId}/push-setup`
				);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		addAdmintoLocality: async (id, data) => {
			const { email, role } = data;
			try {
				const response = await axiosCall.post(`/localities/${id}/admins`, {
					email,
				});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		removeAdmintoLocality: async (id, email) => {
			try {
				const response = await axiosCall.delete(`/localities/${id}/admins/${email}`);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchIncidentComments: async (incidentId, page = 1, limit = 10) => {
			try {
				const response = await axiosCall.get(`/comments/${incidentId}`);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchIncidents: async (locality = null, page = 1, limit = 10) => {
			try {
				const response = await axiosCall.get(
					`/incidents?page=${page}&limit=${limit}${
						locality ? "&locality=" + locality : ""
					}`
				);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchSingleIncident: async (id) => {
			try {
				const response = await axiosCall.get(`/incidents/${id}`);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		deleteComment: async (id) => {
			try {
				const response = await axiosCall.delete(`/comments/${id}`, {});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		createNewIncidentComment: async (data) => {
			const { comment, incident_id } = data;
			try {
				const response = await axiosCall.post(`/comments`, {
					comment,
					incident_id,
				});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		createNewIncident: async (data) => {
			console.log("sdsdsd", data);
			const {
				locality,
				sub_locality,
				address,
				longitude,
				latitude,
				responding_units,
				featured,
				send_push_notification,
				field1_value,
				field2_value,
				field3_value,
				field4_value,
				field5_value,
        facebook_pages,
        twitter,
			} = data;
			try {
				const payload = {
					locality,
					sub_locality: String(sub_locality),
					address: data.street,
					longitude,
					latitude,
					responding_units,
					featured,
					send_push_notification,
					field1_value,
					field2_value,
					field3_value,
					field4_value,
					field5_value,
          facebook_pages,
          twitter,
				};
				console.log("payload: ", payload);
				const response = await axiosCall.post(`/incidents`, payload);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				console.log("ERROR: " + error)
				return formatErrorResponse(error);
			}
		},
		updateIncident: async (id, data) => {
			const {
				locality,
				sub_locality,
				address,
				longitude,
				latitude,
				responding_units,
				featured,
				send_push_notification,
				field1_value,
				field2_value,
				field3_value,
				field4_value,
				field5_value,
        facebook_pages,
        twitter,
			} = data;
			try {
				const response = await axiosCall.patch(`/incidents/${id}`, {
					locality: String(locality),
					sub_locality: String(sub_locality),
					send_push_notification,
					address,
					longitude,
					latitude,
					responding_units,
					featured,
					field1_value,
					field2_value,
					field3_value,
					field4_value,
					field5_value,
          facebook_pages,
          twitter,
				});
				console.log(response);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		deleteIncident: async (id) => {
			try {
				const response = await axiosCall.delete(`/incidents/${id}`);
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchAdminLocality: async (email) => {
			try {
				const response = await axiosCall.get(`/localities/${email}/for-admins`);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchLocalityDefinitions: async (id) => {
			try {
				const response = await axiosCall.get(`/localities/${id}/incident-definitions`);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		updateLocalityDefinitions: async (id, data) => {
			const { field1_name, field2_name, field3_name, field4_name, field5_name } = data;
			try {
				const response = await axiosCall.post(`/localities/${id}/incident-definitions`, {
					field1_name,
					field2_name,
					field3_name,
					field4_name,
					field5_name,
				});
				if (response.status === 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data.data.token });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},

		logoutUser: async () => {
			Cookie.remove(config.userKey);
			return window.location.replace("/auth/login");
		},
		fetchPrefilledFieldOptions: async (locality = null, page = 1, limit = 10) => {
			try {
				const response = await axiosCall.get(
					`/prefilled-field-option?page=${page}&limit=${limit}${
						locality ? "&locality=" + locality : ""
					}`
				);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
		fetchPrefilledLocalityUnits: async (locality = null, page = 1, limit = 10) => {
			try {
				const response = await axiosCall.get(
					`/prefilled-locality-unit?page=${page}&limit=${limit}${
						locality ? "&locality=" + locality : ""
					}`
				);
				if (response.status == 200) {
					const data = response.data.data;
					return formatSuccessResponse({ data });
				}
				return formatSuccessResponse({ data: response.data });
			} catch (error) {
				return formatErrorResponse(error);
			}
		},
	};

	const authServiceValue = useMemo(() => authService, []);

	return (
		<AuthContext.Provider
			value={{
				userProfile,
				...authServiceValue,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
};
