"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sorting {
    constructor(sorting) {
        this._sort = sorting.sort ? sorting.sort : null;
        this._match = sorting.match ? sorting.match : null;
    }
    get sort() {
        if (this._sort) {
            let sortValue = this._sort;
            const isSortValueStartsWithMinus = this._sort.startsWith("-");
            if (isSortValueStartsWithMinus) {
                sortValue = sortValue.substring(1);
            }
            return {
                $sort: {
                    [sortValue]: isSortValueStartsWithMinus ? -1 : 1,
                },
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