"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const home_1 = __importDefault(require("./routes/home"));
const app = (0, express_1.default)();
// error handler function
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const key = Object.keys(err.errors);
        err.status = 422;
        res.locals.error = { status: err.status, message: err.errors[key[0]].message };
    }
    else if (err.code && err.code == 11000) {
        const key = Object.keys(err.keyValue);
        err.status = 409;
        res.locals.error = { status: err.status, message: err.keyValue[key[0]] + " existed" };
    }
    else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    }
    // render the error page
    res.status(err.status || 500);
    res.json(res.locals.error);
    //res.render('error');
};
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/user', user_1.default);
app.use('/home', home_1.default);
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
app.use(errorHandler);
const port = 3000;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map