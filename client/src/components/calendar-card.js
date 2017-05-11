import React from "react";
import CalendarEvent from "./calendar-event.js"

const CalendarCard = function(props){

    let elements = [];
    let total = 0;

    props.info.forEach(function(element){
        total += (element['end_time'] - element['start_time']);
    })

    for(let i = 0; i < props.info.length; i ++){
        let height = (props.info[i]['end_time'] - props.info[i]['start_time']) / total;
        elements.push(<CalendarEvent key={i} info={props.info[i]} height={height} amount={props.info.length}/>);
    }

    return <div className='calendar-card'>{elements}</div>;

}

export default CalendarCard;