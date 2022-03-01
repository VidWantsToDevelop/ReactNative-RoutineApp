import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './Main'
import Pomodoro from './Pomodoro'
import Context from './Context'
import Streaks from './Streaks'
import Manage from './Manage'
import Tasks from './Tasks'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

export default function App({ navigation }) {
  const [isDone, setIsDone] = useState(false)
  const [firstColumn, setFirst] = useState(getData('firstColumn'))
  const [secondColumn, setSecond] = useState(getData('secondColumn'))
  const date = new Date().getDate()

  const loadBase = () => {
    storeData(Tasks[0], Tasks[1])
    AsyncStorage.setItem('day', date)
  }

  console.log('KEK' + JSON.stringify(new Date().getDate()))
  const checkDate = async () => {
    try {
      if (date != (await getData('day'))) {
        console.log('====================================')
        console.log('LOADING BASE')
        console.log(date)
        console.log(await getData('day'))
        console.log('====================================')
        loadBase()
      } else {
        console.log('BAKKA')
      }
    } catch (err) {
      console.log(err)
    }
  }

  checkDate()

  console.log(firstColumn)

  return (
    <Context.Provider
      value={{
        isDone,
        setIsDone,
        firstColumn,
        setFirst,
        secondColumn,
        setSecond,
        storeData,
        getData,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name='Home'
            component={Main}
            options={{
              headerStyle: {
                backgroundColor: '#4ABDAC',
              },
            }}
          />
          <Stack.Screen
            name='Pomodoro'
            component={Pomodoro}
            options={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name='Streaks'
            component={Streaks}
            options={{
              headerStyle: {
                backgroundColor: 'green',
              },
            }}
          />
          <Stack.Screen
            name='Manage'
            component={Manage}
            options={{
              headerStyle: {
                backgroundColor: 'green',
              },
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  )
}

const storeData = async (value, secondValue) => {
  try {
    const firstColumn = JSON.stringify(value)
    const secondColumn = JSON.stringify(secondValue)
    await AsyncStorage.setItem('firstColumn', firstColumn)
    await AsyncStorage.setItem('secondColumn', secondColumn)
  } catch (e) {
    console.log(e)
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log(e)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
