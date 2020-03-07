import { check, ValidationChain } from "express-validator";

const checkThatEveryArrayItemContainsHashAtStart = (wordsArray: string[]) =>
  wordsArray.some((word: string) => !word.startsWith("#"));

const checkForTags = async (value: string[], { req }) => {
  if (!Array.isArray(value)) {
    return Promise.reject("Must be an array!");
  }
};

const checkForHashtags = async (value: string[], { req }) => {
  if (checkThatEveryArrayItemContainsHashAtStart(value)) {
    return Promise.reject("Not all string are hashtags!");
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
    .custom(checkForHashtags)
];
