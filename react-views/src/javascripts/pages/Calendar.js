import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';



import '../../css/calendar.css';
import '../../css/companiesList.css'

let tel = []
export default class CompanyCalendar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            calendarEvents: []
        }
    }

    componentDidMount(props) {
        let idCompany = this.props.location.state.CompanyInfo.idCompany;
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };

        axios({
            method: 'get',
            url: `http://localhost:5000/admin/calendarInfo?idCompany=${idCompany}`,
            headers: headers,
        })
            .then((response) => {
                let calendarEvents = response.data;
                var today = new Date();
                let date;
                if ((today.getMonth() + 1) <= 9) {
                    date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
                }else{
                    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                }
                for (let index = 0; index < calendarEvents.length; index++) {
                    if(date === calendarEvents[index].date){
                        tel.push(`${calendarEvents[index].title} at ${calendarEvents[index].date}`)
                    }
                }
                
                this.setState({ calendarEvents: calendarEvents });
            })
    }

    render() {

        let todayevent = tel.map((element, index) => {
            return <li key={index}>{element}</li>
        });

        return (
            <div className="calendar_holder">
                <div className="sidebar">
                    <div className="back">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="black"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                        </Link>
                    </div>
                    <img src={this.props.location.state.CompanyInfo.companyLogo} alt="" />
                    <div className='cmp_name'>{this.props.location.state.CompanyInfo.companyName}</div>
                    <div className='cmp_cntry'>{this.props.location.state.CompanyInfo.countryCode}</div>
                    <div className='description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A expedita repellat consequuntur voluptas quam sit magni placeat culpa. Earum laudantium fugit iure modi totam laborum beatae sed magni pariatur ullam!</div>
                    <div className='separator'></div>
                    <div className='event_list'>
                        <h1>Today's Event List</h1>
                        <ul>
                            {todayevent}
                        </ul>
                    </div>
                    <div className='separator'></div>
                </div>
                <div className="calendar">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        events={this.state.calendarEvents}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        eventContent={renderEventContent} // custom render function
                    />
                </div>

            </div>
        )
    }
}
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}