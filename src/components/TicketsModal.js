import React, { Component } from "react"
import { Modal, InputGroup, FormControl } from "react-bootstrap"
import { FiX, FiCalendar } from "react-icons/fi"

import CalendarTime from "../components/CalendarTime"
import CalendarDate from "../components/CalendarDate"

import { connect } from "react-redux"
import { updateTicketForm, updateTicketFormControls } from "./../utils/redux/user/user.action";

import "../assets/styles/_tickets.scss"
import "../assets/styles/_ticketsmodal.scss"

const inputFields = [
  {
    label: "Active client in Kedem",
    name: "Active client in Kedem",
  },
  {
    label: "Actual premia",
    name: "Actual premia",
  },
  {
    label: "Company",
    name: "Company",
  },
  {
    label: "Date of insurance",
    name: "Date of insurance",
    type: 'datetime'
  },
  {
    label: "Date of status check",
    name: "Date of status check",
    type: 'datetime'
  },
  {
    label: "Fast start",
    name: "Fast start",
  },
  {
    label: "First payment",
    name: "First payment",
  },
  {
    label: "Free notes",
    name: "Free notes",
  },
  {
    label: "Full name",
    name: "Full name",
  },
  {
    label: "Number of polisa",
    name: "Number of polisa",
  },
  {
    label: "Outer cancelation",
    name: "Outer cancelation",
  },
  {
    label: "Payment after 3 months",
    name: "Payment after 3 months",
  },
  {
    label: "Payment after year",
    name: "Payment after year",
  },
  {
    label: "Pending notes",
    name: "Pending notes",
  },
  {
    label: "Phone meeting",
    name: "Phone meeting",
  },
  {
    label: "Polica type",
    name: "Polica type",
  },
  {
    label: "Polisa num",
    name: "Polisa num"
  },
  {
    label: "Product name to goals",
    name: "Product name to goals"
  },
  {
    label: "Sent date",
    name: "Sent date"
  },
  {
    label: "Sent to insurance companies",
    name: "Sent to insurance companies",
    type: 'datetime'
  },
  {
    label: "Suggestion premia",
    name: "Suggestion premia"
  },
  {
    label: "Twisting tag",
    name: "Twisting tag"
  },
  {
    label: "agent",
    name: "agent"
  },
  {
    label: "agent number",
    name: "agent number"
  },
  {
    label: "insurance company",
    name: "insurance company"
  },
  {
    label: "partner id",
    name: "partner id"
  },
  {
    label: "partner name",
    name: "partner name"
  },
  {
    label: "program name",
    name: "program name"
  },
  {
    label: "start of insurance",
    name: "start of insurance",
    type: 'datetime'
  },
  {
    label: "submission date",
    name: "submission date",
    type: 'datetime'
  },
  {
    label: "submission month",
    name: "submission month"
  }
];


export class TicketsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectDateTime: "",
      showCalendarTime: false,
      
      calender: {},

      selectDate: "",
      showCalendar: false,

      formData: props.data,

       // Controls
       documentId: 'Details',
       displayName: 'Details',
       isSimple: true,
       documentType: 'div',
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log({nextProps});
    this.setState({
      formData: nextProps.data
    })
  }


  setStrSearch = (obj) => {
    console.log(obj);
    this.setState(obj)
  }

  handleChange = (event) => {
    const {target: {name, value}} = event;
    console.log(name, value);
    this.setState({
      formData : {
        ...this.state.formData,
        [name]: value
      }
    })
  }

  handleDatePicker = (name, calObj) => {
    this.setState({
      calender: {
        ...this.state.calender,
        [name]: !this.state.calender[name]
      },
      formData : {
        ...this.state.formData,
        [name]: calObj.selectDateTime
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitForm(this.props.token, this.props.data["Id number"], this.state.formData);
  }

  handleSaveControlls = (e) => {
    e.preventDefault();

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

    this.props.submitFormControls(this.props.token, this.props.data["Id number"], data);
  }

  render() {

    const { isAdmin } = this.props;

    const fields = (input) => {

      const { type } = input;
      if (type === undefined) {
        return (
          <div className="item">
            <label>{input.label}</label>
            <input type="text" disabled={!isAdmin}   name={input.name} onChange={this.handleChange}  value={this.state.formData[input.label]} />
          </div>
        )
      } 
      else if (type === "datetime") {
        return (
          <div className="item">
              <label>Acceptance Date</label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FiCalendar size={16} color="#061129" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  disabled={!isAdmin} 
                  value={this.state.formData[input.label]}
                  placeholder="dd/mm/yyyy HH:mm"
                  aria-describedby="basic-addon1"
                  name={input.name} 
                  onClick={() =>
                    this.setState({
                      calender: {
                        ...this.state.calender,
                        [input.name]: !this.state.calender[input.name]
                      }
                    })
                  }
                />

                {this.state.calender[input.name] && (
                  <CalendarTime handle={(obj) => this.handleDatePicker(input.name, obj) } param="Select" />
                )}
              </InputGroup>
            </div>
        )
      }
      
    }

    const formFields = (field) => field.map((item, index) =>  fields(item));


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
            {formFields(inputFields)}
            
            <div style={{ textAlign: "center", display: "flex" }} id="actions">
              <span className="btn" id="btn-1" onClick={this.handleSubmit}>
                Save
              </span>

              {/* Extra button */}
              <span className="btn btn-2" id="btn-2" onClick={this.handleSaveControlls}>
                Save Controls
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.user.error,
  response: state.user.response,
});

const mapDispatchToProps = dispatch => ({
  submitForm: (token, id, data) => dispatch(updateTicketForm(token, id, data)),
  submitFormControls: (token, id, data) => dispatch(updateTicketFormControls(token, id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketsModal);

// export default TicketsModal
