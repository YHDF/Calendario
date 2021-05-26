import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


import '../../style.css';


const initialState = {
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true };
        this.input1 = this.input1.bind(this);
        this.input2 = this.input2.bind(this);
        this.state = initialState;
        this.state = {
            user: { email: '', password: '' },
            company: {
                idCompany: '',
                name: '',
                address: '',
                image: ''
            },
            redirect: null,
            isfound: '',
            isCorrect: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickaway = this.clickaway.bind(this);
    }
    componentDidMount() {
        if (this.props.clientAuthenticated) {
            this.setState({ redirect: "/client/calendar" });
        }
    }

    reset() {
        this.setState(initialState);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.user.email === '') {
            this.setState({
                isfound: 'Email Required'
            })

        }
        if (this.state.user.password === '') {
            this.setState({
                isCorrect: 'Password Required'
            })

        } else {
            const headers = {
                'Access-Control-Allow-Origin': '*'
            };

            const user = {
                email: this.state.user.email,
                password: this.state.user.password
            }
            axios({
                method: 'post',
                url: 'http://localhost:5000/client/login',
                data: user,
                headers: headers
            })
                .then((response) => {
                    console.log(response.data.companyInfo)
                    this.props.setClientSessionId(response.data.session_id)
                    if (response.data.user) {
                        this.setState({ isfound: response.data.user })
                    } else if (response.data.hash) {
                        this.props.getClientAuthStatus();
                        this.setState({ redirect: "/client/calendar" });
                    } else {
                        this.setState({ isCorrect: 'Password is wrong' });
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        }



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

    clickaway(e) {
        if (this.state.user.email === '') {
            document.querySelector('.label1').innerHTML = "Email";

        } if (this.state.user.password === '') {
            document.querySelector('.label2').innerHTML = "Mot de Passe";
        }
    }

    input1(e) {
        if (document.querySelector('.label2').nodeValue === null && this.state.user.password === '') {
            document.querySelector('.label2').innerHTML = "Mot de Passe";
        }

        document.querySelector('.label1').innerHTML = "";
        this.setState({
            isfound: '',
            isCorrect: ''
        })
    }

    input2(e) {
        if (document.querySelector('.label1').nodeValue === null && this.state.user.email === '') {
            document.querySelector('.label1').innerHTML = "Email";
        }
        document.querySelector('.label2').innerHTML = "";
        this.setState({
            isfound: '',
            isCorrect: ''
        })

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />

        }
        return (
            <div>
                <div className="auth_menu" onClick={this.clickaway}>
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
                        <form onSubmit={this.handleSubmit} >
                            <div className="auth_input">
                                <label className="label1" htmlFor="email">Email</label>
                                <input onKeyPress={this.input1} value={this.state.user.email} onChange={this.handleChange} className="input1" name="email" type="email" />
                            </div>
                            <div className="error-message">{this.state.isfound}</div>
                            <div className="auth_input">
                                <label className="label2" htmlFor="password">Mot de Passe</label>
                                <input onKeyPress={this.input2} value={this.state.user.password} onChange={this.handleChange} className="input2" name="password" type="password" />
                            </div>
                            <div className="error-message">{this.state.isCorrect}</div>
                            <div>
                                <Link to="">Mot de passe oublié ?</Link>
                            </div>

                            <input className="submit" type="submit" value="submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}