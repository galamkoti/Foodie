import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Image
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons,Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase} from '../../supabase';
import HorizontalLine from "../../Components/HorizontalLine";
import Animated ,{FadeInUp,FadeOut} from 'react-native-reanimated';

const login = () => {
    const fetchData = async (profileId,email) => {
      try {
        const {data,error}=await supabase.from('profiles').update({group:'chef',email:email}).eq('id',profileId);
        console.log('profiles',data)
      } catch (error) {
        console.error('Failed to update profile group:', error);
      }
    };
    // Call the inner async function immediately
  const [phoneNo, setPhoneNo] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    async function signUpNewUser() {
            const { data, error } = await supabase.auth.signUp({
              email : email,
              password : password,
              phone : phoneNo,
            });
            if(error){
              Alert.alert("Error while registering","please try again")
              return;
          }
          const profileId=data?.user?.id;
          if(profileId!=null){
            fetchData(profileId,data?.user?.email);
          }
            if(data?.user?.role == "authenticated"){
                Alert.alert("You have been successfully registered","please check your email for confirmation")
                setEmail('');
                setPhoneNo('');
                setPassword('');
            }
      }
  return (
    <Animated.View entering={FadeInUp.duration(1000)}
      style={{backgroundColor : "white", alignItems : "center" ,height :'100%'}}
    >
      <Animated.Image entering={FadeInUp.delay(200).duration(2000).springify().damping(3)} source={{uri:'https://chef5-images.s3.eu-central-1.amazonaws.com/public/deca-food-tech-logo.png'}} style={{height : 200,width : 200}} />
      
      <KeyboardAvoidingView>
      <View style={{marginRight : '50%'}}>
      <Text style={{ fontSize : 24, textAlign : "center", fontWeight : "bold",color:'green'}}>
         Register Here
        </Text>
      </View>
        <View style={{ }}>
           <View
              style={{
                flexDirection : "row",
                alignItems : "center",
                gap : 5,
                paddingVertical : 5,
                borderRadius : 5,
                marginTop : 30,
              }}
            >
              <Ionicons
                name="call"
                size={24}
                color="green"
                style={{ marginLeft : 8 }}
              />
              <TextInput
                value={phoneNo}
                onChangeText={(text) => setPhoneNo(text)}
                style={{ color : "green", width : 300 ,fontSize : 18}}
                placeholder="Enter your Mobile"
              />
            </View>
            <HorizontalLine />
          <View
            style={{
              flexDirection : "row",
              alignItems : "center",
              gap : 5,
              paddingVertical : 5,
              borderRadius : 5,
              marginTop : 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft : 8 }}
              name="email"
              size={24}
              color="green"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color : "green", width : 300 ,fontSize : 18}}
              placeholder="Enter Your Email"
              placeholderTextColor="gray"
            />
           
          </View>
            <HorizontalLine />
          <View
            style={{
              flexDirection : "row",
              alignItems : "center",
              gap : 5,
              // backgroundColor : "#E0E0E0",
              paddingVertical : 5,
              borderRadius : 5,
              marginTop : 30,
            }}
          >
            <AntDesign
              style={{ marginLeft : 8 }}
              name="lock"
              size={24}
              color="green"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{ color : "green", width : 300 ,fontSize :20}}
              placeholder="Enter Your Password"
              placeholderTextColor="gray"
            />
          </View>
        <HorizontalLine />
        </View>
        <View
          style={{
            flexDirection : "row",
            alignItems : "center",
            justifyContent : "space-between",
            marginTop : 12,
          }}
        >
        </View>
  <View style={{justifyContent : 'center',flexDirection : 'row'}}>
      <Pressable
            onPress={signUpNewUser}
              style={{
                width : '70%',
                backgroundColor : "green",
                borderRadius : 6,
                marginLeft : "auto",
                marginRight : "auto",
                padding : 15,
                marginTop :50
              }}
            >
          <Text style={{textAlign :"center",fontWeight :"bold",fontSize :16,color :"white"}}>Sign Up</Text>
        </Pressable>
    </View>
    <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop : 30 }}
          >
            <Text style={{ textAlign : "center", color : "green", fontSize : 16 }}>
              Already have an Account? Sign In
            </Text>
          </Pressable>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default login;

const styles = StyleSheet.create({});