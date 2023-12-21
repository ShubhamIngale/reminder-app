import React, { useContext, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space, message } from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import './index.css';
import moment from 'moment'
import { MainContext } from '../../utils/context';
import { apiUrl } from '../../utils/constants';

const Header = (
        {
                token = "",
                setToken = () => {}
        }
        ) => {

                const {user, getRemindersHandler, theme, setTheme} = useContext(MainContext);

                const [loading, setLoading] = useState(false);
                const [reminderModal, setReminderModal] = useState(false);
                const [logoutModal, setLogoutModal] = useState(false);

                const addReminderHandler = (values) => {
                        setLoading(true);
                        var myHeaders = new Headers();
                        myHeaders.append("Authorization", `Bearer ${token}`);
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                                "title": values?.title,
                                "description": values?.description,
                                "date": moment(values?.date).format("YYYY-MM-DD"),
                                "user_id": user?._id
                        });

                        var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                        };

                        fetch(`${apiUrl}api/reminders/create`, requestOptions)
                        .then(response => response.json())
                        .then(res => {
                                setLoading(false)
                                console.log(res);
                                if(res.success) {
                                        setReminderModal(false);
                                        message.success(res?.message);
                                        getRemindersHandler();
                                }
                                else {
                                        message.error(res?.message);
                                }
                        })
                        .catch(error => {
                                setLoading(false);
                                console.log('error', error);
                        });
                }
  return (
    <>
        <div 
                className="header"
                style={{
                padding: "16px 4%",
                background: "#E7E7E7"
                }}
        >
                <Row>
                <Col span={6}>
                <h2>Reminders</h2>
                </Col>
                <Col span={18} style={{textAlign: "right"}}>
                {
                token && token?.length > 0 &&
                <>
                <Button
                        type="primary"
                        style={{marginLeft: "auto", marginRight: 8}}
                        icon={<PlusOutlined />}
                        onClick={() => setReminderModal(true)}
                />
                <Button 
                        type="link"
                        icon={theme === "light" ? "D" : "L"}
                        onClick={() => {
                                if(theme === "light") {
                                        setTheme("dark")
                                }
                                else {
                                        setTheme("light")
                                }
                        }}
                />
                <Button
                        type="link"
                        icon={<LogoutOutlined />}
                        onClick={() => {
                                setLogoutModal(true);
                        }}
                />
                </>
                }
                </Col>
                </Row>
        </div>

        <Modal
                open={reminderModal}
                onCancel={() => setReminderModal(false)}
                title="Add Reminder"
                footer={[]}
                style={{filter: theme === "light" ? "invert(0)" : "invert(90%)"}}
        >
                <Form 
                layout='vertical'
                onFinish={(values) => addReminderHandler(values)}
                >
                        <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                        {
                                                required: true,
                                                message: 'Please add title to continue.'
                                        },
                                ]}
                        >
                                <Input placeholder='Enter title here....' />
                        </Form.Item>
                        <Form.Item
                                label="Description"
                                name='description'
                        >
                                <Input.TextArea placeholder='Enter description here....' />
                        </Form.Item>
                        <Form.Item
                                label="Date"
                                name="date"
                                rules={[
                                        {
                                                required: true,
                                                message: 'Please select date to continue.'
                                        },
                                ]}
                        >
                                <DatePicker format="DD MMM YYYY" style={{width: "100%"}}/>
                        </Form.Item>
                        <Form.Item>
                                <Space>
                                        <Button
                                                htmlType='reset'
                                                onClick={() => setReminderModal(false)}
                                                disabled={loading}
                                        >
                                                Cancel
                                        </Button>
                                        <Button
                                                type='primary'
                                                htmlType='submit'
                                                loading={loading}
                                        >
                                                Add Reminder
                                        </Button>
                                </Space>
                        </Form.Item>
                </Form>
        </Modal>
        <Modal
                open={logoutModal}
                footer={[]}
                onCancel={() => setLogoutModal(false)}
                width="300px"
                className='logout-modal'
                style={{filter: theme === "light" ? "invert(0)" : "invert(90%)"}}
        >
                <h2>Logout?</h2>
                <Space>
                        <Button
                                onClick={() => setLogoutModal(false)}
                        >
                                No
                        </Button>
                        <Button
                                type='primary'
                                onClick={() => {
                                        setToken("");
                                        message.success("Logged out successfully!");
                                        setLogoutModal(false);
                                }}
                        >
                                Yes
                        </Button>
                </Space>
        </Modal>
    </>
  )
}

export default Header