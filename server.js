const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();
let maint = false;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    //console.log(req)
    fs.appendFileSync('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to update log')
        }
    });
    next();
});
app.use((req,res,next)=>{
    console.log(maint)
    if(maint){
        res.render('maint.hbs');
    } else {
        next();
    }
});
app.use(express.static(__dirname+'/public'));
// helper functions see footer
hbs.registerHelper('getCurrentYear',() => {
    
        return new Date().getFullYear();
    
    
});
hbs.registerHelper('screemIt',(text)=>{
    return text.toUpperCase();
});

// route to root of server (home page)
app.get('/',(req,res)=>{
    //res.send('<h1>hello express!</h1>');
    res.render('home.hbs',{
        pageTitle:'Home',
        welcomeMessage:'This is my new node website'
    })
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About'
    })
});

app.get('/bad',(req,res)=>{
    let msg = {
        errorMessage:'all is bad!'
    }
    res.send(msg);
    //res.send(msg.errorMessage)
})


app.listen(3000, () => {
    console.log('server is up on port 3000')
});