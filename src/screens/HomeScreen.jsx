import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
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
const HomeScreen = ({ navigation }) => {
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
      const storeData = JSON.parse(await AsyncStorage.getItem("favourites"));
      if (storeData !== null) setFavourites(storeData);
      setOrchids((prev) =>
        prev.filter((item) =>
          selectType === "All" ? item : item.type === "All"
        )
      );
      setLoading(false);
    };
    if (isFocused) getFavourites();
  }, [isFocused]);

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: "#cccc",
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.wrapper}>
        <View
          style={{
            marginBottom: -200,
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            elevation={1}
          />
          <Categories
            setList={setOrchids}
            list={datas.orchids}
            selectType={selectType}
            setSelectType={setSelectType}
          />
          <View style={styles.list__wrapper}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={MD3Colors.primary50}
                animating={true}
              />
            ) : (
              <FlatList
                data={orchids.filter((item) => item.name.includes(searchQuery))}
                horizontal={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                // style={{ flex: 1 }}
                renderItem={({ item }) => (
                  <OrchidCard
                    orchid={item}
                    favourites={favourites}
                    setFavourites={setFavourites}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    width: "100%",
  },
});
