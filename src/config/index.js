const config = {
	production: process.env.NEXT_PUBLIC_IS_PROD,
	userKey: process.env.NEXT_PUBLIC_USER_KEY,
	API_URL:process.env.NEXT_PUBLIC_API_URL,
	PROXY_API: process.env.NEXT_PUBLIC_PROXY_API == "true",
	MAP_API: process.env.NEXT_PUBLIC_MAP_API,
  DOMAIN: process.env.DOMAIN,
};

export default config;
