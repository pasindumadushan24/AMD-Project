import React,{useEffect,useState} from "react";


import {
View,
Text,
FlatList,
StyleSheet,
TouchableOpacity
} from "react-native";


import {
getPosts
}
from "../services/postService";



export default function HomeScreen({navigation}:any){


const [posts,setPosts]=useState<any[]>([]);



useEffect(()=>{


loadPosts();


},[]);



const loadPosts=async()=>{


const data=await getPosts();

setPosts(data);


};




return(

<View style={styles.container}>


<Text style={styles.title}>
QuickMarket
</Text>



<TouchableOpacity

style={styles.add}

onPress={()=>navigation.navigate("AddPost")}

>


<Text style={styles.addText}>
+ Post Advertisement
</Text>


</TouchableOpacity>



<FlatList

data={posts}

keyExtractor={(item)=>item.id}

renderItem={({item})=>(


<View style={styles.card}>


<Text style={styles.name}>
{item.title}
</Text>


<Text>
Rs. {item.price}
</Text>


<Text>
{item.city}
</Text>


<Text>
{item.category}
</Text>



</View>


)}


/>



</View>

);

}




const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},


title:{
fontSize:28,
fontWeight:"bold",
marginBottom:20
},


add:{
backgroundColor:"#16a34a",
padding:15,
borderRadius:10,
marginBottom:20
},


addText:{
color:"white",
textAlign:"center"
},


card:{
padding:15,
backgroundColor:"#eee",
borderRadius:10,
marginBottom:10
},


name:{
fontSize:18,
fontWeight:"bold"
}


});