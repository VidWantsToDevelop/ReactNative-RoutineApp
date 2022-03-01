import React from 'react'
import { Text, View, TouchableHighlight, Modal, TextInput } from 'react-native'
import Context from './Context'
import ReactNative from 'react-native'

import Tasks from './Tasks'

class Manage extends React.Component {
  static contextType = Context
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isModal: false,
      chosenKey: '',
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(column) {
    let object = ''
    if (
      Object.keys(this.context.firstColumn._W).includes(this.state.chosenKey)
    ) {
      console.log('MOG')
      object = this.context.firstColumn._W
    } else if (
      Object.keys(this.context.secondColumn._W).includes(this.state.chosenKey)
    ) {
      object = this.context.secondColumn._W
    } else {
      return Error
    }
    object[this.state.chosenKey].title = this.state.text
    if (object == this.context.firstColumn._W) {
      console.log('LOG')
      this.context.storeData(object, this.context.secondColumn._W)
      console.log(this.context.firstColumn._W)
      console.log(object)
    } else {
      console.log('MOG')
      this.context.storeData(this.context.firstColumn._W, object)
    }
    this.setState({
      isModal: false,
      text: '',
    })
  }

  handleEdit(key) {
    console.log(this.context.firstColumn._W)
    this.setState({
      isModal: true,
      chosenKey: key,
    })
  }

  handleInput(e) {
    this.setState({
      text: e,
    })
  }

  render() {
    let value = this.context
    console.log('SAS')
    console.log(value.secondColumn._W)
    return (
      <View style={styles.mainContainet}>
        <Modal transparent={true} visible={this.state.isModal}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={{ fontSize: 20 }}>Write down your task</Text>
              <TextInput
                style={styles.inputWrapper}
                value={this.state.text}
                onChangeText={this.handleInput}
              />
              <TouchableHighlight
                style={styles.hightLight}
                onPress={() => this.handleChange()}
              >
                <Text>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.column}>
          {Object.entries(value.firstColumn._W).map(([key, value], index) => {
            return (
              <View style={styles.taskWrapper}>
                <Text style={{ fontSize: 20 }}>{value.title}</Text>
                <TouchableHighlight
                  style={styles.hightLight}
                  onPress={() => this.handleEdit(key)}
                >
                  <Text style={{ fontSize: 15 }}>Edit</Text>
                </TouchableHighlight>
              </View>
            )
          })}
        </View>
        <View style={styles.column}>
          {Object.entries(value.secondColumn._W).map(([key, value], index) => {
            return (
              <View style={styles.taskWrapper}>
                <Text style={{ fontSize: 20 }}>{value.title}</Text>
                <TouchableHighlight
                  style={styles.hightLight}
                  onPress={() => this.handleEdit(key)}
                >
                  <Text style={{ fontSize: 15 }}>Edit</Text>
                </TouchableHighlight>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  mainContainet: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    borderWidth: 3,
  },
  taskWrapper: {
    flex: 1,
    margin: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hightLight: {
    marginTop: 25,
    padding: 10,
    borderWidth: 2,
    backgroundColor: 'wheat',
  },
  modalWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.70)',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'rgba(255, 253, 208, 0.95)',
  },
  inputWrapper: {
    padding: 5,
    borderWidth: 2,
    backgroundColor: 'wheat',
    minWidth: '50%',
    maxWidth: '50%',
    marginTop: 25,
  },
})

export default Manage
