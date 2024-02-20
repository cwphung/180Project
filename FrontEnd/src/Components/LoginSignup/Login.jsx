import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(''); 

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError(''); 
            console.log(email);
        }
    };

    const handleEmailBlur = () => {
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur} // Validate email on blur
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email" 
                    name="email" 
                />
                {emailError && <div style={{color: 'red'}}>{emailError}</div>}
                <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                        type={showPassword ? "text" : "password"} 
                        placeholder="********" 
                        id="password" 
                    />
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "hide" : "show"}
                    </span>
                </div>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    );
};


