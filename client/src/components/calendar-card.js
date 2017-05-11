import React from "react";

const CalendarCard = function(props){

    function turnTimeToDateObject(time){
        let parsedTime = new Date(time);
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        return months[parsedTime.getMonth()] + " " + parsedTime.getDay() + ", " + parsedTime.getFullYear() + " - " + parsedTime.getHours() + ":" + (parsedTime.getMinutes() == 0 ? '00' : parsedTime.getMinutes());
    }

    const start = turnTimeToDateObject(props.info.start_time);
    const end = turnTimeToDateObject(props.info.end_time);

    return <div><h3>{props.info.title}</h3>
                <h4>{props.info.location}</h4>
                <p>{start} to {end}</p>
            </div>;
}

export default CalendarCard;