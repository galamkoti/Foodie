import { View, Text, ScrollView,StatusBar, FlatList } from 'react-native'
import React from 'react'
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import OrderListItem from '../../../../Components/OrderListItem';

const now = dayjs();

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
        products: "Gulab Jamun",
      },
      {
        id: 2,
        order_id: 23124,
        size: 'L',
        quantity: 3,
        product_id: 32174974,
        products: "Ras Malai",
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
        products: "Ras Malai",
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
        products: "Ras Malai",
      },
      {
        id: 2,
        order_id: 23445,
        size: 'M',
        quantity: 1,
        product_id: 32174974,
        products: "Ras Malai",
      },
      {
        id: 3,
        order_id: 23445,
        size: 'L',
        quantity: 1,
        product_id: 32174974,
        products: "Ras Malai",
      },
    ],
  },
];
const index = () => {
  return (
    <>
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  </>
  );
}
export default index;