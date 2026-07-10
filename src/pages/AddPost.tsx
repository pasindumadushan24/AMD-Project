
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { db, storage, auth } from "../firebase/config"; // adjust path to your project
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

type ImageAsset = {
  uri: string;
  fileName?: string | null;
};

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

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      // If you fully switch to Firebase Auth, prefer: auth.currentUser
      if (!token && !auth.currentUser) {
        navigation.navigate("Login");
      }
    };
    checkAuth();
  }, [navigation]);

  const handleImageChange = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const picked: ImageAsset[] = result.assets.map((asset) => ({
        uri: asset.uri,
        fileName: asset.fileName,
      }));
      setImages((prev) => [...prev, ...picked]);
    }
  };

  const goHome = () => {
    navigation.navigate("Home");
  };

  const uploadImageAsync = async (uri: string, postId: string, index: number) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `posts/${postId}/image_${index}_${Date.now()}.jpg`;
    const imgRef = storageRef(storage, filename);
    await uploadBytes(imgRef, blob);
    return getDownloadURL(imgRef);
  };

  const submit = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token && !auth.currentUser) {
        Alert.alert("No session found", "Please login again");
        navigation.navigate("Login");
        return;
      }

      // 1) Create the post document first to get an ID (images uploaded under it)
      const postData: Record<string, any> = {
        category,
        subCategory,
        title,
        description,
        price,
        city,
        bedrooms,
        bathrooms,
        phoneNumber,
        year,
        model,
        fuelType,
        gear,
        mileage,
        engineCC,
        address,
        imageUrls: [],
        createdAt: serverTimestamp(),
        userId: auth.currentUser ? auth.currentUser.uid : null,
      };

      const docRef = await addDoc(collection(db, "posts"), postData);

      // 2) Upload images to Firebase Storage under posts/{postId}/...
      const imageUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImageAsync(images[i].uri, docRef.id, i);
        imageUrls.push(url);
      }

      // 3) Update the post document with the uploaded image URLs
      if (imageUrls.length > 0) {
        const { updateDoc } = await import("firebase/firestore");
        await updateDoc(docRef, { imageUrls });
      }

      Alert.alert("✅ Success", "Post Added Successfully!");

      setCategory("");
      setSubCategory("");
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
    } catch (error) {
      console.log(error);
      Alert.alert("❌ Error", "Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* NOTE: React Native doesn't support CSS gradients natively.
          For an exact gradient background, wrap this ScrollView content in
          <LinearGradient colors={['#4f46e5', '#9333ea', '#ec4899']} ...>
          from 'expo-linear-gradient'. Left as a plain background here so the
          rest of the styling/classNames match the original 1:1. */}

      <View className="w-full max-w-4xl mx-auto py-6 px-3">
        {/* NAVBAR */}
        <View className="bg-white shadow-md px-4 py-4 flex-col gap-4 mb-6 rounded-xl">
          <Text className="text-xl font-bold text-indigo-600 text-center">
            QuickMarket
          </Text>

          <View className="flex-row flex-wrap justify-center items-center gap-2">
            <TouchableOpacity
              onPress={goHome}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              <Text className="font-medium">Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="px-4 py-2 rounded-xl border border-gray-300"
            >
              <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              className="px-4 py-2 rounded-xl border border-gray-300"
            >
              <Text>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons name="person-circle" size={32} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white/95 rounded-3xl shadow-2xl p-4">
          <Text className="text-2xl font-extrabold text-center mb-2 text-indigo-600">
            Create New Ad
          </Text>

          <Text className="text-center text-gray-500 mb-8">
            Sell anything on QuickMarket
          </Text>

          {/* Category */}
          <View className="w-full border border-gray-300 rounded-xl mb-4">
            <Picker selectedValue={category} onValueChange={setCategory}>
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Vehicles" value="Vehicles" />
              <Picker.Item label="Property" value="Property" />
              <Picker.Item label="Mobiles" value="Mobiles" />
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Fashion" value="Fashion" />
              <Picker.Item label="Food" value="Food" />
            </Picker>
          </View>

          {category === "Vehicles" && (
            <>
              <View className="w-full border border-gray-300 rounded-xl mb-4">
                <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
                  <Picker.Item label="Select Vehicle Type" value="" />
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Motorcycle" value="Motorcycle" />
                  <Picker.Item label="Lorry" value="Lorry" />
                  <Picker.Item label="Bus" value="Bus" />
                  <Picker.Item label="Van" value="Van" />
                </Picker>
              </View>

              <TextInput
                value={model}
                onChangeText={setModel}
                placeholder="Model"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <TextInput
                value={year}
                onChangeText={setYear}
                placeholder="Year"
                keyboardType="numeric"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                keyboardType="numeric"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <TextInput
                value={mileage}
                onChangeText={setMileage}
                placeholder="Mileage"
                keyboardType="numeric"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <TextInput
                value={engineCC}
                onChangeText={setEngineCC}
                placeholder="Engine CC"
                keyboardType="numeric"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <View className="flex-row gap-4 mb-4">
                <View className="flex-1 border border-gray-300 rounded-xl">
                  <Picker selectedValue={fuelType} onValueChange={setFuelType}>
                    <Picker.Item label="Select Fuel Type" value="" />
                    <Picker.Item label="Petrol" value="Petrol" />
                    <Picker.Item label="Diesel" value="Diesel" />
                    <Picker.Item label="Hybrid" value="Hybrid" />
                    <Picker.Item label="Electric" value="Electric" />
                  </Picker>
                </View>

                <View className="flex-1 border border-gray-300 rounded-xl">
                  <Picker selectedValue={gear} onValueChange={setGear}>
                    <Picker.Item label="Select Gear Type" value="" />
                    <Picker.Item label="Automatic" value="Automatic" />
                    <Picker.Item label="Manual" value="Manual" />
                  </Picker>
                </View>
              </View>
            </>
          )}

          {/* Mobiles */}
          {category === "Mobiles" && (
            <View className="w-full border border-gray-300 rounded-xl mb-4">
              <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
                <Picker.Item label="Select Mobile Type" value="" />
                <Picker.Item label="Smartphone" value="Smartphone" />
                <Picker.Item label="Feature Phone" value="Feature Phone" />
                <Picker.Item label="Tablet" value="Tablet" />
                <Picker.Item label="Accessories" value="Accessories" />
                <Picker.Item label="Smart Watch" value="Smart Watch" />
              </Picker>
            </View>
          )}

          {/* Electronics */}
          {category === "Electronics" && (
            <View className="w-full border border-gray-300 rounded-xl mb-4">
              <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
                <Picker.Item label="Select Electronics Type" value="" />
                <Picker.Item label="TV" value="TV" />
                <Picker.Item label="Laptop" value="Laptop" />
                <Picker.Item label="Desktop" value="Desktop" />
                <Picker.Item label="Camera" value="Camera" />
                <Picker.Item label="Home Appliances" value="Home Appliances" />
                <Picker.Item label="Audio Devices" value="Audio Devices" />
              </Picker>
            </View>
          )}

          {/* Fashion */}
          {category === "Fashion" && (
            <View className="w-full border border-gray-300 rounded-xl mb-4">
              <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
                <Picker.Item label="Select Fashion Type" value="" />
                <Picker.Item label="Men Clothing" value="Men Clothing" />
                <Picker.Item label="Women Clothing" value="Women Clothing" />
                <Picker.Item label="Kids Wear" value="Kids Wear" />
                <Picker.Item label="Shoes" value="Shoes" />
                <Picker.Item label="Bags" value="Bags" />
                <Picker.Item label="Accessories" value="Accessories" />
              </Picker>
            </View>
          )}

          {/* Food */}
          {category === "Food" && (
            <View className="w-full border border-gray-300 rounded-xl mb-4">
              <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
                <Picker.Item label="Select Food Type" value="" />
                <Picker.Item label="Fast Food" value="Fast Food" />
                <Picker.Item label="Rice & Curry" value="Rice & Curry" />
                <Picker.Item label="Snacks" value="Snacks" />
                <Picker.Item label="Beverages" value="Beverages" />
                <Picker.Item label="Bakery Items" value="Bakery Items" />
                <Picker.Item label="Vegetarian" value="Vegetarian" />
              </Picker>
            </View>
          )}

          {/* Property */}
          {category === "Property" && (
            <>
              <View className="w-full border border-gray-300 rounded-xl mb-4">
                <Picker selectedValue={subCategory} onValueChange={setSubCategory}>
                  <Picker.Item label="Select Property Type" value="" />
                  <Picker.Item label="House" value="House" />
                  <Picker.Item label="Apartment" value="Apartment" />
                  <Picker.Item label="Land" value="Land" />
                  <Picker.Item label="Commercial Building" value="Commercial Building" />
                  <Picker.Item label="Room for Rent" value="Room for Rent" />
                </Picker>
              </View>

              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                keyboardType="numeric"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                className="w-full border border-gray-300 p-4 rounded-xl mb-4"
              />

              <View className="flex-row gap-4 mb-4">
                <TextInput
                  value={bedrooms}
                  onChangeText={setBedrooms}
                  placeholder="Bedrooms"
                  keyboardType="numeric"
                  className="flex-1 border border-gray-300 p-4 rounded-xl"
                />

                <TextInput
                  value={bathrooms}
                  onChangeText={setBathrooms}
                  placeholder="Bathrooms"
                  keyboardType="numeric"
                  className="flex-1 border border-gray-300 p-4 rounded-xl"
                />
              </View>
            </>
          )}

          {/* Title */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            className="w-full border border-gray-300 p-4 rounded-xl mb-4"
          />

          {/* Description */}
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="w-full border border-gray-300 p-4 rounded-xl mb-4"
          />

          {/* Price */}
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            keyboardType="numeric"
            className="w-full border border-gray-300 p-4 rounded-xl mb-4"
          />

          {/* Images */}
          <View className="border-2 border-dashed border-indigo-300 rounded-xl p-5 mb-6 bg-indigo-50">
            <TouchableOpacity
              onPress={handleImageChange}
              className="bg-indigo-600 py-3 rounded-lg items-center"
            >
              <Text className="text-white font-semibold">Pick Images</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="City"
            className="w-full border border-gray-300 p-4 rounded-xl mb-4"
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <View className="flex-row flex-wrap gap-4 mb-6">
              {images.map((img, index) => (
                <View
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-md"
                  style={{ width: "47%" }}
                >
                  <Image
                    source={{ uri: img.uri }}
                    className="w-full h-32"
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    onPress={() => {
                      const updated = images.filter((_, i) => i !== index);
                      setImages(updated);
                    }}
                    className="absolute top-2 right-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center"
                  >
                    <Text className="text-white">✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Button */}
          <TouchableOpacity
            onPress={submit}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-indigo-600 items-center"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">🚀 Post Ad</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddPost;
