import { StatusBar } from 'expo-status-bar'
import ReactNative from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

import {
  View,
  Text,
  ImageBackground,
  Button,
  TouchableHighlight,
} from 'react-native'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import Context from './Context'

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

  const date = new Date()

  if (!fontsLoaded) {
    console.log('not loaded')
    return <AppLoading />
  }

  const value = useContext(Context)
  value.checkDate()
  return (
    <ImageBackground
      source={require('./styling/imgs/MainBG.jpg')}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(74, 189, 172, 0.85)' }}>
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
          <Text
            style={{
              fontSize: 25,
              color: '#DFDCE3',
              fontFamily: 'Lato_700Bold',
            }}
          >
            {`Daily routine: ${value.isDone ? 'Accomplished' : 'Not yet'}`}
          </Text>
        </View>
        <View
          style={{
            ...styles.commonViewStyle,
            flex: 0.5,
            opacity: 0.75,
          }}
        >
          <Text style={{ fontSize: 25 }}>
            {weekday[date.getDay()] + '  ' + date.toLocaleDateString()}
          </Text>
        </View>
        <View style={{ ...styles.commonViewStyle, flex: 1.35 }}>
          <TouchableHighlight
            style={{ ...styles.touchLight }}
            onPress={() => {
              navigation.navigate('Streaks')
            }}
          >
            <Text style={styles.btnText}>Daily routine</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.touchLight }}
            onPress={() => {
              navigation.navigate('Manage')
            }}
          >
            <Text style={styles.btnText}>Manage daily tasks</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.touchLight }}
            onPress={() => {
              navigation.navigate('Pomodoro')
            }}
          >
            <Text style={styles.btnText}>Pomodoro timer</Text>
          </TouchableHighlight>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    width: '85%',
    margin: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(247, 182, 51, 0.85)',
  },
  btnText: {
    color: '#353839',
  },
})

export default Main
