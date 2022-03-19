import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native'
import CarouselItem from './CarouselItem'
import Context from './Context'

const { width, height } = Dimensions.get('window')

const Carousel = () => {
  const scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX, width)
  const values = useContext(Context)
  let data = []
  Object.entries(values.firstColumn._W).forEach(([key, value], index) => {
    data.push(values.firstColumn._W[key])
  })
  Object.entries(values.secondColumn._W).forEach(([key, value], index) => {
    data.push(values.secondColumn._W[key])
  })
  console.log('SASDASDASDASD')
  console.log(data)
  if (values.DummyData && values.DummyData.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment='center'
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={item} />
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />
        <View style={styles.dotView}>
          {values.DummyData.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            })
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  background: '#595959',
                  margin: 8,
                  borderRadius: 5,
                }}
              ></Animated.View>
            )
          })}
        </View>
      </View>
    )
  }
  console.log('Error occured')
  return null
}

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default Carousel
