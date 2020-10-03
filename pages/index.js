import Head from 'next/head';
import MapView from '../components/map.js';
// import RateChart from '../components/chart.js';
import { Bar } from 'react-chartjs-2';
import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";

const mapsClient = new GoogleMapsClient();

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        lat: null,
        lng: null,
        state: null
      },
      rate: null,
      status: null,
      statusColor: null
    }

    this.setLocation = this.setLocation.bind(this);
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/coviddata.json')
    const json = await res.json();
    return { data: json };
  }

  setLocation(lat, lng) {
    mapsClient.reverseGeocode({
      params: {
        key: "AIzaSyBbo43u_w3Ap59Rj4V66j8J2AQDuQicjM8",
        latlng: { lat: lat, lng: lng },
        result_type: 'administrative_area_level_1'
      },
      headers: null
    }).then(r => {
      if (r.data.results[0].address_components[1].short_name == "US") {
        let rate, status, color;

        this.props.data.forEach(e => {
          if (e.state == r.data.results[0].address_components[0].long_name && e.month == 9 && e.day == 29) {
            rate = e.new_case_rate;
          }
        });

        if (rate < 10) {
          status = "In Control";
          color = "green";
        } else if (rate >= 10 && rate < 15) {
          status = "Mild";
          color = "yellow";
        } else if (rate >= 15 && rate < 23) {
          status = "Moderate";
          color = "orange";
        } else if (rate >= 23) {
          status = "Severe";
          color = "red";
        }

        this.setState({
          location: {
            lat: lat,
            lng: lng,
            state: r.data.results[0].address_components[0].long_name
          },
          rate: rate,
          status: status,
          statusColor: color
        });
      }

      //console.log(this.state);
      //console.log(this.props.data);

    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>HS I/O October 2020</title>
        </Head>

        <main>
          <MapView location={this.state.location} setLocation={this.setLocation} />
          <div>lat: {this.state.location.lat}</div>
          <div>lng: {this.state.location.lng}</div>
          <div>state: {this.state.location.state}</div>
          <div>rate: {this.state.rate}</div>
          <div className={this.state.statusColor} id="status">status: {this.state.status}</div>

        </main>

        <footer>
        </footer>
      </div>
    )
  }
}
