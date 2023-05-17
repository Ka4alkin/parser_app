import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { authMiddleWare, validateRequest } from '../../middlewares';
import * as PostHandlers from './postsHandlers';
import { Post } from './postsModel';

const router = Router();

router.post('/', authMiddleWare, PostHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  PostHandlers.findOne,
);
router.post(
  '/create',
  validateRequest({
    body: Post,
  }),
  PostHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Post,
  }),
  PostHandlers.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  PostHandlers.deleteOne,
);

export default router;
