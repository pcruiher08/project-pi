import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{width: '100%', height: '500px', marginTop: '45px', justifyContent: 'center'}}>
        <MapContainer center={[25.680584, -100.318239]} zoom={13} scrollWheelZoom={true} style={{width: '100%', height: '450px', margin: '0px'}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.elements.map(e => {
                return (
                    <Marker position={[e.latitude, e.longitude]}>
                        <Popup>
                            {e.street ? e.street : e.type}
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
      </div>
    );
  }
}

export default SimpleMap;