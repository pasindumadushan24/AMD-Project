import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config"; 
import React, { useState, useCallback } from "react"; 
import { useFocusEffect } from "@react-navigation/native";

import {
View,
Text,
FlatList,
Image,
StyleSheet,
TouchableOpacity,
TextInput,
Alert,
ScrollView
} from "react-native";

import {LinearGradient} from "expo-linear-gradient";

import {getPosts} from "../services/postService";


export default function HomeScreen({navigation}:any){
const [posts,setPosts] = useState<any[]>([]);
const [search,setSearch] = useState("");
const categories = [

{
name:"Vehicles",
icon:"🚗",
colors:["#3b82f6","#1e40af"]
},

{
name:"Property",
icon:"🏠",
colors:["#22c55e","#15803d"]
},

{
name:"Mobiles",
icon:"📱",
colors:["#a855f7","#7e22ce"]
},

{
name:"Electronics",
icon:"💻",
colors:["#ec4899","#be185d"]
},

{
name:"Fashion",
icon:"👕",
colors:["#eab308","#f97316"]
},

{
name:"Food",
icon:"🍔",
colors:["#ef4444","#991b1b"]
}

];






useFocusEffect(
  useCallback(() => {
    loadPosts(); 
  }, [])
);





const loadPosts = async()=>{

try{

const data = await getPosts();

setPosts(data);


}

catch(error){

console.log(error);

}


};







const filteredPosts = posts.filter((item)=>

item.title?.toLowerCase()
.includes(
search.toLowerCase()
)

);









return(


<View style={styles.container}>





<View style={styles.navbar}>


<Text style={styles.logo}>

QuickMarket

</Text>





<View style={styles.navButtons}>



<TouchableOpacity

onPress={()=>navigation.navigate("Login")}

>

<Text style={styles.navText}>

Login

</Text>


</TouchableOpacity>







<TouchableOpacity

onPress={()=>navigation.navigate("Register")}

>

<Text style={styles.navText}>

Register

</Text>


</TouchableOpacity>








<TouchableOpacity
  onPress={() => {
   
    if (auth.currentUser) {
      navigation.navigate("AddPost");
    } else {
      
      Alert.alert(
        "Login Required",
        "You need to be logged in to post an ad. Please login to continue.",
        [
          { text: "Cancel" },
          { text: "Login", onPress: () => navigation.navigate("Login") }
        ]
      );
    }
  }}
  style={styles.postBtn}
>
  <Text style={{color: "white"}}>+ Post Ad</Text>
</TouchableOpacity>



<TouchableOpacity

onPress={()=>navigation.navigate("Profile")}

>

<Ionicons

name="person-circle"

size={40}

color="#374151"

/>

</TouchableOpacity>



</View>


</View>









<ScrollView>







<LinearGradient


colors={[

"#4f46e5",

"#9333ea",

"#ec4899"

]}

style={styles.hero}

>


<Text style={styles.heroTitle}>

Discover, Buy & Sell Anything

</Text>


<Text style={styles.heroSub}>

A smarter marketplace for modern Sri Lanka

</Text>




<View style={styles.searchBox}>


<TextInput


placeholder="Search anything..."

value={search}

onChangeText={setSearch}

style={styles.input}


/>


</View>





</LinearGradient>









<Text style={styles.sectionTitle}>

Categories

</Text>







<ScrollView

horizontal

showsHorizontalScrollIndicator={false}

>



{

categories.map((cat,index)=>(


<TouchableOpacity


key={index}



onPress={()=>


navigation.navigate(

"Category",

{

name:cat.name

}

)


}



>


<LinearGradient


colors={cat.colors as any}

style={styles.category}


>



<Text style={styles.icon}>

{cat.icon}

</Text>




<Text style={styles.catText}>

{cat.name}

</Text>




</LinearGradient>



</TouchableOpacity>



))


}



</ScrollView>









<Text style={styles.sectionTitle}>

Latest Listings

</Text>





<FlatList



data={filteredPosts}



scrollEnabled={false}




keyExtractor={(item)=>

item.id

}





renderItem={({item})=>(






<TouchableOpacity


onPress={()=>{


console.log(
"Selected Post ID:",
item.id
);



navigation.navigate(

"PostDetails",

{

id:item.id

}

);


}}



>








<View style={styles.card}>







{

item.imageUrls?.[0] &&


<Image


source={{

uri:item.imageUrls[0]

}}



style={styles.image}



/>


}








<Text style={styles.title}>

{item.title}

</Text>







<Text style={styles.price}>

LKR {item.price}

</Text>







<Text>

{item.category}

</Text>







<Text style={styles.desc}>

{item.description?.slice(0,60)}...

</Text>






</View>








</TouchableOpacity>



)}



/>









</ScrollView>





</View>


);



}









const styles=StyleSheet.create({



container:{

flex:1,

backgroundColor:"#f3f4f6"

},



navbar:{

backgroundColor:"white",

padding:15,

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center"

},



logo:{

fontSize:20,

fontWeight:"bold",

color:"#4f46e5"

},



navButtons:{

flexDirection:"row",

alignItems:"center",

gap:8,

flexShrink:1

},



navText:{

fontWeight:"600"

},



postBtn:{

backgroundColor:"#4f46e5",

padding:8,

borderRadius:8

},




hero:{

padding:30,

alignItems:"center"

},



heroTitle:{

fontSize:26,

fontWeight:"bold",

color:"white",

textAlign:"center"

},



heroSub:{

color:"white",

marginTop:10

},



searchBox:{

backgroundColor:"white",

marginTop:20,

width:"100%",

borderRadius:15

},



input:{

padding:15

},




sectionTitle:{

fontSize:22,

fontWeight:"bold",

margin:20

},




category:{

width:110,

height:100,

marginLeft:15,

borderRadius:20,

padding:15

},



icon:{

fontSize:35

},



catText:{

color:"white",

fontWeight:"bold"

},




card:{

backgroundColor:"white",

marginHorizontal:20,

marginBottom:15,

padding:15,

borderRadius:15

},




image:{

height:200,

width:"100%",

borderRadius:10

},




title:{

fontSize:18,

fontWeight:"bold",

marginTop:10

},




price:{

color:"green",

fontWeight:"bold",

fontSize:18,

marginTop:5

},




desc:{

color:"gray",

marginTop:5

}



});