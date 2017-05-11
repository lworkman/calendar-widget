import React from "react";

const CalendarEvent = function(props){

    function turnTimeToDateObject(time){
        let parsedTime = new Date(time);

        console.log(parsedTime.getDay());

        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        return months[parsedTime.getMonth()] + " " + parsedTime.getDate().toString() + ", " + parsedTime.getFullYear() + " - " + parsedTime.getHours() + ":" + (parsedTime.getMinutes() == 0 ? '00' : parsedTime.getMinutes());
    }

    const start = turnTimeToDateObject(props.info.start_time);
    const end = turnTimeToDateObject(props.info.end_time);

    return <div className='calendar-event'><h3>{props.info.title}</h3>
                <h4>{props.info.location}</h4>
                <p>{start} to {end}</p>
            </div>;
}

export default CalendarEvent;