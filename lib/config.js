const getApiBaseUrl = () => {
  // console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
  // console.log('🔍 DEV_API_BASE_URL:', process.env.DEV_API_BASE_URL);
  // console.log('🔍 PROD_API_BASE_URL:', process.env.PROD_API_BASE_URL);

   const url = process.env.NODE_ENV === 'production' 
    ? process.env.PROD_API_BASE_URL 
    : process.env.DEV_API_BASE_URL;
    
  // console.log('🔍 Selected API URL:', url);
  return url;
};
export default getApiBaseUrl;