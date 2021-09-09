/* Global Variables */
const generate = document.querySelector('#generate');
const apiKey="be2d62fda2ed5a63e4627a1ecb79faf3";
let temp ,feelings,zipCode;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1) +'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
generate.addEventListener("click",action);


/* Function called by event listener */
function action(e){    
    e.preventDefault();
    feelings = document.querySelector("#feelings").value;
    zipCode = document.querySelector("#zip").value;
    getTemp()
    .then(postData('/postData', {date :newDate, temp: temp , feelings : feelings})
          .then(updateUI()));
                          }

/* Function to GET Web API Data*/
const getTemp = async ()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    const response = await fetch(url)
    .then(response => response.json())
    .catch(error => {console.log('Error:', error)});
    temp = response.main.temp;
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          date : newDate,
          temp : temp,
          feelings : feelings,
        }), 
      })
      .then(response => response.json())
      .catch(error => {console.log('Error:', error)});
  }


/* Function to GET Project Data and update UI*/
const updateUI = async ()=>{
    console.log('update');
    const response = await fetch('/getData')
    .then(response => response.json())
    .catch(error => {console.log('Error:', error)});
    
    document.querySelector('#date').innerHTML=`date is ${response.date} `;
    document.querySelector('#temp').innerHTML=`current tempreture is ${response.temp} `;
    document.querySelector('#content').innerHTML=`your feelings are ${response.feelings} `;
}