import React, {useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert
} from "react-native";

import {loginUser} from "../sevices/authService";


export default function LoginScreen({navigation}:any){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



const handleLogin=async()=>{


try{


await loginUser(
email,
password
);


navigation.replace("Home");


}catch(error:any){


Alert.alert(
"Login Failed",
error.message
);


}


};



return(

<View style={styles.container}>


<Text style={styles.title}>
QuickMarket Login
</Text>



<TextInput

placeholder="Email"

style={styles.input}

value={email}

onChangeText={setEmail}

/>



<TextInput

placeholder="Password"

secureTextEntry

style={styles.input}

value={password}

onChangeText={setPassword}

/>



<TouchableOpacity
style={styles.button}
onPress={handleLogin}
>


<Text style={styles.buttonText}>
Login
</Text>


</TouchableOpacity>



<TouchableOpacity
onPress={()=>navigation.navigate("Register")}
>


<Text style={styles.link}>
Create new account
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
borderColor:"#ccc",
padding:12,
borderRadius:10,
marginBottom:15
},


button:{
backgroundColor:"#16a34a",
padding:15,
borderRadius:10
},


buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
},


link:{
textAlign:"center",
marginTop:20,
color:"blue"
}


});