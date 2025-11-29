import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import MapView, {
  Callout,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '../../config/constant';
import MapViewDirections from 'react-native-maps-directions';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    position: 'absolute',
    width: '99%',
    padding: 1,
    top: 1,
    zIndex: 1,
    flexDirection: 'row',
  },
  markerImage: {
    width: 60,
    height: 60,
  },
});

export default function GoogleMapsScreen() {
  // Create refs for both the MapView and GooglePlacesAutocomplete
  const mapRef = useRef(null);

  const [makerList, setMarkerList] = useState([
    {
      id: 1,
      latitude: 25.999434,
      longitude: 92.849128,
      title: 'marker.title 1',
      description: 'marker.description',
    },
    {
      id: 2,
      latitude: 26.018919,
      longitude: 92.833221,
      title: 'marker.title 2',
      description: 'marker.description',
    },
  ]);

  const MyCustomMarkerView = () => {
    return (
      <Image
        style={styles.markerImage}
        source={{
          uri: 'https://s3-ap-southeast-1.amazonaws.com/images.marketing-interactive.com/wp-content/uploads/2020/02/07133217/Car-Icon.png',
        }}
      />
    );
  };

  // Function to move the map to a new region
  async function moveToLocation({latitude, longitude}) {
    if (mapRef.current) {
      // Ensure that the ref is properly set
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        2000,
      );
    } else {
      console.warn('mapRef is not defined');
    }
  }

  const CustomCallOut = () => {
    return (
      <View>
        <Text>Custom Call out</Text>
      </View>
    );
  };

  const [origin, setOrigin] = useState({
    latitude: 26.018919,
    longitude: 92.833221,
  });
  const [destination, setDestination] = useState({
    latitude: 25.999434,
      longitude: 92.849128,
  });

  return (
    <View style={styles.container}>
      {/* Search bar for Google Places Autocomplete */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Origin"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const {lat, lng} = details.geometry.location;
              let originCordinates = {
                latitude: lat,
                longitude: lng,
              };
              setOrigin(originCordinates);
              moveToLocation(originCordinates); // Move map to the selected location
            }
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
          onFail={error => console.error('Autocomplete error:', error)}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 5,
              borderColor: '#ddd',
              borderWidth: 1,
            },
            textInput: {
              height: 40,
              color: '#000',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              backgroundColor: 'white',
            },
            row: {
              backgroundColor: '#fff',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
            },
            description: {
              fontSize: 16,
              color: '#1faadb',
            },
          }}
          textInputProps={{
            placeholderTextColor: '#888',
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Destination"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const {lat, lng} = details.geometry.location;
              let destinationCordinates = {
                latitude: lat,
                longitude: lng,
              };
              setDestination(destinationCordinates);
              moveToLocation(destinationCordinates); // Move map to the selected location
            }
          }}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
          onFail={error => console.error('Autocomplete error:', error)}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 5,
              borderColor: '#ddd',
              borderWidth: 1,
            },
            textInput: {
              height: 40,
              color: '#000',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              backgroundColor: 'white',
            },
            row: {
              backgroundColor: '#fff',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
            },
            description: {
              fontSize: 16,
              color: '#1faadb',
            },
          }}
          textInputProps={{
            placeholderTextColor: '#888',
          }}
        />
      </View>

      {/* Map View */}
      <MapView
        ref={mapRef} // Set ref for the MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 25.999434,
          longitude: 92.849128,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {origin != undefined ? (
          <Marker
            coordinate={origin}
          />
        ) : null}
        {destination != undefined ? (
          <Marker
            coordinate={destination}
          />
        ) : null}

        {/* <Marker
          draggable
          onDragEnd={e => console.log({x: e.nativeEvent.coordinate})}
          coordinate={{
            latitude: 25.993715,
            longitude: 92.841351,
          }}>
          <MyCustomMarkerView />
          <Callout style={{width: 220, height: 60}}>
            <CustomCallOut />
          </Callout>
        </Marker>

        <Polyline
          coordinates={[
            {latitude: 25.993715, longitude: 92.841351},
            {latitude: 26.018919, longitude: 92.833221},
          ]}
        />

        {makerList.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))} */}

        {origin != undefined && destination != undefined ? (
          <MapViewDirections
          strokeColor='red'
          strokeWidth={4}
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAP_API_KEY}
          />
        ) : null}
      </MapView>
    </View>
  );
}
