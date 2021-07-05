import React, { Component } from "react"
import { Modal, InputGroup, FormControl } from "react-bootstrap"
import { FiX, FiCalendar } from "react-icons/fi"

import CalendarTime from "../components/CalendarTime"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { updateTicketForm } from "./../utils/redux/user/user.action";

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
    label: "Id number",
    name: "Id number",
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
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      formData: nextProps.data
    })
  }


  setStrSearch = (obj) => {
    this.setState(obj)
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      formData: {
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
      formData: {
        ...this.state.formData,
        [name]: calObj.selectDateTime
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitForm(this.props.token, this.props.data["Id"], this.state.formData, this.props.rowId);
  }

  render() {

    const { isAdmin, t, i18n: { language } } = this.props;
    const fields = (input) => {

      const { type } = input;
      if (type === undefined) {
        return (
          <div className="item" key={input.label}>
            <label>{t(`tickets.${input.label}`)}</label>
            <input type="text" onClick={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            disabled={!isAdmin} dir={(language === 'en') ? 'ltr' : 'rtl'} defaultValue={this.state.formData[input.label]} />
          </div>
        )
      }
      else if (type === "datetime") {
        return (
          <div className="item" key={input.label}>
            <label>{t("tickets.submission date")}</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FiCalendar size={16} color="#061129" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                disabled={!isAdmin}
                defaultValue={this.state.formData[input.label]}
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
                <CalendarTime handle={(obj) => this.handleDatePicker(input.name, obj)} param="Select" />
              )}
            </InputGroup>
          </div>
        )
      }

    }

    const formFields = (field) => field.map((item, index) => fields(item));


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
            <Modal.Title>{t("tickets.Details")}</Modal.Title>
          </Modal.Header>
          <Modal.Body id="form">
            {formFields(inputFields)}

            <div style={{ textAlign: "center", display: "flex" }} id="actions">
              <span className="btn" id="btn-1" onClick={this.handleSubmit}>
                Save
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
  submitForm: (token, id, data, ticketData) => dispatch(updateTicketForm(token, id, data, ticketData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TicketsModal));

