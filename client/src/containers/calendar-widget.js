import React from "react";

export default class CalendarWidget extends React.Component{

    constructor(){
        super();
        this.state = {
            'dataReceived': false
        };
    }

    sendGETRequest(){
        let requestContainer = new XMLHttpRequest();
        requestContainer.open('GET','./api',true);
        requestContainer.onreadystatechange = function(){
            console.log(JSON.parse(this.responseText));
        };
        requestContainer.send();
    }

    render(){
        this.sendGETRequest();
        return <p>Hello</p>
    }
}