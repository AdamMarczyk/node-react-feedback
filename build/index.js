"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookie_session_1 = require("cookie-session");
var express = require("express");
var mongoose = require("mongoose");
var passport_1 = require("passport");
var keys_1 = require("./config/keys");
require("./models/Survey");
require("./models/User");
require("./services/passport");
mongoose.Promise = global.Promise;
mongoose.connect(keys_1.default.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var app = express();
app.use(bodyParser.json());
app.use(cookie_session_1.default({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys_1.default.cookieKey]
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    var path_1 = require('path');
    app.get('*', function (req, res) {
        res.sendFile(path_1.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
var PORT = process.env.PORT || 5000;
app.listen(PORT);
//# sourceMappingURL=index.js.map