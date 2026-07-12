import React, {useEffect, useState} from "react";
import {
 View,
 Text,
 FlatList,
 Image,
 StyleSheet
} from "react-native";

import axios from "axios";
export default function CategoryPage({route}:any){
 const {name}=route.params;
 const [posts,setPosts]=useState<any[]>([]);

 useEffect(()=>{
  loadPosts();

 },[]);



 const loadPosts=async()=>{

  try{
   const res=await axios.get(
    "https://gracious-liberation-production-245a.up.railway.app/api/posts"
   );


   const filtered=res.data.filter(
    (item:any)=>
    item.category.toLowerCase()
    === name.toLowerCase()
   );


   setPosts(filtered);


  }catch(err){
   console.log(err);
  }

 }



 return(

 <View style={styles.container}>
 <Text style={styles.title}>
 Category : {name}
 </Text>



 <FlatList
 data={posts}
 keyExtractor={(item)=>item._id}
 renderItem={({item})=>(
 <View style={styles.card}>


 {
 item.images?.[0] &&
 <Image
 source={{uri:item.images[0]}}
 style={styles.image}
 />

 }



 <Text style={styles.name}>
 {item.title}
 </Text>


 <Text style={styles.price}>
 LKR {item.price}
 </Text>
 </View>


 )}

 />


 </View>

 )


}



const styles=StyleSheet.create({

container:{
 flex:1,
 backgroundColor:"#f3f4f6",
 padding:15
},

title:{
 fontSize:24,
 fontWeight:"bold",
 marginBottom:20
},


card:{
 backgroundColor:"white",
 padding:15,
 borderRadius:15,
 marginBottom:15
},


image:{
 width:"100%",
 height:180,
 borderRadius:10
},


name:{
 fontSize:18,
 fontWeight:"bold",
 marginTop:10
},


price:{
 color:"green",
 fontSize:16,
 marginTop:5
}


});