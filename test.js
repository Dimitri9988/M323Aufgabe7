const APIKEY = "2d464bf44d4394fc4f0edbd100df819a"
const makeOpenWeaterAPICallForTemp = async (location) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
  const response = await fetch(URL);
  const  data = await response.json();
  const {temp} = data.main.temp
  console.log(data.main.temp);
  return data.main.temp;

}


makeOpenWeaterAPICallForTemp("bern")
const test = makeOpenWeaterAPICallForTemp("bern");
console.log(test);




/*
const makeOpenWeaterAPICallForTemp = async (location) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
    const response = await fetch(URL);
    const  data = await response.json();
    //const { temp, temp_min, temp_max} = data.main
    return {temp} = data.main;
  }
  console.log
  
  const makeOpenWeaterAPICallForTempMax = async (location) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
    const response = await fetch(URL);
    const  data = await response.json();
    const { temp, temp_min, temp_max} = data.main
    //console.log(temp_max)
  }
  
  const makeOpenWeaterAPICallForTempMin = async (location) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
      const response = await fetch(URL);
      const  data = await response.json();
      const { temp, temp_min, temp_max} = data.main
      //console.log(temp_min)
      */