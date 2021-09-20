const express = require('express');
const app = express();

app.get('/mean', (req, res) => {
    let nums = req.query.nums.split(',');
    let total = 0;

    for(num in nums){
        total += parseInt(num);
    }

    const mean = {
        response: {
            operation: 'mean',
            value: total / nums.length
        }
    }

    return res.json(mean);
})

app.get('/median/:nums', (req, res) => {

})

app.get('/mode/:nums', (req, res) => {

})


app.listen(3000, () => {
    console.log("App running on port 3000");
})
