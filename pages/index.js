import Head from 'next/head'
import MapView from '../components/map.js'
import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";

const mapsClient = new GoogleMapsClient({});

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        lat: null,
        lng: null,
        zip: null
      }
    }

    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(lat, lng) {
    mapsClient.reverseGeocode({
      params: {
        key: "AIzaSyBbo43u_w3Ap59Rj4V66j8J2AQDuQicjM8",
        latlng: { lat: lat, lng: lng },
        result_type: 'postal_code'
      },
      headers: null
    }).then(r => {
      this.setState({
        location: {
          lat: lat,
          lng: lng,
          zip: r.data.results[0].address_components[0].long_name
        }
      });
      console.log(this.state.location);
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
        </Head>

        <main>
          <MapView location={this.state.location} setLocation={this.setLocation} />
          <div>lat: {this.state.location.lat}</div>
          <div>lng: {this.state.location.lng}</div>
          <div>zip: {this.state.location.zip}</div>
        </main>

        <footer>
        </footer>
      </div>
    )
  }
}
