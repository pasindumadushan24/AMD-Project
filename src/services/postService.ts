// src/services/postService.ts

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL =
"https://gracious-liberation-production-245a.up.railway.app/api/posts";



// GET ALL POSTS

export const getPosts = async()=>{

 try{

  const response = await axios.get(
    API_URL
  );

  return response.data;


 }catch(error){

  console.log("Get Posts Error:",error);
  throw error;

 }

};





// GET MY POSTS

export const getMyPosts = async()=>{

 try{


 const token =
 await AsyncStorage.getItem("token");



 const response =
 await axios.get(

 `${API_URL}/my-posts`,

 {
 headers:{
  Authorization:`Bearer ${token}`
 }
 }

 );



 return response.data;



 }catch(error){

 console.log("My Posts Error:",error);
 throw error;

 }

};







// CREATE POST

export const createPost = async(postData:any)=>{


try{


const token =
await AsyncStorage.getItem("token");



const response =
await axios.post(

API_URL,

postData,

{

headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"multipart/form-data"
}

}

);



return response.data;



}catch(error){

console.log("Create Post Error:",error);
throw error;

}


};








// UPDATE POST

export const updatePost = async(
id:string,
postData:any
)=>{


try{


const token =
await AsyncStorage.getItem("token");



const response =
await axios.put(

`${API_URL}/${id}`,

postData,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



return response.data;



}catch(error){

console.log("Update Error:",error);
throw error;

}


};







// DELETE POST

export const deletePost = async(
id:string
)=>{


try{


const token =
await AsyncStorage.getItem("token");



const response =
await axios.delete(

`${API_URL}/${id}`,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



return response.data;



}catch(error){

console.log("Delete Error:",error);
throw error;

}


};