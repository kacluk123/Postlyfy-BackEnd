import { check, ValidationChain } from "express-validator";

const checkForTags = async (value: string[], { req }) => {
  if (!Array.isArray(value)) {
    return Promise.reject("Must be an array!");
  }
};

export const createPost: ValidationChain[] = [
  check("post")
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("must be at least 10 chars long"),
  check("tags")
    .not()
    .isEmpty()
    .isLength({ min: 1 })
    .withMessage("Must contains at least one tag")
    .custom(checkForTags)
];
