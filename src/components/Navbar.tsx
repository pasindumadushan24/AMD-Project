import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../sevices/authService";


export default function Navbar({ navigation }: any) {

  const { user } = useAuth();


  const handleLogout = async () => {

    await logoutUser();

    navigation.replace("Login");

  };


  return (

    <View style={styles.nav}>

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.logo}>
          QuickMarket
        </Text>
      </TouchableOpacity>


      <View style={styles.menu}>


        {
          user ? (

            <>

              <TouchableOpacity
                onPress={() => navigation.navigate("AddPost")}
              >
                <Text style={styles.link}>
                  + Post
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={handleLogout}
              >
                <Text style={styles.link}>
                  Logout
                </Text>
              </TouchableOpacity>


            </>

          ) : (

            <>

              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.link}>
                  Login
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.link}>
                  Register
                </Text>
              </TouchableOpacity>


            </>

          )

        }


      </View>


    </View>

  );

}



const styles = StyleSheet.create({

  nav: {

    backgroundColor:"#16a34a",

    paddingVertical:15,

    paddingHorizontal:20,

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    elevation:5

  },


  logo:{

    color:"white",

    fontSize:22,

    fontWeight:"bold"

  },


  menu:{

    flexDirection:"row",

    gap:15

  },


  link:{

    color:"white",

    fontSize:15,

    fontWeight:"600"

  }


});