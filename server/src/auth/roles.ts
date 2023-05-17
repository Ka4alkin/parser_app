import * as z from 'zod';
import { db } from '../db';

export const Role = z.object({
  value:z.string().default('USER'),
});

export type Role = z.infer<typeof Role>;
export const Roles = db.collection<Role>('roles');


