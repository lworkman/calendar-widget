import React from "react";
import CalendarCard from "../components/calendar-card.js";

export default class CalendarWidget extends React.Component{

    constructor(){
        super();
        this.state = {
            'dataReceived': false,
            'data': []
        };
        this.sendGETRequest('./api');
    }

    sendGETRequest(url){
        let requestContainer = new XMLHttpRequest();
        requestContainer.open('GET',url,true);
        requestContainer.onreadystatechange = this.processGETRequest.bind(this,requestContainer);
        requestContainer.send();
    }

    processGETRequest(response){
        if (response.readyState === 4 && response.status === 200){
            this.setState({
                'dataReceived': true,
                'data': JSON.parse(response.responseText)
            });
        }
    }

    sortEventsIntoArray(eventArray){
        let sortedEvents = [];
        let transformedEvents = [];
        let tempHolder = [];

        eventArray.forEach(function(element){
            element['start_time'] = new Date(element['start_time']);
            element['end_time'] = new Date(element['end_time']);
            transformedEvents.push(element);
        })

        function compare(a,b){
            if (a['start_time'].getTime() < b['start_time'].getTime()){
                return -1;
            }
            return 1;
        }

        transformedEvents.sort(compare);

        tempHolder.push(transformedEvents[0]);

        for (let i = 1; i < transformedEvents.length; i ++){
            if (transformedEvents[i]['start_time'].getTime() <= transformedEvents[i-1]['end_time'].getTime()){
                tempHolder.push(transformedEvents[i]);
            }
            else {
                sortedEvents.push(tempHolder);
                tempHolder = [];
                tempHolder.push(transformedEvents[i]);
            }
        }

        sortedEvents.push(tempHolder);

        return sortedEvents;
    }

    render(){
        let elements = [];
        if (this.state.dataReceived){
            let properData = this.sortEventsIntoArray(this.state.data.events);

            console.log(properData);

            for (let i = 0; i < properData.length; i++){
                elements.push(<CalendarCard key={i} info={properData[i]} />);
            };
        }
        return <div className='calendar-widget'>{elements}</div>
    }
}