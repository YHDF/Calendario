import { Link } from 'react-router-dom';
import '../../style.css';
import React from 'react'



const link = "";

class Home extends React.Component {
  componentDidMount(){
  }
  render() {

    return (
      <div>
        <div className="mainheader">
          <div><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white"
            className="bi bi-calendar-week" viewBox="0 0 16 16">
            <path
              d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg></Link></div>
          <div className="title">Calendar.Io</div>
          <div className="separator"></div>
          <div className="subtitle">
            <p>The number 1 solution for <br /> Tracking your coorperate events in real time</p>
          </div>
        </div>

        <div className="link">
          <a href={link} id="link">Learn more<br />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-caret-down"
              viewBox="0 0 16 16">
              <path
                d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
            </svg>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
