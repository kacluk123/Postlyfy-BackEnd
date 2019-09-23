import { check, ValidationChain } from 'express-validator'

export const createPost: ValidationChain[] = [
    check('post')
    .not().isEmpty()
    .isLength({ min: 10 })
    .withMessage('must be at least 10 chars long'),
]