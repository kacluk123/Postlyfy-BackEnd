import { check, ValidationChain } from 'express-validator';
import { getDb } from '../util/database';
import mongodb from 'mongodb';
import bcrypt from 'bcrypt';

const checkForUserDataExist = ({ errorText, body }) =>
  async (value: string, { req }) => {
    const db = getDb();
    const searchedValue = await db.collection('Users').findOne({ [body]: value });

    if (searchedValue) {
        return Promise.reject(errorText);
    }
};

const checkForEmailExist = checkForUserDataExist({
  errorText: 'That email already exist',
  body: 'email'
});

const checkForNameExist = checkForUserDataExist({
  errorText: 'That name already exist',
  body: 'name'
});

export const createUser: ValidationChain[] = [
    check('name')
    .not().isEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .custom(checkForNameExist),
    check('password')
    .not().isEmpty()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long'),
    check('email')
    .isEmail()
    .withMessage('must be a email')
    .custom(checkForEmailExist)
];

export const loginUser: ValidationChain[] = [
    check('name')
    .not().isEmpty(),
    check('password')
    .not().isEmpty()
];
