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

    render(){
        let elements = [];
        if (this.state.dataReceived){
            let properData = this.state.data.events;

            for (let i = 0; i < properData.length; i++){
                elements.push(<CalendarCard key={i} info={properData[i]} />);
            };
        }
        return <div>{elements}</div>
    }
}