import React from "react";

const CalendarEvent = function(props){

    function turnTimeToDateObject(time){
        let parsedTime = new Date(time);

        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        return months[parsedTime.getMonth()] + " " + parsedTime.getDate().toString() + ", " + parsedTime.getFullYear() + " - " + parsedTime.getHours() + ":" + (parsedTime.getMinutes() == 0 ? '00' : parsedTime.getMinutes());
    }

    const start = turnTimeToDateObject(props.info.start_time);
    const end = turnTimeToDateObject(props.info.end_time);

    let style = {
        'height': props.height * 100 + '%'
    }

    return <div className='calendar-event' style = {style}><h3 className='white-regular'>{props.info.title}</h3>
                <h4 className='white-regular'>{props.info.location}</h4>
                <p className='white-regular'>{start} to {end}</p>
            </div>;
}

export default CalendarEvent;