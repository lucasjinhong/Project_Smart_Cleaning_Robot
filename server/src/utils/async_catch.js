module.exports = fn => {
    return (req, res, next) => {
        fn (req, res, next).catch(err => res.json(err));
        //fn (req, res, next).catch(err => next(err));
    }
}