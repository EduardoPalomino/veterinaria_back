import cors_proxy from 'cors-anywhere';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Permitir todas las solicitudes
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log(`CORS Anywhere server is running on ${host}:${port}`);
});
