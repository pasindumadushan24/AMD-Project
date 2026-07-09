// src/services/postService.ts

import {
 collection,
 addDoc,
 getDocs,
 doc,
 updateDoc,
 deleteDoc
} from "firebase/firestore";

import { db } from "../firebase/config";


// GET ALL POSTS

export const getPosts = async()=>{

const snapshot = await getDocs(
collection(db,"posts")
);


return snapshot.docs.map(item=>({

id:item.id,
...item.data()

}));

};




// CREATE POST

export const createPost = async(postData:any)=>{


const docRef = await addDoc(

collection(db,"posts"),

postData

);


return docRef.id;

};




// UPDATE POST

export const updatePost = async(
id:string,
postData:any
)=>{


await updateDoc(

doc(db,"posts",id),

postData

);


};




// DELETE POST

export const deletePost = async(
id:string
)=>{


await deleteDoc(

doc(db,"posts",id)

);


};