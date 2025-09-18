//@ts-nocheck
import { Text, View, FlatList, Button, Alert, Image, StyleSheet } from "react-native"; 
import { useState } from "react";
import { useCart } from  "../contexts/cartContext";

export default function Checkout() {

  const { cartItems, removeFromCart } = useCart();

  // UI for each car item 
  const renderCartItem = ({ item }) => (
    <View style={{
      padding: 15,
      backgroundColor: 'white',
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 3,
      marginHorizontal: 20 
    }}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.carImage}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {item.year} {item.make} {item.model} - {item.mileage} miles
      </Text>
      <Text style={{ fontSize: 16, color: 'green', marginTop: 5 }}>
        ${item.price.toLocaleString()}
      </Text>

      <View style={{width: "25%", marginLeft: "75%"}}>
      <Button onPress={() => {
            removeFromCart(item.id);
            Alert.alert(`${item.make} ${item.model} removed from cart`);
          }} 
          title=" Remove from Cart"/> 
      </View>

    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

      {/* Header */}
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20
      }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>My Cart</Text>
      </View>
      {/* end of Header */}

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#666', marginTop: 50 }}>
            Your cart is empty
          </Text>
        }
        contentContainerStyle={{
          paddingBottom: 20 
        }}
      />

    </View>
  );
}

// took image styling from search page
const styles = StyleSheet.create({
  carImage: {
    width: '100%',
    height: 200,
  }
})