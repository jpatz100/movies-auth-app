const express = require('express');
const app = express();

const path = require('path')

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SESSION_KEY));

const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authRouter = require('./routes/auth-routes');
app.use('/auth', authRouter);

const authHelpers = require('./services/auth/auth-helpers');
app.use(authHelpers.loginRequired)

const moviesRouter = require('./routes/movies-routes');
app.use('/movies', moviesRouter)

const directorsRouter = require('./routes/directors-routes');
app.use('/directors', directorsRouter)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});