
type logicalSortingOperator = "$gt";

interface ISingleMatch {
  [k: string]: {
    [k in logicalSortingOperator]: string;
  } | {
    [k: string]: string;
  };
}

type matchOperators = "$or" | "$and";

type matchWithOperator = {
  [k in matchOperators]: ISingleMatch[]
};

export interface ISort {
  sort?: string[];
  match?: matchWithOperator | ISingleMatch;
}

const checkSortIsDescending = (prev: {[k: string]: number}, curr: string) => {
  let sortValue = curr;
  const isDescending = curr.startsWith("-");
  if (isDescending) {
    sortValue = sortValue.substring(1);
  }

  return {
    ...prev,
    [sortValue]: isDescending ? -1 : 1,
  };
};

const convertSortArrayToMongoSort = (sortArray: string[]): {[k: string]: number} => (
  sortArray.reduce(checkSortIsDescending, {})
);

export class Sorting {
  public _sort: string[] | null;
  public _match: matchWithOperator | ISingleMatch | null;

  constructor(sorting: ISort) {
    this._sort = sorting.sort ? sorting.sort : null;
    this._match = sorting.match ? sorting.match : null;
  }

  get sort() {
    if (this._sort) {
      return {
        $sort: convertSortArrayToMongoSort(this._sort),
      };
    }

    return null;
  }

  get match() {
    if (this._match) {
      return {
        $match: this._match,
      };
    }

    return null;
  }

  get allSorting() {
    return [this.match, this.sort].filter(Boolean);
  }

  get isSorting() {
    return this.allSorting.length > 0;
  }
}