import { Hono } from 'hono';
import {
  handleCreateLink,
  handleFetchLink,
  handleFetchMyLinks,
  handleFlushLinks,
  handleUpdateLink,
} from '../controllers/links-controller';

const linkRouter = new Hono();

linkRouter.get('/me', handleFetchMyLinks);
linkRouter.get('/:shortCode', handleFetchLink);

linkRouter.post('/', handleCreateLink);

linkRouter.put('/', handleUpdateLink);
linkRouter.put('/flush', handleFlushLinks);

export default linkRouter;
