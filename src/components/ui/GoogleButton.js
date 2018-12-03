import React from 'react';

/*
    @component      GoogleButton
    @desc           Displays Google login/signup button
    @input          link & text
*/
const GoogleButton = ({ link, text }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <a
                className="btn btn-lg loginBtn btn loginBtn loginBtn--google"
                href={link}>
                {text}
            </a>
        </div>
    );
};

export default GoogleButton;