/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
//import React from "react";
import Router from "next/router";
import nextCookie from "next-cookies";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import config from "../../config";

const dashboard = "/"; // Define your login route address.

const withPublicRoute = (WrappedComponent, validateAuth = false) => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

	hocComponent.getInitialProps = async (context) => {
		const key = config.userKey;
		const cookie = nextCookie(context);
		const user = cookie[key];

		if (validateAuth) {
			// Are you an authorized user or not?
			if (user?.token) {
				// Handle server-side and client-side rendering.
				if (context.res) {
					context.res?.writeHead(302, {
						Location: dashboard,
					});
					context.res?.end();
				} else {
					Router.replace(dashboard);
				}
			} else if (WrappedComponent.getInitialProps) {
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

export default withPublicRoute;
