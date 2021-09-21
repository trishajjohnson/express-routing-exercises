const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const {getMean, getMedian, getMode} = require('./math');


app.get('/mean', (req, res, next) => {
    try {
        if(!req.query.nums) {
            throw new ExpressError('Nums are required', 400);
        }

        let nums = req.query.nums.split(',');
        
        for(let i in nums){  
            if(Number.isNaN(Number(nums[i]))) {
                throw new ExpressError(`${nums[i]} is not a number`, 400)
            }
        }
        
        const mean = getMean(nums);

        return res.json({
            response: {
                operation: 'mean',
                value: mean
            }
        });
    }
    catch (err) {
        return next(err);
    }
});


app.get('/median', (req, res, next) => {
    try {
        let nums = req.query.nums.split(',');
        nums.sort((a, b) => {return a - b});

        if(!req.query.nums) {
            throw new ExpressError('Nums are required', 400);
        }
        
        for(let i in nums){  
            if(Number.isNaN(Number(nums[i]))) {
                throw new ExpressError(`${nums[i]} is not a number`, 400)
            }
        }
        
        const median = getMedian(nums);
        
        return res.json({
            response: { 
                operation: 'median',
                value: median
            }
        });       
    }
    catch (err) {
        return next(err);
    }
});


app.get('/mode', (req, res, next) => {
    try {

        if(!req.query.nums) {
            throw new ExpressError('Nums are required', 400);
        }
        
        let nums = req.query.nums.split(',');
        
        for(i in nums) {
            if(Number.isNaN(Number(nums[i]))) {
                throw new ExpressError(`${nums[i]} is not a number`, 400)
            }
        }

        const mode = getMode(nums);

        return res.json({ 
            response: {
                operation: 'mode',
                value: mode
            }
        });
    }
    catch (err) {
        return next(err);
    }
});


app.use(function(error, req, res, next) {
    
    let status = error.status || 500;
    let message = error.message;

    return res.status(status).json({
        error: {message, status}
    });

});


app.listen(3000, () => {
    console.log("App running on port 3000");
});
