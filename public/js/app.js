//it is client side 
console.log("It is client side javascript file is loaded");

fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data);
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageone  = document.querySelector('#mess1');
const messagetwo = document.querySelector('#mess2');
// fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk,&appid=132cdced319af009f4ad6d49cef24938').then( (response) =>{
//     response.json().then( ( data) => {
//         console.log(data.main.temp);
//     })
// })

const getWeather = function(address){
    fetch('http://localhost:3000/weather?address='+ address).then((response) =>{
        response.json().then( (data) =>{
            if(data.error) {
                messageone.textContent = data.error;
            }
            else{
                messageone.textContent = data.info.location;
                messagetwo.textContent = data.info.data;
                console.log(data.info.location);
                console.log(data.info.data);

                
            }
        })
    })
}



weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();


    const location = search.value;
    messageone.textContent = 'Loading..'
    getWeather(location);
})