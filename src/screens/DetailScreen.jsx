import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button, IconButton, MD3Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export const DetailScreen = ({ route, navigation }) => {
  const { orchid, favourites } = route.params;
  const [isFavourite, setIsFavourite] = React.useState(
    favourites.find((item) => item.id === orchid.id) ? true : false
  );

  const handleLikeButton = async () => {
    if (favourites.length > 0) {
      const isExist = favourites.find((item) => item.id === orchid.id);
      if (isExist) {
        handleDislike();
      } else {
        await AsyncStorage.setItem(
          "favourites",
          JSON.stringify([...favourites, orchid])
        );
        setIsFavourite(true);
      }
    } else {
      const emptyList = [];
      emptyList.push(orchid);
      await AsyncStorage.setItem("favourites", JSON.stringify(emptyList));
      setIsFavourite(true);
    }
  };

  const handleDislike = async () => {
    await AsyncStorage.setItem(
      "favourites",
      JSON.stringify(favourites.filter((item) => item.id !== orchid.id))
    );
    setIsFavourite(false);
  };

  const showAllertDislike = () => {
    Alert.alert(
      "Remove from favourites",
      "Are you sure? This action cannot revert!",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleDislike(),
          style: "default",
        },
      ]
    );
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  //   onLayoutRootView();
  // }, [fontsLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.image__wrapper}>
          <Image
            source={{
              uri: orchid.path,
            }}
            style={styles.detail__image}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: 5,
              left: 5,
            }}
          >
            <IconButton
              icon="keyboard-backspace"
              mode="contained"
              iconColor="#1E2F97"
              size={20}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon={isFavourite ? "cards-heart" : "cards-heart-outline"}
              mode="contained"
              iconColor="red"
              size={20}
              onPress={isFavourite ? showAllertDislike : handleLikeButton}
            />
          </View>
        </View>
        <View style={styles.content__wrapper}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.orchid__name}>{orchid.name}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginVertical: 6,
            }}
          >
            <Text
              style={{
                color: "#e73333",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {orchid.price}
            </Text>
            <Text style={{ fontSize: 16 }}>/ 1 flower</Text>
          </View>
          <View>
            <Text style={{ color: "rgb(126, 126, 126);", fontSize: 16 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unkno
            </Text>
          </View>
        </View>
        <Button style={styles.orchid__button} mode="contained">
          Add to cart
        </Button>
      </View>
      <StatusBar barStyle="dark-content" animated={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: "relative",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image__wrapper: {
    width: "100%",
    backgroundColor: "#fff",
    overflow: "hidden",
    padding: 2,
    position: "relative",
  },
  detail__image: {
    width: "100%",
    height: "auto",
    resizeMode: "contain",
    aspectRatio: 3 / 2,
  },
  content__wrapper: {
    marginTop: 20,
  },
  orchid__name: {
    fontSize: 20,
    fontWeight: "500",
  },
  orchid__button: {
    borderRadius: 4,
    position: "absolute",
    bottom: 12,
    left: 20,
    right: 20,
    backgroundColor: "#1E2F97",
  },
});
