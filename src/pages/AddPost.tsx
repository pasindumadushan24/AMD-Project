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
createPost
}
from "../services/postService";


import {
useAuth
}
from "../context/AuthContext";



export default function AddPostScreen({navigation}:any){


const {user}=useAuth();



const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [price,setPrice]=useState("");

const [category,setCategory]=useState("");

const [city,setCity]=useState("");





const savePost=async()=>{


try{


await createPost({

userId:user?.uid,

title,

description,

price:Number(price),

category,

city

});



Alert.alert(
"Success",
"Post Added"
);


navigation.goBack();



}catch(error:any){


Alert.alert(
"Error",
error.message
);


}


};




return(

<View style={styles.container}>


<Text style={styles.title}>
Add Advertisement
</Text>



<TextInput
placeholder="Title"
style={styles.input}
onChangeText={setTitle}
/>



<TextInput
placeholder="Description"
style={styles.input}
onChangeText={setDescription}
/>



<TextInput
placeholder="Price"
keyboardType="numeric"
style={styles.input}
onChangeText={setPrice}
/>



<TextInput
placeholder="Category"
style={styles.input}
onChangeText={setCategory}
/>



<TextInput
placeholder="City"
style={styles.input}
onChangeText={setCity}
/>




<TouchableOpacity
style={styles.button}
onPress={savePost}
>


<Text style={styles.btnText}>
Publish
</Text>


</TouchableOpacity>



</View>

);

}





const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},


title:{
fontSize:25,
fontWeight:"bold",
marginBottom:20
},


input:{
borderWidth:1,
padding:12,
borderRadius:10,
marginBottom:15
},


button:{
backgroundColor:"#16a34a",
padding:15,
borderRadius:10
},


btnText:{
color:"white",
textAlign:"center"
}


});