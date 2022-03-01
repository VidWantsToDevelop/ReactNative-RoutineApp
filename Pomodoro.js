import React from 'react'
import { useState, useEffect, useContext } from 'react'
import ReactNative from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import ReactDom from 'react-dom'
import Context from './Context'

const Pomodoro = ({ navigation }) => {
  const [isGoing, setIsGoing] = useState(false)
  const [seconds, setSeconds] = useState('00')
  const [minutes, setMinutes] = useState('25')
  const [isRelax, setIsRelax] = useState(false)
  const [sound, setSound] = React.useState()

  const value = useContext(Context)

  async function playSoundRelax() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('./styling/sounds/Splendid.wav')
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  async function playSoundSession() {
    console.log('Loading sound')
    const { sound } = await Audio.Sound.createAsync(
      require('./styling/sounds/TimeToWork.wav')
    )
    setSound(sound)

    await sound.playAsync()
  }

  const startHandler = () => {
    if (isGoing == true) {
      setIsGoing(false)
    }
    if (isGoing == false) {
      setIsGoing(true)
    }
  }

  const resetHandler = () => {
    setMinutes('25')
    setSeconds('00')
    setIsGoing(false)
    setIsRelax(false)
  }

  useEffect(() => {
    if (isGoing) {
      if (parseInt(seconds) == 0) {
        if (parseInt(minutes) == 0 && !isRelax) {
          setIsRelax(true)
          playSoundRelax()
          setMinutes(5)
          setSeconds('00')
          setIsGoing(false)
        } else if (parseInt(minutes) == 0 && isRelax) {
          setIsRelax(false)
          playSoundSession()
          setMinutes(25)
          setSeconds('00')
          setIsGoing(false)
        } else {
          let timer = setTimeout(() => {
            console.log(isGoing)
            setSeconds(59)
            setMinutes(minutes - 1)
          }, 1000)
          return () => clearTimeout(timer)
        }
      } else {
        let timer = setTimeout(() => {
          console.log(isGoing)
          setSeconds(seconds - 1)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }
    console.log(isGoing)
    ///Relax timer
  }, [startHandler, setSeconds])

  const handleTimer = () => {
    console.log('It goes')
  }

  return (
    <View style={styles.viewBase}>
      <View
        style={{
          ...styles.container,
          flex: 2,
          borderWidth: 5,
          borderColor: 'rgba(241, 197, 160, 0.40)',
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            ...styles.timer,
            color: isRelax ? '#00A4CCFF' : '#FF0B48',
          }}
        >{`${minutes < 10 ? 0 : ''}${minutes}:${
          seconds < 10 && seconds != 0 ? 0 : ''
        }${seconds}`}</Text>
        <Text
          style={{ ...styles.sub, color: isRelax ? '#00A4CCFF' : '#FF0B48' }}
        >
          {isRelax ? 'Take a rest' : 'Keep it going'}
        </Text>
        <Text
          style={{ ...styles.sub, color: isRelax ? '#00A4CCFF' : '#FF0B48' }}
        >
          {value.isDone
            ? 'You have completed your daily routine, well done!'
            : 'Do not forget about your daily routine streaks!'}
        </Text>
      </View>
      <View style={{ ...styles.container, flex: 1 }}>
        <TouchableOpacity
          style={{
            ...styles.btnContainer,
          }}
          onPress={() => {
            startHandler()
            handleTimer()
          }}
        >
          <Text style={styles.text}>{isGoing ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            resetHandler()
          }}
        >
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = ReactNative.StyleSheet.create({
  viewBase: {
    flex: 1,
    backgroundColor: '#f4511e',
    opacity: 0.85,
    padding: 12,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: 'rgba(241, 243, 132, 0.70)',
    borderRadius: 25,
    marginTop: 30,
    backgroundColor: '#f4511e',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'whitesmoke',
  },
  timer: {
    fontSize: 80,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 12,
    padding: 5,
  },
  sub: {
    textAlign: 'center',
    marginTop: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 5,
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
  },
})

export default Pomodoro
