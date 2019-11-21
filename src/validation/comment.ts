import { check, ValidationChain } from "express-validator";

export const createComment: ValidationChain[] = [
  check("comment")
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("must be at least 10 chars long")
];
