import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import React FilePond
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import '../../style.css';




export default class CompanyRegistration extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true };
        this.input1 = this.input1.bind(this);
        this.input2 = this.input2.bind(this)
        //this.state = initialState;
        this.state = {
            company: {
                name: '',
                address: '',
                image : ''
            }, redirect: null, isfound: '', isCorrect: '',
            files: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickaway = this.clickaway.bind(this);

    }
    componentDidMount() {

    }



    handleSubmit(e) {
        e.preventDefault();
        if (this.state.company.name === '') {
            this.setState({
                isfound: 'Company Name Required'
            })

        }
        if (this.state.company.address === '') {
            this.setState({
                isCorrect: 'Company Address Required'
            })

        }
        else {
            const headers = {
                'Access-Control-Allow-Origin': '*'
            };

            const company = {
                name: this.state.company.name,
                address: this.state.company.address,
                image : this.state.company.image
            }
            axios({
                method: 'post',
                url: 'http://localhost:5000/client/createcompany',
                data: company,
                headers: headers
            })
                /*.then((response) => {
                    if (response.data.validation) {
                        this.setState({ isIdenticale: response.data.validation })
                    } else {
                        this.setState({ redirect: "/admin/registercompany" });

                    }

                })
                .catch(function (error) {
                    console.error(error);
                });*/
        }



    }

    handleChange(event) {
        if (event.target.className === "input1") {
            this.setState({
                company: {
                    name: event.target.value,
                    address: this.state.company.address,
                }
            })
        } else if (event.target.className === "input2") {
            this.setState({
                company: {
                    name: this.state.company.name,
                    address: event.target.value,
                }
            })
        }

    }

    clickaway(e) {
        if (this.state.company.name === '') {
            document.querySelector('.label1').innerHTML = "Company Name";

        } if (this.state.company.address === '') {
            document.querySelector('.label2').innerHTML = "Company address";
        }
    }

    input1(e) {
        if (document.querySelector('.label2').nodeValue === null && this.state.company.address === '') {
            document.querySelector('.label2').innerHTML = "Company address";
        }


        document.querySelector('.label1').innerHTML = "";
        this.setState({
            isfound: '',
            isCorrect: ''
        })
    }

    input2(e) {
        if (document.querySelector('.label1').nodeValue === null && this.state.company.name === '') {
            document.querySelector('.label1').innerHTML = "Company Name";
        }

        document.querySelector('.label2').innerHTML = "";
        this.setState({
            isfound: '',
            isCorrect: '',
        })

    }

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }




    render() {
        console.log(this.state.files)
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
                                <label className="label1" htmlFor="name">Company Name</label>
                                <input onKeyPress={this.input1} value={this.state.company.name} onChange={this.handleChange} className="input1" name="name" type="text" />
                            </div>
                            <div className="error-message">{this.state.isfound}</div>

                            <div className="auth_input">
                                <label className="label2" htmlFor="address">Company Address</label>
                                <input onKeyPress={this.input2} value={this.state.company.address} onChange={this.handleChange} className="input2" name="address" type="text" />
                            </div>
                            <div className="error-message">{this.state.isCorrect}</div>
                            <div className="image_holder">
                                <FilePond ref={ref => this.pond = ref}
                                    name="files"
                                    files={this.state.files}
                                    allowMultiple={false}
                                    server={
                                        {
                                            url : "http://localhost:5000",
                                            process : {
                                                url : '/client/saveimage',
                                                onload: (response) => {this.state.company.image = response}//{console.log(response)},
                                            }

                                         }
                                    } //"http://localhost:5000/client/saveimage"
                                    oninit={() => this.handleInit()}
                                    onupdatefiles={(fileItems) => {
                                        // Set current file objects to this.state
                                        /*this.setState({
                                            files: fileItems.map(fileItem => fileItem.file)
                                        });*/
                                    }}


                                >
                                </FilePond>
                            </div>
                            <input className="submit" type="submit" value="submit" />
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}