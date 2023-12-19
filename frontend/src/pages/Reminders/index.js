import React, { useContext, useEffect, useState } from 'react';
import "./index.css";
import {MainContext} from '../../utils/context';
import {Button, Col, Row, Spin} from 'antd';
import moment from 'moment';

const Reminders = () => {

  const {user, getRemindersHandler, remindersLoading, reminders} = useContext(MainContext);

  useEffect(() => {
    getRemindersHandler();
  }, []);

  const ReminderCard = (item) => (
    <Col span={24} key={item?._id} className='reminder-card'>
      <div className="card">
        <p className="card-title">{item?.title}</p>
        <p className="card-desc">{item?.description}</p>
        <p className="date">
          {
            moment(item?.date).format("DD MMM YYYY")
          }
        </p>
      </div>
    </Col>
  )

  return (
    <div className='reminders-div'>
      {
        remindersLoading ?
        <div className='loader-div'>
          <Spin size='large'/>
        </div> :
        <>
        <p className="header">Previous</p>
        <Row gutter={[16, 16]} className='reminders-row'>
          {
            reminders
            ?.filter(item => {
              return moment(item?.date).diff(moment(new Date()), 'days') <= -1
            })
            ?.map((item, i) => ReminderCard(item))
          }
        </Row>
        <p className="header">Today's</p>
        <Row gutter={[16, 16]} className='reminders-row'>
          {
            reminders
            ?.filter(item => {
              return moment(item?.date).diff(moment(new Date()), 'days') === 0
            })
            ?.map((item, i) => ReminderCard(item))
          }
        </Row>
        <p className="header">Upcoming</p>
        <Row gutter={[16, 16]} className='reminders-row'>
          {
            reminders
            ?.filter(item => {
              return moment(item?.date).diff(moment(new Date()), 'days') > 0
            })
            ?.map((item, i) => ReminderCard(item))
          }
        </Row>
        </>
      }
    </div>
  )
}

export default Reminders