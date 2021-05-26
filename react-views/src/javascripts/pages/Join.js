import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


import '../../style.css';


const initialState = {
};

export default class Join extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true };
        this.input1 = this.input1.bind(this);
        this.input2 = this.input2.bind(this)
        this.state = initialState;
        this.state = { user: { email: '', password: '', confimpassword: '' }, redirect: null, isfound: '', isCorrect: '', isIdenticale: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickaway = this.clickaway.bind(this);
        this.input3 = this.input3.bind(this)
    }
    componentDidMount() {

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

        }
        if (this.state.user.confimpassword === '') {
            this.setState({
                isIdenticale: 'field Required'
            })
        }
        if (this.state.user.confimpassword !== this.state.user.password) {
            this.setState({
                isIdenticale: 'This field should be identical to password'
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
                url: 'http://localhost:5000/client/join',
                data: user,
                headers: headers
            })
                .then((response) => {
                    if (response.data.validation) {
                        this.setState({ isIdenticale: response.data.validation })
                    } else {
                        this.props.setClientSessionId(response.data.session_id)
                        this.setState({
                            redirect: "/client/registercompany",
                            user : {
                                email : response.data.email
                            }
                        });

                    }
                    /*this.props.setSessionId(response.data.session_id)
                    if (response.data.user) {
                        this.setState({ isfound: response.data.user })
                    } else if (response.data.hash) {
                        this.props.getAuthSatus();
                        this.setState({ redirect: "/admin/companieslist"});
                    } else {
                        this.setState({ isCorrect: 'Password is wrong' });
                    }*/
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
                    password: this.state.user.password,
                    confimpassword: this.state.user.confimpassword
                }
            })
        } else if (event.target.className === "input2") {
            this.setState({
                user: {
                    email: this.state.user.email,
                    password: event.target.value,
                    confimpassword: this.state.user.confimpassword
                }
            })
        } else {
            this.setState({
                user: {
                    email: this.state.user.email,
                    password: this.state.user.password,
                    confimpassword: event.target.value
                }
            })
        }

    }

    clickaway(e) {
        if (this.state.user.email === '') {
            document.querySelector('.label1').innerHTML = "Email";

        } if (this.state.user.password === '') {
            document.querySelector('.label2').innerHTML = "Mot de passe";
        }
    }

    input1(e) {
        if (document.querySelector('.label2').nodeValue === null && this.state.user.password === '') {
            document.querySelector('.label2').innerHTML = "Mot de Passe";
        }
        if (document.querySelector('.label3').nodeValue === null && this.state.user.confimpassword === '') {
            document.querySelector('.label3').innerHTML = "Confirmer Mot de Passe";
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
        if (document.querySelector('.label3').nodeValue === null && this.state.user.confimpassword === '') {
            document.querySelector('.label3').innerHTML = "Confirmer Mot de Passe";
        }
        document.querySelector('.label2').innerHTML = "";
        this.setState({
            isfound: '',
            isCorrect: '',
            isIdenticale: ''
        })

    }

    input3(e) {
        if (document.querySelector('.label1').nodeValue === null && this.state.user.email === '') {
            document.querySelector('.label1').innerHTML = "Email";
        }
        if (document.querySelector('.label2').nodeValue === null && this.state.user.password === '') {
            document.querySelector('.label2').innerHTML = "Mot de Passe";
        }
        document.querySelector('.label3').innerHTML = "";
        this.setState({
            isfound: '',
            isCorrect: '',
            isIdenticale: ''
        })

    }

    render() {
        if (this.state.redirect) {
            //return <Redirect to={this.state.redirect} />
            return (<Redirect to={{
                pathname: this.state.redirect,
                state: { email: this.state.user.email }
            }} ></Redirect>)
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
                                <label className="label2" htmlFor="password">Mot de passe</label>
                                <input onKeyPress={this.input2} value={this.state.user.password} onChange={this.handleChange} className="input2" name="password" type="password" />
                            </div>
                            <div className="error-message">{this.state.isCorrect}</div>
                            <div className="auth_input">
                                <label className="label3" htmlFor="confirmpassword">Confirmer mot de passe</label>
                                <input onKeyPress={this.input3} value={this.state.user.confimpassword} onChange={this.handleChange} className="input3" name="confirmpassword" type="password" />
                            </div>
                            <div className="error-message">{this.state.isIdenticale}</div>
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