const express = require('express');
const app = express();
const ExpressError = require('./expressError');


app.get('/mean', (req, res, next) => {
    try {

        if(!req.query.nums) {
            throw new ExpressError('Nums are required', 400);
        }

        let nums = req.query.nums.split(',');
        let total = 0;
    
        for(let i = 0; i < nums.length; i++){
            
            if(Number.isNaN(parseInt(nums[i]))) {
                throw new ExpressError(`${nums[i]} is not a number`, 400)
            }

            total += parseInt(nums[i]);
        }
    
        return res.json({
            
            response: {
                
                operation: 'mean',
                value: `${total / nums.length}`

            }

        });
    }
    catch (err) {
        return next(err);
    }
});


app.get('/median', (req, res, next) => {
    try {

        if(!req.query.nums) {
            throw new ExpressError('Nums are required', 400);
        }
        
        let nums = req.query.nums.split(',');
        nums.sort((a, b) => {return a - b});
        
        for(let i = 0; i < nums.length; i++){    
            if(Number.isNaN(parseInt(nums[i]))) {
                throw new ExpressError(`${nums[i]} is not a number`, 400)
            }   
        }

        if(nums.length % 2 === 0) {
            let firstIdx = (nums.length / 2) - 1;
            let secondIdx = nums.length / 2;

            let median = (parseInt(nums[firstIdx]) + parseInt(nums[secondIdx])) / 2;

            return res.json({
            
                response: {
                    
                    operation: 'median',
                    value: median
    
                }
    
            });
        }

        let idx = Math.floor(nums.length / 2)
        let median = parseInt(nums[idx]);
        
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
        let obj = {};
    
        for(let i = 0; i < nums.length; i++){
            
            if(Number.isNaN(Number(nums[i]))) {
                throw new ExpressError(`${nums[i]} is not a number`, 400)
            }

            if(obj[(nums[i])]) {
                obj[(nums[i])] += 1;
            }
            else {
                obj[(nums[i])] = 1;
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
            return res.json("There is no mode.");
        }

        return res.json({
            
            response: {
                
                operation: 'mode',
                value: Number(maxKey)

            }

        });
    }
    catch (err) {
        return next(err);
    }
})


app.use(function(error, req, res, next) {
    
    let status = error.status || 500;
    let message = error.message;

    return res.status(status).json({
        error: {message, status}
    });

});


app.listen(3000, () => {
    console.log("App running on port 3000");
})
