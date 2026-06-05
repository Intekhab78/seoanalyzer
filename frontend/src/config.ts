const RENDER_URL = 'https://seoapi.jtsonline.shop';
const LOCAL_PORT = '5000';

// Use local backend when running frontend locally
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? `http://localhost:${LOCAL_PORT}` 
    : RENDER_URL;
