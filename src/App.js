import React, { Component } from 'react';
import axios from 'axios';
import "./assets/style.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false
    }
  }

  getLocFun = async (e) => {
    e.preventDefault();

    // let cityName = e.target.city.value;

    await this.setState({
      searchQuery: e.target.city.value
    })

    let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}=${this.state.searchQuery}&format=json`

    let locResults = await axios.get(reqUrl);
    console.log('aaaaaaaa', locResults)
    console.log('dddddddd', locResults.data)
    console.log('dddddddd', locResults.data[0])

    this.setState({
      locationResult: locResults.data[0],
      showLocInfo: true
    })
  }

  render() {
    return (
      <div>
        <h1 className="box2" >City explorer app</h1>
        {/* <button onClick={this.getLocFun}>Get Location</button> */}

        <form onSubmit={this.getLocFun} className="box2">
          <input type="text" name='city' />
          <input type="submit" value='get city info' />
        </form>

        {
        this.state.showLocInfo && 
        <>
        <p className="box">city name: {this.state.searchQuery}</p>
        <p className="box">latitude: {this.state.locationResult.lat}</p>
        <p className="box">longitude: {this.state.locationResult.lon}</p>

        <img src={`https://maps.locationiq.com/v3/staticmap?
         key=pk.f66665537f53879fdc8ae34a0690b3a2&center=%3Clatitude%3E,%3Clongitude%3E&
         center=${this.state.locationResult.lat},${this.state.locationResult.lon}
         &zoom=7&size=700x500`}
         alt="city" className="box3" />
         </>
        }

      </div>
    );
  }
}

export default App;