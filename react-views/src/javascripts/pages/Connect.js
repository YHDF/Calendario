import React from 'react';
import '../../style.css';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";



const initialState = {
};
class Connect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        this.input1 = this.input1.bind(this);
        this.input2 = this.input2.bind(this);
        this.state = initialState;
        this.state = { user: { email: '', password: '' }, redirect: null }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    reset() {
        this.setState(initialState);
    }

    componentDidMount() {

    }


    handleSubmit(e) {
        e.preventDefault()
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };

        const user = {
            email: this.state.user.email,
            password: this.state.user.password
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/connect',
            data: user,
            headers: headers
        })
            .then((response) => {
                if (response.data) {
                    console.log(response.data)
                    this.setState({ redirect: "/" });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleChange(event) {
        if (event.target.className === "input1") {
            this.setState({
                user: {
                    email: event.target.value,
                    password: this.state.user.password
                }
            })
        } else {
            this.setState({
                user: {
                    email: this.state.user.email,
                    password: event.target.value
                }
            })
        }

    }

    input1(e) {
        this.setState(() => {
            document.querySelector('.label2').innerHTML = "Mot de Passe";
            document.querySelector('.label1').innerHTML = "";
        })

    }

    input2(e) {
        this.setState(() => {
            document.querySelector('.label1').innerHTML = "Email";
            document.querySelector('.label2').innerHTML = "";
        })

    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div className="auth_menu">
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
                    <div className="auth_title">Calendario</div>
                    <div className="auth-component">
                        <form onSubmit={this.handleSubmit}>
                            <div className="auth_input">
                                <label className="label1" htmlFor="email">Email</label>
                                <input onClick={this.input1} value={this.state.user.email} onChange={this.handleChange} className="input1" name="email" type="email" />
                            </div>
                            <div className="auth_input">
                                <label className="label2" htmlFor="password">Mot de Passe</label>
                                <input onClick={this.input2} value={this.state.user.password} onChange={this.handleChange} className="input2" name="password" type="password" />
                            </div>
                            <Link to="">Mot de passe oublié ?</Link>
                            <input className="submit" type="submit" value="submit" />
                        </form>
                    </div>
                </div>
            </div>
        );

    }
}

export default Connect;