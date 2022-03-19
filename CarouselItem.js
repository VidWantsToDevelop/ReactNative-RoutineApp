import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import Context from './Context'

const { width, height } = Dimensions.get('window')

const CarouselItem = ({ item }) => {
  const value = useContext(Context)
  return (
    <View style={styles.cardView}>
      <View style={styles.image}>
        <CircularProgress
          radius={70}
          duration={4000}
          value={item.status}
          titleColor={'#FFFDD0'}
          activeStrokeColor={'#FFFDD0'}
          fontSize={20}
          valueSuffix={'%'}
          inActiveStrokeColor={'tomato'}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={4}
          title={item.title}
          titleFontSize={20}
          showProgressValue={false}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>
          {item.status == 1
            ? "You haven't completed it yet"
            : 'This task is accomplished, great job'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 39.2,
    height: height / 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: width - 39.2,
    height: height / 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 8,
    elevation: 8,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 8,
    elevation: 8,
  },
})

export default CarouselItem
