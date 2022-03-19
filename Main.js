import { StatusBar } from 'expo-status-bar'
import ReactNative from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated from 'react-native-reanimated'
import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from '@expo-google-fonts/lato'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { PanGestureHandler } from 'react-native-gesture-handler'

import {
  View,
  Text,
  ImageBackground,
  Button,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import Context from './Context'
import Carousel from './Carousel'

const Main = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  })
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const { width, height } = Dimensions.get('window')

  const date = new Date()

  const value = useContext(Context)
  value.checkDate()
  value.getData('firstColumn').then(() => {
    value.setIsLoading(false)
    console.log(value.firstColumn._W)
  })

  if (!fontsLoaded || value.isLoading) {
    console.log('not loaded')
    return <AppLoading />
  }

  return (
    <ImageBackground
      source={require('./styling/imgs/MainBG.jpg')}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(84, 65, 181, 0.85)' }}>
        <View
          style={{
            ...styles.commonViewStyle,
            flex: 2,
            opacity: 0.75,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              color: '#F7B733',
              fontFamily: 'Lato_700Bold',
            }}
          >
            {`Good ${date.getHours() > 13 ? 'afternoon' : 'morning'}`}
          </Text>
          <Text
            style={{
              fontSize: 40,
              color: '#FC4A1A',
              marginVertical: 25,
              fontFamily: 'Lato_700Bold',
            }}
          >
            Task list:
          </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              width: '90%',
              borderRadius: 10,
              borderColor: '#000',
            }}
          >
            <Carousel />
          </View>
        </View>
        <View
          style={{
            ...styles.commonViewStyle,
            flex: 0.5,
            opacity: 0.75,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Lato_700Bold',
              color: 'white',
            }}
          >
            Let's get into it
          </Text>
        </View>
        <View
          style={{
            ...styles.commonViewStyle,
            flex: 1.35,
            ...styles.btnsWrapper,
          }}
        >
          <View style={styles.btnsContainer}>
            <TouchableHighlight
              style={{ ...styles.touchLight }}
              onPress={() => {
                navigation.navigate('Streaks')
              }}
            >
              <Text style={styles.btnText}>Streaks</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.touchLight }}
              onPress={() => {
                navigation.navigate('Manage')
              }}
            >
              <Text style={styles.btnText}>Manage routine</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableHighlight
              style={{ ...styles.touchLight, backgroundColor: '#FC4A1A' }}
              onPress={() => {
                navigation.navigate('Pomodoro')
              }}
            >
              <Text style={styles.btnText}>Pomodoro timer</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = ReactNative.StyleSheet.create({
  commonViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  touchLight: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    width: '75%',
    margin: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(65, 132, 180, 0.85)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Lato_400Regular',
    fontSize: 22,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  btnsWrapper: {
    flexDirection: 'row',
  },
  btnsContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
  },
})

export default Main
