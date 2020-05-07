const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geoloc');
const weather = require('./utils/forecast');



const app = express();

//define paths for express config
const publicDir=path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
// after getting the path we need to tell the the express where to look at

const partialPath = path.join(__dirname, '../templates/partials');
// Setup static engine and views location
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialPath);
//Setup staic directory to serve
app.use(express.static(publicDir));

app.get('', (req,res) =>{
    res.render('index', {
        title: "Weather app",
        name: "Rohan Thakran"
    });
})

app.get('/help' ,(req,res ) => {
    res.render('help', {
        title: "help me",
        name: "Rohan Thakran"
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: "About ME",
        name : "rohan"
    })
})



app.get('/weather', (req,res) =>{
   if(!req.query.address)
   {
       return res.send( {
           error: "this an error not address"       })
   }
   geocode(req.query.address, (error, data) =>{
        if(error){
            return res.send({error})
        }
        weather(data.location, (error, data)=>{
            if(error) {
                return res.send( {error})
            }
            res.send({

               info: data 
            })
        })
        
   })

//    res.send( {
       
//    })
})

app.get('/help', (req,res) =>{
    res.send([{
        name :"Rohan",
        age: 21
    },{
        name: "Andrew",
        age: 34
    }]);
})

app.get('/product',(req,res) => { 

    if(!req.query.search){
       return res.send( {
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send( {
        product: []
    })
})
app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        name : 'Rohan',
        errorMessage : 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up up on port 3000');
})