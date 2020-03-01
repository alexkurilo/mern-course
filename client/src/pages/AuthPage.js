import React, {useState} from 'react';

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten the link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorisation</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Email</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 margin_right">Sign In</button>
                        <button className="btn grey lighten-1 black-text">Registration</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;