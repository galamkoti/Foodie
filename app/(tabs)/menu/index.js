import { View, Text, TouchableOpacity,SafeAreaView,Platform,StatusBar ,StyleSheet , FlatList, Image, ActivityIndicator, Pressable, Alert} from 'react-native'
import React ,{ useState} from 'react'
import {Stack, router} from 'expo-router'
import FoodItem from '../../../Components/FoodItem'
import {useDispatch ,useSelector} from 'react-redux'
import Colors from '../../../Constants/Colors'
import { useProductList } from '../../api/products'
import { supabase } from '../../../supabase'
import chefs from '../../../data/chefs'
import ChefCard from '../../../Components/ChefCard'
import { FontAwesome5 } from '@expo/vector-icons';

const menu = () => {
  const userDetails = useSelector((state)=>state.user);
  const {data:chefData, isLoading, error } =useProductList(userDetails.id);
  const dispatch=useDispatch();
  console.log('user in menu',userDetails)
  const handleAddItemPress =() =>{
    router.push('/addItem')
  }
  const handleChefItemPress =(chef) =>{
    //do not send data from home rather fetch it by id of chef in [id].js file
      router.push({pathname:`/menu/[id]`, params:chef});
  }
  const numOfColumnsForWeb=Platform.OS=='web'? 3:1;

  return (
    <SafeAreaView style={{flex:1,backgroundColor: "white",paddingTop : Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
    <Stack.Screen
        options={{
          headerStyle: { },
          headerTitle:"Home",
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : () => (
            <TouchableOpacity style={styles.editButton} onPress={()=>{router.push('/cart')}}>
              <FontAwesome5 name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={chefs}
        renderItem={({ item }) => <ChefCard chef={item} onPress={handleChefItemPress} />}
        keyExtractor={(item) => item.id}
        numColumns={numOfColumnsForWeb}
        columnWrapperStyle={Platform.OS === 'web' && styles.columnWrapper}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

export default menu

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 10,
    marginRight : 10,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  toggleButton: {
    position: 'absolute',
    left : 20,
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  addButtonLabel: {
    fontSize: 16,
    color: '#2E8B57',
  },
    category: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop : 10,
      marginBottom : 5,
      paddingHorizontal: 10,
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth : 1,
      borderBottomColor: '#ddd',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      color: 'green',
    },
    description: {
      fontSize: 14,
      color: '#777',
    },
    list: {
      alignItems: Platform.OS === 'web' ? 'center' : 'stretch', // Center align items on the web
    },
    columnWrapper: {
      justifyContent: 'space-between', // Space out cards evenly in a row on the web
    },
});