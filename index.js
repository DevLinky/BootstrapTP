const express = require('express'); //Alternative possible: "import express from 'express'""
// const path = require('path');
const ejs = require('ejs');
const app = new express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DevLinky:admin@linkycluster.xalp7.mongodb.net/test',
    { useNewUrlParser: true });
const fileUpload = require('express-fileupload');
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// const BlogPost = require('./models/BlogPost')
const newPostController = require('./controllers/newPost');
const newIndexController = require('./controllers/newIndex');
const newAboutController = require('./controllers/newAbout');

const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');

const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require ('./middleware/authMiddleware');
const expressSession = require('express-session');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash')
app.use(flash());
let port = process.env.PORT;

if (port == null || port == "") {
    port = 4000;
}
app.listen(port, ()=>{
    console.log('App listening...')
});
app.use(expressSession({
    secret: 'Jumpin\' down'
}));
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts/store', authMiddleware, validateMiddleWare);

app.set('view engine', 'ejs') // permet de dire a tous les fichiers .ejs d'etre executer part le module ejs.

app.get('/', homeController)
app.get('/auth/register', redirectIfAuthMiddleware, newUserController)
// app.get('/index', newIndexController)
app.get('/about', newAboutController)
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/posts/new', authMiddleware, newPostController)
app.get('/post/:id', getPostController)
app.get('/auth/login', redirectIfAuthMiddleware, loginController);
app.get('/auth/logout', logoutController)


app.post('/users/login', redirectIfAuthMiddleware, loginUserController)
app.post('/posts/store', storePostController)
app.post('/users/register',redirectIfAuthMiddleware, storeUserController)

global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})

app.use((req, res) => res.render('notFound'))