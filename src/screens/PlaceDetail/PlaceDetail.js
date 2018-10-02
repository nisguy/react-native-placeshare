import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";

const placeDetail = props => {
  return (
    <ScrollView>
      <Image source={props.selectedPlace.image} style={styles.selectedImage} />
      <MapView
        initialRegion={{
          ...props.selectedPlace.location,
          latitudeDelta: 0.0122,
          longitudeDelta:
            (Dimensions.get("window").width / Dimensions.get("window").height) *
            0.0122
        }}
        style={styles.selectedImage}
      >
        <MapView.Marker coordinate={props.selectedPlace.location} />
      </MapView>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedImage: {
    height: 170,
    width: "100%"
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center"
  }
});

export default placeDetail;
