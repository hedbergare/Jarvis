import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "../components/Font";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import GoalCard from "../components/GoalCard";
import ScreenHeader from "../components/ScreenHeader";
import AddButton from "../components/AddButton";

const GoalsScreen = ({ navigation }) => {
  const fetchedGoals = useSelector((state) => state.goals);
  const sharedGoals = useSelector((state) => state.sharedGoals);

  const estimatedFinishDate = (goal, progressMade) => {
    if (goal.quantified && progressMade > 0) {
      moment.locale("en");

      const start = new Date(goal.date_created).getTime();
      const now = new Date().getTime();

      const daysPast = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      const pace = progressMade / (daysPast > 0 ? daysPast : 1);

      const estimatedDays = Math.floor(
        (goal.max_value - goal.current_value) / (pace * 100)
      );

      const totalMilliseconds = Math.floor(
        now + estimatedDays * 1000 * 60 * 60 * 24
      );
      const finishDate = moment(totalMilliseconds).format("YYYY-MM-DD");
      const goodPace = estimatedDays >= 0 ? true : false;
      return [finishDate, estimatedDays, goodPace];
    }
    return [goal.deadline, 0, true];
  };

  const calculateProgressMade = (goal, now, start, end) => {
    if (goal.quantified) {
      return goal.current_value / goal.max_value;
    } else {
      return 1 - (end - now) / (end - start);
    }
  };

  const calculateDaysRemaining = (now, end) =>
    Math.ceil((end - now) / (1000 * 60 * 60 * 24));

  const calculateDaysTotal = (start, end) =>
    Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const calculateDaysPassed = (start, now) =>
    Math.floor((now - start) / (1000 * 60 * 60 * 24));

  const renderGoalCard = (goal, index) => {
    const now = new Date().getTime();
    const start = new Date(goal.date_created).getTime();
    const end = new Date(goal.deadline).getTime();

    const daysRemaining = calculateDaysRemaining(now, end);
    const daysPassed = calculateDaysPassed(start, now);

    const daysTotal = calculateDaysTotal(start, end);

    const progressMade = calculateProgressMade(goal, now, start, end);
    const [estimatedDate, dayDifference, goodPhase] = estimatedFinishDate(
      goal,
      progressMade
    );
    // const [goodPhase, dayDifference] = calculatePhase(end, estimatedDate);

    return (
      <GoalCard
        key={index}
        navigation={navigation}
        goal={goal}
        timeRemaining={daysRemaining}
        progress={Math.round(progressMade * 100)}
        estimatedDate={estimatedDate}
        goodPhase={goodPhase}
        dayDifference={daysTotal - dayDifference}
        daysPassed={daysPassed}
        daysTotal={daysTotal}
      />
    );
  };

  const [displayOwned, setDisplayOwned] = useState(true);

  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };

  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.GoalsScreen}>
        <ScreenHeader title="My Goals" navigation={navigation} />
        <View style={styles.listTypeToggle}>
          <TouchableOpacity
            style={displayOwned ? styles.activeListStyle : null}
            onPress={handleDisplayOwned}
          >
            <Text
              style={[
                fonts.heading4,
                styles.listTypeText,
                displayOwned ? null : styles.fadedText,
              ]}
            >
              Mine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={displayOwned ? null : styles.activeListStyle}
            onPress={handleDisplayShared}
          >
            <Text
              style={[
                fonts.heading4,
                styles.listTypeText,
                displayOwned ? styles.fadedText : null,
              ]}
            >
              Shared
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortContainer}>
          <Font text="Goals" font={fonts.heading2} />
        </View>

        {displayOwned ? (
          fetchedGoals ? (
            Object.values(fetchedGoals).map((goal, index) => {
              return renderGoalCard(goal, index);
            })
          ) : (
            <></>
          )
        ) : sharedGoals ? (
          Object.values(sharedGoals).map((goal, index) => {
            return renderGoalCard(goal, index);
          })
        ) : (
          <></>
        )}
      </ScrollView>
      <AddButton
        handleOnPress={() => {
          navigation.navigate("CreateGoalScreen");
        }}
      />
    </>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  GoalsScreen: {
    minHeight: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  listTypeToggle: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  listTypeText: {
    width: 140,
    textAlign: "center",
    marginBottom: 10,
  },
  activeListStyle: {
    opacity: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.purple,
  },
  fadedText: {
    opacity: 0.5,
  },
  sortContainer: {
    padding: 10,
    minWidth: "90%",
    minHeight: 50,
    marginVertical: 20,
  },
});
