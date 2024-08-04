// import { View, Text, StyleSheet, Image, TouchableOpacity,Pressable, StatusBar } from 'react-native';
// import React from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from "react-redux";
// import { removeUser } from '../../../redux/Userreducer';
// import {  useSelector } from "react-redux";
// import { router } from 'expo-router';
// import { supabase } from '../../../supabase';

// const profile = () => {
//   const dispatch=useDispatch();
//   const userDetails = useSelector((state)=>state.user);
//   console.log('reduxuser',userDetails);
//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       console.log("sign out clicked")
//         AsyncStorage.removeItem("chefId")
//         AsyncStorage.removeItem("chefEmail")
//         dispatch(removeUser())
//         router.replace("/(authentication)/login")
//     } catch (error) {
//       console.error('Error signing out :', error.message);
//     }
//   };
//   return (
//     <View style={styles.container}>
//           <View style={styles.profileHeader}>
//             <Image
//               source={{ uri: 'https://imgs.search.brave.com/e5nnmdAutkKk7zJRmtZ4Gg-wXLV4QA3LDVNgGm4VXVo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdC5k/ZXBvc2l0cGhvdG9z/LmNvbS8xMDc1OTQ2/LzM1MjYvaS80NTAv/ZGVwb3NpdHBob3Rv/c18zNTI2MTE0NS1z/dG9jay1waG90by1j/aGVmcy1wcmVwYXJp/bmctZGVsaWNhdGVz/c2VuLWRpc2hlcy5q/cGc' }} // Replace with restaurant logo URL
//               style={styles.logo}
//             />
//             <Text style={styles.restaurantName}>Nawabs Restaurant</Text>
//           </View>
        
//           <View style={styles.profileDetails}>
//             <Text style={styles.label}>Location :</Text>
//             <Text style={styles.value}>123 Main Street, City, Country</Text>
//             <Text style={styles.label}>Contact :</Text>
//             <Text style={styles.value}>{userDetails.email}</Text>
//             <Text style={styles.value}>+1 234 567 890</Text>
//             <TouchableOpacity style={styles.editButton}>
//               <Text style={styles.editButtonText}>Edit Profile</Text>
//             </TouchableOpacity>
//         </View>
//         <Pressable  onPress={()=> signOut()} style={{height  : 50,backgroundColor :'green',borderRadius :10,alignItems :'center',justifyContent :'center',alignSelf : "center",marginTop  :10}}>
//           <Text style={{color :'white'}}>LOG OUT</Text>
//         </Pressable>
//       </View>
//   )
// }

// export default profile

// const styles = StyleSheet.create({
//   container : {
//     flex : 1,
//     backgroundColor : '#FFFFFF',
//     padding : 20,
//   },
//   profileHeader : {
//     flexDirection : 'row',
//     alignItems : 'center',
//     marginBottom : 20,
//   },
//   logo : {
//     width : 100,
//     height : 100,
//     borderRadius : 50,
//     marginRight : 20,
//   },
//   restaurantName : {
//     fontSize : 24,
//     fontWeight : 'bold',
//   },
//   profileDetails : {
//     marginBottom : 20,
//   },
//   label : {
//     fontSize : 16,
//     fontWeight : 'bold',
//     marginBottom : 5,
//   },
//   value : {
//     fontSize : 16,
//     marginBottom : 10,
//   },
//   editButton : {
//     backgroundColor : '#2E8B57',
//     borderRadius : 10,
//     paddingVertical : 10,
//     paddingHorizontal : 20,
//     alignItems : 'center',
//   },
//   editButtonText : {
//     fontSize : 16,
//     fontWeight : 'bold',
//     color : '#FFFFFF',
//   },
// });
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const user = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  recentOrders: [
    { id: '1', name: 'Margherita Pizza', date: '2023-06-01', price: 12.99 },
    { id: '2', name: 'Spaghetti Carbonara', date: '2023-05-28', price: 14.99 },
    { id: '3', name: 'Caesar Salad', date: '2023-05-25', price: 8.99 },
  ],
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <FlatList
          data={user.recentOrders}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderName}>{item.name}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text style={styles.orderPrice}>${item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorites</Text>
        <FlatList
          data={user.favorites}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              <Text style={styles.favoriteName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.settingText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={()=>{
          router.push('/favorite')
        }}>
          <FontAwesome5 name="bell" size={24} color="black" />
          <Text style={styles.settingText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="cog" size={24} color="black" />
          <Text style={styles.settingText}>Preferences</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderName: {
    fontSize: 16,
  },
  orderDate: {
    fontSize: 14,
    color: 'gray',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteItem: {
    marginRight: 10,
  },
  favoriteImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  favoriteName: {
    textAlign: 'center',
    marginTop: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
