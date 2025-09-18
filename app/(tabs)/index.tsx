import { Text, View, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignContent:"center",
        backgroundColor:"#005EB8",
      }}
    >
      <Text style={{fontSize:20,padding:10,color:"gold",textAlign:"center"}}>Welcome to Monte's Auto Dealership!</Text>
      <Image source={require('../../assets/images/lilguy.png')} style={{width:400, height:600, alignItems:"flex-end"}}/>



    </View>
  );
}
