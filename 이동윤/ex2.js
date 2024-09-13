// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    const newArr = [];

    // no end
    if (end === undefined) {
        if (start > 0) {
            end = start;
            start = 1;
        } else if (start < 0) {
            end = -1;
        } else if (start === 0) {
            return [0];
        }
    }

    if (step === 0 || start === end) {
        return [start];
    }

    // exception
    if ((start - end) * step > 0) {
        return [];
    }

    if (start < end) {
        for (let num = start; Number(num.toFixed(1)) <= end; num += step) {
            newArr.push(Number(num.toFixed(1)));
        }
    } else if (start > end) {
        for (let num = start; end <= Number(num.toFixed(1)); num += step) {
            newArr.push(Number(num.toFixed(1)));
        }
    }

    // default rule

    return newArr;
};

module.exports = { range };
