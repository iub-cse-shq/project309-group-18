var http = require('http')
var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var server = http.Server(app)
const bcrypt = require('bcrypt')
var Profile = require('./profiles.model')

app. use( express . static( 'public' ))

var mongoose = require('mongoose')
mongoose.Promise = global. Promise
var dbURL = 'mongodb+srv://Khalid:kkr2012@cluster0.ba0xx.mongodb.net/CareerBuilder?retryWrites=true&w=majority' //for using Atlas
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.on('error' , function (err) {
console. log(err)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 

app.get('/', function (request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + '/login.html');
 });

app.get('/registration', function (request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + '/registrationType.html');
 });

 app.get('/registrationJs', function (request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + '/registrationJs.html');
 });

 app.get('/registrationEmp', function (request, response) {
    console.log(__dirname);
    response.sendFile(__dirname + '/registrationEmp.html');
 });
 
/*app.post('/profile/new', function (request, response) {
    var newProfile = new Profile(request.body)
    newProfile.save(function (err, data) {
      if (err)
        return response.status(400).json({
          error: 'Information is missing'
        })
      return response.status(200).json({
        message: 'Account created successfully'
      })
    })
   })*/

app.post('/login', (req,res,next) => {
    let userName = req.body.Uname
    let password = req.body.Pass
    let type = req.body.type

    Profile.findOne({userName,type})
        .then(profile => {
            if(profile) {
                bcrypt.compare(password, profile.password, (err, result) => {
                    if(err) {
                        res.json({
                            message: 'Error Occured'
                        })
                    }
                    if(result) {
                        res.json({
                            message: 'Login Successful'   
                        })
                    }
                    else {
                        res.json({
                            message: 'Login Failed. Password not Match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'User not Fund'
                })
            }
        })

})

app.post('/jsregister',(req,res,next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.json({
                error: err
            })
        }
        let profile = new Profile({
            email: req.body.email,
            userName: req.body.userName,
            password: hash,
            type: req.body.type,
            contact: req.body.contact,
            age: req.body.age,
            gender: req.body.gender,
            eduStatus: req.body.eduStatus
        })
        profile.save()
            .then(result => {
                res.status(201).json({
                    message: 'Account created Successfully',
                    profile: result
                })
            })
            .catch(error => {
                res.json({error})
            })
        
    })
    
})

app.get('/login1', function (request, response) {
    console.log("test");
    Profile.find({}, function (err, data) {
      response.render('employerProfile.ejs', {
        profile: data
      })
    })
   })

app.get('/profile/:id', function (request, response) {
    Profile.findById(request.params.id, function (err, data) {
      response.render('employerProfile.ejs', {
        profile: data
      })
    })
 }) 

server.listen(process.env.PORT || 2012,
    process.env.IP || 'localhost', function(){
    console.log('Server running');
})
module.exports = {app, server, mongoose}