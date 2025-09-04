import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState } from "react";

export default function Search() {
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
      <Dropdown style={{borderWidth: 1, borderColor: "black"}} 
      placeholder="Select Make" 
      onChange={function (item: any): void {
            throw new Error("Function not implemented.");
          } } data={[]} labelField={""} valueField={""}/>
    </View>

    <View style={{flexDirection: "row",
      marginTop: 10
    }}>
      <Text style={{padding: 10}}> Model: </Text>
      <Dropdown style={{borderWidth: 1, borderColor: "black"}} 
      placeholder="Select Model" 
      onChange={function (item: any): void {
            throw new Error("Function not implemented.");
          } } data={[]} labelField={""} valueField={""}/>
    </View>

    </View>
    {/* end of dropdown menus section */}


    </View>
  );
}