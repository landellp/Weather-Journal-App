/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '1800e4c6bca33290a57acf12e6b45b00';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

// Event Listener for button click and run scrapeData async function
document.getElementById('generate').addEventListener('click', scrapeData);

// Function will scrape data from zip and feeling fields and run Weather API
async function scrapeData(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  // fetch weather API
  let res = await fetch(baseURL + zip + '&appid=' + apiKey + '&units=imperial');
  try {
    // creates data object with json response
    let data = await res.json();
    // adds feelings and date to data object
    data.feelings = feelings;
    data.date = newDate;
    await postData('/POST', data);
    updateUI();
  } catch (error) {
    console.error('error', error);
  }
};

// function to run GET API and update HTML with information from the projectData object
const updateUI = async function() {
  let projectData = await getData('/GET');
  document.getElementById('date').innerHTML = `<ul><li>Date: ${projectData.date}</li></ul>`;
  document.getElementById('temp').innerHTML = `<ul><li>Temperature: ${projectData.temperature}</li></ul>`;
  document.getElementById('content').innerHTML = `<ul><li>Journal Entry: ${projectData.feelings}</li></ul>`;
};

// Client Side GET API
const getData = async function(url = ''){
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// CLient Side POST API
const postData = async function(url = '', data = {}){
  let res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(data)
  });
};
