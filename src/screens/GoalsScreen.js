import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "../components/Font";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import GoalCard from "../components/GoalCard";
import ScreenHeader from "../components/ScreenHeader";
import AddButton from "../components/AddButton";
import { deleteGoal } from "../../redux/actions/GoalActions";
import Sort from "../components/Sort";
import SortingService from "../services/SortingService";

const GoalsScreen = ({ navigation }) => {
  const fetchedGoals = useSelector((state) => state.goals);
  const sharedGoals = useSelector((state) => state.sharedGoals);
  const [selectedSortOption, setSelectedSortOption] = useState("Due date");
  const [sortedList, setSortedList] = useState([]);

  const dispatch = useDispatch();
  const estimatedFinishDate = (goal, progressMade) => {
    if (goal.quantified && progressMade > 0) {
      moment.locale("en");

      const start = new Date(goal.date_created).getTime();
      const end = new Date(goal.deadline).getTime();
      const now = new Date().getTime();
      const totalDays = calculateDaysTotal(start, end);

      const daysPast = Math.floor((now - start) / (1000 * 60 * 60 * 24));

      const requiredPace = goal.max_value / totalDays;
      const pace = goal.current_value / (daysPast > 0 ? daysPast : 1);

      const estimatedDays = Math.floor(
        (goal.max_value - goal.current_value) / pace
      );

      const amountDifference = Math.ceil(
        (pace - requiredPace) * (daysPast == 0 ? 1 : daysPast)
      );

      const totalMilliseconds = Math.floor(
        now + estimatedDays * 1000 * 60 * 60 * 24
      );
      const finishDate = moment(totalMilliseconds).format("YYYY-MM-DD");
      const goodPace = pace >= requiredPace ? true : false;
      return [finishDate, amountDifference, goodPace];
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
    const [estimatedDate, amountDifference, goodPhase] = estimatedFinishDate(
      goal,
      progressMade
    );

    return (
      <GoalCard
        key={index}
        navigation={navigation}
        goal={goal}
        timeRemaining={daysRemaining}
        progress={Math.round(progressMade * 100)}
        estimatedDate={estimatedDate}
        goodPhase={goodPhase}
        amountDifference={amountDifference}
        daysPassed={daysPassed}
        daysTotal={daysTotal}
        handleDelete={(key) => handleDelete(key)}
        handleEdit={(goal) => handleEdit(goal)}
      />
    );
  };
  const handleDelete = (key) => {
    dispatch(deleteGoal(key));
  };
  const handleEdit = (goal) => {
    navigation.navigate("CreateGoalScreen", { editGoal: goal });
  };

  const [displayOwned, setDisplayOwned] = useState(true);

  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };

  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };

  const handleSortedList = (sortBy) => {
    setSelectedSortOption(sortBy);
    let sortedList;
    if (fetchedGoals) {
      switch (sortBy) {
        case "Due date":
          sortedList = SortingService.sortByDueDate(fetchedGoals, false);
          break;
        case "Oldest":
          sortedList = SortingService.sortByOldest(fetchedGoals, false);
          break;
        case "Newest":
          sortedList = SortingService.sortByNewest(fetchedGoals, false);
          break;

        default:
          break;
      }
    }
    setSortedList(sortedList);
  };
  useEffect(() => {
    handleSortedList(selectedSortOption);
  }, [fetchedGoals]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.GoalsScreen}>
        <ScreenHeader
          title="My Goals"
          navigation={navigation}
          hideBackArrow={true}
        />
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
        <View style={styles.secondHeadlineContainer}>
          <Font text="Goals" font={fonts.heading2}></Font>
        </View>
        <View style={styles.sortContainer}>
          <Sort
            options={[
              { label: "Due date", value: "Due date" },
              { label: "Newest", value: "Newest" },
              { label: "Oldest", value: "Oldest" },
            ]}
            selectedChoice="Due date"
            handleOnPress={(sortedBy) => handleSortedList(sortedBy)}
          />
        </View>
        <View style={styles.listContainer}>
          {displayOwned ? (
            fetchedGoals && sortedList ? (
              Object.values(sortedList).map((goal, index) => {
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
        </View>
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
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondHeadlineContainer: {
    width: "80%",
    transform: [{ translateY: 25 }],
  },
  listContainer: {
    zIndex: -1,
  },
});
