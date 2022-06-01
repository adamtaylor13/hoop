/**
 * TODO: Explain what deflatten does
 */

export function deflatten(labels: string[], maxWidth: number) {
    const maxRows = Math.ceil(Math.max(labels.length / maxWidth));

    const multiDimensionalArray = [];
    const numInnerArrays = Math.floor(labels.length / maxWidth);
    for (let i = 0; i < numInnerArrays; i++) {
        let innerArr = [];
        for (let j = i; j < labels.length; j += maxRows) {
            innerArr.push(labels[j]);
        }
        multiDimensionalArray[i] = innerArr;
    }

    return multiDimensionalArray;
}
