import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const center = {
  lat: 0,
  lng: 0
}

export default class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.mapClicked = this.mapClicked.bind(this);
  }

  mapClicked = e => {
    // console.log(e.latLng.lat() + ", " + e.latLng.lng());
    // this.setState({
    //   location: {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng()
    //   }
    // });
    // console.log(this.state.location);

    this.props.setLocation(e.latLng.lat(), e.latLng.lng());
  }

  render() {
    return (
      <LoadScript
      googleMapsApiKey="AIzaSyBbo43u_w3Ap59Rj4V66j8J2AQDuQicjM8"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={1}
          onClick={this.mapClicked}
        >
          <Marker
          position={{
            lat: this.props.location.lat,
            lng: this.props.location.lng
          }}
          />
        </GoogleMap>
      </LoadScript>
    )
  }
}