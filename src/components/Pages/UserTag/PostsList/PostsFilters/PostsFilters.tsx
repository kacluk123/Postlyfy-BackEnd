import * as React from 'react';
import * as Styled from './PostsFiltersStyles';
import * as Types from './PostsFiltersTypes';
import SinglePostFilter from './SinglePostFilter';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssistantIcon from '@material-ui/icons/Assistant';
import { useSelector } from 'react-redux';
import { getSortingType } from '../../../../../redux/reducers/postsFilterReducer';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import usePostsFilter from '../../Common/usePostsFilter';

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const selectDays = {
  day: moment().subtract(1, 'days').toString(),
  sevenDays: moment().subtract(7, 'days').toString(),
  month: moment().subtract(1, 'month').toString(),
  allTime: 'allTime'
};

const PostsFilters = ({}: Types.IPostsFilters) => {
  const sortingType = useSelector(getSortingType);
  const [selectValue, setSelectValue] = React.useState<string>(selectDays.allTime);
  const {
    sortFromNewest,
    sortFromOldest,
    sortByLikes,
    deleteSortingByPostCreateDate,
    sortByPostCreateDate
  } = usePostsFilter();

  const handleSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    const value = event.target.value;
    if (isString(value)) {
      setSelectValue(value);

      if (value === 'allTime') {
        deleteSortingByPostCreateDate();
      } else {
        sortByPostCreateDate(value);
      }
    }
  };

  return (
    <Styled.PostsFilters>
      <SinglePostFilter
        icon={<NewReleasesIcon
          color='disabled'
        />}
        filterText='Newest'
        isFilterActive= {sortingType === 'newest'}
        onFilterClick={sortFromNewest}
      />
      <SinglePostFilter
        icon={<AssistantIcon
          color='disabled'
        />}
        filterText='Oldest'
        isFilterActive= {sortingType === 'oldest'}
        onFilterClick={sortFromOldest}
      />
      <SinglePostFilter
        icon={<FavoriteIcon
          color='disabled'
        />}
        filterText='Most liked'
        onFilterClick={sortByLikes}
        isFilterActive= {sortingType === 'mostLiked'}
      />
       <Select
          value={selectValue}
          onChange={handleSelect}
        >
          <MenuItem value={selectDays.day}>1 day</MenuItem>
          <MenuItem value={selectDays.sevenDays}>7 days</MenuItem>
          <MenuItem value={selectDays.month}>1 Month</MenuItem>
          <MenuItem value={selectDays.allTime}>All time</MenuItem>
        </Select>
    </Styled.PostsFilters>
  );
};

export default PostsFilters;