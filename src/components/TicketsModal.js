import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Modal, InputGroup, FormControl } from "react-bootstrap"
import { FiX, FiCalendar } from "react-icons/fi"
import i18n from "i18next"
import { useTranslation } from 'react-i18next'

import CalendarTime from "components/CalendarTime"
import { updateTicketForm, addNewTicketForm } from "utils/redux/user/user.action"
import "assets/styles/_tickets.scss"
import "assets/styles/_ticketsmodal.scss"
import { inputFields } from "data/staticArrayValue"


const TicketsModal = ( props ) => {

  const { showModal, isAdmin, isNew, token, rowId } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [calender, setCalender] = useState({});
  const [formData, setFormData] = useState(props.data);


  useEffect(() => {
    setFormData(props.data);
  }, [props]);

  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setFormData({
        ...formData,
        [name]: value,
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
    if (isNew) {
      dispatch(addNewTicketForm(token, formData))
    } else {
      dispatch(updateTicketForm(token, props.data["Id"], formData, rowId))
    }
  };

  const fields = (input) => {
    const { type } = input;
    const { language } = i18n;
    if (type === undefined) {
      return (
        <div className="item" key={input.label}>
          <label>{t(`tickets.${input.label}`)}</label>
          <input name={input.label} type="text" onClick={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)} onChange={handleChange} disabled={!isAdmin} dir={(language === 'en') ? 'ltr' : 'rtl'} defaultValue={formData[input.label]} />
        </div>
      )
    }
    else if (type === "datetime") {
      return (
        <div className="item" key={input.label}>
          <label>{t(`tickets.${input.label}`)}</label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FiCalendar size={16} color="#061129" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              disabled={!isAdmin}
              value={formData[input.name]}
              placeholder="dd/mm/yyyy HH:mm"
              aria-describedby="basic-addon1"
              name={input.name}
              readOnly={true}
              onClick={() =>
                setCalender({
                    ...calender,
                    [input.name]: !calender[input.name]
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

  const formFields = (field) => field.map((item) => fields(item));


  return (
    <div>
      <Modal show={showModal} onHide={() => props.handle({}, false)}>
        <Modal.Header>
          <FiX color="#061129" size={17} onClick={() => props.handle({}, false)} />
          <Modal.Title>{t("tickets.Details")}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="form">
          {formFields(inputFields)}

          <div style={{ textAlign: "center", display: "flex" }} id="actions">
            <span className="btn" id="btn-1" onClick={handleSubmit}>
              Save
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default TicketsModal;
