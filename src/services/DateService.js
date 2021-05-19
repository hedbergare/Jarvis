import React from "react";
import Moment from "moment";

class DateService {
  constructor() {}

  static formatTimeStamp = (timestamp) => {
    const date = new Date(timestamp);
    return Moment(date).format("dddd Do of MMM");
  };
  static formatDate = (date) => {
    return Moment(date).format("dddd Do of MMM");
  };
  static formatDateWithYear = (date) => {
    return Moment(date).format("dddd Do of MMM YYYY");
  };
}

export default DateService;
