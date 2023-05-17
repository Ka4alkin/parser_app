import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { PostWithId, Posts, Post } from './postsModel';

export async function findAll(req: Request, res: Response<any>, next: NextFunction) {

  const { pageInfo, filter, sorting, searchStr } = req.body;
  const regex = new RegExp(searchStr, 'i');
  const total = await Posts.find().count();
  let filterOb;

  if (searchStr) {
    filterOb = { ...filter, title: { $regex: regex } };
  } else {
    filterOb = { ...filter };
  }

  try {
    const posts = await Posts.find(filterOb).skip(pageInfo?.pageIndex ?? 0).limit(pageInfo?.pageSize ?? 0).sort(sorting).toArray();
    await res.json({
      itemList: posts,
      pageInfo: { ...req.body.pageInfo, total },
    });
  } catch (error) {
    next(error);
  }
}

export async function createOne(req: Request<{}, PostWithId, Post>, res: Response<PostWithId>, next: NextFunction) {
  try {
    const insertResult = await Posts.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting post.');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request<ParamsWithId, PostWithId, {}>, res: Response<PostWithId>, next: NextFunction) {
  try {
    const result = await Posts.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Post with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(req: Request<ParamsWithId, PostWithId, Post>, res: Response<PostWithId>, next: NextFunction) {
  try {
    const result = await Posts.findOneAndUpdate({
      _id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Post with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
  try {
    const result = await Posts.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result.value) {
      res.status(404);
      throw new Error(`Post with id "${req.params.id}" not found.`);
    }
    res.json({});
  } catch (error) {
    next(error);
  }
}