import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.cost}>${item.price}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.quantity}>Chef: {item.chef.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth : 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width : 80,
    height : 80,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft : 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cost: {
    fontSize: 16,
    color: 'green',
  },
  quantity: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CartItem;
