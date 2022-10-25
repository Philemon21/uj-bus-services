
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from '@react-navigation/core';
import React, { useEffect,setState, useState } from 'react';
import {KeyboardAvoidingView,ActivityIndicator,TouchableOpacity,TextInput,StyleSheet, Text, View,Image, Alert, Modal, Pressable } from 'react-native';
import { authentication ,db} from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import TabOneScreen from './TabOneScreen';
import { collection, doc, setDoc,addDoc } from "firebase/firestore"; 
//DONT FORGET EMAIL VERIFIER
//DON'T FORGET LOADING
export default function LoginScreen() {
  const [modalVisible, setModalVisible] = useState(false);
   //var   [isLoading,setIsLoading]=useState(null);
  const [isSignedIn,setIsSignedIn]=useState(false);
  //Text input states
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  //For dataBase
  const [phoneNumber,setPhoneNumber]=useState('');
  const [IdNumber,setIdNumber]=useState('');

  const navigation = useNavigation();

  const registerUser =()=>{
  
  addDoc(collection(db, "users"), {
    IdNumber: IdNumber,
    PhoneNumber: phoneNumber,
    Email: email,
  }).then(()=>{
 
    //Data saved succesfully!!
    console.log('data users studentInfo submitted');
   
  }).catch((error)=>{
    console.log(error);
    alert('signed up')
  });
  createUserWithEmailAndPassword(authentication,email,password)
  .then((re)=>{
    console.log(re);
    
  })
  .catch((err)=>{
    console.log(err);
    alert(err.message);
    
  })
}

//Login

const handleLogin=()=>{
 
  signInWithEmailAndPassword(authentication,email,password)
  .then((re) =>{
    console.log(re);
    alert('logged in');
  })

  .catch((re)=>{
    console.log(re);
    alert(re.message);
  })
}

useEffect(()=>{
  const unsubscribe=authentication.onAuthStateChanged(user=>{
    if(user){
    
      navigation.replace("Root")
    }
  })
  return unsubscribe
},[])

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding">
      
   
      {/*isLoading!=false && isLoading!=null && <ActivityIndicator size="large" color="#7000FF" />*/}
      <Image
       style={styles.forImageBack}
       source={require("../assets/images/backHomeAf.jpg")}
       
      />
      <Image
       style={styles.forImage}
       source={require("../assets/images/logo.png")}
       
      />
    
      <View style={styles.forDarkBack}></View>
      <Text style={styles.title}>UJ BUS SERVICES</Text>
    <View style={styles.inputContainer}>
      
      <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={text=>setEmail(text)}/>
      <TextInput style={styles.input} placeholder='Password' value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/>
      
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonx}
        onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
          
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        
        style={styles.buttonxr}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sign Up!</Text>
      <TextInput style={styles.input} placeholder='email' value={email} onChangeText={text=>setEmail(text)}/>
      <TextInput style={styles.input} placeholder='password' value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/>
      <TextInput  style={styles.input} placeholder='student number' value={IdNumber} onChangeText={text=>setIdNumber(text)}/>
      <TextInput maxLength={10} style={styles.input} placeholder='PhoneNumbers' value={phoneNumber} onChangeText={text=>setPhoneNumber(text)}/>
      <TouchableOpacity
        onPress={registerUser}
        
        style={styles.buttonx}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
            <Pressable
              style={styles.buttonx}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      </TouchableOpacity>
      
      </View>
      
    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonxr:{
    backgroundColor:'rgba(0,0,0,0.7)',
    borderColor:'#0782F9',
    paddingHorizontal:30,
    padding:10,
    borderRadius:10,
    alignItems:'center',
    margin:12,
  },
  buttonx:{
    backgroundColor:'#0782F9',
    paddingHorizontal:40,
    padding:15,
    borderRadius:10,
    alignItems:'center',
    margin:12,
  },
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
  },
  //button for fb
  buttonF:{
    backgroundColor:'rgba(0,0,0,0.7)',
    paddingHorizontal:40,
    padding:15,
    borderRadius:10,
    alignItems:'center',
  },
  //Button Container for fb
  buttonOutlineF:{
    backgroundColor:'rgba(0,0,0,0)',
    marginTop:5,
    borderColor:'#0782F9',
    borderWidth:1.3,
  },
  //Button text for fb
  buttonOutlineTextF:{
    color:'#0782F9',
    fontWeight:'600',
    fontSize:16
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'lightgrey',
    marginTop:10,
    marginBottom:5,
  },
  forDarkBack: {
   
    backgroundColor:'rgba(0,0,0,0.5)',
    width:'100%',
    height:'100%',
    position:'absolute',
    
  },
  forImageBack:{
    width:"100%",
    height:'100%',
    paddingTop:70,
    position:'absolute',
  },
  //Gmail Button
  buttonGmail:{
    paddingHorizontal:40,
    padding:15,
    borderRadius:10,
    alignItems:'center',
  },
  //Button text for Gmail  
  buttonOutlineTextGmail:{
    fontWeight:'600',
    color:'orange',
  },
  //Button Container for gmail
  buttonOutG:{
    backgroundColor:'rgba(0,0,0,0)',
    marginTop:5,
    borderColor:'orange',
    borderWidth:1.3,
  },
  inputContainer:{
    width:'100%',
    justifyContent: 'center',
    
  },
  //TextInput for both email and password
  input:{
    backgroundColor:'white',
    width:400,
    paddingVertical:10,
    marginTop:5,
    textAlign:'center',
  },
  //All button Container
  buttonContainer:{
    width:'105%',
    justifyContent:'center',
    marginTop:40,
    position:'relative',
  },
  //Button for Login In
  button:{
    backgroundColor:'rgba(0,0,0,0.7)',
    paddingHorizontal:40,
    padding:15,
    borderRadius:10,
    alignItems:'center',
    
  },
  //Button for Sign Up
  buttonOutline:{
    backgroundColor:'rgba(0,0,0,0)',
    marginTop:5,
    borderColor:'#698',
    borderWidth:1.3,
  },
  //Button text for login in
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
    paddingHorizontal:10,
  },
  //Button text for Sign Up
  buttonOutlineText:{
    color:'#698',
    fontWeight:'600',
    fontSize:16
  },
  //Logo
  forImage:{
    width:142,
    height:120,
    paddingTop:70,
    justifyContent:'center',
    borderRadius:10,
  },
  /////////////////////
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttton: {
    borderRadius: 3,
    padding: 10,
    elevation: 2,
    marginTop:12
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

