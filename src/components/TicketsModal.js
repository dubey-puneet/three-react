import React, { Component } from "react"
import { Modal, InputGroup, FormControl } from "react-bootstrap"
import { FiX, FiCalendar } from "react-icons/fi"

import CalendarTime from "../components/CalendarTime"
import CalendarDate from "../components/CalendarDate"

import "../assets/styles/_tickets.scss"
import "../assets/styles/_ticketsmodal.scss"

export class TicketsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectDateTime: "",
      showCalendarTime: false,

      selectDate: "",
      showCalendar: false
    }
  }
  setStrSearch = (obj) => {
    this.setState(obj)
  }
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={() => this.props.handle(false)}
        >
          <Modal.Header>
            <FiX
              color="#061129"
              size={17}
              onClick={() => this.props.handle(false)}
            />
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="item">
              <label>Acceptance Date</label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FiCalendar size={16} color="#061129" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={this.state.selectDateTime}
                  placeholder="dd/mm/yyyy HH:mm"
                  aria-describedby="basic-addon1"
                  onClick={() =>
                    this.setState({
                      showCalendarTime: !this.state.showCalendarTime
                    })
                  }
                  onChange={(e) =>
                    this.setState({
                      showCalendarTime: false,
                      selectDateTime: e.target.value
                    })
                  }
                />

                {this.state.showCalendarTime && (
                  <CalendarTime handle={this.setStrSearch} param="Select" />
                )}
              </InputGroup>
            </div>
            <div className="item">
              <label>Status</label>
              <input type="text" defaultValue="Registered" />
            </div>
            <div className="item">
              <label>ID Number</label>
              <input type="text" defaultValue="123456" />
            </div>
            <div className="item">
              <label>First Name</label>
              <input type="text" defaultValue="First" />
            </div>
            <div className="item">
              <label>Last Name</label>
              <input type="text" defaultValue="Last" />
            </div>
            <div className="item">
              <label>Rejects</label>
              <textarea rows="14">
                Tristique dui justo tortor sagittis pharetra. Amet eget et
                scelerisque tellus sed vestibulum vel amet. Arcu nibh tortor
                cras blandit malesuada consectetur egestas morbi sit. Diam id
                enim, turpis euismod massa. Fringilla eleifend ut vitae aliquet
                sagittis. Sed orci, morbi tempor ultricies tempus ornare id
                orci. Consectetur semper scelerisque gravida nunc risus aliquet
                consequat nam. Risus in venenatis amet, proin duis. Curabitur
                sem commodo mauris tempor eget fusce porta ante risus. Odio non,
                tempus dignissim convallis pharetra nulla elit. Pretium dui
                tristique suscipit rhoncus tincidunt vel lectus. Quisque dui vel
                nisl luctus nam maecenas cursus ut non. Tempor nulla orci, eget
                enim ipsum nunc.
              </textarea>
            </div>
            <div>
              <label>Register Date</label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon2">
                    <FiCalendar size={16} color="#061129" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="dd/mm/yyyy"
                  aria-describedby="basic-addon2"
                  value={this.state.selectDate}
                  onClick={() =>
                    this.setState({
                      showCalendar: !this.state.showCalendar
                    })
                  }
                  onChange={(e) =>
                    this.setState({
                      showCalendar: false,
                      selectDate: e.target.value
                    })
                  }
                />
                {this.state.showCalendar && (
                  <CalendarDate handle={this.setStrSearch} param="Select" />
                )}
              </InputGroup>
            </div>
            <div className="item">
              <label>Premia</label>
              <input type="text" defaultValue="Premia" />
            </div>
            <div style={{ textAlign: "center" }}>
              <span className="btn" onClick={() => this.props.handle(false)}>
                Save
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default TicketsModal
