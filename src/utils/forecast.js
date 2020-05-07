const request = require('request');

const weather = (location, callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+',&appid=132cdced319af009f4ad6d49cef24938';
    request({ url: url, json: true },(error, response) => {
        //console.log(response);
        
        if(error){
            callback('Invalide location', undefined);
        }
        else{
            callback(undefined, {
                data: response.body.main.temp -273,
                location :response.body.name
            })
        }
       
       
       
    });
   }
   module.exports = weather;