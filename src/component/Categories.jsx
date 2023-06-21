import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MD3Colors } from "react-native-paper";
import datas from "../shared/data.json";

const Categories = ({ setList, list, selectType, setSelectType }) => {
  const curList = list;

  const handleSelectCategory = (type) => {
    setSelectType(type);
    if (type === "All") setList(curList);
    else setList(curList.filter((item) => item.type === type));
  };

  const CategoryCard = (category) => {
    return (
      <Pressable
        style={{
          ...styles.card,
          backgroundColor:
            selectType === category ? MD3Colors.primary30 : "#fff",
        }}
        onPress={() => handleSelectCategory(category)}
      >
        <View>
          <Text
            style={{
              color: selectType === category ? "#fff" : MD3Colors.neutral30,
            }}
          >
            {category}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={datas.categories}
        horizontal={true}
        renderItem={({ item }) => CategoryCard(item)}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: "100%",
  },
  card: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: MD3Colors.secondary30,
    height: "100%",
    minWidth: 100,
    paddingHorizontal: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
