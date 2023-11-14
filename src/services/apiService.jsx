/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { createContext, useContext, useMemo } from "react";
import Cookie from "js-cookie";
import ApiClient, { axiosAPI } from "./axiosClient";
import PropTypes from "prop-types";
import { formatErrorResponse, formatSuccessResponse } from "../utils";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import config from "../config";

const axiosCall = config.PROXY_API ? axiosAPI : ApiClient;

//const AuthContext = createContext({});

const BASE_URL = "/api/v1";
export const AuthService = {
  GetPresignedURL: async (establishmentId) => {
    try {
      const response = await axiosAPI.get(`/portal/${establishmentId}/presigned/url`);
      if (response.status === 200) {
        const data = response.data.data;
        return formatSuccessResponse({ data });
      }
      return formatSuccessResponse({ data: response.data.data.token });
    } catch (error) {
      return formatErrorResponse(error);
    }
  },
  SetUpdateToken: async (data) => {
    const user = Cookie.get(config.userKey)
      ? JSON.parse(Cookie.get(config.userKey))
      : null;
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
      const response = await axiosCall.post(`${BASE_URL}/auth/reset-password`, {
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
      const response = await axiosCall.post(
        `${BASE_URL}/auth/forgot-password`,
        {
          email,
        }
      );
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
      const response = await axiosCall.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const user = {
          ...response.data.data,
        };
        if (user.token) {
          await AuthService.setSession(user, user.expiresIn);
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
      if (!url) url = window.location.search;
      var query = url.substr(1);
      var result = {};
      query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
      });
      return result;
    }
    try {
      let json = getJsonFromUrl(url);
      const token = json.token;
      console.debug({ token });
      const response = await axiosCall.get(`/auth/sso/tokens?token=${token}`);
      console.debug({ response });
      if (response.status === 200) {
        const user = {
          ...response.data.data,
        };
        if (user.token) {
          await AuthService.setSession(user, user.expiresIn);
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
      const response = await axiosCall.post(`${BASE_URL}/search-users`, {
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
      const response = await axiosCall.get(
        `/users?page=${page}&limit=${limit}`
      );
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
  GetHomeDashboard: async (establishmentId) => {
    try {
      const response = await axiosAPI.get(`/portal/${establishmentId}`);
      if (response.status === 200) {
        const data = response.data.data;
        return formatSuccessResponse({ data });
      }
      return formatSuccessResponse({ data: response.data.data.token });
    } catch (error) {
      return formatErrorResponse(error);
    }
  },
  UploadBusinessPhoto: async (establishmentId,data) => {
    try {
      const response = await axiosAPI.post(`/portal/${establishmentId}/image/upload`, data);
      if (response.status === 200) {
        const responseData = response.data.data;
        return formatSuccessResponse({ data: responseData, });
      }
      return formatSuccessResponse({ data: response.data.data.token });
    } catch (error) {
      return formatErrorResponse(error);
    }
  },
  createNewEstablishment: async (
    establishmentName,
    ownerName,
    email,
    password
  ) => {
    try {
      const response = await axiosCall.post(
        `${BASE_URL}/auth/establishment/register`,
        {
          establishmentName,
          ownerName,
          email,
          password,
        }
      );
      if (response.status === 200) {
        const user = {
          ...response.data.data,
        };
        console.debug({ response, user });
        if (user.token) {
          await AuthService.setSession(user, user.expiresIn);
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
  updateUserData: async (id, payload) => {
    const { firstName, lastName, phoneNumber } = payload;
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
  logoutUser: async () => {
    Cookie.remove(config.userKey);
    return window.location.replace("/auth/login");
  },
  currentUser: Cookie.get(config.userKey)
    ? JSON.parse(Cookie.get(config.userKey))
    : null,
};

//const authServiceValue = useMemo(() => authService, []);

//return (
//	<AuthContext.Provider
//		value={{
//      userProfile: {}, // TODO: FIXME:
//			...authServiceValue,
//		}}
//	>
//		{children}
//	</AuthContext.Provider>
//);
//};

//AuthProvider.propTypes = {
//	children: PropTypes.node,
//};
//
//export const useAuth = () => {
//	const context = useContext(AuthContext);
//	return context;
//};
