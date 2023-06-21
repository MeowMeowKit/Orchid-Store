import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import { FavouritesListScreen } from "./src/screens/FavouritesListScreen";
import { DetailScreen } from "./src/screens/DetailScreen";
import { ContactScreen } from "./src/screens/ContactScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const FlowerListScreen = ({ navigation }) => (
    <HomeScreen navigation={navigation} />
  );
  const FavouriteListScreen = () => <FavouritesListScreen />;
  const DetailOrchid = ({ route, navigation }) => (
    <DetailScreen route={route} navigation={navigation} />
  );
  const MainDrawer = () => {
    return (
      <Drawer.Navigator useLegacyImplementation={true}>
        <Drawer.Screen name="OrdChid Shop" component={MainTabs} />
        <Drawer.Screen name="Favourites" component={FavouriteListScreen} />
        <Drawer.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>
    );
  };

  const MainTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "flower" : "flower-outline";
            } else if (route.name === "Favourites") {
              iconName = focused ? "heart" : "heart-outline";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={FlowerListScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouriteListScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Tabs" component={MainTabs} />
        {/* <Stack.Screen name="FlowerScreen" component={FlowerListScreen} /> */}
        <Stack.Screen name="DetailOrchid" component={DetailOrchid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
