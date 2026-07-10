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



const handleRegister = async () => {
  if (!name.trim()) {
    Alert.alert("Error", "Please enter your name");
    return;
  }

  if (!email.trim()) {
    Alert.alert("Error", "Please enter your email");
    return;
  }

  if (password.length < 6) {
    Alert.alert(
      "Error",
      "Password must be at least 6 characters"
    );
    return;
  }

  try {
    await registerUser(
      name.trim(),
      email.trim(),
      password
    );

    Alert.alert(
      "Success",
      "Account created successfully"
    );

    navigation.replace("Login");
  } catch (error: any) {
    let message = "Registration failed";

    if (error.code === "auth/email-already-in-use") {
      message = "Email already exists";
    } else if (error.code === "auth/invalid-email") {
      message = "Invalid email address";
    } else if (error.code === "auth/weak-password") {
      message = "Weak password";
    }

    Alert.alert("Register Error", message);
  }
};




return(

<View style={styles.container}>


<Text style={styles.title}>
Create Account
</Text>

<TextInput
  placeholder="Name"
  value={name}
  onChangeText={setName}
  style={styles.input}
/>

<TextInput
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  style={styles.input}
/>

<TextInput
  placeholder="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  style={styles.input}
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