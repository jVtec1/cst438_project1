import { Text, TextInput, View, Button, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite"; // to access the database
import UserList from "./UserList";

export default function Index() { // did not rename file to login-page because already routes to index page/first page
  // need to use useState to capture user inputs 
  const [usernameInput, setUsername] = useState(""); 
  const [passwordInput, setPassword] = useState("");
  const [usernameErrorMsg, setUserErrorMsg] = useState("");
  const [passwordErrorMsg, setPassErrorMsg] = useState("");

  const router = useRouter(); // need this router to change pages, e.g.: from login to landing page
  const db = useSQLiteContext(); // to access the database

  const verifyLogin = () => {
    console.log("Verify login function working!"); 
    if (usernameInput.length < 2) {
      setUserErrorMsg("Username has to be 2 or more characters in length.")
    } else if (usernameInput.length >= 2) {
      setUserErrorMsg("");
    }

    if (passwordInput.length < 3) {
      setPassErrorMsg("Password has to be 3 or more characters in length.")
    } else if (passwordInput.length >= 3) {
      setPassErrorMsg("");
    }

    const loadUsers = async () => {
  try {
    const user = await db.getFirstAsync(
      `SELECT username, password FROM users WHERE username = ? AND password = ?`,
      usernameInput.trim(),
      passwordInput
    );

    if (user) {
      router.push("/(tabs)");
    } else {
      console.warn("No matching user");
      setPassErrorMsg("Invalid username or password.");
    }
  } catch (error) {
    console.error("Login query failed", error);
    setPassErrorMsg("Something went wrong. Try again.");
  }
};


    if(usernameInput.length >= 2 && passwordInput.length >= 3){ // valid username and password length
      loadUsers();
    }

    // error check with database, ensure user is in db and username and password matches
    // use router.push(route-name) here to take user from login to landing page
  };

  const directToSignUp = () => {
    // navigate to the sign up page
  router.push("/sign-up");
  }

  return (
    // <Stack.Screen options={{title:"Login"}}/> {/* had to access Stack to change title of page from index to Login */}
    <View // without other View (parent), code gets error
    style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      flex: 0.7
    }}>
      <Text> Login </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
      
    <Text style={{padding: 10}}> Username: </Text>
    <TextInput placeholder="Enter username" style={{borderWidth: 1}} value={usernameInput} onChangeText={setUsername}/>
     
    </View>

    <Text style={{color: "red"}}> {usernameErrorMsg} </Text>

      <View
      style={{
        flexDirection: "row",
      }}>
      <Text style={{padding: 10}}> Password: </Text>
      <TextInput placeholder="Enter password" style={{borderWidth: 1}} value={passwordInput} onChangeText={setPassword}/>
      </View>

    <Text style={{color: "red"}}> {passwordErrorMsg} </Text>

    <Button title="Sign in" onPress={verifyLogin}/>

    <Text style={{marginTop: 20}}> Don&apos;t have an account? Click here: </Text>
    <Button title="Sign up" onPress={directToSignUp}/>

    {/* This "UserList" is here to see users and their credentials that are in the database, pops up on login screen, for testing purposes */}
    <UserList /> 
    {/* Also when this fills with users you have to scroll up and down it */}

    <Button title="Change password" onPress={() => router.push("/changePassword")} />


    </View>


      

  );
}
