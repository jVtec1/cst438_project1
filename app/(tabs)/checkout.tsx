//@ts-nocheck
import { Text, View, FlatList, Button, Alert } from "react-native"; 
import { useState } from "react";

export default function Checkout() {

  // dummy values before I grab data from search page
  const [cartItems, setCartItems] = useState([
    { id: '1', make: 'Toyota', model: 'Camry', year: 2023, price: 25000 },
    { id: '2', make: 'Honda', model: 'Civic', year: 2022, price: 22000 },
    { id: '3', make: 'Ford', model: 'Mustang', year: 2024, price: 35000 },
    { id: '4', make: 'BMW', model: '3 Series', year: 2023, price: 45000 },
    { id: '5', make: 'Mercedes', model: 'C-Class', year: 2024, price: 55000 },
    { id: '6', make: 'Audi', model: 'A4', year: 2023, price: 48000 },
    { id: '7', make: 'Tesla', model: 'Model 3', year: 2024, price: 42000 },
    { id: '8', make: 'Lexus', model: 'ES', year: 2023, price: 41000 },
    { id: '9', make: 'Acura', model: 'TLX', year: 2022, price: 37000 },
    { id: '10', make: 'Infiniti', model: 'Q50', year: 2023, price: 39000 },
    { id: '11', make: 'Cadillac', model: 'CT5', year: 2024, price: 47000 },
    { id: '12', make: 'Genesis', model: 'G90', year: 2023, price: 72000 },
    { id: '13', make: 'Volvo', model: 'S60', year: 2024, price: 43000 },
    { id: '14', make: 'Jaguar', model: 'XE', year: 2023, price: 46000 },
    { id: '15', make: 'Porsche', model: '911', year: 2024, price: 125000 },
    { id: '16', make: 'Toyota', model: 'Camry', year: 2023, price: 25000 },
    { id: '22', make: 'Honda', model: 'Civic', year: 2022, price: 22000 },
    { id: '32', make: 'Ford', model: 'Mustang', year: 2024, price: 35000 },
    { id: '41', make: 'BMW', model: '3 Series', year: 2023, price: 45000 },
    { id: '52', make: 'Mercedes', model: 'C-Class', year: 2024, price: 55000 },
    { id: '64', make: 'Audi', model: 'A4', year: 2023, price: 48000 }
  ]);

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
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {item.year} {item.make} {item.model}
      </Text>
      <Text style={{ fontSize: 16, color: 'green', marginTop: 5 }}>
        ${item.price.toLocaleString()}
      </Text>

      <View style={{width: "25%", marginLeft: "75%"}}>
      <Button onPress={checkButton} title=" Remove from Cart"/> 
      </View>

    </View>
  );

  // need to work on remove cart button functionality here
  const checkButton = () => {
    Alert.alert("Get button functionality working!");
  }

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