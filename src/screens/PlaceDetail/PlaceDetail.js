import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const placeDetail = props => {
  console.log(Platform.OS);
  return (
    <View>
      <Image source={props.selectedPlace.image} style={styles.selectedImage} />
      <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      <View>
        <TouchableOpacity onPress={props.onItemDeleted}>
          <View style={{ alignItems: "center" }}>
            <Icon
              size={30}
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              color="red"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedImage: {
    height: 200,
    width: "100%"
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center"
  }
});

export default placeDetail;
