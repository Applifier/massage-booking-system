import React, { Fragment, useContext, useState } from 'react'
//import Calendar from 'react-calendar';
import Calendar from 'react-calendar/dist/entry.nostyle'
import { AppointmentContext } from '../../App'
import unity4 from '../../pics/unity4.png'


import { Appointments } from './Appointment'
import { OWN_APPOINTMENTS } from '../../types/logged_in'

const Index = (props) => {
  const { setSelectedDate } = useContext(AppointmentContext)
  const [tab, setTab] = useState(true)
  return (
    <Fragment>
      <div className="appointmentListWrapperMain">
        <div className="appointmentListWrapperCalendar">
          <Calendar
            locale={"en-UK"}
            onChange={(value) => {
              console.log('value ', value, 'value type', typeof value)
              //console.log('setselecteddate', setSelectedDate)
              setSelectedDate(value)
              setTab(true)
            }}
          />
        </div>


        <div className='List'>
          {tab ? (
            <div className="all_apps_div">
              <h1>All appointments</h1>
              <button className="buttonList" onClick={() => setTab(!tab)}>Own appointments</button>
              <Appointments />
            </div>
          ) : (
              <div>
                <h1>Own appointments</h1>
                <button className="buttonList" onClick={() => setTab(!tab)}>All appointments</button>
                <Appointments type={OWN_APPOINTMENTS} />
              </div>
            )}
          {/* <img id="unity4" src={unity4}></img> */}
        </div>


      </div>
    </Fragment>
  )
}

export default Index