import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import Spacer from "./Spacer";
import colors from "../themes/colors";

const NavLink = ({ text, routeName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
    <Spacer>
        <Text style={styles.link}>{text}</Text>
    </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    link: {
        color: colors.primary,
        fontWeight:"bold", 
        fontSize: 15,
        marginTop: 10

      }
});

export default NavLink;
