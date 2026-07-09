import React, {useEffect, useState} from "react";

import {
 View,
 ActivityIndicator
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


interface Props {
 children: React.ReactNode;
 navigation:any;
}



export default function ProtectedRoute({
 children,
 navigation
}:Props){


const [loading,setLoading]=useState(true);

const [authenticated,setAuthenticated]=useState(false);



useEffect(()=>{

 checkAuth();

},[]);



const checkAuth=async()=>{


const token =
await AsyncStorage.getItem("token");



if(token){

 setAuthenticated(true);

}
else{

 navigation.replace("Login");

}



setLoading(false);


}





if(loading){

return(

<View
style={{
flex:1,
justifyContent:"center",
alignItems:"center"
}}
>

<ActivityIndicator size="large"/>

</View>

)

}




return authenticated ? children : null;


}