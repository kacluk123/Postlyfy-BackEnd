import { postsFilterActions, POSTS_FILTER_NAMES } from '../actions/postsFiltersActions';
import { AppState } from '../store';
import { createSelector } from 'reselect';

// type logicalSortingOperator = "$gt";

export interface ISingleMatch {
  [k: string]: string | {
    [k in matchOperators]: string
  };
}

type matchOperators = "$gt";

export type matchWithOperator = {
  [k in matchOperators]: ISingleMatch[]
};

interface InitialStateType {
  readonly sortingType: string;
  readonly sort: null | string[];
  readonly match: ISingleMatch[] | null;
}

const initialState: InitialStateType = {
  sort: null,
  match: null,
  sortingType: 'Newest'
};

export function postFiltersReducer(
  state: InitialStateType = initialState,
  action: postsFilterActions
) {
  switch (action.type) {
    case POSTS_FILTER_NAMES.CHANGE_SORTING: {
      return {
        ...state,
        sort: action.sorting.sort,
        sortingType: action.sorting.sortingType
      };
    }

    case POSTS_FILTER_NAMES.CHANGE_ALL_SORTING: {
      return {
        ...action.sorting
      };
    }

    case POSTS_FILTER_NAMES.CHANGE_MATCH: {
      return {
        ...state,
        match: changeMatchFilter(state.match, action.match),
      };
    }

    case POSTS_FILTER_NAMES.DELETE_MATCH: {
      return {
        ...state,
        match: [...state.match].filter((singleMatch) => {
          const [key] = Object.entries(singleMatch)[0];

          return key !== action.matchField;
        })
      };
    }

    default: {
      return state;
    }
  }
}

const changeMatchFilter = (matches: ISingleMatch[] | null, actionMatch: ISingleMatch) => {
  if (matches) {
    const [actionMatchKey] = Object.entries(actionMatch)[0];
    const searchedMatch = matches?.find(match => {
      const [matchKey] = Object.entries(match)[0];

      return matchKey === actionMatchKey;
    });

    if (searchedMatch) {
      return matches.map(match => {
        const [matchKey] = Object.entries(match)[0];

        if (actionMatchKey === matchKey) {
          return actionMatch;
        }

        return match;
      });
    }

    return [...matches, actionMatch];
  }

  return null;
};

export const getMatch = (state: AppState) => state.postFiltersReducer.match;
export const getSort = (state: AppState) => state.postFiltersReducer.sort;
export const getSortingType = (state: AppState) => state.postFiltersReducer.sortingType;

export const getSorting = createSelector(
  [ getMatch, getSort ],
  (match: InitialStateType['match'], sort: InitialStateType['sort']) => ({
    match,
    sort,
  })
);