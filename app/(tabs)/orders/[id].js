import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderListItem from '../../../Components/OrderListItem';
import OrderItemListItem from '../../../Components/OrderItemListItem';
import dayjs from 'dayjs';
import { OrderStatusList } from '../../types';
import Colors from '../../../Constants/Colors';

const OrderDetailScreen = () => {
    const now = dayjs();
  const { id } = useLocalSearchParams();
  const orders = [
    {
      id: 23123,
      created_at: now.subtract(1, 'hour').toISOString(),
      total: 31.4,
      status: 'Cooking',
      user_id: '1',
      order_items: [
        {
          id: 1,
          order_id: 23123,
          size: 'M',
          quantity: 2,
          product_id: 8384323081,
          name: "Gulab Jamun",
          price:17.568,
          image:'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
        },
        {
          id: 2,
          order_id: 23124,
          size: 'L',
          quantity: 3,
          price:18,
          product_id: 32174974,
          name: "Ras Malai",
          image:'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
        },
      ],
    },
    {
      id: 32145,
      created_at: now.subtract(3, 'days').toISOString(),
      total: 11.4,
      status: 'Delivered',
      user_id: '2',
      order_items: [
        {
          id: 1,
          order_id: 32145,
          size: 'M',
          quantity: 2,
          product_id: 32174974,
          price:17,
          image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
          name: "Ras Malai",
        },
      ],
    },
    {
      id: 23445,
      created_at: now.subtract(3, 'weeks').toISOString(),
      total: 11.4,
      status: 'Delivered',
      user_id: '3',
      order_items: [
        {
          id: 1,
          order_id: 23445,
          size: 'M',
          quantity: 1,
          product_id: 32174974,
          price:17,
          image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
          name: "Ras Malai",
        },
        {
          id: 2,
          order_id: 23445,
          size: 'M',
          quantity: 1,
          product_id: 32174974,
          price:17,
          image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
          name: "Ras Malai",
        },
        {
          id: 3,
          order_id: 23445,
          size: 'L',
          quantity: 1,
          product_id: 32174974,
          price:17,
          image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
          name: "Ras Malai",
        },
      ],
    },
  ];

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={()=>(
                <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => console.warn('Update status')}
                            style={{
                            borderColor: Colors.light.tint,
                            borderWidth : 1,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 10,
                            backgroundColor:
                                order.status === status
                                ? Colors.light.tint
                                : 'transparent',
                            }}
                        >
                            <Text
                            style={{
                                color:
                                order.status === status ? 'white' : Colors.light.tint,
                            }}
                            >
                            {status}
                            </Text>
                        </Pressable>
                        ))}
                    </View>
                    </>
             )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;