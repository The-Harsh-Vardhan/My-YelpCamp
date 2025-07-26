//Basically we return a Function that accepts a function and then it executes that function, 
//but it catches any errors and passes it to next

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}