require('dotenv').config();
const express = require('express');
const axios = require('axios');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const { v4: uuidv4 } = require('uuid');;
const bodyParser = require('body-parser')

const app = express();
app.set('view engine', 'ejs');

// Start Set up Passport store user as a SESSSION
// Passport will maintain persistent login sessions.
// In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.APPLICATION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
// End Set up Passport store user as a SESSSION
app.use(bodyParser.urlencoded({ extended: false }));
let userProfile = {
    id:"Need Login",
    email:"Need Login",
    displayName:"Need Login"
};

app.get('/', function(req, res) {
    res.render('login');
});
app.get('/success', (req, res) => {
    res.render('success', {user: userProfile});
});
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/auth/email', function(req, res) {
    res.render('login_form');
});

app.post('/auth/email', function(req, res) {
    userProfile = {
        id:uuidv4(),
        email:req.body.email,
        displayName:req.body.displayName
    };
    res.redirect(`/success`);
});

// Start Github Authentication
app.get('/auth/github', (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
});
app.get('/githubRedirect', ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
    };
    console.log("Github Code: "+ code);
    const opts = { headers: { accept: 'application/json' } };
    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            console.log('Github Access token:', token);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get(
                'https://api.github.com/user',
                config
            ).then((profile) => {
                userProfile = {
                    id:profile.data.id,
                    email:"unknown",
                    displayName:profile.data.name
                };
                res.redirect(`/success`);
                })
                .catch((err) => res.status(500).json({ err: err.message }));
        })
        .catch((err) => res.status(500).json({ err: err.message }));
});
// End Github Authentication

// Start Google Authentication
//Set up strategies
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile = {
            id:profile.id,
            email:profile.emails[0].value,
            displayName:profile.displayName
        };
        return done(null, userProfile);
    }
));
//Authenticate Requests
app.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('/success');
    });
// End Google Authentication

// Start Facebook Authentication
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    userProfile = {
        id:profile.id,
        email:"Unknown",
        displayName:profile.displayName
    };
    return done(null, userProfile);
}));

app.get('/auth/facebook',  passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('/success');
    });

// End Facebook Authentication
const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));
