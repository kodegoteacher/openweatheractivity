const apiKey = "";
const city = "Baguio";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

axios.get(url).then((response) => {
  console.log(response.data);
  
}).catch((error) => {
  console.error(error);
})