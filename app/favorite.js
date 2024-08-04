import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';

const FavoriteScreen = () => {
  const favorites = useSelector(state => state.favorite);
  console.log("favorites",favorites)

  const handleChefPress = (chef) => {
    router.push({pathname:`(tabs)/menu/[id]`, params:chef});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Chefs</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChefPress(item)} style={styles.chefItem}>
            <Image source={{ uri: item.image }} style={styles.chefImage} />
            <View style={styles.chefInfo}>
              <Text style={styles.chefName}>{item.name}</Text>
              <Text style={styles.chefDistance}>Distance: {item.distance}</Text>
              <Text style={styles.chefRatings}>Ratings: {item.ratings} ⭐</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chefItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  chefImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  chefInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  chefName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chefDistance: {
    fontSize: 14,
    color: 'gray',
  },
  chefRatings: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FavoriteScreen;
