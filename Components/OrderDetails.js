import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderDetails = (order) => {
  const [orderStatus, setOrderStatus] = useState('accepted');
  console.log("order",order);
  const handleStatusChange = (status) => {
    setOrderStatus(status);
    // Here you can also send an API request to update the order status on the server
  };

  dayjs.extend(relativeTime);

  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order :{order.item.id}</Text>
      <Text style={styles.details}>Order Placed At : {dayjs(order.item.created_at).fromNow()}</Text>
      <Text style={styles.details}>User Id : {order.item.user_id}</Text>
      <Text style={styles.details}>Items :</Text>
      <View style={styles.itemsList}>
          {order.item.order_items.map((item,index)=>(
            <View key={index} style={{flexDirection:'row'}}>
            <Text>{item.products}-</Text>
            <Text>{item.quantity}x-</Text>
            <Text>{item.size}-size</Text>
            </View>
          ))}
      </View>
      <Text style={styles.details}>Total : ${order.item.total}</Text>
      <Text style={styles.details}>Status : {orderStatus}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Accepted"
          onPress={() => handleStatusChange('accepted')}
        />
        <Button
          title="Preparing"
          onPress={() => handleStatusChange('preparing')}
        />
        <Button
          title="Done"
          onPress={() => handleStatusChange('done')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#FFFFFF',
    borderRadius : 10,
    padding : 15,
    marginVertical : 10,
    marginHorizontal :10,
    elevation : 3, // for shadow on Android
    shadowColor : '#000000', // for shadow on iOS
    shadowOpacity : 0.2, // for shadow on iOS
    shadowOffset : {
      width : 0,
      height : 2,
    },
  },
  orderId : {
    fontSize : 20,
    fontWeight : 'bold',
    marginBottom : 10,
  },
  details : {
    fontSize : 16,
    marginBottom : 5,
  },
  itemsList : {
    marginLeft : 15,
    marginBottom : 10,
  },
  buttonContainer : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    marginTop : 20,
  },
});

export default OrderDetails;
