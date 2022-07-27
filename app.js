const express= require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// uttils
const {randId} = require('./utils/rand');

// connection mongodb
require('./utils/connection');
const {Note,User} = require('./utils/model');
const { ObjectId } = require('bson')

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res,next) => {
    res.render('home',{title:'home'})
})

app.get('/login',(req,res) => {
    res.render('login',{title:'login',msg:''});
})

app.post('/login',async (req,res) => {
    const {username,password} = req.body
    const user = await User.find({username:username,password:password});
    // cek apakah user sudah ada 
    if(user.length !== 0) {
        const secret = randId(12)
        await User.updateOne({username:username},{$set:{secret}})
        res.cookie('secret',secret);
        res.redirect('/note')
    }
    res.render('login',{title:'login',msg:'wrong username and password',alert:'danger'})
})

app.get('/register',(req,res) => {
    res.render('register',{title:'register',msg:''});
})

app.post('/register',async (req,res) => {
    const {username,password} = req.body;
    const user = await User.find({username:username});

    // user tidak ada maka buat 
    if (user.length == 0){
        await User.create({username:username,password:password,secret:''});
        res.render('login',{title:'login',msg:'your account has been created',alert:'success'});
    }else{
        res.render('register',{title:'register',msg:'username exist',alert:'danger'});
    }

})

// note router
app.get('/note',async(req,res) => {
    const user = await User.find({secret:req.cookies.secret});
    if (req.cookies.secret !== undefined && user.length !== 0){
        const notes = await Note.find({user:user[0].username});
        notes.reverse()
        res.render('note',{title:'note',notes,secret:req.cookies.secret,user:user[0].username});
    }else{
        res.redirect('/login')
    }
})

app.get('/note/delete',async(req,res) => {
    const id = req.query.id;
    const note = Note.deleteOne({_id:ObjectId(id)}).then(result => {
        res.redirect('/note')
    });
})

// bikin dan update note
app.post('/note',async(req,res) => {
    const {id,user,title,text,color} = req.body;
    const note = await Note.find({_id:ObjectId(id)});
    if (note.length == 0){
        // cek isi text
        if (title.length !== 0 || text.length !== 0){
            Note.create(req.body)
            res.redirect('/note')
        }else{
            res.redirect('/note')
        }
    }else{
        Note.updateOne({_id:ObjectId(id)},{
            $set:{
                title:title,text:text
            }
        }
        ).then(result => res.redirect('/note'))
        
    }

})


// user logout
app.get('/logout',(req,res) => {
    User.updateOne({secret:req.query.id},{
        $set:{
            secret:''
        }
    }).then(result => {
        res.clearCookie("secret");
        res.redirect('/login')
    })
})

app.listen(port,() => console.log(`server running on http://localhost:${port}`))