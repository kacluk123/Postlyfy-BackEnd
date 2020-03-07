import * as React from 'react';
import * as Styled from './SinglePostFilterStyles';
import * as Types from './SinglePostFilterTypes';

const SinglePostFilter = ({
  filterText,
  icon,
  onFilterClick,
  isFilterActive
}: Types.ISinglePostFilter) => {
  return (
    <Styled.SinglePostFilter
      onClick={onFilterClick}
      isFilterActive={isFilterActive}
    >
      <Styled.PostFilterContent>
        <Styled.PostFilterText>
          {filterText}
        </Styled.PostFilterText>
        <Styled.PostFilterIconContainer>
          {icon}
        </Styled.PostFilterIconContainer>
      </Styled.PostFilterContent>
    </Styled.SinglePostFilter>
  );
};

export default SinglePostFilter;