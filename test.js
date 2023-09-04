const APIKEY = "key"
const makeOpenWeaterAPICall = async (location) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q${location}&appid=${APIKEY}`
  const response = await fetch(URL);
  const  data = await response.json();
  const { temp, temp_min, temp_max} = data.main
  console.log(data.main.temp)
}