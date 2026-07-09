import React, {useEffect, useState} from "react";

import {
 View,
 Text,
 Image,
 FlatList,
 TouchableOpacity,
 StyleSheet,
 Alert
} from "react-native";

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Profile({navigation}:any){


const [myPosts,setMyPosts]=useState<any[]>([]);



useEffect(()=>{

 loadMyPosts();

},[]);





// GET USER POSTS
const loadMyPosts=async()=>{

 try{

 const token =
 await AsyncStorage.getItem("token");


 const res =
 await axios.get(

 "https://gracious-liberation-production-245a.up.railway.app/api/posts/my-posts",

 {
 headers:{
 Authorization:`Bearer ${token}`
 }
 }

 );


 setMyPosts(res.data);



 }catch(error){

 console.log(error);

 }

}





// DELETE POST

const deletePost=async(id:string)=>{


try{


const token=
await AsyncStorage.getItem("token");



await axios.delete(

`https://gracious-liberation-production-245a.up.railway.app/api/posts/${id}`,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



setMyPosts(

myPosts.filter(
(post)=>post._id!==id
)

);



Alert.alert(
"Success",
"Post Deleted"
);



}catch(error){

console.log(error);

Alert.alert(
"Error",
"Delete Failed"
);


}



}







// LOGOUT FIREBASE/JWT

const logout=async()=>{


await AsyncStorage.removeItem("token");


navigation.replace("Login");


}







return(


<View style={styles.container}>


<View style={styles.header}>


<Text style={styles.title}>
My Profile
</Text>



<TouchableOpacity
style={styles.logout}
onPress={logout}
>

<Text style={styles.logoutText}>
Logout
</Text>

</TouchableOpacity>


</View>





<Text style={styles.heading}>
My Ads
</Text>





{
myPosts.length===0 ?


<View style={styles.empty}>

<Text style={styles.emptyTitle}>
No Ads Yet
</Text>


<Text>
You haven't posted any ads
</Text>


</View>


:


<FlatList

data={myPosts}

keyExtractor={(item)=>item._id}


renderItem={({item})=>(


<View style={styles.card}>


<Image

source={{

uri:
item.images?.[0] ||
"https://via.placeholder.com/400"

}}

style={styles.image}

/>



<Text style={styles.category}>
{item.category}
</Text>



<Text style={styles.postTitle}>
{item.title}
</Text>



<Text>
{item.description}
</Text>



<Text style={styles.price}>
LKR {item.price}
</Text>




<View style={styles.buttons}>


<TouchableOpacity

style={styles.viewBtn}

onPress={()=>


navigation.navigate(
"PostDetails",
{
id:item._id
}

)

}

>

<Text style={styles.btnText}>
View
</Text>


</TouchableOpacity>






<TouchableOpacity

style={styles.editBtn}

onPress={()=>


navigation.navigate(
"EditPost",
{
id:item._id
}

)

}

>

<Text style={styles.btnText}>
Edit
</Text>


</TouchableOpacity>






<TouchableOpacity

style={styles.deleteBtn}

onPress={()=>
deletePost(item._id)
}

>

<Text style={styles.btnText}>
Delete
</Text>


</TouchableOpacity>



</View>



</View>


)}


/>



}



</View>


)

}





const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f3f4f6",
padding:15
},


header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
},


title:{
fontSize:26,
fontWeight:"bold",
color:"#4f46e5"
},


logout:{
backgroundColor:"red",
padding:10,
borderRadius:8
},


logoutText:{
color:"white",
fontWeight:"bold"
},



heading:{
fontSize:24,
fontWeight:"bold",
textAlign:"center",
marginBottom:15
},



card:{
backgroundColor:"white",
padding:15,
borderRadius:15,
marginBottom:15
},



image:{
height:200,
width:"100%",
borderRadius:10
},



category:{
marginTop:10,
color:"#4f46e5",
fontWeight:"bold"
},


postTitle:{
fontSize:20,
fontWeight:"bold",
marginVertical:5
},


price:{
fontSize:18,
color:"green",
fontWeight:"bold",
marginTop:8
},



buttons:{
flexDirection:"row",
gap:5,
marginTop:15
},



viewBtn:{
flex:1,
backgroundColor:"#2563eb",
padding:10,
borderRadius:8
},


editBtn:{
flex:1,
backgroundColor:"#eab308",
padding:10,
borderRadius:8
},


deleteBtn:{
flex:1,
backgroundColor:"#dc2626",
padding:10,
borderRadius:8
},


btnText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
},


empty:{
backgroundColor:"white",
padding:30,
borderRadius:15,
alignItems:"center"
},


emptyTitle:{
fontSize:22,
fontWeight:"bold"
}


});