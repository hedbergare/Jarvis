import React from "react";

class SortingService {
  constructor() {}

  static findTaskByKey = (taskLists, taskKey, listKey) => {
    let matchingTask;
    if (taskLists) {
      Object.values(taskLists).map((taskList, index) => {
        if (taskList.key == listKey && taskList.tasks) {
          Object.values(taskList.tasks).map((task, index) => {
            if (task.key == taskKey) {
              const taskWithList = { ...task, list: taskList };
              return (matchingTask = taskWithList);
            }
          });
        }
      });
    }
    return matchingTask;
  };

  static fetchAllUserTasks = (taskLists) => {
    let list = [];

    if (taskLists) {
      Object.values(taskLists).map((taskList, index) => {
        if (taskList.tasks) {
          Object.values(taskList.tasks).map((task, index) => {
            const taskWithList = { ...task, list: taskList };

            return taskWithList.completed ? null : list.push(taskWithList);
          });
        }
      });
    }
    return list;
  };

  static sortByDueDate = (listToSort, isObject) => {
    let list = [];

    if (isObject) {
      Object.values(listToSort).map((task, index) => {
        return list.push(task);
      });
    } else {
      list = listToSort;
    }

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - 1; j++) {
        if (list[j].deadline > list[j + 1].deadline) {
          let tmp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = tmp;
        }
      }
    }
    return list;
  };

  static sortByDueDate = (listToSort, isObject) => {
    let list = [];

    if (isObject) {
      Object.values(listToSort).map((task, index) => {
        return list.push(task);
      });
    } else {
      list = listToSort;
    }

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - 1; j++) {
        if (list[j].deadline > list[j + 1].deadline) {
          let tmp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = tmp;
        }
      }
    }
    return list;
  };

  static sortByNewest = (listToSort, isObject) => {
    let list = [];

    if (isObject) {
      Object.values(listToSort).map((task, index) => {
        return list.push(task);
      });
    } else {
      list = listToSort;
    }

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - 1; j++) {
        if (list[j].date_created < list[j + 1].date_created) {
          let tmp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = tmp;
        }
      }
    }

    return list;
  };

  static sortByOldest = (listToSort, isObject) => {
    let list = [];

    if (isObject) {
      Object.values(listToSort).map((task, index) => {
        return list.push(task);
      });
    } else {
      list = listToSort;
    }

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - 1; j++) {
        if (list[j].date_created > list[j + 1].date_created) {
          let tmp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = tmp;
        }
      }
    }

    return list;
  };
}

export default SortingService;
