import { StyleSheet ,Image, TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import {useState} from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { authentication,db } from '../firebase/firebase-config';
import { RootTabScreenProps } from '../types';
import {useNavigation} from '@react-navigation/core';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { collection,doc, setDoc,addDoc, getDoc, snapshotEqual } from "firebase/firestore"; 
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const navigationn = useNavigation();
  const [productType,setProductType]=useState('');
  const [DataTableLast,setDataTableLast]=useState( [[<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>,<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>,<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>, <Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>, <Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>,<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>]])
  const [HeadTable,setHeadTable]=useState( ['Soweto\nDepart', 'Kings\nArrive', 'Kings\nDepart', 'Bunting\nDepart', 'Kings\nDepart','Soweto\nArrive'])
  const [DataTable,setDataTable]=useState( [

    [<Text style={{color:'#D2D3D3'}}>Depart</Text>,<Text style={{color:'#D2D3D3'}}>Arrive</Text>,<Text style={{color:'#D2D3D3'}}>Depart</Text>,<Text style={{color:'#D2D3D3'}}>Depart</Text>,<Text style={{color:'#D2D3D3'}}>Depart</Text>,<Text style={{color:'#D2D3D3'}}>Arrive</Text>],
    [<Text style={{color:'white'}}>06:10</Text>,<Text>06:50</Text>,<Text>06:55</Text>,<Text>07:10</Text>,<Text>--------</Text>,<Text>07:50</Text>],
    [<Text style={{color:'white'}}>06:30</Text>,<Text>07:10</Text>,<Text>07:15</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>08:10</Text>],
    [<Text style={{color:'white'}}>06:50</Text>,<Text>07:30</Text>,<Text>07:35</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>08:30</Text>],
    [<Text style={{color:'white'}}>07:10</Text>,<Text>07:50</Text>,<Text>07:55</Text>,<Text>08:10</Text>,<Text>--------</Text>,<Text>08:50</Text>],
    [<Text style={{color:'white'}}>07:30</Text>,<Text>08:10</Text>,<Text>08:15</Text>,<Text>08:30</Text>,<Text>--------</Text>,<Text>09:10</Text>],
    [<Text style={{color:'white'}}>07:40</Text>,<Text>08:20</Text>,<Text>08:25</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>09:20</Text>],
    [<Text style={{color:'white'}}>07:50</Text>,<Text>08:30</Text>,<Text>08:35</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>09:30</Text>],
    [<Text style={{color:'white'}}>08:00</Text>,<Text>08:40</Text>,<Text>08:45</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>09:40</Text>],
    [<Text style={{color:'white'}}>08:15</Text>,<Text>08:55</Text>,<Text>09:00</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>09:55</Text>],
    [<Text style={{color:'white'}}>08:35</Text>,<Text>09:10</Text>,<Text>09:15</Text>,<Text>--------</Text>,<Text>--------</Text>,<Text>10:10</Text>],
    [<Text style={{color:'white'}}>08:55</Text>,<Text>09:30</Text>,<Text>09:35</Text>,<Text>09:50</Text>,<Text>--------</Text>,<Text>10:30</Text>],
    [<Text style={{color:'white'}}>09:15</Text>,<Text>09:50</Text>,<Text>09:55</Text>,<Text>10:10</Text>,<Text>--------</Text>,<Text>10:50</Text>],
    /*[<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>, <Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>,<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>, <Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>, <Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>,<Text style={{fontSize:17,color:'#D2D3D3'}}>LastBus</Text>],
    [mondayLast!=null &&<Text>{mondayLast.MondayLast}</Text>, tuesdayLast!=null &&<Text>{tuesdayLast.TuesdayLast}</Text>, wednesdayLast!=null &&<Text>{wednesdayLast.WednesdayLast}</Text>, thursdayLast!=null &&<Text>{thursdayLast.ThursdayLast}</Text>, fridayLast!=null &&<Text>{fridayLast.FridayLast}</Text>, sartudayLast!=null &&<Text>{sartudayLast.SartudayLast}</Text>],
    */
      
  ])
  const handleSignOut=()=>{
    authentication
    .signOut()
    .then(()=>{
      navigationn.replace("Login")
    })
    .catch(error=>alert(error.message))
  }
  const bookFunction=()=>{
    addDoc(collection(db, "DataBaseBooked"), {
      //email
      //id
      //phoneNumber
      ProductType: productType,
    }).then(()=>{
   
      //Data saved succesfully!!
      console.log('booked');
      alert('booked');
    }).catch((error)=>{
      console.log(error);
      
    });  
  }

  return (
    <View style={styles.container}>
      <Image
       style={styles.forImageBack}
       source={require("../assets/images/backHomeAf.jpg")}
       
      />
      <Image
       style={styles.forImage}
       source={require("../assets/images/logo.png")}
       
      />
      <Text style={styles.title} >UJ BUS SERVICES</Text>
      <Text style={{color:'white'}}>Campuses</Text>
      
      <Text style={styles.title}>BusTimeTable</Text>
      
      
      <View style={styles.containerT}>
      <Table borderStyle={{borderWidth: 1,marginTop:20, borderColor: 'black'}}>
          <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows data={DataTable} textStyle={styles.TableText}/>
        </Table>
      </View>
      
      
     
      
      
      
      
      <Text style={{color:'white'}}>{authentication.currentUser?.email}</Text>
      <TouchableOpacity
      onPress={handleSignOut}
      style={styles.buttonxr}
      >
        
      <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    textAlign:'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  TableText: { 
    margin: 10,
    color:'white',
    fontSize:19,
  },
   //Logo
   forImage:{
    width:142,
    height:120,
    paddingTop:70,
    justifyContent:'center',
    borderRadius:10,
  },
  titl:{
    color:'black',
    fontSize:14,
    fontWeight:'bold'
  },
  netforControl:{
    flexDirection: 'column',
    flex:0.6,
    alignItems:'stretch',
    justifyContent:'space-evenly',
    backgroundColor:'rgba(0,0,0,0.5)',
   
    borderRadius:10,
  },
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
  },
  buttonx:{
    backgroundColor:'#0782F9',
    paddingHorizontal:30,
    padding:10,
    borderRadius:10,
    alignItems:'center',
    margin:12,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width:'100%',
    textAlign:'center',
    color:'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  forImageBack:{
    width:"100%",
    height:'100%',
    paddingTop:70,
    position:'absolute',
  },
  containerT: {
    width:'100%',
    backgroundColor:'rgba(0.5,0.6,4,0.2)',
    color:'white',
    marginHorizontal:0,
    marginVertical:30,

  },
});
