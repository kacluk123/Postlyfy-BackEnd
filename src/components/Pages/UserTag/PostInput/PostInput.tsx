import * as React from "react";
import * as Styled from "./PostInputStyles";
import * as Types from "./PostInputTypes";
import * as API from "../../../../api/endpoints/posts/posts";
import useForm from "../../../../hooks/useForm";
import StandardTextArea from "../../../Common/StandardTextArea";
import PostInputActions from "./PostInputActions";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from '../../../../redux/actions/postActions';
import { getUser, isAuth } from '../../../../redux/reducers/userReducer';
import { changeAllSorting } from '../../../../redux/actions/postsFiltersActions';
import { getSortingType } from '../../../../redux/reducers/postsFilterReducer';

const hashTagsDirty = (value: string): RegExpMatchArray | [] => {
  const hashtagRegexp = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  const hashTagArray = value.match(hashtagRegexp);

  return hashTagArray ? hashTagArray : [];
};

const deleteWhiteSpace = (arrayToRemoveWhiteSpaces: string[]): string[] =>
  arrayToRemoveWhiteSpaces.map((arrayItem: string) => arrayItem.trimLeft());

const getHashTags = (post: string): string[] =>
  deleteWhiteSpace(hashTagsDirty(post));

const PostInput = ({ tag }: Types.PostInput) => {
  const user = useSelector(getUser);
  const isUserAuth = useSelector(isAuth);
  const sortingType = useSelector(getSortingType);
  const dispatch = useDispatch();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const {
    formValues,
    handleChangeFormValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      postInput: `
#${tag}
      `
    },
    validationRules: {
      postInput: {
        required: true,
        minLength: 6
      }
    }
  }, [tag]);

  React.useEffect(() => {
    textAreaRef.current?.focus();
  }, [tag]);

  const addPost = async () => {
    if (user) {
      const post = await API.addPosts({
        postContent: formValues.postInput,
        tags: getHashTags(formValues.postInput)
      }, tag);

      if (sortingType !== 'newest') {
        dispatch(
          changeAllSorting({
            sort: ['-addedAt'],
            match: [
              {
                tags: tag
              }
            ],
            sortingType: 'newest',
          })
        );
      }

      const updatedPost = {
        ...post,
        author: user?.name,
        userPicture: user?.userPicture,
      };
      dispatch(addNewPost(updatedPost));
    }
  };
  
  return (
    <Styled.PostInput>
      <StandardTextArea
        name="postInput"
        value={formValues.postInput}
        onChange={handleChangeFormValues}
        textAreaRef={textAreaRef}
      />
      <PostInputActions
        postInputValue={formValues.postInput}
        isSendPostButtonDisabled={!isUserAuth || isButtonDisabled}
        onSendPostButtonClick={onButtonClick(addPost)}
      />
    </Styled.PostInput>
  );
};

export default PostInput;
