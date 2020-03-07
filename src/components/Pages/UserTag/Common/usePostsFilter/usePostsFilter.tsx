import { useDispatch } from 'react-redux';
import {
  changeSorting,
  changeMatch,
  deleteMatch,
  changeAllSorting
} from '../../../../../redux/actions/postsFiltersActions';

const usePostsFilter = () => {
  const dispatch = useDispatch();

  const sortFromNewest = () => {
    dispatch(changeSorting({
      sort: ['-addedAt'],
      sortingType: 'newest'
    }));
  };

  const sortFromOldest = () => {
    dispatch(changeSorting({
      sort: ['addedAt'],
      sortingType: 'oldest'
    }));
  };

  const sortByLikes = () => {
    dispatch(changeSorting({
      sort: ['-likesCount'],
      sortingType: 'mostLiked'
    }));
  };

  const sortPostInitialByTag = (tag: string) => {
    dispatch(
      changeAllSorting({
        sort: ['-addedAt'],
        match: [{
          tags: tag
        }],
        sortingType: 'newest',
      })
    );
  };

  const sortByPostCreateDate = (value: string) => {
    dispatch(changeMatch({
      addedAt: {
        "$gt": value,
      }
    }));
  };

  const deleteSortingByPostCreateDate = () => {
    dispatch(deleteMatch('addedAt'));
  };

  return {
    sortFromNewest,
    sortFromOldest,
    sortByLikes,
    sortPostInitialByTag,
    sortByPostCreateDate,
    deleteSortingByPostCreateDate
  };
};

export default usePostsFilter;