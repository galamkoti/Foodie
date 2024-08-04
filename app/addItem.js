import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useInsertProduct } from './api/products';
import { supabase } from '../supabase';

const AddItemPage = () => {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [sizePrice, setSizePrice] = useState('');
  const [userId, setUserId] = useState(null);
  
  const [openCategory, setOpenCategory] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [categories, setCategories] = useState([
    { label  : 'Appetizers', value  : 'Appetizers' },
    { label  : 'Main Courses', value  : 'Main Courses' },
    { label  : 'Desserts', value  : 'Desserts' }
  ]);
  const [sizes, setSizes] = useState([
    { label  : 'S', value  : 'S' },
    { label  : 'M', value  : 'M' },
    { label  : 'L', value  : 'L' }
  ]);

  const { mutate } = useInsertProduct();

  useEffect(() => {
    const fetchChefData = async () => {
      const { data  : chefIdNotInProfile } = await supabase
        .from('chefsTable')
        .select('id')
        .eq('owner_id', userId)
        .single();
      console.log('chefIdNotInProfile', chefIdNotInProfile.id);
      const { data, error } = await supabase
        .from('menuTable')
        .select('*')
        .eq('chefId', chefIdNotInProfile.id);
      if (error) {
        console.error('Error fetching menuTable data  :', error);
      } else {
        console.log('menuTable data  :', data);
      }
    };

    if (userId) {
      fetchChefData();
    }
  }, [userId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes  : ImagePicker.MediaTypeOptions.Images,
      allowsEditing  : true,
      aspect  : [4, 3],
      quality  : 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddItem = () => {
    mutate({
      item  : itemName,
      price  : parseFloat(itemPrice),
      category,
      image,
      description  : itemDescription,
      quantity  : itemQuantity,
    });

    console.log('Item added  :', {
      name  : itemName,
      description  : itemDescription,
      price  : itemPrice,
      quantity  : itemQuantity,
      category,
      size,
      sizePrice,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title  : 'Create Item' }} />
      <View style={styles.container}>
        <View>
          {image ? (
            <Image source={{ uri  : image }} style={styles.defaultImage} />
          )   : (
            <Image source={require('../assets/defaultImage.png')} style={styles.defaultImage} />
          )}
          <Text onPress={pickImage} style={styles.selectImageBtn}>
            Select Image
          </Text>
        </View>
        <Text style={styles.label}>Item Name   :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
        />
        <Text style={styles.label}>Description   :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item description"
          value={itemDescription}
          onChangeText={setItemDescription}
        />
        <Text style={styles.label}>Price   :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={itemPrice}
          onChangeText={setItemPrice}
        />
        <Text style={styles.label}>Quantity   :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={itemQuantity}
          onChangeText={setItemQuantity}
        />
        <Text style={styles.label}>Category   :</Text>
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categories}
          setOpen={setOpenCategory}
          setValue={setCategory}
          setItems={setCategories}
          placeholder="Select category"
          containerStyle={styles.dropdown}
          zIndex={3000}
          zIndexInverse={1000}
        />
        {/* <Text style={styles.label}>Size   :</Text>
        <DropDownPicker
          open={openSize}
          value={size}
          items={sizes}
          setOpen={setOpenSize}
          setValue={setSize}
          setItems={setSizes}
          placeholder="Select size"
          containerStyle={styles.dropdown}
          zIndex={2000}
          zIndexInverse={2000}
        /> */}
        <Text style={styles.label}>Size Price   :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter size price"
          keyboardType="numeric"
          value={sizePrice}
          onChangeText={setSizePrice}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container  : {
    flex  : 1,
    padding  : 20,
  },
  label  : {
    fontSize  : 16,
    fontWeight  : 'bold',
    marginBottom  : 5,
  },
  input  : {
    height  : 40,
    borderColor  : '#CCCCCC',
    borderWidth  : 1,
    borderRadius  : 5,
    marginBottom  : 20, // Ensure spacing between elements
    paddingHorizontal  : 10,
  },
  dropdown  : {
    marginBottom  : 20,
  },
  selectImageBtn  : {
    alignSelf  : 'center',
    fontWeight  : 'bold',
    fontSize  : 24,
  },
  addButton  : {
    backgroundColor  : '#2E8B57',
    borderRadius  : 10,
    paddingVertical  : 10,
    alignItems  : 'center',
    marginBottom  : 20,
  },
  buttonText  : {
    color  : '#FFFFFF',
    fontSize  : 16,
    fontWeight  : 'bold',
  },
  defaultImage  : {
    height  : 200,
    width  : 200,
    alignSelf  : 'center',
  },
});

export default AddItemPage;
