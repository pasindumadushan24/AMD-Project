import React, {useEffect, useState} from "react";

import {
View,
Text,
Image,
FlatList,
StyleSheet,
TouchableOpacity
} from "react-native";

import {doc, getDoc} from "firebase/firestore";

import {db} from "../firebase/config";



export default function PostDetailsScreen({route, navigation}:any){


console.log("Route Params:", route.params);



const {id} = route.params || {};



console.log("Post ID:", id);



const [post,setPost] = useState<any>(null);





useEffect(()=>{


if(id){

loadPost();

}


},[id]);









const loadPost = async()=>{


try{



if(!id){

console.log("Post ID Missing");

return;

}




const postRef = doc(
db,
"posts",
id
);




const snapshot = await getDoc(postRef);





if(snapshot.exists()){



setPost({

id:snapshot.id,

...snapshot.data()

});



}
else{


console.log("Post not found");


}




}

catch(error){



console.log(
"Firebase Error:",
error
);



}



};









if(!post){


return(


<View style={styles.center}>


<Text>

Loading...

</Text>


</View>


);


}



return(



<View style={styles.container}>





<TouchableOpacity

onPress={()=>navigation.goBack()}

>


<Text style={styles.back}>

← Back

</Text>


</TouchableOpacity>



<FlatList
  data={post.imageUrls || []}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.image}
    />
  )}
/>



<View style={styles.card}>


<Text style={styles.title}>

{post.title}

</Text>




<Text style={styles.price}>

LKR {post.price}

</Text>





<Text style={styles.description}>

{post.description}

</Text>









<View style={styles.line}/>




<Text>

Category: {post.category}

</Text>







<Text>

Sub Category: {post.subCategory}

</Text>




<Text>

City: {post.city}

</Text>









{

post.phoneNumber &&


<Text>

Phone: {post.phoneNumber}

</Text>


}









{

post.category === "Vehicles" &&


<>



<Text>

Model: {post.model}

</Text>






<Text>

Year: {post.year}

</Text>






<Text>

Mileage: {post.mileage}

</Text>






<Text>

Engine CC: {post.engineCC}

</Text>






<Text>

Fuel: {post.fuelType}

</Text>






<Text>

Gear: {post.gear}

</Text>



</>



}









{

post.category === "Property" &&


<>


<Text>

Address: {post.address}

</Text>





<Text>

Bedrooms: {post.bedrooms}

</Text>





<Text>

Bathrooms: {post.bathrooms}

</Text>


</>


}


</View>

</View>


);


}



const styles = StyleSheet.create({



container:{


flex:1,

backgroundColor:"#f3f4f6",

padding:15


},




center:{


flex:1,

justifyContent:"center",

alignItems:"center"


},




back:{


fontSize:18,

color:"blue",

marginBottom:10


},




image:{


width:"100%",

height:250,

borderRadius:10,

marginBottom:10


},




card:{


backgroundColor:"white",

padding:20,

borderRadius:15,

marginTop:15


},




title:{


fontSize:26,

fontWeight:"bold"


},




price:{


fontSize:22,

color:"green",

fontWeight:"bold",

marginTop:10 


},




description:{


marginTop:15,

fontSize:16


},




line:{


height:1,

backgroundColor:"#ddd",

marginVertical:15


}



});