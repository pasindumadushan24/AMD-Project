import React, { useState } from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert,
ScrollView,
SafeAreaView
} from "react-native";

import { createPost } from "../services/postService";

import { useAuth } from "../context/AuthContext";



export default function AddPostScreen({navigation}:any){


const {user}=useAuth();



const [category,setCategory]=useState("");
const [subCategory,setSubCategory]=useState("");

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");

const [price,setPrice]=useState("");
const [city,setCity]=useState("");

const [phoneNumber,setPhoneNumber]=useState("");

const [model,setModel]=useState("");
const [year,setYear]=useState("");

const [mileage,setMileage]=useState("");
const [engineCC,setEngineCC]=useState("");

const [fuelType,setFuelType]=useState("");
const [gear,setGear]=useState("");

const [bedrooms,setBedrooms]=useState("");
const [bathrooms,setBathrooms]=useState("");





const savePost=async()=>{


try{


// check login

if(!user){

Alert.alert(
"Login Required",
"Please login before posting"
);

return;

}



await createPost({

userId:user.uid,

category,

subCategory,

title,

description,

price:Number(price),

city,

phoneNumber,

model,

year,

mileage,

engineCC,

fuelType,

gear,

bedrooms,

bathrooms,

createdAt:new Date()


});



Alert.alert(
"Success",
"✅ Post Added Successfully!"
);


navigation.goBack();



}catch(error:any){


console.log(error);


Alert.alert(
"Error",
error.message
);


}



};





return(

<SafeAreaView style={{
flex:1,
backgroundColor:"#f8fafc"
}}>


<ScrollView
contentContainerStyle={styles.container}
>


<Text style={styles.header}>
Create New Ad
</Text>



<TextInput
placeholder="Category"
style={styles.input}
value={category}
onChangeText={setCategory}
/>



{category==="Vehicles" &&

<>

<TextInput
placeholder="Vehicle Type"
style={styles.input}
onChangeText={setSubCategory}
/>


<TextInput
placeholder="Model"
style={styles.input}
onChangeText={setModel}
/>


<TextInput
placeholder="Year"
keyboardType="numeric"
style={styles.input}
onChangeText={setYear}
/>


<TextInput
placeholder="Mileage"
keyboardType="numeric"
style={styles.input}
onChangeText={setMileage}
/>


<TextInput
placeholder="Engine CC"
keyboardType="numeric"
style={styles.input}
onChangeText={setEngineCC}
/>


<TextInput
placeholder="Fuel Type"
style={styles.input}
onChangeText={setFuelType}
/>


<TextInput
placeholder="Gear"
style={styles.input}
onChangeText={setGear}
/>

</>

}



<TextInput
placeholder="Title"
style={styles.input}
value={title}
onChangeText={setTitle}
/>



<TextInput
placeholder="Description"
multiline
numberOfLines={4}
style={[
styles.input,
{
height:100
}
]}
onChangeText={setDescription}
/>



<TextInput
placeholder="Price"
keyboardType="numeric"
style={styles.input}
onChangeText={setPrice}
/>



<TextInput
placeholder="City"
style={styles.input}
onChangeText={setCity}
/>



<TextInput
placeholder="Phone Number"
keyboardType="phone-pad"
style={styles.input}
onChangeText={setPhoneNumber}
/>




<TouchableOpacity
style={styles.button}
onPress={savePost}
>


<Text style={styles.btnText}>
🚀 Publish Ad
</Text>


</TouchableOpacity>



</ScrollView>


</SafeAreaView>


);

}





const styles=StyleSheet.create({

container:{
padding:20
},


header:{
fontSize:28,
fontWeight:"bold",
color:"#4f46e5",
textAlign:"center",
marginBottom:20
},


input:{
backgroundColor:"white",
borderWidth:1,
borderColor:"#d1d5db",
padding:15,
borderRadius:12,
marginBottom:15
},


button:{
backgroundColor:"#4f46e5",
padding:18,
borderRadius:12
},


btnText:{
color:"white",
textAlign:"center",
fontWeight:"bold",
fontSize:18
}


});