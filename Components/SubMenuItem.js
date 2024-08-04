import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MenuCard from './MenuCard';
import { AntDesign } from '@expo/vector-icons';

const SubMenuItem = ({item ,restaurantId}) => {
    const subMenuItem=[item];
    console.log('sub',subMenuItem[0].items)
  return (
    <View>
        {subMenuItem?.map((item,index)=>(
          <>
            <Pressable key={index} style={{flexDirection : 'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:20,fontWeight:'700'}}>{item?.name}</Text>
              <Text style={{fontSize:20,fontWeight:'700'}}>({item?.items?.length})</Text>
              </View>
              <AntDesign name="down" size={24} color="black"/>
            </Pressable>
            {item?.items?.map((item,index)=>(
              <MenuCard key={index} item={item} restaurantId={restaurantId} />
            ))}
          </>
        ))}
    </View>
  )
}

export default SubMenuItem