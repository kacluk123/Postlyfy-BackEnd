"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkSortIsDescending = (prev, curr) => {
    let sortValue = curr;
    const isDescending = curr.startsWith("-");
    if (isDescending) {
        sortValue = sortValue.substring(1);
    }
    return Object.assign({}, prev, { [sortValue]: isDescending ? -1 : 1 });
};
const convertSortArrayToMongoSort = (sortArray) => (sortArray.reduce(checkSortIsDescending, {}));
class Sorting {
    constructor(sorting) {
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
exports.Sorting = Sorting;
//# sourceMappingURL=createSort.js.map