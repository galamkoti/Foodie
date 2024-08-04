import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, incrementQuantity, decrementQuantity, replaceCart } from '../../../redux/CartReducer';
import { addFavorite, removeFavorite } from '../../../redux/FavoriteSlice';
import { AntDesign } from '@expo/vector-icons';

const foodItems = [
  { id: '1', category: 'Appetizers', name: 'Bruschetta', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: 14.99, description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '2', category: 'Appetizers', name: 'Stuffed Mushrooms', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: 13.99, description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '3', category: 'Main Course', name: 'Spaghetti Carbonara', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '12.99', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '4', category: 'Main Course', name: 'Grilled Salmon', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '19', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '5', category: 'Desserts', name: 'Tiramisu', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '13', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '6', category: 'Desserts', name: 'Panna Cotta', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '10', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '7', category: 'Biryani', name: 'Tiramisu', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '9', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '8', category: 'Biryani', name: 'Panna Cotta', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '12', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '9', category: 'Smoothies', name: 'Tiramisu', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '9', description: 'pizza with tomato sauce and mozzarella cheese' },
  { id: '10', category: 'Smoothies', name: 'Panna Cotta', image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600', price: '9', description: 'pizza with tomato sauce and mozzarella cheese' },
];

export default function ChefDetailScreen() {
  const chef = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector(state => state.cart.items);
  const cartChef = useSelector(state => state.cart.chef);
  const dispatch = useDispatch();

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(filteredItems.map(item => item.category))];

  const favorites = useSelector(state => state.favorites || []);
  const isFavorite = favorites.some(favoriteChef => favoriteChef.id === chef.id);

  // const handleFavoriteToggle = () => {
  //   if (isFavorite) {
  //     dispatch(removeFavorite(chef));
  //     Alert.alert('Removed from Favorites', `${chef.name} has been removed from your favorites.`);
  //   } else {
  //     dispatch(addFavorite(chef));
  //     Alert.alert('Added to Favorites', `${chef.name} has been added to your favorites.`);
  //   }
  // };
  
  const handleAddToCart = (item) => {
    if (cartChef && cartChef.id !== chef.id) {
      Alert.alert(
        'Replace Cart',
        'Your cart contains items from a different chef. Do you want to replace the cart with items from this chef?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Replace',
            onPress: () => dispatch(replaceCart({ ...item, chef })),
          },
        ],
      );
    } else {
      dispatch(addItem({ ...item, chef }));
      Alert.alert('Item Added', `${item.name} has been added to your cart.`);
    }
  };

  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity({ id: item.id, chef }));
  };

  const handleDecrementQuantity = (item) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.chef.id === chef.id);
    if (cartItem && cartItem.quantity === 1) {
      dispatch(removeItem({ id: item.id, chef }));
      Alert.alert('Item Removed', `${item.name} has been removed from your cart.`);
    } else {
      dispatch(decrementQuantity({ id: item.id, chef }));
    }
  };



  // const flatListRef = useRef(null);

  // const categoryIndexMap = useRef({});

  // useEffect(() => {
  //   let index = 0;
  //   const map = {};
  //   categories.forEach(category => {
  //     map[category] = index;
  //     index += filteredItems.filter(item => item.category === category).length;
  //   });
  //   categoryIndexMap.current = map;
  // }, [categories, filteredItems]);

  // const scrollToCategory = (category) => {
  //   const index = categoryIndexMap.current[category];
  //   if (index !== -1 && flatListRef.current) {
  //     flatListRef.current.scrollToIndex({ index, animated: true });
  //   }
  // };

  const renderHeader = () => (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerTitle: `${chef.name}`,
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : () => (
          <TouchableOpacity style={styles.editButton} onPress={()=>{}}>
            <AntDesign name="heart" size={24} color={isFavorite ? "red" : "black"} />
            {/* {isFavorite ? <AntDesign name="heart" size={24} color="red" /> : <AntDesign name="heart" size={24} color="red" />} */}
          </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.header}>
        <Image source={{ uri: chef.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{chef.name}</Text>
          <Text style={styles.distance}>Distance: {chef.distance}</Text>
          <Text style={styles.ratings}>Ratings: {chef.ratings} ⭐</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search food items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderCategory = ({ item: category }) => (
    <View style={styles.category}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={filteredItems.filter(item => item.category === category)}
        renderItem={({ item }) =>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            {cartItems.find(cartItem => cartItem.id === item.id && cartItem.chef.id === chef.id) ? (
                <View style={styles.quantityControls}>
                  <TouchableOpacity onPress={() => handleDecrementQuantity(item)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {cartItems.find(cartItem => cartItem.id === item.id && cartItem.chef.id === chef.id)?.quantity || 0}
                  </Text>
                  <TouchableOpacity onPress={() => handleIncrementQuantity(item)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              )}
          </View>
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
      // ref={flatListRef}
      ListHeaderComponent={renderHeader}
      data={categories}
      renderItem={renderCategory}
      keyExtractor={item => item}
      // getItemLayout={(data, index) => (
      //   { length: 100, offset: 200 * index, index }
      // )}
    />
      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={()=> {
          router.push('/cart');
        }}>
          <Text style={styles.cartButtonText}>Go to Cart ({cartItems.length})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom : 20,
  },
  image: {
    width : 100,
    height : 100,
    borderRadius: 50,
  },
  info: {
    marginLeft : 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 16,
  },
  ratings: {
    fontSize: 16,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
    borderWidth : 1,
    borderRadius: 5,
    padding: 10,
    marginBottom : 20,
  },
  categoryScroll: {
    marginBottom : 20,
  },
  categoryButton: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    fontSize: 16,
  },
  category: {
    marginBottom : 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom : 10,
  },
  itemImage: {
    width : 100,
    height : 100,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    paddingLeft : 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom : 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom : 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems:'center',
    justifyContent: 'center',
    height : 50,
    marginTop : 20,
    marginRight : 10
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    position: 'absolute',
    bottom : 10,
    left : 10,
    right : 10,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
