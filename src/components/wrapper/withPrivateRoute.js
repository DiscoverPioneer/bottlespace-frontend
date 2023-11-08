/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import Router from "next/router";
import nextCookie from "next-cookies";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import config from "config";

const login = "/auth/login"; // Define your login route address.

const withPrivateRoute = (WrappedComponent, isPublic = false) => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

	hocComponent.getInitialProps = async (context) => {
		const key = config.userKey;
		const cookie = nextCookie(context);
		const user = cookie[key];

		if (!isPublic) {
			// Are you an authorized user or not?
			if (!user?.token) {
				// Handle server-side and client-side rendering.
				if (context.res) {
					context.res?.writeHead(302, {
						Location: login,
					});
					context.res?.end();
				} else {
					Router.replace(login);
				}
			} else if (WrappedComponent.getInitialProps) {
				// check for page permissions
				console.log(user)
				const wrappedProps = await WrappedComponent.getInitialProps({
					...context,
					auth: user,
				});
				return { ...wrappedProps, user };
			}
		}
		return { user };
	};

	return hocComponent;
};

export default withPrivateRoute;
