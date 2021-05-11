import React from 'react';
import '../../style.css';

import {

    Link,

} from "react-router-dom";


const Connect = () => {
    function input1(e) {
        document.querySelector('.input2').value = "";
        document.querySelector('.label2').innerHTML = "Mot de Passe";
        document.querySelector('.label1').innerHTML = "";

    }
    function input2(e) {
        document.querySelector('.input1').value = "";
        document.querySelector('.label1').innerHTML = "Email";
        document.querySelector('.label2').innerHTML = "";
    }
    return (
        <div>
            <div class="auth_menu">
                <div class="back">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="black"
                            class="bi bi-arrow-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                            />
                        </svg>
                    </Link>
                </div>
                <div class="auth_title">Calendario</div>
                <div class="auth-component">
                    <form action="" method="POST">
                        <div class="auth_input">
                            <label class="label1" for="email">Email</label>
                            <input onClick={input1} class="input1" name="email" type="email" />
                        </div>
                        <div class="auth_input">
                            <label class="label2" for="password">Mot de Passe</label>
                            <input onClick={input2} class="input2" name="password" type="email" />
                        </div>
                        <Link to="">Mot de passe oublié ?</Link>
                        <input class="submit" type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Connect;