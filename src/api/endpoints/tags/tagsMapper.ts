import * as Types from "./tagsTypes";

export const tagsUnpacker = (
  payload: Types.ServerResponseTags
): Types.UIResponseTags => ({
  isError: payload.isError,
  tags: payload.tags.map((tag: Types.ServerResponseSingleTag) =>
    singleTagUnpacker(tag)
  )
});

export const singleTagUnpacker = (
  tag: Types.ServerResponseSingleTag
): Types.UIResponseSingleTag => ({
  tagName: tag._id,
  count: tag.count
});
