var KEY,URL_WEATHER,fecha,texto,boton;
var weather={};
 weather.province;
 weather.temp;
 weather.tempmax;
 weather.tempmin;
 weather.descri;
 weather.image;
 weather.fecha;

function inicio(){
 boton=$('#boton');
 texto=$('#texto');
 boton.click(CaptureCity);
 KEY="d506c8529e8c8b3a313f42158c493a13";
 URL_WEATHER="http://api.openweathermap.org/data/2.5/weather?APPID="+KEY+"&";
 IMAGE="http://openweathermap.org/img/w/";

  if(navigator.geolocation){
  	navigator.geolocation.getCurrentPosition(Coords,Found);
  }
  else{
  	alert("Cambia de navegador");
  }
 Fecha();	
}

function Fecha(){
fecha=new Date();
var dia=fecha.getDate();
var mes=fecha.getMonth()+1;
var año=fecha.getFullYear();
 return dia +"-"+ mes +"-"+ año;
}


function Coords(pos){
  var lat=pos.coords.latitude;
  var lon=pos.coords.longitude;
  console.log(lat+""+lon);
  $.getJSON(URL_WEATHER+"lat="+lat+"&lon="+lon,getCurrentWeather)
}

function getCurrentWeather(data){
weather.province=data.name;
weather.fecha=Fecha();
weather.temp=Math.round(data.main.temp-273.15).toFixed(2);
weather.tempmax=Math.round(data.main.temp_max-273.15).toFixed(2);
weather.tempmin=Math.round(data.main.temp_min-273.15).toFixed(2);
weather.descri=data.weather[0].description;
weather.image=IMAGE + data.weather[0].icon +".png";
console.log(data);
 Template(weather);
}

function Template(weather){
 var clone=ActivarTemplate("#template");
 clone.querySelector("[data-province]").innerHTML=weather.province;
 clone.querySelector("[data-fecha]").innerHTML=weather.fecha;
 clone.querySelector("[data-image]").src=weather.image;
 clone.querySelector("[data-temp]").innerHTML=weather.temp;
 clone.querySelector("[data-temp='max']").innerHTML=weather.tempmax;
 clone.querySelector("[data-temp='min']").innerHTML=weather.tempmin;
 clone.querySelector("[data-desc]").innerHTML=weather.descri;
 $('.loader').hide();
 $('body').append(clone);
}

function ActivarTemplate(id)
{
 var t=document.querySelector(id);
  return document.importNode(t.content,true);      
}

function CaptureCity(){
var city=texto.val();
$.getJSON(URL_WEATHER+"q="+city,getCurrentWeatherCity);
}

function getCurrentWeatherCity(data){

 console.log(data);
 weather.province=data.name;
 weather.fecha=Fecha();
 weather.temp=Math.round(data.main.temp-273.15).toFixed(2);
 weather.tempmax=Math.round(data.main.temp_max-273.15).toFixed(2);
 weather.tempmin=Math.round(data.main.temp_min-273.15).toFixed(2);
 weather.descri=data.weather[0].description;
 weather.image=IMAGE + data.weather[0].icon +".png";
 Template(weather);
}

function Found(e){
 alert("ha sucedido un error:"+e.code);
}
