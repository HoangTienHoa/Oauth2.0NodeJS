require('dotenv').config();
const axios = require('axios');
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session');

const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const DATA = [{email:"ht.hoa.0603@gmail.com", password:"H@@ngTienH@@hhoang23820976"}]

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'sdakljAkdjhh23LahW23jjqlNNdbqkqncrytppcnvg&^jhw'
}));

// Add this line below
const jwt = require('jsonwebtoken')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = process.env.APPLICATION_SECRET;



passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT BASED  VALIDATION GETTING CALLED")
    console.log("JWT", jwt_payload)
    if (CheckUser(jwt_payload.data)) {
        return done(null, jwt_payload.data)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, callback) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return callback(null, profile)
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/facebookRedirect", // relative or absolute path
    profileFields: ['id', 'displayName', 'email', 'picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
    console.log('I should have jack ')
    cb(null, user);
});
  
  passport.deserializeUser(function(obj, cb) {
    console.log('I wont have jack shit')
    cb(null, obj);
});

app.get('/', (req, res)=>{
    res.sendFile('home.ejs', {root: __dirname+'/public'})
})

app.get('/login', (req, res)=>{
    res.sendFile('login.ejs', {root: __dirname+'/public'})
})

app.get('/auth/email', (req, res)=>{
    res.sendFile('login_formlogin_form.ejs',  {root: __dirname+'/public'})
})

app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))
app.get('/auth/facebook',  passport.authenticate('facebook', {scope:'email'}))

app.post('/auth/email', (req, res)=>{
   
    if(CheckUser(req.body))
    {
        let token =    jwt.sign({
            data: req.body
            }, process.env.APPLICATION_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token)
        res.send(`Log in success ${req.body.email}`)
    }else{
        res.send('Invalid login credentials')
    }
})

app.get('/profile', passport.authenticate('jwt', { session: false }) ,(req,res)=>{
    res.send(`THIS IS UR PROFILE MAAANNNN ${req.user.email}`)
})

app.get('/auth/google/callback', passport.authenticate('google'),(req, res)=>{
    console.log('redirected', req.user)
    let user = {
        displayName: req.user.displayName,
        name: req.user.name.givenName,
        email: req.user._json.email,
        provider: req.user.provider }
    console.log(user)

    FindOrCreate(user)
    let token = jwt.sign({
        data: user
        }, process.env.APPLICATION_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token)
    res.redirect('/')
})
app.get('/facebookRedirect', passport.authenticate('facebook', {scope: 'email'}),(req, res)=>{
    console.log('redirected', req.user)
    let user = {
        displayName: req.user.displayName,
        name: req.user._json.name,
        email: req.user._json.email,
        provider: req.user.provider }
    console.log(user)  

    FindOrCreate(user)
    let token = jwt.sign({
        data: user
        }, process.env.APPLICATION_SECRET, { expiresIn: 60 });
    res.cookie('jwt', token)
    res.redirect('/')
})

function FindOrCreate(user){
    if(CheckUser(user)){  // if user exists then return user
        return user
    }else{
        DATA.push(user) // else create a new user
    }
}
function CheckUser(input){
    console.log(DATA)
    console.log(input)
  
    for (var i in DATA) {
        if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
        {
            console.log('User found in DATA')
            return true
        }
        else
         null
            //console.log('no match')
      }
    return false
}

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
    console.log(body);
    const opts = { headers: { accept: 'application/json' } };
    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            // eslint-disable-next-line no-console
            console.log('My token:', token);
            res.redirect(`/profile`);
        })
        .catch((err) => res.status(500).json({ err: err.message }));
});


const port = process.env.PORT || 3000
app.listen( port, ()=>{
    console.log(`Sever listening on port ${port}`)
})