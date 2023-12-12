import React, { useContext, useState } from 'react';
import "./index.css";
import {MainContext} from '../../utils/context';
import {Button, Col, Row} from 'antd';
import moment from 'moment';

const Reminders = () => {

  const {user} = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  const style = {
    border: "1px solid red"
  }

  return (
    <div className='reminders-div'>
      <p className="header">Previous</p>
      <p className="header">Today's</p>
      <p className="header">Upcoming</p>
        <Row gutter={16}>
          {
            user?.reminders?.map((item, i) => (
              <Col lg={4} xs={12} key={item?._id} className='reminder-card'>
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
            ))
          }
        </Row>
    </div>
  )
}

export default Reminders