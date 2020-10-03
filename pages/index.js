import Head from 'next/head'
import MapView from '../components/map.js'

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        lat: null,
        lng: null
      }
    }

    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(lat, lng) {
    this.setState({
      location: {
        lat: lat,
        lng: lng
      }
    })

    console.log(this.state.location);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
        </Head>

        <main>
          <MapView location={this.state.location} setLocation={this.setLocation}/>
          <div>lat: {this.state.location.lat}</div>
          <div>lng: {this.state.location.lng}</div>
        </main>

        <footer>
        </footer>
      </div>
    )
  }
}
