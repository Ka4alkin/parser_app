import { Response, Request, NextFunction } from 'express';
import { Users } from './authModel';
const ObjectID = require('mongodb').ObjectID;
type ObjectID = typeof import('mongodb').ObjectID;
import { Roles } from './roles';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateAccessToken = (id: ObjectID, roles:[]): void => {
  const payLoad = {
    id,
    roles,
  };
  return jwt.sign(payLoad, process.env.SECRET_JWT );
};

export async function registration(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const candidate = await Users.findOne({ username });
    if (candidate) {
      return res.status(400).json({ message: 'User with the same name exist' });
    }
    const hashPassword = bcrypt.hashSync(password, 3);
    const userRole = await Roles.findOne({ value: 'USER' });
    await Users.insertOne({
      username: req.body.username,
      password: hashPassword,
      roles: [userRole!.value],
    });
    res.json('user was successfully registered');
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User with the same name not found' });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Entered invalid password' });
    }
    const token = generateAccessToken(new ObjectID(user._id), user.roles as []);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await Users.find().toArray();
    return  res.json( users);
  } catch (error) {
    next(error);
  }
}

