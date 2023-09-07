import hh from "hyperscript-helpers";
import { test } from "ramda";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";


// allows using html tags as functions in javascript
const { div, button, p, h1, h2, input, table, tr, td} = hh(h);

// A combination of Tailwind classes which represent a (more or less nice) button style
const btnStyle = "inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline";

// Messages which can be used to update the model
const MSGS = {
  INPUT_LOCATION: "INPUT_LOCATION",
  SAVE_INPUT: "SAVE_INPUT",

  // ... ℹ️ additional messages
};






// View function which represents the UI as HTML-tag functions
function view(dispatch, model) {
  return div({ className: "flex flex-col gap-4 items-center" }, [
    h1({ className: "text-2xl" }, `Weather App`),
    div({className: "flex gap-2"}, [
      div({className: "flex gap-2"}, [
        input({ className: "shadow border-zinc-800", placeholder: "Enter Location...", oninput: (event) => dispatch(generateMessage(MSGS.INPUT_LOCATION, event.target.value)) }, ),
        button({ className: btnStyle, onclick: () => dispatch(generateMessage(MSGS.SAVE_INPUT))}, "Add"),
      ]),
    ]),
    div({className: "min-w-full divide-y"}, [
    

   
    ...model.entries.map((entry) => 
    table({ className: "text-left; " }, [
      tr([
        td({ className: "px-1 py-2" }, "Location"),
        td({ className: "w-1/3 h-12" }, "Temp"),
        td({ className: "w-1/3 h-12" }, "Low"),
        td({ className: "w-1/3 h-12" }, "High"),
      ]),
      tr([
        td({ className: "w-1/3 h-12" }, entry.locationName),
        td({ className: "w-1/3 h-12" }, entry.tempDay),
        td({ className: "w-1/3 h-12" }, entry.tempLow),
        td({ className: "w-1/3 h-12" }, entry.tempHigh),
      ]),
      
        


      
    ]),

    ),
  
  ]),
]);
}











const generateMessage = (msg, data) => {
  return {
    type: msg,
    data,
    
  };
  
};

const APIKEY = "2d464bf44d4394fc4f0edbd100df819a"
const makeOpenWeaterAPICallDay = async (location) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`
  const response = await fetch(URL);
  const  data = await response.json();
  const { temp, temp_min, temp_max } = data.main;
  return temp;
}
const makeOpenWeaterAPICallLow = async (location) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`
  const response = await fetch(URL);
  const  data = await response.json();
  const { temp, temp_min, temp_max } = data.main;
  return temp_min;
}
const makeOpenWeaterAPICallHige = async (location) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`
  const response = await fetch(URL);
  const  data = await response.json();
  const { temp, temp_min, temp_max } = data.main;
  return temp_max;
}

// Update function which takes a message and a model and returns a new/updated model
async function update(msg, model) {
  console.log(msg)
  switch (msg.type) {
    case MSGS.INPUT_LOCATION:
      return { ...model, nameLocation: msg.data };


    case MSGS.SAVE_INPUT:
      console.log("test");
      const location = model.nameLocation;
      const entry = {locationName: location, tempDay : await makeOpenWeaterAPICallDay(location), tempLow : await makeOpenWeaterAPICallLow(location), tempHigh : await makeOpenWeaterAPICallHige(location)};
      const entries = [...model.entries, entry];
      console.log(entries);
      model.nameLocation = "";
      return { ...model.entries, entries};
  }
  
}


// ⚠️ Impure code below (not avoidable but controllable)
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  async function dispatch(msg) {
    model = await update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
    

  }
}



// The initial model when the app starts
const initModel = {
  nameLocation: "",
  
  entries: [ {
   
  },
  
  ],
};

// The root node of the app (the div with id="app" in index.html)
const rootNode = document.getElementById("app");

// Start the app
app(initModel, update, view, rootNode);


const makeAPICall = async () => {
  const URL = "url...";
  const data = await response.json()
  const respons = await fetch(URL);
  console.log(data.data)
};











