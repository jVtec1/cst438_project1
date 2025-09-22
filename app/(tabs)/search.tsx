//@ts-nocheck
// above helps with removing typescript-related errors while writing in JavaScript on tsx file
import { Text, View, Alert, Button, FlatList, ActivityIndicator, Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";

interface CarItem {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  imageUrl?: string;
  description?: string;
}

export default function Search() {
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [allCarData, setAllCarData] = useState({});
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  
  const [carData, setCarData] = useState<CarItem[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [vins, setVins] = useState([]);

  const { cartItems, addToCart, isInCart } = useCart();

  const getMakesAndModels = async () => {
    try {
      const response = await fetch("https://www.auto.dev/api/models", {
        method: "GET",
        headers: {
          Authorization: "Bearer sk_ad_XQYDCGKi5ed3CiT_Pf_GnrGw", 
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
      setAllCarData(result);
  
      // taking the keys (makes) from JSON and assigning the make as label and value
      const makesList = Object.keys(result).map((make) => ({
        label: make,
        value: make,
      }));
  
      setCarMakes(makesList);
  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMakesAndModels();
  }, []);

  const onHandleChangeMake = (make) => { 
    setSelectedMake(make.value);
    setSelectedModel(null);
    setShowResults(false); // Hide results when make changes

    try {
      const modelsList = allCarData[make.value].map((model) => ({
        label: model,
        value: model,
      }));
      setCarModels(modelsList);
    } catch(error) {
      console.log(error);
    }
  };

  const onHandleChangeModel = (model) => {
    setSelectedModel(model.value);
    setShowResults(false);
  }

  const captureMakeAndModel = async () => {
    if (selectedMake === null) {
      Alert.alert("Please select a Make");
    } else if (selectedModel === null) {
      Alert.alert("Please select a Model"); 
    } else {
      Alert.alert("Searching for: " + selectedMake + " " + selectedModel);
      setLoadingCars(true);
      setShowResults(true);
    
    try {
      const response = await fetch(`https://www.auto.dev/api/listings?make=${selectedMake}&model=${selectedModel}&limit=10`, {
        method: "GET",
        headers: {
          Authorization: "Bearer sk_ad_XQYDCGKi5ed3CiT_Pf_GnrGw", 
          "Content-Type": "application/json",
        },
      });


      const carListings = await response.json();

      if (!Array.isArray(carListings.records)) {
        throw new Error("API response 'records' field is missing or not an array");
      }

      try{

        const transformedData: CarItem[] = carListings.records.map((car, index) => ({
        id: car.vin || index.toString(),
        vin: car.vin,
        make: car.make || selectedMake,
        model: car.model || selectedModel,
        year: car.year || 2023,
        price: typeof car.priceUnformatted === 'number' ? car.priceUnformatted : 0,
        mileage: typeof car.mileageUnformatted === 'number' ? car.mileageUnformatted : 0,
        imageUrl: car.primaryPhotoUrl || null,
        description: `${car.trim || ""} - ${car.bodyStyle || ""}`,
      }));

      setCarData(transformedData);

      } catch(error){
        console.log(error);
      }
      
    } catch (error) {
      console.error("Error fetching car data:", error);
      Alert.alert("Error", "Failed to fetch car data. Please try again.");

      // Fallback mock data
      const fallbackData: CarItem[] = [
        {
          id: "1",
          make: selectedMake,
          model: selectedModel,
          year: 2022,
          price: 35000,
          mileage: 15000,
          description: "Low mileage, excellent condition",
        },
        {
          id: "2",
          make: selectedMake,
          model: selectedModel,
          year: 2021,
          price: 28000,
          mileage: 25000,
          description: "One owner, well maintained",
        },
        {
          id: "3",
          make: selectedMake,
          model: selectedModel,
          year: 2023,
          price: 42000,
          mileage: 5000,
          description: "Brand new condition, all features",
        }
      ];

      setCarData(fallbackData);
    } finally {
      setLoadingCars(false);
    }
  }
};

  // Render item for FlatList
  const renderCarItem = ({ item }: { item: CarItem }) => (
    <View style={styles.carItem}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.carImage}
        resizeMode="cover"
      />
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{item.year} {item.make} {item.model}</Text>
        <Text style={styles.carPrice}>${item.price.toLocaleString()}</Text>
        <Text style={styles.carMileage}>{item.mileage.toLocaleString()} miles</Text>
        <Text style={styles.carDescription}>{item.description}</Text>
      </View>

      <View style={{width: "25%", marginLeft: "70%", marginBottom: 20}}>
      <Button onPress={() => {
            addToCart(item); //  add Car item into array shared in Context
            if (isInCart(item.id)) {
              Alert.alert("Already in cart!");
            } else {
              Alert.alert(`${item.make} ${item.model} added to cart`);
            }
           
          }} 
          title="Add to Cart"
          color="#B59410"/> 
      
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search for Vehicles</Text>
      </View>

      {/* Dropdown menus section */}
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdownRow}>
          <Text style={styles.dropdownLabel}>Make:</Text>
          <Dropdown 
            style={styles.dropdown}
            placeholder="Select Make" 
            onChange={onHandleChangeMake} 
            data={carMakes}
            value={selectedMake}
            labelField="label" 
            valueField="value"
          />
        </View>

        <View style={styles.dropdownRow}>
          <Text style={styles.dropdownLabel}>Model:</Text>
          <Dropdown 
            style={styles.dropdown}
            placeholder="Select Model" 
            onChange={onHandleChangeModel} 
            data={carModels} 
            value={selectedModel}
            labelField="label" 
            valueField="value"
          />
        </View>
      </View>

      {/* Search button */}
      <View style={styles.searchButtonContainer}>
        <Button 
          title="Search"
          color= "#B59410"
          onPress={captureMakeAndModel} //refresh the vin array so that it does not keep any of the previous data from the last search. 
        />
      </View>

      {/* Results section */}
      {showResults && (
        <View style={styles.resultsContainer}>
          {loadingCars ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading {selectedMake} {selectedModel} results...</Text>
            </View>
          ) : carData.length > 0 ? (
            <>
              <Text style={styles.resultsHeader}>
                Found {carData.length} {selectedMake} {selectedModel} vehicles
              </Text>
              <FlatList
                accessibilityLabel="VehicleList"
                data={carData}
                renderItem={renderCarItem}
                keyExtractor={(item) => item.id}
                style={styles.carList}
                contentContainerStyle={styles.carListContent}
              />
            </>
          ) : (
            <Text style={styles.noResultsText}>
              No results found for {selectedMake} {selectedModel}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    backgroundColor:"#005EB8",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: "#B59410"
  },
  dropdownContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: 'center',
  },
  dropdownLabel: {
    padding: 10,
    fontWeight: 'bold',
    width: 70
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: 200,
  },
  searchButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "white"
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#B59410'
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  carList: {
    flex: 1,
  },
  carListContent: {
    paddingBottom: 20,
  },
  carItem: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 200,
  },
  carInfo: {
    padding: 16,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  carMileage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  carDescription: {
    fontSize: 14,
    color: '#333',
  },
});