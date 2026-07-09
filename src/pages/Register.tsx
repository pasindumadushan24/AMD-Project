import React,{useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert
} from "react-native";


import {
registerUser
}
from "../sevices/authService";



export default function RegisterScreen({navigation}:any){


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");




const handleRegister=async()=>{


try{


await registerUser(
name,
email,
password
);


Alert.alert(
"Success",
"Account created"
);


navigation.replace("Home");


}catch(error:any){


Alert.alert(
"Register Error",
error.message
);


}


};




return(

<View style={styles.container}>


<Text style={styles.title}>
Create Account
</Text>



<TextInput
placeholder="Name"
style={styles.input}
onChangeText={setName}
/>


<TextInput
placeholder="Email"
style={styles.input}
onChangeText={setEmail}
/>



<TextInput

placeholder="Password"

secureTextEntry

style={styles.input}

onChangeText={setPassword}

/>



<TouchableOpacity
style={styles.button}
onPress={handleRegister}
>


<Text style={styles.buttonText}>
Register
</Text>


</TouchableOpacity>



</View>


);

}




const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:20
},


title:{
fontSize:30,
fontWeight:"bold",
textAlign:"center",
marginBottom:30
},


input:{
borderWidth:1,
padding:12,
borderRadius:10,
marginBottom:15
},


button:{
backgroundColor:"#2563eb",
padding:15,
borderRadius:10
},


buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
}


});