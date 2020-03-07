import { check, ValidationChain } from "express-validator";

export const createComment: ValidationChain[] = [
  check("comment")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars long")
];
