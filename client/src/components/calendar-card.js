/*

    Liam Workman
    calendar-card.js
    React.js component that returns an event and (optionally) the day it's a part of.

*/

import React from "react";
import CalendarEvent from "./calendar-event.js"
import extraFunctions from "../extra-functions.js";

const CalendarCard = function(props){

    let date;

    // If the event provided is on a different day than the one previous (setDay), then display the date.

    if (props.setDay){
        date = [<h3 key='date-number' className='date-number'>{props.info['start_time'].getDate()}</h3>,
            <h4 key='date-day' className='date-day'>{extraFunctions.turnNumberToDay(props.info['start_time'].getDay())}</h4>]
    }

    return <div className='calendar-card'>
        <div className='date-column'>{date}</div>
    <CalendarEvent info={props.info}/>
    </div>;

}

export default CalendarCard;