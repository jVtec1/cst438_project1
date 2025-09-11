//@ts-nocheck
// above helps with removing typescript-related errors while writing in JavaScript on tsx file
import { Text, View, Alert, Button, FlatList, ActivityIndicator, Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface CarItem {
  id: string;
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
  
  // New states for car data display
  const [carData, setCarData] = useState<CarItem[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const carListings = await response.json();
      
      // Transform API response to match our CarItem interface
      const transformedData: CarItem[] = carListings.map((car: any, index: number) => ({
        id: car.id || car.vin || index.toString(),
        make: car.make || selectedMake,
        model: car.model || selectedModel,
        year: car.year || car.modelYear || 2023,
        price: car.price || car.listPrice || Math.floor(Math.random() * 50000) + 10000,
        mileage: car.mileage || car.odometer || Math.floor(Math.random() * 100000),
        imageUrl: car.imageUrl || car.primaryPhotoUrl || car.photoUrls?.[0] || `https://via.placeholder.com/300x200?text=${selectedMake}+${selectedModel}`,
        description: car.description || car.notes || `Beautiful ${selectedMake} ${selectedModel} in excellent condition`,
      }));

      setCarData(transformedData);
      
    } catch (error) {
      console.error("Error fetching car data:", error);
      Alert.alert("Error", "Failed to fetch car data. Please try again.");
      
      // Fallback to mock data if API fails 3 items only
      const fallbackData: CarItem[] = [
        {
          id: "1",
          make: selectedMake,
          model: selectedModel,
          year: 2022,
          price: 35000,
          mileage: 15000,
          imageUrl: `https://via.placeholder.com/300x200/007AFF/white?text=${selectedMake}+${selectedModel}+1`,
          description: "Low mileage, excellent condition"
        },
        {
          id: "2",
          make: selectedMake,
          model: selectedModel,
          year: 2021,
          price: 28000,
          mileage: 25000,
          imageUrl: `https://via.placeholder.com/300x200/FF9500/white?text=${selectedMake}+${selectedModel}+2`,
          description: "One owner, well maintained"
        },
        {
          id: "3",
          make: selectedMake,
          model: selectedModel,
          year: 2023,
          price: 42000,
          mileage: 5000,
          imageUrl: `https://via.placeholder.com/300x200/34C759/white?text=${selectedMake}+${selectedModel}+3`,
          description: "Brand new condition, all features"
        }
      ];
      
      setCarData(fallbackData);
    } finally {
      setLoadingCars(false);
    }
  }
}

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
          onPress={captureMakeAndModel}
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
                Found {carData.length} {selectedMake} {selectedModel} vehicles (max 10 results)
              </Text>
              <FlatList
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
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    width: 60,
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