import React, { useState, useEffect } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";
import { FiX, FiCalendar } from "react-icons/fi";
import CalendarTime from "components/CalendarTime";
import { updateTicketForm } from "utils/redux/user/user.action";
import { useTranslation } from 'react-i18next';
import i18n from "i18next"
import "../assets/styles/_tickets.scss";
import "../assets/styles/_ticketsmodal.scss";
import { useSelector, useDispatch } from "react-redux";

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
    type: "datetime",
  },
  {
    label: "Date of status check",
    name: "Date of status check",
    type: "datetime",
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
    name: "Polisa num",
  },
  {
    label: "Product name to goals",
    name: "Product name to goals",
  },
  {
    label: "Sent date",
    name: "Sent date",
  },
  {
    label: "Sent to insurance companies",
    name: "Sent to insurance companies",
    type: "datetime",
  },
  {
    label: "Suggestion premia",
    name: "Suggestion premia",
  },
  {
    label: "Twisting tag",
    name: "Twisting tag",
  },
  {
    label: "agent",
    name: "agent",
  },
  {
    label: "agent number",
    name: "agent number",
  },
  {
    label: "insurance company",
    name: "insurance company",
  },
  {
    label: "partner id",
    name: "partner id",
  },
  {
    label: "partner name",
    name: "partner name",
  },
  {
    label: "program name",
    name: "program name",
  },
  {
    label: "start of insurance",
    name: "start of insurance",
    type: "datetime",
  },
  {
    label: "submission date",
    name: "submission date",
    type: "datetime",
  },
  {
    label: "submission month",
    name: "submission month",
  },
];

const TicketsModal = (props ) => {
  const { isAdmin,  language } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const error = useSelector((state) => state.user.error);
  const response = useSelector((state) => state.user.response);
  const [selectDateTime, setSelectDateTime] = useState("");
  const [showCalendarTime, setshowCalendarTime] = useState(false);
  const [calender, setCalender] = useState({});
  const [selectDate, setSelectDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState(props.data);

  useEffect(() => {
    setFormData(props.data);
  }, [props]);

  // const setStrSearch = (obj) => {
  //   this.setState(obj);
  // };

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setFormData({
      formData: {
        ...formData,
        [name]: value,
      },
    });
  };

  const handleDatePicker = (name, calObj) => {
    setCalender({
      ...calender,
      [name]: !calender[name],
    });
    setFormData({
      formData: {
        ...formData,
        [name]: calObj.selectDateTime,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTicketForm(props.token, props.data["Id"], formData, props.rowId))
  };

  const fields = (input) => {
    const { type } = input;
    const {language}=i18n
    if (type === undefined) {
      return (
        <div className="item" key={input.label}>
          <label>{t(`tickets.${input.label}`)}</label>
          <input type="text" onClick={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} onChange={handleChange} disabled={!isAdmin} dir={(language === 'en') ? 'ltr' : 'rtl'} defaultValue={formData[input.label]} />
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
              defaultValue={formData[input.label]}
              placeholder="dd/mm/yyyy HH:mm"
              aria-describedby="basic-addon1"
              name={input.name}
              onClick={() =>
                setCalender({
                  calender: {
                    ...calender,
                    [input.name]: !calender[input.name]
                  }
                })
              }
            />

            {calender[input.name] && (
              <CalendarTime handle={(obj) => handleDatePicker(input.name, obj)} param="Select" />
            )}
          </InputGroup>
        </div>
      )
    }
  }

  const formFields = (field) => field.map((item, index) => fields(item));

  return (
    <div>
      <Modal show={props.showModal} onHide={() => props.handle(false)}>
        <Modal.Header>
          <FiX color="#061129" size={17} onClick={() => props.handle(false)} />
          <Modal.Title>{t("tickets.Details")}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="form">
          {formFields(inputFields)}
          <div style={{ textAlign: "center", display: "flex" }} id="actions">
            <span className="btn" id="btn-1" onClick={handleSubmit}>Save</span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default TicketsModal;
