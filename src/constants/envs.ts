const envs = {
  REDIRECT_IF_ROUTE_NOT_EXISTS: import.meta.env.VITE_REDIRECT_IF_ROUTE_NOT_EXISTS === "true",
  TEMPLATE_API_URL: import.meta.env.VITE_TEMPLATE_API_URL,
} as const;

export default envs;
