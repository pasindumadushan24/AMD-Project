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

import {collection,getDocs,query,where,deleteDoc,doc} from "firebase/firestore";

import {db} from "../firebase/config";

import {getAuth} from "firebase/auth";



export default function Profile({navigation}:any){


const [myPosts,setMyPosts]=useState<any[]>([]);



const auth=getAuth();





useEffect(()=>{

loadMyPosts();

},[]);





const loadMyPosts=async()=>{


try{


const user=auth.currentUser;



if(!user){

return;

}



const q=query(

collection(db,"posts"),

where(
"userId",
"==",
user.uid
)

);



const snapshot=await getDocs(q);



const data=snapshot.docs.map(item=>(

{

id:item.id,

...item.data()

}

));



setMyPosts(data);



}

catch(error){

console.log(error);

}



};







const deletePost=async(id:string)=>{


try{


await deleteDoc(

doc(db,"posts",id)

);



setMyPosts(

myPosts.filter(

(post)=>post.id!==id

)

);



Alert.alert(
"Success",
"Post Deleted"
);



}

catch(error){


console.log(error);


Alert.alert(
"Error",
"Delete Failed"
);


}


};







const logout=async()=>{


await auth.signOut();


navigation.replace("Login");


};







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


keyExtractor={(item)=>item.id}



renderItem={({item})=>(


<View style={styles.card}>


<Image

source={{

uri:item.images?.[0] ||

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
id:item.id
}

)


}

>

<Text style={styles.btnText}>

View

</Text>


</TouchableOpacity>







<TouchableOpacity

style={styles.deleteBtn}

onPress={()=>deletePost(item.id)}

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


);


}
const styles = StyleSheet.create({

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
gap:10,
marginTop:15
},


viewBtn:{
flex:1,
backgroundColor:"#2563eb",
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