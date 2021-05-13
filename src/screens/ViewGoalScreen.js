import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "../components/Font";
import ScreenHeader from "../components/ScreenHeader";

import * as Progress from "react-native-progress";
import ContributorTag from "../components/ContributorTag";
import InfoModal from "../components/InfoModal";
import DateService from "../services/DateService";

const ViewGoalScreen = ({ navigation, route }) => {
  const params = route.params;
  console.log("route param: ", params.estimatedDate);
  console.log("goal date format: ", params.goal.date_created);
  return (
    <ScrollView contentContainerStyle={styles.ViewGoalScreen}>
      <ScreenHeader title={params.goal.name} navigation={navigation} />
      <View style={styles.topContentContainer}>
        <View style={styles.themeContainer}>
          <View
            style={[styles.themeSample, { backgroundColor: colors.blue }]}
          ></View>
          <Font text="Change theme" textStyle={styles.themeText}></Font>
        </View>
        <View style={styles.titleContainer}>
          <Font
            text={params.timeRemaining + " Days"}
            textStyle={fonts.heading1}
          ></Font>
          <Font text="Remaining" textStyle={fonts.lightHeading3}></Font>
        </View>
      </View>
      <View style={styles.progressMade}>
        <Font text="Progress made:" font={fonts.heading3}></Font>
      </View>
      <Text style={styles.progressText}>
        <Font text={params.goal.current_value} font={fonts.heading2}></Font>
        <Font text={" of "} font={fonts.heading4}></Font>
        <Font text={params.goal.max_value} font={fonts.heading2}></Font>
        <Text>
          <Font
            text={params.goal.quantified ? " miles" : " days"}
            font={fonts.heading4}
          ></Font>
          <Font text={" complete"} font={fonts.heading4}></Font>
        </Text>
      </Text>
      <View style={[styles.progressValueContainer]}>
        <Font
          text={params.progress + "%"}
          font={fonts.heading3}
          textStyle={{
            transform: [{ translateX: (300 * params.progress) / 100 }],
          }}
        ></Font>
      </View>
      <Progress.Bar
        style={styles.progressBar}
        progress={params.progress / 100}
        width={null}
        color={colors.greenLight}
        unfilledColor={colors.whiteDark}
        borderWidth={0}
      />
      <View style={styles.botContentContainer}>
        <View style={styles.headerContainer}>
          <Font text="Statistics:" font={fonts.heading3}></Font>
        </View>
        <View style={styles.innerBotContentContainer}>
          <View style={styles.rowContainer}>
            <Font text="Good Phase:" textStyle={styles.statsFont}></Font>
            <Font
              text={params.goodPhase ? "YES" : "NO"}
              font={fonts.heading3}
              textStyle={{
                color: params.goodPhase ? colors.greenLight : colors.redLight,
              }}
            ></Font>
            <InfoModal
              styleProp={{ marginLeft: 50 }}
              text="You current progress has been calculated and compared to how 
            far away your deadline is. Weather your phase is good or not depends of if 
            your current phase will make you reach your goal in time or not."
            />
          </View>
          <View style={styles.rowContainer}>
            <Font
              text="Projected finish date:"
              textStyle={styles.statsFont}
            ></Font>

            <InfoModal
              styleProp={{ marginLeft: 28 }}
              text="Depending on your current progress it is calculated assuming that you do not change your phase."
            />
          </View>
          <Font
            text={DateService.formatDateWithYear(params.estimatedDate)}
            font={fonts.heading3}
          ></Font>
          <View style={[styles.rowContainer, styles.youAreSection]}>
            <Font text="You are:" textStyle={styles.statsFont}></Font>
            <InfoModal
              styleProp={{ marginLeft: 28 }}
              text="This value ressemblance how many days away from your deadline you are. Either ahead or behind."
            />
          </View>

          <Text>
            <Font
              text={Math.abs(params.dayDifference)}
              font={fonts.heading3}
              textStyle={{
                color: params.goodPhase ? colors.greenLight : colors.redLight,
              }}
            ></Font>
            <Font text=" days " font={fonts.heading3}></Font>
            <Font
              text={params.goodPhase ? "ahead" : "behind"}
              font={fonts.heading3}
            ></Font>
          </Text>
        </View>
        <View style={[styles.headerContainer, styles.contributorHeader]}>
          <Font text="Contributors:" font={fonts.heading3}></Font>
        </View>

        <View style={styles.contributorTagContainer}>
          <ContributorTag value={"P"} />
          <ContributorTag value={"J"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewGoalScreen;

const styles = StyleSheet.create({
  ViewGoalScreen: {
    minHeight: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingBottom: 50,
  },
  headerContainer: {
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  topContentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -50 }],
  },
  themeContainer: {
    width: 100,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  themeSample: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginBottom: 5,
  },
  themeText: {
    color: colors.yellow,
    fontSize: 10,
    fontWeight: "500",
  },
  progressMade: {
    marginTop: 30,
    marginBottom: 15,
    width: "90%",
  },
  progressText: {
    marginBottom: 10,
  },
  progressValueContainer: {
    width: "80%",
    paddingVertical: 5,
  },
  progressBar: {
    width: "80%",
    marginBottom: 30,
  },
  botContentContainer: {
    width: "80%",
    alignItems: "center",
  },
  innerBotContentContainer: {
    width: "80%",
  },
  statsFont: {
    marginVertical: 10,
    marginRight: 10,
    color: colors.gray,
    fontWeight: "600",
  },
  contributorTagContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: 10,
  },
  contributorHeader: {
    marginTop: 20,
  },
  youAreSection: {
    marginTop: 20,
  },
});
