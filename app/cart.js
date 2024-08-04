import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import CartItem from '../Components/CartItem';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';

export default function CartScreen() {
  const cartItems = useSelector(state => state.cart.items);
  const [instructions, setInstructions] = useState('');
  const [donation, setDonation] = useState('0');
  const govTaxRate = 0.1; // 10% government tax
  const siteTaxRate = 0.05; // 5% website tax

  const calculateItemTotal = (item) => item.price * item.quantity;
  const calculateSubtotal = () => cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  const subtotal = calculateSubtotal();
  const govTax = subtotal * govTaxRate;
  const siteTax = subtotal * siteTaxRate;
  const donationAmount = parseFloat(donation) || 0;
  const total = subtotal + govTax + siteTax + donationAmount;

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Animated.Image
            entering={FadeInUp.delay(200).duration(2000).springify().damping(3)}
            source={{ uri: 'https://tse2.mm.bing.net/th?id=OIP.eUSVoabMqQhdjIrpfspHvgHaHa&pid=Api&P=0&h=220' }}
            style={styles.emptyCartImage}
          />
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.subtotalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
              <Text style={styles.taxText}>Government Tax: ${govTax.toFixed(2)}</Text>
              <Text style={styles.taxText}>Website Tax: ${siteTax.toFixed(2)}</Text>
              <View style={styles.donationContainer}>
                <Text style={styles.donationText}>Donation for the Needy:</Text>
                <TextInput
                  style={styles.donationInput}
                  value={donation}
                  onChangeText={setDonation}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
              <Text style={styles.totalText}>Add Instructions:</Text>
              <TextInput
                style={styles.instructionsInput}
                placeholder="Additional instructions"
                value={instructions}
                onChangeText={setInstructions}
                multiline
              />
              <TouchableOpacity style={styles.checkoutButton} onPress={()=>{
                router.push('/payment')
              }}>
                <Text style={styles.checkoutButtonText}>Proceed to Pay ${total.toFixed(2)}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    width : 200,
    height : 200,
    marginBottom : 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: 'gray',
  },
  footer: {
    marginTop : 20,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  taxText: {
    fontSize: 16,
    marginVertical: 5,
  },
  donationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  donationText: {
    fontSize: 16,
  },
  donationInput: {
    borderWidth : 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginLeft : 10,
    width : 100,
    textAlign: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  instructionsInput: {
    borderWidth : 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop 
    : 10,
  },
  payButton:{
    flex:1,
    backgroundColor:'green',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    marginTop : 10,
    padding:10
  },
  payButtonText:{
    fontSize:24,
    fontWeight:'bold',
    color:'white',
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop : 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

