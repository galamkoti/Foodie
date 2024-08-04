import React, { useState } from 'react';
import { View, Text, Image, StyleSheet ,Switch, Pressable} from 'react-native';
import {router} from 'expo-router'

const MenuItem = ({item}) => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };
  console.log("Id should be given to foodItem",item.id)
  return (
    <View style={styles.container} >
      <Image source={{uri:item.image}} style={styles.image} />
      <Pressable style={styles.detailsContainer} onPress={()=>{
      router.push({pathname:`/menu/${item.id}`, params:item});
    }}>
        <Text style={styles.name}>{item.item}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </Pressable>
      <Switch
        style={styles.toggle}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isOn ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isOn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flexDirection : 'row',
    backgroundColor : '#FFFFFF',
    borderRadius : 10,
    padding : 10,
    marginVertical : 5,
    marginHorizontal:5,
    elevation : 3, // for shadow on Android
    shadowColor : '#000000', // for shadow on iOS
    shadowOpacity : 0.2, // for shadow on iOS
    shadowOffset : {
      width : 0,
      height : 3,
    },
  },
  image : {
    width : 80,
    height : 80,
    borderRadius : 8,
  },
  detailsContainer : {
    flex : 1,
    marginLeft : 10,
  },
  name : {
    fontSize : 18,
    fontWeight : 'bold',
    marginBottom : 5,
  },
  description : {
    fontSize : 14,
    color : '#888888',
    marginBottom : 5,
  },
  price : {
    fontSize : 16,
    fontWeight : 'bold',
    color : '#2E8B57', // or any other color you prefer
  },
});

export default MenuItem;
