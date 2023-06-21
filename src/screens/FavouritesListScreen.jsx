import React from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, MD3Colors, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import datas from "../shared/data.json";
import OrchidCard from "../component/OrchidCard";
import Categories from "../component/Categories";

export const FavouritesListScreen = () => {
  const colorScheme = useColorScheme();

  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [orchids, setOrchids] = React.useState(datas.orchids);
  const [favourites, setFavourites] = React.useState([]);
  const [selectType, setSelectType] = React.useState("All");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const getFavourites = async () => {
      setLoading(true);
      const storeData = JSON.parse(
        (await AsyncStorage.getItem("favourites")) || "{}"
      );
      if (storeData !== null) setFavourites(storeData);
      setLoading(false);
    };
    if (isFocused) getFavourites();
  }, [isFocused]);

  const handleDeleteAll = async () => {
    setFavourites([]);
    await AsyncStorage.setItem("favourites", JSON.stringify([]));
  };

  const showAlertDeleteAll = () => {
    Alert.alert(
      "Delete all favourite orchids",
      "Are you sure? This action cannot revert!",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleDeleteAll(),
          style: "default",
        },
      ]
    );
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: "#cccc",
      }}
    >
      <View style={styles.wrapper}>
        <View style={{}}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            elevation={1}
          />
          {/* <Categories
          // setList={setOrchids}
          // list={datas.orchids}
          // selectType={selectType}
          // setSelectType={setSelectType}
          /> */}
          <View style={styles.list__wrapper}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={MD3Colors.primary50}
                animating={true}
              />
            ) : (
              <FlatList
                data={favourites}
                horizontal={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                // style={{ flex: 1 }}
                renderItem={({ item, index, separators }) => (
                  <OrchidCard
                    orchid={item}
                    favourites={favourites}
                    setFavourites={setFavourites}
                    // onShowUnderlay={separators.highlight}
                    // onHideUnderlay={separators.unhighlight}
                    navigation={""}
                  />
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                style={{
                  width: "100%",
                  marginBottom: 10,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  searchBar: {
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: "white",
    minWidth: "100%",
  },
  list__wrapper: {
    marginTop: 12,
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
