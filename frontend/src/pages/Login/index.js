import React, { useContext, useState } from 'react';
import './index.css';
import { Button, Form, Input, message } from 'antd';
import {apiUrl} from '../../utils/constants'
import { MainContext } from '../../utils/context';

const Login = () => {

        const {setToken} = useContext(MainContext);

        const [type, setType] = useState("login"); // types: login / signup
        const [otpSent, setOtpSent] = useState(false);
        const [loading, setLoading] = useState(false);

        const authHandler = (values) =>{
                if(type === "login" && !otpSent) {
                        loginOtpHandler(values)
                }
                else if (type === "login" && otpSent) {
                        loginHandler(values);
                }

                else if(type === "signup" && !otpSent) {
                        signupOtpHandler(values);
                }
                else {
                        signupHandler(values);
                }
        }

        const loginOtpHandler = (values) => {
                setLoading(true);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                        "email": values?.email
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch(`${apiUrl}api/users/login-otp`, requestOptions)
                .then(response => response.json())
                .then(res => {
                        setLoading(false);
                        if(res.success) {
                                setOtpSent(true);
                                message.success(res?.message)
                        }
                        else {
                                message.error(res?.message)
                        }
                })
                .catch(error => {
                        setLoading(false);
                        console.log('error', error);
                });
        }

        const loginHandler = (values) => {
                setLoading(true);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                        "email": values?.email,
                        "otp_code": values?.otp_code
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch(`${apiUrl}api/users/login`, requestOptions)
                .then(response => response.json())
                .then(res => {
                        setLoading(false);
                        if(res.success) {
                                message.success(res?.message);
                                setToken(res?.authToken)
                        }
                        else {
                                message.error(res?.message)
                        }
                })
                .catch(error => {
                        setLoading(false);
                        console.log('error', error);
                });
        }

        const signupOtpHandler = (values) => {
                setLoading(true);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                        "name": values?.name,
                        "email": values?.email
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch(`${apiUrl}api/users/registration-otp`, requestOptions)
                .then(response => response.json())
                .then(res => {
                        setLoading(false);
                        if(res.success) {
                                setOtpSent(true);
                                message.success(res?.message)
                        }
                        else {
                                message.error(res?.message)
                        }
                })
                .catch(error => {
                        setLoading(false);
                        console.log('error', error);
                });
        }

        const signupHandler = (values) => {
                setLoading(true);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                        "name": values?.name,
                        "email": values?.email,
                        "otp_code": values?.otp_code
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch(`${apiUrl}api/users/create`, requestOptions)
                .then(response => response.json())
                .then(res => {
                        setLoading(false);
                        if(res.success) {
                                message.success(res?.message);
                                setToken(res?.authToken)
                        }
                        else {
                                message.error(res?.message)
                        }
                })
                .catch(error => {
                        setLoading(false);
                        console.log('error', error);
                });
        }

  return (
    <div className='login-div'>
        <div className="login-form-card">
                <h2>
                        {
                                type === "login" ?
                                "Login" : "Sign Up"
                        }
                </h2>
                <Form 
                        layout='vertical'
                        onFinish={authHandler}
                >
                        {
                                type === "signup" &&
                                <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={type === "login" ? [] : [
                                                        {
                                                        required: true,
                                                        message: 'Please enter your name to continue.',
                                                        },
                                                ]}
                                >
                                        <Input placeholder='Enter name here....' />
                                </Form.Item>
                        }
                        <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                        {
                                                required: true,
                                                message: 'Please enter your email to continue.'
                                        },
                                        {
                                                type: 'email',
                                        }
                                ]}
                        >
                                <Input placeholder='Enter email here....' />
                        </Form.Item>
                        {
                                otpSent &&
                                <Form.Item
                                        label="OTP"
                                        name="otp_code"
                                        rules={[
                                                {
                                                        required: true,
                                                        message: 'Please enter OTP to continue.'
                                                }
                                        ]}
                                >
                                        <Input placeholder='Enter Otp here....' />
                                </Form.Item>
                        }
                        <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                                {
                                        !otpSent ? "Send Otp"  : type === "login" ? "Login" : "Sign Up"
                                }
                        </Button>
                        </Form.Item>
                </Form>
                <Button
                        type='link'
                        onClick={() => {
                                if(type === "login") {
                                        setType("signup")
                                }
                                else {
                                        setType("login")
                                }
                        }}
                        style={{padding: 0}}
                >
                        {
                                type === "login" ? "Signup" : "Login"
                        }
                </Button>
        </div>
    </div>
  )
}

export default Login