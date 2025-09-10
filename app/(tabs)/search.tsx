//@ts-nocheck
// above helps with removing typescript-related errors while writing in JavaScript on tsx file
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SetStateAction, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Search() {

  // dummy values since haven't checked if API working
  const carMakes = [
    { label: "Toyota", value: "toyota" },
    { label: "Honda", value: "honda" }
  ];

  const toyotaModels = [
    { label: "Corolla", value: "corolla" },
    { label: "Camry", value: "camry" },
    { label: "Prius", value: "prius" },
  ];

  const hondaModels = [
    { label: "Civic", value: "civic" },
    { label: "Accord", value: "accord" },
    { label: "HR-V", value: "hr-v" },
  ];

  // function to handle user picking a specific Make. we want models to match models of specific Make
  const onHandleChange = (make) => { // did a quick fix here, was having problem w/ inferred type for make
  //  console.log("Set up dropdown menu for Model!");
   setSelectedMake(make.value);

   //clearning old model, so if user decides to choose a different make, the old models aren't still there
   setSelectedModel(null);

   if (make.value === "toyota") {
    setModelData(toyotaModels);
  } else if (make.value === "honda") {
    setModelData(hondaModels);
  } 
  };

  //testing API
  const getCarData = async () => {
    try {

      const response = await fetch('https://api.auto.dev/listings/10ARJYBS7RC154562', {
        headers: {
          Authorization: 'Bearer sk_ad_XQYDCGKi5ed3CiT_Pf_GnrGw',
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json()
      const vehicle = result.data.vehicle;
      const vehicleInfo = `${vehicle.make} ${vehicle.model}`;
      setExampleAPI(vehicleInfo); // String

    } catch (error) {
      console.log(error);
    }
  }
  

  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelData, setModelData] = useState([]);
  const [exampleAPI, setExampleAPI] = useState("");
  

  return (
    <View>

    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search for Vehicles</Text>
    </View>

 {/* start of dropdown menus section */}
    <View style={{justifyContent: "center",
        alignItems: "center",
        marginTop: 20
        }}>

    <View style={{flexDirection: "row",
      marginBottom: 10
    }}>
      <Text style={{padding: 10}}> Make: </Text>
      <Dropdown style={{
        height: 50,           // ← Fixed height
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15, // ← Padding for text
        backgroundColor: 'white',
        width: "25%"
    }} 
      placeholder="Select Make" 
      onChange={onHandleChange} 
      data={carMakes}
      value={selectedMake}
      labelField={"label"} 
      valueField={"value"}/>
    </View>

    <View style={{flexDirection: "row",
      marginTop: 10
    }}>
      <Text style={{padding: 10}}> Model: </Text>
      <Dropdown style={{
        height: 50,           // ← Fixed height
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15, // ← Padding for text
        backgroundColor: 'white',
        width: "25%"
    }} 
      placeholder="Select Model" 
      onChange={getCarData} 
      data={modelData} 
      value={selectedModel}
      labelField={"label"} 
      valueField={"value"}/>
    </View>

    </View>
    {/* end of dropdown menus section */}

    <View 
    style={{justifyContent: "center",
      alignItems: "center"}}>
      <Text> {exampleAPI} </Text> {/* Replace with API call data, testing on mobile */}
    </View>


    </View>
  );
}