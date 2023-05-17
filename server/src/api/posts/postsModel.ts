import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';
import { string } from 'zod';

export const Post = z.object({
  title: z.string().min(3),
  link: z.string().optional(),
  description: z.string().optional(),
  category: z.array(string()).optional(),
  pubDate: z.string().optional(),
  guid: z.string().optional(),
  'dc:creator': z.string().optional(),
  'media:thumbnail': z.string().optional(),
});


export type Post = z.infer<typeof Post>;
export type PostWithId = WithId<Post>;
export const Posts = db.collection<Post>('posts');


