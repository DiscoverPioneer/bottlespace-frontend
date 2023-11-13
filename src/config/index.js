const config = {
  production: process.env.NEXT_PUBLIC_IS_PROD ?? (window.location.host.match(/ddns.net/gi) === null),
	userKey: process.env.NEXT_PUBLIC_USER_KEY ?? 'userAuthLocator',
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? '/api/v1',
	PROXY_API: String(process.env.NEXT_PUBLIC_PROXY_API) === 'true',
	MAP_API: process.env.NEXT_PUBLIC_MAP_API,
  DOMAIN: process.env.DOMAIN ?? window.location.host ,
};

export default config;
