import React from 'react'
import { useState, useEffect } from 'react'
import ReactNative, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { StepBackwardOutlined } from '@ant-design/icons'
import Context from './Context'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import Tasks from './Tasks'
import { render } from 'react-dom'

class Streaks extends React.Component {
  static contextType = Context
  constructor(props) {
    super(props)
    this.state = {
      firstState: 1,
      secondState: 1,
      thirdState: 1,
      fourth: 1,
      fifth: 1,
      sixth: 1,
      showModal: false,
      trigger: false,
    }
    this.pressed = this.pressed.bind(this)
  }

  componentDidUpdate() {
    this.context.setIsDone(this.check())
  }

  componentDidMount() {
    if (this.context.isDone) {
      let newState = this.state
      Object.keys(this.state).forEach((state) => {
        newState[state] = 100
      })
      this.setState(newState)
    }
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  check() {
    if (this.context.isDone && !this.state.showModal && !this.state.trigger) {
      this.handleModal()
      this.setState({
        trigger: true,
      })
    }
    let array = true
    let object = Object.keys(this.state)
    object.forEach((state) => {
      if (
        this.state[state] != 100 &&
        state != 'showModal' &&
        state != 'trigger'
      ) {
        array = false
        return array
      }
    })

    return array
  }

  pressed(btnPressed) {
    console.log(this.context.secondColumn._W)
    const name = btnPressed
    const state = this.state
    let newObject
    if (Object.keys(this.context.firstColumn._W).includes(btnPressed)) {
      newObject = this.context.firstColumn._W
      newObject[btnPressed].status = 100
      this.context.storeData(newObject, this.context.secondColumn._W)
    } else if (Object.keys(this.context.secondColumn._W).includes(btnPressed)) {
      newObject = this.context.secondColumn._W
      newObject[btnPressed].status = 100
      this.context.storeData(this.context.firstColumn._W, newObject)
    }
    this.forceUpdate()
  }

  render() {
    let value = this.context

    return (
      //Modal stuff

      <View style={styles.mainContainer}>
        <Modal transparent={true} visible={this.state.showModal}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={{ ...styles.modalText, fontWeight: 'bold' }}>
                Congratulations!
              </Text>
              <Text
                style={{ ...styles.modalText, fontSize: 15, marginTop: 20 }}
              >
                You have finished all your daily routine. I really hope to see
                the same result tomorrow, see ya
              </Text>
              <TouchableOpacity
                onPress={() => this.handleModal()}
                style={styles.modalBtn}
              >
                <Text style={styles.modalText}>Sure!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text style={styles.header}>
          {value.isDone ? 'Great job, see you tomorrow!' : 'Keep grinding'}
        </Text>
        <View style={styles.body}>
          <View style={styles.column}>
            {Object.entries(value.firstColumn._W).map(
              ([task, value], index) => {
                return (
                  <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.pressed(task)}>
                      <CircularProgress
                        radius={70}
                        duration={4000}
                        value={value.status}
                        titleColor={'#FFFDD0'}
                        activeStrokeColor={'#FFFDD0'}
                        fontSize={20}
                        valueSuffix={'%'}
                        inActiveStrokeColor={'tomato'}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={4}
                        title={
                          value.status >= 100 ? 'Completed' : `${value.title}`
                        }
                        titleFontSize={20}
                        showProgressValue={false}
                      />
                    </TouchableOpacity>
                  </View>
                )
              }
            )}
          </View>
          <View style={styles.column}>
            {Object.entries(value.secondColumn._W).map(
              ([task, value], index) => {
                return (
                  <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.pressed(task)}>
                      <CircularProgress
                        radius={70}
                        duration={4000}
                        value={value.status}
                        titleColor={'#FFFDD0'}
                        activeStrokeColor={'#FFFDD0'}
                        fontSize={20}
                        valueSuffix={'%'}
                        inActiveStrokeColor={'tomato'}
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={4}
                        title={
                          value.status >= 100 ? 'Completed' : `${value.title}`
                        }
                        titleFontSize={20}
                        showProgressValue={false}
                      />
                    </TouchableOpacity>
                  </View>
                )
              }
            )}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    backgroundColor: '#cae7d1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    flex: 0.1,
    fontSize: 32,
    color: '#7a1012',
    fontFamily: 'Lato_400Regular',
  },
  body: {
    borderRadius: 24,
    backgroundColor: '#85c793',
    borderColor: '#96cfa2',
    borderWidth: 2,
    flex: 0.9,
    width: '100%',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    padding: 15,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    margin: 50,
    backgroundColor: '#FFFDD0',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 25,
  },
  modalBtn: {
    marginTop: 25,
    backgroundColor: '#85c793',
    padding: 10,
  },
})

export default Streaks
