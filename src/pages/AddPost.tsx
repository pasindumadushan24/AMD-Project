import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  Image, ActivityIndicator, Alert, StyleSheet, Dimensions
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

import { db, storage, auth } from "../firebase/config";
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

type ImageAsset = { uri: string; fileName?: string | null };

function AddPost() {
  const navigation = useNavigation<any>();

  
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [model, setModel] = useState("");
  const [gear, setGear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineCC, setEngineCC] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

// const uploadImageAsync = async (uri: string, postId: string, index: number) => {
//   return new Promise(async (resolve, reject) => {


const uploadImageAsync = async (uri: string, postId: string, index: number): Promise<string> => {
  return new Promise(async (resolve, reject) => {


    const blob: any = await new Promise((resolve, reject) => {
      
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const filename = `posts/${postId}/image_${index}_${Date.now()}.jpg`;
    const imgRef = storageRef(storage, filename);
    
    try {
      await uploadBytes(imgRef, blob);
      const url = await getDownloadURL(imgRef);
      blob.close(); 
      resolve(url);
    } catch (error) {
      blob.close();
      reject(error);
    }
  });
};

 const submit = async () => {
  
    if (!title || !category || images.length === 0) {
      Alert.alert("Error", "Please fill all fields and pick images!");
      return;
    }

    setLoading(true);
    try {
      
      const docRef = await addDoc(collection(db, "posts"), {
        category,
        subCategory,
        mileage,
        model,
        year,
        gear,
        fuelType,
        engineCC,
        bedrooms,
        bathrooms,
        address,
        title,
        description,
        price,
        city,
       
        createdAt: serverTimestamp(),
        userId: auth.currentUser ? auth.currentUser.uid : null,
        imageUrls: [], 
      });

      console.log("Post document created with ID: ", docRef.id);

      
      const imageUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImageAsync(images[i].uri, docRef.id, i);
        imageUrls.push(url);
      }

    
      await updateDoc(docRef, { imageUrls: imageUrls });

      Alert.alert("✅ Success", "Post Added Successfully!");
      
     
      // submit ශ්‍රිතයේ අගට මෙය එකතු කරන්න
setImages([]);
setTitle("");
setCategory(""); // Category එකත් clear කරන්න
setSubCategory("");
setDescription("");
setPrice("");
setPhoneNumber("");
setYear("");
setMileage("");
setModel("");
setGear("");
setFuelType("");
setEngineCC("");
setBedrooms("");
setBathrooms("");
setAddress("");
setCity("");
     
      
    } catch (error) {
      console.error("Error adding post: ", error);
      Alert.alert("❌ Error", "Failed to add post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#4f46e5', '#9333ea', '#ec4899']} style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>Create New Ad</Text>
          
          <View style={styles.pickerContainer}>
            <Picker selectedValue={category} onValueChange={setCategory}>
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Vehicles" value="Vehicles" />
              <Picker.Item label="Property" value="Property" />
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Furniture" value="Furniture" />
              <Picker.Item label="Fashion" value="Fashion" />

              
            </Picker>
          </View>

          {category === "Vehicles" && (
            <>
              <TextInput style={styles.input} placeholder="Model" value={model} onChangeText={setModel} />
              <TextInput style={styles.input} placeholder="Year" value={year} onChangeText={setYear} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Mileage" value={mileage} onChangeText={setMileage} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Gear Type" value={gear} onChangeText={setGear} />
              <TextInput style={styles.input} placeholder="Fuel Type" value={fuelType} onChangeText={setFuelType} />
              <TextInput style={styles.input} placeholder="Engine CC" value={engineCC} onChangeText={setEngineCC} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
            </>
          )}
         

           {category === "Property" && (
            <>
              <TextInput style={styles.input} placeholder="Bedrooms" value={bedrooms} onChangeText={setBedrooms} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Bathrooms" value={bathrooms} onChangeText={setBathrooms} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
              <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
            </>
          )}

          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <TextInput style={[styles.input, {height: 100}]} placeholder="Description" value={description} onChangeText={setDescription} multiline />
          
          <TouchableOpacity style={styles.imagePickerBtn} onPress={async () => {
            let res = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection: true });
            if (!res.canceled) setImages(res.assets);
          }}>
            <Text style={{color: '#fff'}}>Pick Images</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={submit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>🚀 Post Ad</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  headerTitle: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 20, color: '#4f46e5' },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 12, marginBottom: 15 },
  imagePickerBtn: { backgroundColor: '#4f46e5', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  submitBtn: { backgroundColor: '#3730a3', padding: 15, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default AddPost;