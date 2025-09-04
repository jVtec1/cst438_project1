import { Text, View } from "react-native";

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

    <View style={{flexDirection: "row"}}>
      <Text style={{padding: 10}}> Make: </Text>
    </View>

    <View style={{flexDirection: "row"}}>
      <Text style={{padding: 10}}> Model: </Text>
    </View>

    </View>
    {/* end of dropdown menus section */}


    </View>
  );
}