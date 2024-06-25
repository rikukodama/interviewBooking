import React, { useCallback, useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { IEventValues } from "../../Pages/AdminSidePages/Interfacces";
import { DetailsRecurringEvent } from "../../Services/AdminSideServices/GetEventsService";
import { id as adminId, token } from "../../Assets/Assets";

interface ICalender {
  events: IEventValues[] | undefined;
  handleSelect: (arg: any) => void;
  dates: string[];
}

const Calendar = ({ events, handleSelect, dates }: ICalender) => {
  const [days, setDays] = useState<string[]>([]);

  const dateList = dates.map((date) => ({
    title: "slots available",
    date,
    allDay: true,
  }));

  const GetDetails = useCallback(async () => {
    try {
      const response = await DetailsRecurringEvent(adminId, token);
      response.forEach((el: any) => {
        el.availabilities.forEach((item: any) => {
          if (days.includes(item.day)) {
          } else {
            setDays([...days, item.day]);
          }
        });
      });
    } catch (error) {}
  }, [days]);

  useEffect(() => {
    GetDetails();
  }, [GetDetails]);

  const dayCellContent = (arg: any) => {
    const dayIndex = arg.date.getDay();
    const isDayChecked = days[dayIndex];
    // Get current date and date in consideration
    const currentDate = new Date();
    const dateInConsideration = arg.date;

    // Calculate time difference in milliseconds between current date and date in consideration
    const timeDifference =
      dateInConsideration.getTime() - currentDate.getTime();

    // Calculate one week duration in milliseconds (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const oneWeekDuration = 7 * 24 * 60 * 60 * 1000;

    if (
      isDayChecked &&
      timeDifference >= 0 &&
      timeDifference <= oneWeekDuration
    ) {
      return (
        <div
          style={{
            backgroundColor: "green",
            width: "100%",
            height: "100%",
            color: "white",
          }}
        >
          {arg.dayNumberText}
          <br />
          Available for this day
        </div>
      );
    } else {
      return <div>{arg.dayNumberText}</div>;
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        selectable={true}
        select={handleSelect}
        events={dateList}
        contentHeight="600px"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dayCellContent={dayCellContent}
      />
    </div>
  );
};

export default Calendar;
