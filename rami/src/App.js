import React, { Component } from 'react';
import './App.css';
const API_URL = "http://api.openweathermap.org/data/2.5/weather?&APPID=2c3a6923bd458a0fe25328b6355caeba";

class App extends Component {
  constructor(props){
	 super(props);
	 this.state = {cityName: '', city: '',longitude: '',latitude: '', temperature: '',humidity: '',windDirection: '',windSpeed:''};
	 this.onCityChange = this.onCityChange.bind(this);
	 this.onLngChange = this.onLngChange.bind(this);
	 this.onLatChange = this.onLatChange.bind(this); 
  }	

 knowTheWeather(city){
 	var url = API_URL;
 	 if (city!=='') {
		url += "&q=" + city;     	
    }
    else {
    	url += "&lat=" + this.state.latitude + "&lon=" + this.state.longitude;
    }
  	 
  	 console.log(url);
    var weather;
    fetch(url).
    then(response => response.json()).
    then(
    data=> {
    	console.log(data);
    	this.setState({cityName:data.name});
     	this.setState({temperature: this.translateToCelsium(data.main.temp)});
		this.setState({humidity: data.main.humidity + " %" });
		this.setState({windSpeed: data.wind.speed+ " м/с"});
		this.setState({windDirection: this.windDirectionChecker(data.wind.deg)});
			     	 
    });
    
  }
  translateToCelsium(temperature){
  	 console.log(temperature);
  	 var celsium = (temperature - 273.15) + " °C";
  	 Math.round(celsium);
	 return celsium;
  }
  
  onCityChange(e){
    this.setState({city: e.target.value});
  }
  onLngChange(e){
    this.setState({longitude: e.target.value});
  }
  onLatChange(e){
    this.setState({latitude: e.target.value});
  }
  windDirectionChecker(deg){
	 if(deg < 90)
	 	return "Северное"; 
	 else if (deg >=90 && deg<180) 
	 	return "Восточное";
	 else if (deg >=180 && deg<270)
	 	return "Южное";
	 else 
	 	return "Западное"; 
  }  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">    
          <h1 className="App-title">Погода Онлайн</h1>
        </header>
        <p className="App-intro">
          Просто введите город и получите всю подробную информацию.
        </p>
        <div className="SearchInputContainer">
        <div className="row">
        	 <input placeholder="Введите долготу" onChange={this.onLngChange} value={this.state.longitude} className="col-md-2 col-xs-2 col-sm-2 col-lg-2 SearchInput form-control"></input>
        	 <input placeholder="Введите название" onChange={this.onCityChange} value={this.state.city} className="col-md-8 col-xs-8 col-sm-8 col-lg-8 SearchInputCity form-control"></input>
        	 <input placeholder="Введите широту" onChange={this.onLatChange} value={this.state.latitude} className="col-md-2 col-xs-2 col-sm-2 col-lg-2 SearchInput form-control"></input>
			</div>        	
        	<button onClick={(e) => this.knowTheWeather(this.state.city)} className="SearchInputButton btn btn-primary">Запросить погоду</button>
        </div>
        <div className="left">
        	  <h1>Название города</h1>
        	  <h1>Температура</h1>
        	  <h1>Влажность</h1>
        	  <h1>Направление ветра</h1>
        	  <h1>Скорость ветра</h1>
        </div>
        <div className="weatherForecastContainer">
        	 <h1 className="city">{this.state.cityName}</h1>
        	 <h1 className="temperature" >{this.state.temperature}</h1>
        	 <h1 className="humidity">{this.state.humidity}</h1>
        	 <h1 className="windDirection">{this.state.windDirection}</h1>
        	 <h1 className="windSpeed">{this.state.windSpeed}</h1>
        </div>
      </div>
      
    );
  }
}
export default App;

