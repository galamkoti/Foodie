import { View, Text } from 'react-native'
import React from 'react'

const HorizontalLine = () => {
  return (
    <View
        style={{
          width : "95%",
          height : 1,
          backgroundColor: "gray",
          alignSelf: "center",
          marginVertical: 5,
        }}
      ></View>
  )
}

export default HorizontalLine