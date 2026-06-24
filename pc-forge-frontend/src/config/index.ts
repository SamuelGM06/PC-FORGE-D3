import rawConfig from "./config";
import type { Configuration } from "./configuration";

const env = import.meta.env as Record<string, string | undefined>;
const envApiUrl = env.VITE_API_URL;
const apiUrl = envApiUrl ?? rawConfig.api.url;

export const config: Configuration = {
	...rawConfig,
	api: {
		...rawConfig.api,
		url: apiUrl,
	},
};