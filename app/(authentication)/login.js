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
  import React, { useEffect, useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import { supabase} from '../../supabase';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import HorizontalLine from "../../Components/HorizontalLine";
  import { useDispatch } from "react-redux";
import { addUser } from "../../redux/Userreducer";
import Animated ,{FadeInUp,FadeIn} from 'react-native-reanimated';
  
  const login = () => {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const router = useRouter();
      const dispatch=useDispatch();
      async function getGroupdataDetails(profileId){
          const {data,error}=await supabase.from('profiles').select('group').eq('id',profileId).single();
          if(data!=null){
            console.log("data",data.group)
            return data.group;
          }
      }
      useEffect(() => {
          const checkLogin = async () => {
              try{
                  const chefId = await AsyncStorage.getItem("chefId");
                  const chefEmail = await AsyncStorage.getItem("chefEmail");
                  if(chefId){
                    dispatch(addUser({chefId,chefEmail}))
                    router.replace("/(tabs)/menu")
                  }
              } catch(error){
                  console.log(error)
              }
          }
          checkLogin();
      },[]);
      async function signInWithEmail(){
        const {data,error} = await supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
        if(error){
          Alert.alert('User Does not Exist OR Invalid Credentials')
          return;
        }
        if(data?.session!=null || data?.user!=null){
            const groupData=await getGroupdataDetails(data.user.id);
            console.log('groupdata',groupData)
            if(groupData!='chef'){
              console.log("grou",groupData)
              Alert.alert("You are a not a chef")
              return;
            }
            const chefId=data?.user?.id;
            const chefEmail=data?.user?.email;
            await AsyncStorage.setItem("chefId",chefId)
            await AsyncStorage.setItem("chefEmail",chefEmail)
            dispatch(addUser({chefId,chefEmail}))
            router.replace("/(tabs)/menu")
            }
        }
    return (
      <Animated.View entering={FadeInUp.duration(1000)}
        style={{backgroundColor : "white", alignItems : "center" ,height :'100%'}}
      >
        <Animated.Image entering={FadeInUp.delay(200).duration(2000).springify().damping(3)} source={{uri:'https://chef5-images.s3.eu-central-1.amazonaws.com/public/deca-food-tech-logo.png'}} style={{height : 200,width : 200}} />
        
        <KeyboardAvoidingView>
        <View style={{marginRight : '70%'}}>
        <Text style={{ fontSize : 24, textAlign : "center", fontWeight : "bold",color:'green'}}>
           Login
          </Text>
        </View>
          <View>
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
              onPress={signInWithEmail}
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
            <Text style={{textAlign :"center",fontWeight :"bold",fontSize :16,color :"white"}}>Sign In</Text>
          </Pressable>
        </View>
          <Pressable onPress={() => router.replace("/register")} style={{marginTop :30}}>
              <Text style={{textAlign :"center",color :"green",fontSize :16}}>Don't have an Account? Sign Up</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }
  export default login;
  
  const styles = StyleSheet.create({});