import React, {useEffect, useState} from "react";

import {
View,
Text,
FlatList,
Image,
StyleSheet
} from "react-native";

import {getPosts} from "../services/postService";


export default function CategoryScreen({route}:any){


const {name} = route.params;


const [listings,setListings] = useState<any[]>([]);



useEffect(()=>{

 loadPosts();

},[]);



const loadPosts = async()=>{

 try{

  const data = await getPosts();


  const filtered = data.filter(
    (item:any)=>
      item.category?.toLowerCase() ===
      name.toLowerCase()
  );


  setListings(filtered);


 }catch(error){

  console.log(error);

 }

};



return(

<View style={styles.container}>


<Text style={styles.title}>
Category: {name}
</Text>



<FlatList

data={listings}

keyExtractor={(item)=>item.id}


renderItem={({item})=>(


<View style={styles.card}>


{
item.images?.length > 0 &&

<Image

source={{
uri:item.images[0]
}}

style={styles.image}

/>

}



<Text style={styles.name}>
{item.title}
</Text>



<Text style={styles.price}>
LKR {item.price}
</Text>



<Text>
{item.city}
</Text>


</View>


)}


/>



</View>

);

}



const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#f3f4f6"
},


title:{
fontSize:24,
fontWeight:"bold",
marginBottom:20
},


card:{
backgroundColor:"white",
padding:15,
borderRadius:10,
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
fontWeight:"bold",
marginTop:5
}


});