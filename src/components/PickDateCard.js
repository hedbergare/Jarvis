import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import { SvgUri } from "react-native-svg";
import IconTest from "../assets/IconTest.svg";
import SvgComponent from "./SvgComponent";

const PickDateCard = () => {
  return (
    <View style={styles.PickDateCard}>
      {/* <Image
        style={styles.icon}
        source={require("../assets/icon-alphabet.png")}
      /> */}
      <SvgComponent
        content='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="49" height="49" viewBox="0 0 49 49">
  <defs>
    <filter id="Rectangle_28" x="0" y="0" width="49" height="49" filterUnits="userSpaceOnUse">
      <feOffset dx="1" dy="1" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="icon_calender" data-name="icon calender" transform="translate(3.5 3.5)">
    <g transform="matrix(1, 0, 0, 1, -3.5, -3.5)" filter="url(#Rectangle_28)">
      <rect id="Rectangle_28-2" data-name="Rectangle 28" width="40" height="40" rx="13" transform="translate(3.5 3.5)" fill="#5635d2" opacity="0.5"/>
    </g>
    <g id="icon_calender-2" data-name="icon calender" transform="translate(11 10)">
      <path id="ic_date_range_24px" d="M9,11H7v2H9Zm4,0H11v2h2Zm4,0H15v2h2Zm2-7H18V2H16V4H8V2H6V4H5A1.991,1.991,0,0,0,3.01,6L3,20a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V6A2.006,2.006,0,0,0,19,4Zm0,16H5V9H19Z" transform="translate(-3 -2)" fill="#5635d2"/>
    </g>
  </g>
</svg>
'
      />
      <View>
        <Text>Due date:</Text>
        <Text style={fonts.heading3}>Thursday, 10th May</Text>
      </View>
    </View>
  );
};

export default PickDateCard;

const styles = StyleSheet.create({
  PickDateCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  icon: {
    marginRight: 20,
    width: 50,
    height: 50,
  },
});
