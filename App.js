import React, { useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios'
import { AppLoading } from 'expo';

/** latitude -22.4338052
 * longitude -46.8445005
*/

/**https://api.wheretheiss.at/v1/satellites/25544 */

/**{"name":"iss",
 * "id":25544,
 * "latitude":33.10643803949,
 * "longitude":55.58613356485,
 * "altitude":417.19635198696,
 * "velocity":27602.653776506,
 * "visibility":"eclipsed",
 * "footprint":4493.1721651548,
 * "timestamp":1584206014,
 * "daynum":2458923.2177546,
 * "solar_lat":-2.1481806995262,
 * "solar_lon":283.86277537509,
 * "units":"kilometers"} */

const App = () =>{
  const [Latitude, setLatitude] = useState(0)
  const [Longitude, setLongitude] = useState(0)
  const [velocity, setVelocity] = useState(0)

  async function getIss(){
    const whereIsIss = await axios.get('https://api.wheretheiss.at/v1/satellites/25544')
    const {latitude, longitude, velocity} = whereIsIss.data
    setLatitude(latitude)
    setLongitude(longitude)
    setVelocity(velocity)
  }

  useEffect(() =>{
    setTimeout(getIss,5000)
  },[Latitude])

  return(
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: -22.4338052,
          longitude: -46.8445005,
          latitudeDelta: 0.05,
          longitudeDelta: 0.08
        }}
      >
        <Marker coordinate={{latitude: Latitude, longitude: Longitude}} title={String(velocity)}/>
      </MapView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
