import React from "react";

const CalendarCard = function(props){
    return <p>Title:{props.info.title}, Start:{props.info.start_time}, End:{props.info.end_time}, Location:{props.info.location}</p>;
}

export default CalendarCard;