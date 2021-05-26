import React from 'react';
import axios from 'axios';

import { Link, Redirect } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


import 'bootstrap/dist/css/bootstrap.min.css';


import '../../css/calendar.css';
import '../../css/companiesList.css';
import AlertBox from '../components/AlertBox';


let host = 'http://localhost:5000';

let tel = []
export default class AdminCalendar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            calendarEvents: [],
            redirect: null,
            alert_visibility: false,
            event_id: null
        }
        this.changeVisibility = this.changeVisibility.bind(this)
    }

    componentDidMount() {
        this.props.getAdminAuthStatus();
        console.log('Calendar' + document.cookie)

        if (!this.props.adminAuthenticated) {
            this.setState({ redirect: "/auth/Connect" });
        } else if (this.props.location.state === undefined) {
            this.setState({ redirect: "/admin/companieslist" });
        } else {
            let idCompany = this.props.location.state.CompanyInfo.idCompany;
            const headers = {
                'Access-Control-Allow-Origin': '*'
            };

            axios({
                method: 'get',
                url: `${host}/admin/calendarInfo?idCompany=${idCompany}`,
                headers: headers,
            })
                .then((response) => {
                    let calendarEvents = response.data;
                    var today = new Date();
                    let date;
                    if ((today.getMonth() + 1) <= 9) {
                        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
                    } else {
                        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    }
                    for (let index = 0; index < calendarEvents.length; index++) {
                        if (date === calendarEvents[index].date) {
                            tel.push(`${calendarEvents[index].title} at ${calendarEvents[index].date}`)
                        }
                    }

                    this.setState({ calendarEvents: calendarEvents });
                })
        }
    }

    changeVisibility() {
        this.setState({ alert_visibility: false });
        this.componentDidMount();
    }

    handleDateSelect = (selectInfo) => {
        let title = prompt('Enter Event :')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection
        if (title) {
            /*calendarApi.addEvent({
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })*/
            const headers = {
                'Access-Control-Allow-Origin': '*'
            };

            const event = {
                title: title,
                date: selectInfo.startStr,
                idCompany : this.props.location.state.CompanyInfo.idCompany
            }
            axios({
                method: 'post',
                url: `${host}/admin/addevent`,
                data: event,
                headers: headers
            }).then((response) => {
                
            })
        }
        this.componentDidMount()
    }

    handleEventClick = (clickInfo) => {
        this.setState({ alert_visibility: true, event_id: clickInfo.event.id })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        let todayevent = tel.map((element, index) => {
            return <li key={index}>{element}</li>
        });

        if (this.props.location.state === undefined) {
            return <Redirect to='/auth/Connect' />
        } else {
            return (
                <div className="calendar_holder">
                    <div className="sidebar">
                        <div className="back">
                            <Link to="/admin/companieslist" style={{ textDecoration: "none" }}>
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
                            <h2>Today's Event List</h2>
                            <ul>
                                {todayevent}
                            </ul>
                        </div>
                        <div className='separator'></div>
                    </div>
                    <div className="calendar">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
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
                            select={this.handleDateSelect}
                            eventContent={renderEventContent} // custom render function
                            eventClick={this.handleEventClick}

                        />
                    </div>
                    {
                        this.state.alert_visibility ?
                            <AlertBox changeVisibility={this.changeVisibility} eventId={this.state.event_id} /> : <div></div>
                    }
                </div>
            )
        }
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