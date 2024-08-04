import React, { useState } from 'react';
import { Text,View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {Stack, useLocalSearchParams} from 'expo-router'
import { Platform } from 'react-native';

const AddItemPage = () => {
  const item=useLocalSearchParams();
  const [image,setImage]=useState(item.image);
  const [itemName, setItemName] = useState(item.item);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);
  const [size, setSize] = useState(item.size);
  const [sizePrice, setSizePrice] = useState(item.size_price);

const showAlert = (title, message, onPress) => {
  if (Platform.OS === 'web') {
    const result = window.confirm(`${title}\n\n${message}`);
    if (result) {
      onPress();
    }
  } else {
    Alert.alert(title, message, [{ text: 'OK', onPress: onPress },{ text :'CANCEL'}]);
  }
};

const confirmDelete = () => {
  showAlert('DELETE ITEM', 'Are you sure to delete this product', onDelete);
};

const onDelete=()=>{
  console.warn("Product DELETED")
}
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddItem = () => {
    // Logic to add item to database or perform other actions
    console.log('Item added :', {
      name : itemName,
      price : itemPrice,
      quantity : itemQuantity,
      category,
      size,
      sizePrice,
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{title:'Update Item'}} />
      <View style={styles.container}>
      <View>
        {image!=null? <Image source={{uri:image}} style={styles.defaultImage}/> :
        <Image source={require('../assets/defaultImage.png')} style={styles.defaultImage}/>}
        <Text onPress={pickImage} style={styles.selectImageBtn}>Select Other Image</Text>
      </View>
      <Text style={styles.label}>Item Name :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />
      <Text style={styles.label}>Price :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={itemPrice}
        onChangeText={setItemPrice}
      />
      <Text style={styles.label}>Quantity :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={itemQuantity}
        onChangeText={setItemQuantity}
      />
      <Text style={styles.label}>Category :</Text>
      <Picker
        style={styles.input}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Select category" value="" />
        <Picker.Item label="Appetizers" value="Appetizers" />
        <Picker.Item label="Main Courses" value="Main Courses" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <Text style={styles.label}>Size :</Text>
      <Picker
        style={styles.input}
        selectedValue={size}
        onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
      >
        <Picker.Item label="Select size" value="" />
        <Picker.Item label="S" value="S" />
        <Picker.Item label="M" value="M" />
        <Picker.Item label="L" value="L" />
      </Picker>
      <Text style={styles.label}>Size Price :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter size price"
        keyboardType="numeric"
        value={sizePrice}
        onChangeText={setSizePrice}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Update Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={confirmDelete}>
        <Text style={styles.buttonText}>Delete Item</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    padding : 20,
  },
  label : {
    fontSize : 16,
    fontWeight : 'bold',
    marginBottom : 5,
  },
  input : {
    height : 40,
    borderColor : '#CCCCCC',
    borderWidth : 1,
    borderRadius : 5,
    marginBottom : 10,
    paddingHorizontal : 10,
  },
  selectImageBtn:{
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:24
  },
  addButton : {
    backgroundColor : '#2E8B57',
    borderRadius : 10,
    paddingVertical : 10,
    alignItems : 'center',
    marginBottom : 20,
  },
  buttonText : {
    color : '#FFFFFF',
    fontSize : 16,
    fontWeight : 'bold',
  },
  defaultImage:{
    height :200,
    width :200,
    alignSelf:'center'
  }
});

export default AddItemPage;
