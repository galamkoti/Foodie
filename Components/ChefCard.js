import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';

const ChefCard = ({ chef, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(chef)}>
      <Image source={{ uri: chef.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{chef.name}</Text>
        <Text style={styles.distance}>Distance: {chef.distance}</Text>
        <Text style={styles.ratings}>Ratings: {chef.ratings} ⭐</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom : 10,
    shadowColor: '#000',
    shadowOffset: { width : 0, height : 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: Platform.OS === 'web' ? 10 : 0,
  },
  image: {
    width : 100,
    height : 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: 'gray',
  },
  ratings: {
    fontSize: 14,
    color: 'goldenrod',
  },
});

export default ChefCard;
