/*import { createRoot } from 'react-dom/client';
import App from './App'

import './index.css'


const root = createRoot(document.getElementById("root"));
root.render(<App />);
/*var express= require("express");

var app=express();
var connection=require("./database");
app.get('/', function(req, res){
   sql = "SELECT * FROM st";
  connection.query(sql, function(err, results){
         if(err){
          console.log(err);
         }
  res.send(results);
});
});

app.listen(3000, function(){
  console.log('App Listening on port 3000');
  connection.connect(function(err){
    if(err) {
      console.log(err)
    }
    console.log("Database connect");
})
});*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);