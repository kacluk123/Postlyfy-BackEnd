import { ISingleMatch } from '../reducers/postsFilterReducer';

export enum POSTS_FILTER_NAMES {
  CHANGE_SORTING = "CHANGE_SORTING",
  CHANGE_ALL_SORTING = "CHANGE_ALL_SORTING",
  CHANGE_MATCH = "CHANGE_MATCH",
  DELETE_MATCH = "DELETE_MATCH"
}

export interface IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES;
}

export interface IPostsFiltersChangeSorting extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_SORTING;
  sorting: {
    sort: string[],
    sortingType: string,
  };
}

export interface IPostsFiltersChangeMatch extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_MATCH;
  match: ISingleMatch;
}

export interface IPostsFiltersDeleteMatch extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.DELETE_MATCH;
  matchField: string;
}

export interface IPostsFiltersChangeAllSorting extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_ALL_SORTING;
  sorting: {
    sort: string[]
    match: ISingleMatch[]
    sortingType: string;
  };
}

export type postsFilterActions = IPostsFiltersChangeSorting
  | IPostsFiltersChangeAllSorting
  | IPostsFiltersChangeMatch
  | IPostsFiltersDeleteMatch;

export function changeSorting(sorting: {
  sort: string[],
  sortingType: string
}): IPostsFiltersChangeSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_SORTING,
    sorting,
  };
};

export function changeMatch(match: ISingleMatch): IPostsFiltersChangeMatch {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_MATCH,
    match,
  };
};

export function deleteMatch(matchField: string): IPostsFiltersDeleteMatch {
  return {
    type: POSTS_FILTER_NAMES.DELETE_MATCH,
    matchField,
  };
};

export function changeAllSorting(sorting: {
  sort: string[]
  match: ISingleMatch[]
  sortingType: string
}): IPostsFiltersChangeAllSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_ALL_SORTING,
    sorting,
  };
};