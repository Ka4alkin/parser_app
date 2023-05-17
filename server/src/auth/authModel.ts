import * as z from 'zod';


import { db } from '../db';

import { string } from 'zod';

export const User = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  roles: z.array(string()).default(['USER']),
});

export type User = z.infer<typeof User>;
export const Users = db.collection<User>('user');


