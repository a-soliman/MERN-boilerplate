/*
    @method     isEmpty
    @desc       Checks if a given value(string, undefined, null or object) is empty
    @input      Value(string, undefined, null or object)
    @output     Boolean
*/

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

export default isEmpty;
