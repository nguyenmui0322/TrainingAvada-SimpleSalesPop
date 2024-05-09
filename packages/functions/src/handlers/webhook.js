import App from 'koa';
import router from '../routes/webhook';
import * as errorService from '../services/errorService.js';

const api = new App();
api.proxy = true;

api.use(router.allowedMethods());
api.use(router.routes());

api.on('error', errorService.handleError);

export default api;
