//@ts-nocheck
// above helps with removing typescript-related errors while writing in JavaScript on tsx file
import { Text, View, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Search() {

  //TODO NEXT: Grab user's make and model choices, already saved from useState, and put them in params in API call

  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [allCarData, setAllCarData] = useState({}); // need this line to capture all car data, so we can keep accessing different makes and models

  const getMakesAndModels = async () => {
    try {
      const response = await fetch("https://www.auto.dev/api/models", {
        method: "GET",
        headers: {
          Authorization: "Bearer sk_ad_XQYDCGKi5ed3CiT_Pf_GnrGw", // replace with your key
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

  // calling function using useEffect because we only want it to grab values on render
  useEffect(() => {
    getMakesAndModels();
  }, []); // [] indicates to only run the function once


  // function to handle user picking a specific Make. we want models to match models of specific Make
  const onHandleChangeMake = (make) => { 

   setSelectedMake(make.value); // have to assign make.value, not just "make" because make is whole Object (e.g. {label: "", value: ""})
   setSelectedModel(null); // ensuring if user changes mind about make, models don't still show previous ones
   Alert.alert("You chose: " + make.label);

   try {

    const modelsList = allCarData[make.value].map((model) => ({ // make.value is the key and can be used as index to grab array with models
      label: model,
      value: model,
    }));

    setCarModels(modelsList);

   } catch(error) {
    console.log(error);
   }

  };

  const onHandleChangeModel = (model) => {
    setSelectedModel(model.value); // saves our model value 
    Alert.alert("You chose this model: " + model.value);
  }
  

  const [selectedMake, setSelectedMake] = useState(null); // saves current selected make and even shows in dropdown bar
  const [selectedModel, setSelectedModel] = useState(null); // saaves current selected model and even shows in dropdown bar
  // const [modelData, setModelData] = useState([]);

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
      onChange={onHandleChangeMake} 
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
      onChange={onHandleChangeModel} 
      data={carModels} 
      value={selectedModel}
      labelField={"label"} 
      valueField={"value"}/>
    </View>

    </View>
    {/* end of dropdown menus section */}


    </View>
  );
}