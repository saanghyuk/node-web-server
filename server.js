const express = require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');



// Explore Middleware
app.use((req, res, next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{

    });
    next();
});
//
// app.use((req,res, next)=>{
//    res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

//
// app.use('/user/:id', function (req, res, next) {
//     console.log('Request Type:', req.method);
//     next();
// });


hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});




app.get('/', (req, res)=>{
    // res.send('<h1>Hello, Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website'
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.get('/bad',  (req, res)=>{
   res.send({
       error: 'Error Handling Request'
   })
});


app.get('/project', (req, res)=>{
   res.render('portfolio.hbs', {
       pageTitle: 'Porfolio Page'
   })
});



app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)

});
//
//
// //-------------------
// app.use(function(err, req, res, next) {
//     console.log(err.stack);
//     res.status(500).send('Something broke!');
// });
//
//
// app.listen(3000, ()=>{
//     console.log('Server is up on port 3000')
// });
