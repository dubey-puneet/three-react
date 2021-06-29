import React, { Component } from "react"
import { Modal, InputGroup, FormControl } from "react-bootstrap"
import { FiX, FiCalendar } from "react-icons/fi"

import CalendarTime from "../components/CalendarTime"
import CalendarDate from "../components/CalendarDate"

import "../assets/styles/_tickets.scss"
import "../assets/styles/_ticketsmodal.scss"
import axios from "axios"

export class TicketsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // State for the form elements
      selectDateTime: "",
      type: "document",
      status: 'Registered',
      idNumber: '123456',
      firstName: 'First',
      lastName: 'Last',
      rejects: 'Tristique dui justo tortor sagittis pharetra. Amet eget et scelerisque tellus sed vestibulum vel amet. Arcu nibh tortor cras blandit malesuada consectetur egestas morbi sit. Diam id enim, turpis euismod massa. Fringilla eleifend ut vitae aliquet sagittis. Sed orci, morbi tempor ultricies tempus ornare id orci. Consectetur semper scelerisque gravida nunc risus aliquet consequat nam. Risus in venenatis amet, proin duis.',
      premia: 'Premia',
      showCalendarTime: false,
      selectDate: "",
      showCalendar: false,

      // Controls
      documentId: 'Details',
      displayName: 'Details',
      isSimple: true,
      documentType: 'div',
      
    }
  }
  setStrSearch = (obj) => {
    this.setState(obj)
  }

  callApi(type, idNumber, data) {
    const token= this.props.userDetails.token;
    const headers = {
        "content-type": "application/json",
        Authorization: "Bearer " + token
      }

    axios.post(`http://eshkolserver.azurewebsites.net/api/Dynamic/StoreDocument/`+type+`/`+idNumber,data,{
        headers: headers
      })
      .then(res => {
        console.log(res)
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.rowIndex !== prevProps.rowIndex) {
      const {tabledata, rowIndex} = this.props    

      if (tabledata.length > 0 && rowIndex > 0) {

        // Splitting the Full Name into an array with first name and last name
        let results = []
        const fName = tabledata[rowIndex]['Full name'].split(' ')
        for(let i = 0; i < fName.length; i++) {
          var strings = fName[i].split(" ");
          results.push(strings[0]);
        }

        const data = tabledata[rowIndex]
        console.log(data)
        this.setState({
          selectDateTime: data['Date of insurance'],
          status:'',
          idNumber: data['Id number'],
          firstName: results[0],
          lastName: results[1],
          rejects: '',
          premia: '',
          selectDate: data['Date of insurance'].slice(0, 10)
        })
      }
    }
  }

  // Handle the api call.
  handleSubmit(e) {
    e.preventDefault()
    const {selectDateTime, status, idNumber, firstName, lastName, rejects, premia, type} = this.state
    // Prepare data for sending
    const data = {
      id: {
        id: idNumber,
        type: status
      },
      name: {
        name: firstName + '' + lastName,
        selectDateTime,
        rejects,
        premia
      }
    }
    
    this.callApi(type, idNumber, data)
  }

  handleControls(e) {
    e.preventDefault()
    const formElements = document.querySelector('#form').children
    // console.log(formElements[8].firstChild.textContent)
    const {documentId, isSimple, documentType, displayName} = this.state

    // Preparing the data
    const data = {
      controls: {
        0: {
          controls: [
            {
              controls: [
                {
                  context: "datetime",
                  displayName: "datetime",
                  id: "id.datetime",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[0].firstChild.textContent,
              id: formElements[0].children[1].children[1].id,
              isSimple,
              type: formElements[0].localName
            },
            {
              controls: [
                {
                  context: "status",
                  displayName: "status",
                  id: "id.status",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[1].firstChild.textContent,
              id: formElements[1].children[1].id,
              isSimple,
              type: formElements[1].localName
            },
            {
              controls: [
                {
                  context: "idNumber",
                  displayName: "idNumber",
                  id: "id.idNumber",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[2].firstChild.textContent,
              id: formElements[2].children[1].id,
              isSimple,
              type: formElements[2].localName
            },
            {
              controls: [
                {
                  context: "firstName",
                  displayName: "firstName",
                  id: "id.firstName",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[3].firstChild.textContent,
              id: formElements[3].children[1].id,
              isSimple,
              type: formElements[3].localName
            },
            {
              controls: [
                {
                  context: "lastName",
                  displayName: "lastName",
                  id: "id.lastName",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[4].firstChild.textContent,
              id: formElements[4].children[1].id,
              isSimple,
              type: formElements[4].localName
            },
            {
              controls: [
                {
                  context: "rejects",
                  displayName: "rejects",
                  id: "id.rejects",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[5].firstChild.textContent,
              id: formElements[5].children[1].id,
              isSimple,
              type: formElements[5].localName
            },
            {
              controls: [
                {
                  context: "date",
                  displayName: "date",
                  id: "id.date",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[6].firstChild.textContent,
              id: formElements[6].children[1].children[1].id,
              isSimple,
              type: formElements[6].localName
            },
            {
              controls: [
                {
                  context: "premia",
                  displayName: "premia",
                  id: "id.premia",
                  isSimple: false,
                  type: "input"
                }
              ],
              displayName: formElements[7].firstChild.textContent,
              id: formElements[7].children[1].id,
              isSimple,
              type: formElements[7].localName
            },
          ],
          id: documentId,
          displayName,
          isSimple,
          type: documentType
        },
        1: {
          controls: [
            {
              controls: [
                {
                  actionName: formElements[8].firstChild.textContent,
                  displayName: formElements[8].firstChild.textContent,
                  id: formElements[8].firstChild.id,
                  type: formElements[8].firstChild.nodeName.toLocaleLowerCase(),
                  isButton: false,
                  isSimple: false,
                }
              ],
              displayName: "",
              id: `${formElements[8].id}_${formElements[8].firstChild.id}`,
              isSimple,
              type: formElements[8].localName
            },
            {
              controls: [
                {
                  actionName: formElements[8].children[1].textContent,
                  displayName: formElements[8].children[1].textContent,
                  id: formElements[8].children[1].id,
                  type: formElements[8].children[1].nodeName.toLocaleLowerCase(),
                  isButton: false,
                  isSimple: false,
                }
              ],
              displayName: "",
              id: `${formElements[8].id}_${formElements[8].children[1].id}`,
              isSimple,
              type: formElements[8].localName
            }
          ],
          id: formElements[8].id,
          displayName: 'Save',
          isSimple,
          type: formElements[8].localName
        }
      }
    }

    this.callApi('document_controls', documentId, data)
  }

  render() {
    const { isAdmin } = this.props.userDetails
    const {selectDate, selectDateTime, status, idNumber, firstName, lastName, rejects, premia, showCalendar, showCalendarTime} = this.state
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
          <Modal.Body id="form">
            <div className="item">
              <label>Acceptance Date</label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FiCalendar size={16} color="#061129" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="datetime"
                  disabled={!isAdmin}
                  value={selectDateTime}
                  placeholder="dd/mm/yyyy HH:mm"
                  aria-describedby="basic-addon1"
                  onClick={() =>
                    this.setState({
                      showCalendarTime: !showCalendarTime
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
              <input disabled={!isAdmin} id="status" value={status} onChange={(e) => this.setState({ status: e.target.value })} type="text" />
            </div>
            <div className="item">
              <label>ID Number</label>
              <input disabled={!isAdmin} id="idNumber" value={idNumber} onChange={(e) => this.setState({ idNumber: e.target.value })} type="text" />
            </div>
            <div className="item">
              <label>First Name</label>
              <input disabled={!isAdmin} id="firstName" value={firstName} onChange={(e) => this.setState({ firstName: e.target.value })} type="text" />
            </div>
            <div className="item">
              <label>Last Name</label>
              <input disabled={!isAdmin} id="lastName" value={lastName} onChange={(e) => this.setState({ lastName: e.target.value })} type="text" />
            </div>
            <div className="item">
              <label>Rejects</label>
              <textarea rows="10" id="rejects" disabled={!isAdmin} value={rejects}>
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
                  id="date"
                  disabled={!isAdmin}
                  placeholder="dd/mm/yyyy"
                  aria-describedby="basic-addon2"
                  value={selectDate}
                  onClick={() =>
                    this.setState({
                      showCalendar: !showCalendar
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
              <input disabled={!isAdmin} id="premia" value={premia} onChange={(e) => this.setState({premia: e.target.value})} type="text" />
            </div>
            <div style={{ textAlign: "center" }} id="actions">
              <span className="btn" id="btn-1" onClick={(e) => this.handleSubmit(e)}>
                Save
              </span>

              {/* Extra button */}
              <span className="btn btn-2" id="btn-2" onClick={(e) => this.handleControls(e)}>
                Save Controls
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default TicketsModal
