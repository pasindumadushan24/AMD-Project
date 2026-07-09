import {

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc,

query,

orderBy

}
from "firebase/firestore";


import {
db
}
from "../firebase/config";



const postCollection =
collection(db,"posts");



// CREATE

export const createPost =
async(data:any)=>{


return await addDoc(
postCollection,
{

...data,

createdAt:new Date()

}

);

};




// READ

export const getPosts =
async()=>{


const q=query(
postCollection,
orderBy(
"createdAt",
"desc"
)
);


const snapshot =
await getDocs(q);



return snapshot.docs.map(
(item)=>({

id:item.id,

...item.data()

})

);


};




// UPDATE

export const updatePost =
async(
id:string,
data:any
)=>{


const postRef =
doc(
db,
"posts",
id
);


return await updateDoc(
postRef,
data
);


};




// DELETE

export const deletePost =
async(id:string)=>{


const postRef =
doc(
db,
"posts",
id
);


return await deleteDoc(
postRef
);


};