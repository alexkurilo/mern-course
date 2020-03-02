import React, {useEffect, useState} from 'react';

const CreatePage = () => {
    useEffect(() => {
        window.M.updateTextFields();//work input-fields active
    }, []);
    const [link, setLink] = useState('');

    const changeHandler = event => {
        console.log({ [event.target.name]: event.target.value});
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2 padding_top">
                <div className="input-field">
                    <input
                        placeholder="Enter link"
                        id="link"
                        type="text"
                        name="link"
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;