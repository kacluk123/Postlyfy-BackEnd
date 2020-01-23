"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidDate(date) {
    return date.getTime() === date.getTime();
}
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
        const newMatch = this._match.map((match) => {
            const [key, value] = Object.entries(match)[0];
            if (typeof value === 'object') {
                const [operatorObjectkey, operatorObjectvalue] = Object.entries(value)[0];
                const date = new Date(operatorObjectvalue);
                return {
                    [key]: {
                        [operatorObjectkey]: isValidDate(date) ? date : operatorObjectvalue
                    }
                };
            }
            return match;
        });
        console.log(newMatch);
        const [matchFilter] = newMatch;
        if (newMatch) {
            return {
                $match: newMatch.length > 1
                    ? { $and: newMatch }
                    : matchFilter,
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