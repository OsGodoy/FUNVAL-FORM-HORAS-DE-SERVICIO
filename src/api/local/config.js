const config = {
  apiBaseUrl: import.meta.env.VITE_LOCAL_API_BASE_URL || 'static_json',
  apiTimeout: parseInt(import.meta.env.VITE_LOCAL_API_TIMEOUT) || 8000,
};  
export default config;