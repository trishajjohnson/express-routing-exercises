function getMean(numsArr) {
    let total = 0;
    
    numsArr.forEach(n => total += Number(n));
    
    return total / numsArr.length;
}


function getMedian(numsArr) {

    if(numsArr.length % 2 === 0) {
        let firstI = (numsArr.length / 2) - 1;
        let secondI = numsArr.length / 2;
        let numMedian = (Number(numsArr[firstI]) + Number(numsArr[secondI])) / 2;

        return numMedian;
    }
    else {
        let i = Math.floor(numsArr.length / 2)
        let numMedian = Number(numsArr[i]);

        return numMedian;
    }
}


function getMode(numsArr) {
    let obj = {};

    for(let num in numsArr){
        if(obj[(numsArr[num])]) {
            obj[(numsArr[num])] += 1;
        }
        else {
            obj[(numsArr[num])] = 1;
        }
    }
    
    let maxValue = 0;
    let maxKey;

    for(let key in obj) {
        const value = obj[key];

        if(value > maxValue) {
            maxValue = value;
            maxKey = key
        }
    }

    if(maxValue === 1) {
        
        return "There is no mode";
    }
    else {
        
        return Number(maxKey);
    }
}


module.exports = {getMean, getMedian, getMode};