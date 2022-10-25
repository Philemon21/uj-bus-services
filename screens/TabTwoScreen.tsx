import { StyleSheet,Dimensions,Image  } from 'react-native';
import {useRef, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MapViewDirections from 'react-native-maps-directions';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default function TabTwoScreen() {

  const [state,setState]=useState({
    pickupCoords:{
      latitude:  -26.261398,//-25.8834995269
      longitude:27.9204056,//29.2704395225
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    dropupLocationCoords:{
      latitude:-26.1932404,//-25.8859692
      longitude:28.0547574,//29.2627888
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    });
  
    const mapRef = useRef();

  const GOOGLE_MAPS_API='AIzaSyBc9E7rU3j1m5PdB0Xxf5mBXNWzR6pOI94';
  const {pickupCoords,dropupLocationCoords}=state
  return (
    <View style={styles.container}>
      
     <MapView style={StyleSheet.absoluteFill} 
     ref={mapRef}
     initialRegion={pickupCoords}
     >
      <MapViewDirections
      origin={pickupCoords}
      destination={dropupLocationCoords}
      apikey={GOOGLE_MAPS_API}
      strokeWidth={3}
      strokeColor="hotpink"
      optimizeWaypoints={true}
     onReady={result=>{
      mapRef.current.fitToCoordinates(result.coordinates,{
        adgePadding:{
          right:30,
          bottom:300,
          left:30,
          top:100
        }
      })}}
      />
      <Marker coordinate={pickupCoords}/>
      <Marker coordinate={dropupLocationCoords}/>
    </MapView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forImageBack:{
    width:"100%",
    height:'100%',
    paddingTop:70,
    position:'absolute',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
