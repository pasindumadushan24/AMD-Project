import {
collection,
getDocs
} from "firebase/firestore";

import {db} from "../firebase/config";


export const getPosts = async()=>{

const snapshot = await getDocs(
collection(db,"posts")
);


return snapshot.docs.map(doc=>({

id:doc.id,
...doc.data()

}));

};