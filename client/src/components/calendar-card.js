import React from "react";
import CalendarEvent from "./calendar-event.js"

const CalendarCard = function(props){

    let elements = [];

    for(let i = 0; i < props.info.length; i ++){
        elements.push(<CalendarEvent key={i} info={props.info[i]} />);
    }

    return <div className='calendar-card'>{elements}</div>;

}

export default CalendarCard;