import {
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 signOut,
 updateProfile
}
from "firebase/auth";


import {
 auth
}
from "../firebase/config";




// REGISTER

export const registerUser = async(
name:string,
email:string,
password:string
)=>{


const result =
await createUserWithEmailAndPassword(
 auth,
 email,
 password
);


// save name

await updateProfile(
 result.user,
 {
  displayName:name
 }
);


return result.user;

};




// LOGIN

export const loginUser = async(
email:string,
password:string
)=>{

return await signInWithEmailAndPassword(
 auth,
 email,
 password
);

};



// LOGOUT

export const logoutUser = async()=>{

return await signOut(auth);

};