var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var mongoo = require('mongoose');
var jwt = require('jsonwebtoken');

mongoo.connect('mongodb://localhost/todo', {useNewUrlParser : true});
mongoo.set('useFindAndModify', false);

mongoo.connection
    .once('open',()=>{
        console.log("connected");
        
    })
    .on('error',(error)=>{
        console.log("youre eror",error);
        
    });

var app = express();
app.use(bodyParser());
app.use(cors());

var Schema = mongoo.Schema;

var userschema = new Schema({
    title: { type : String ,required : true},
    isDone : { type : Boolean ,required : true},
},{collection : 'user-data'});

var UserData = mongoo.model('Userdata', userschema);




app.post('/insert',(req,res)=>{    
    console.log(req.body);
    let data = new UserData(req.body);
    data.save()
        .then(messages =>{
            res.json(messages);
        });
        
});


//          login data db 

var loginschema = new Schema({
    email: { type : String ,required : true},
    password : { type : String ,required : true},
    todos : [userschema]
},{collection : 'login-data'});

var LoginData = mongoo.model('loginData', loginschema);


app.get('/get-data' , (req, res) => {
   
    LoginData.find()
            .then(messages =>{
                res.json(messages);
            });
});



app.post('/login',(req,res)=>{    
    console.log(req.body);
    LoginData.findOne({ "email" : req.body.email, "password" : req.body.password },(error, user)=>{
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send('Invalid email');
            }else 
            if( user.password !== req.body.password ){
                res.status(401).send('invalid password');
            }
            else{
                let payload = { subjet : user._id };
                let token = jwt.sign(payload, 'sevretkey');
                res.status(200).send({token});
            }
        } 
    });
             
             
             
});

app.post('/register',(req,res)=>{  
    let user = req.body;  
    console.log(req.body);
    let user_1 = new LoginData(user);

    user_1.save((error, registredUser) =>{
        if (error){
            console.log(error);
        }
        else{
            let payload = { subjet : registredUser._id  };
            let token = jwt.sign(payload, 'sevretkey');
            res.status(200).send({token});

        }
    });
});

app.post('/update',(req,res)=>{    
    console.log(req.body);
            
    LoginData.findOneAndUpdate({"email" : 'login', "todos.title":  req.body.title  }, { $set :{ "todos.$.isDone" : !req.body.isDone }},function(err,doc) {
    }).then((ress)=>{
        res.json(ress);
    });

            
});

app.post('/addtodo', (req,res) =>{

    let tod = req.body;
    let todo = {
        title : tod.title,
        isDone : false
    };
    
    LoginData.findOneAndUpdate({email : 'login'},{$push :{ todos : todo}},
        ).then((mess)=>{
        res.json(mess);
    });
    console.log("happened)");
    

});

app.get('/getTodos',(req,res) =>{
    LoginData.findOne({ email : 'login'})
            .then((respo)=>{
                res.json(respo.todos);
            });

});

function verifyToken(res, req, next){
    console.log('1------------------------------1');
    
    if(!req.headers.authorization){
        console.log('1------------------------------2');
        return res.status(401).send('unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('unauthorized request');
    }
    try {
        let payload = jwt.verify (token, 'sevretKey')
        req.userId = payload.subject
        next ()

    } catch (err) {
        return res.status (401) .send ('Unauthorized request')

    }
} 


function logger(res, req, next){
    const bearerHeader = req.headers['authorization'];
   console.log(bearerHeader);
   
}

const port = process.env.PORT || 5554;
app.listen(port , ()=>{
    console.log(`listening on ${port}`);
});

module.exports = UserData;


