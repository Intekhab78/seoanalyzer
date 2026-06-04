const RENDER_URL = 'https://seoapi.jtsonline.shop';
const LOCAL_PORT = '5000';

export let API_BASE_URL = RENDER_URL;

// if (typeof window !== 'undefined') {
//     // If accessing via localhost or local network IP, point to the local backend
//     if (window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168.')) {
//         API_BASE_URL = `http://${window.location.hostname}:${LOCAL_PORT}`;
//         console.log('[Config] Running locally – using backend:', API_BASE_URL);
//     }
// }
