import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Form, InputGroup, FormControl, Alert, Button } from "react-bootstrap"
import axios from "axios"

import { useTranslation } from 'react-i18next'

import "assets/styles/_uploadfile.scss"
import Header from "layout/Header"
import { indexOf } from "lodash"

const Uploadfile = () => {

  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser)
  const [progress, setProgress] = useState(true)
  const [uploadedFile, setUploadedFile] = useState([])
  // const [uploadedFileRoute, setUploadedFileRoute] = useState('')
  const excelTypeArrary = ['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
  const zipTypeArrary = ['.zip', 'application/octet-stream', 'application/zip', 'application/x-zip', 'application/x-zip-compressed']
  const pdfTypeArray = ['application/pdf']

  const fileUpload = (e) => {
    let tempArr = []
    for (const key of Object.keys(e.target.files)) {
      tempArr.push(e.target.files[key]);
    }
    setUploadedFile(tempArr)
    // if (excelTypeArrary.includes(e.target.files[0].type)) {
    //   setUploadedFileRoute('storeFile')
    // } else if (zipTypeArrary.includes(e.target.files[0].type)) {
    //   setUploadedFileRoute('readPdfZip')
    // } else if (pdfTypeArray.includes(e.target.files[0].type)) {
    //   setUploadedFileRoute('readPdfFiles')
    // }
  }

  const getAcceptableString = () => {
    let acceptString = ""
    acceptString = excelTypeArrary.concat(zipTypeArrary, pdfTypeArray).join()
    return acceptString
  }

  const removeFile = (row, index) => {
    let tempArr = []
    uploadedFile.forEach((element, id) => {
      if (id !== index) tempArr.push(element)
    });
    setUploadedFile(tempArr);
    // setUploadedFile(tempArr)
  }

  const handleSubmit = () => {

    let requestData = new FormData()

    if (uploadedFile) {
      for (const key of Object.keys(uploadedFile)) {
        requestData.append('file', uploadedFile[key]);
      }
    }

    let headers = {
      "content-type": "application/json",
      Authorization: "Bearer " + currentUser.token
    }

    axios
      .post(
        `http://eshkolserver.azurewebsites.net/api/convert/readPdf`,
        requestData,
        {
          headers: headers
        }
      )
      .then((res) => {
        setProgress(false)
        setUploadedFile(null)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <>
    <Header />

    <div className="content">
      {!uploadedFile.length && (
        <div>
          {progress === true && (
            <div>
              <h2>{t("uploadfile.load data")}</h2>
              <Form.File
                id="upload-file"
                className="col-md-4"
                label={t("uploadfile.choose file")}
                custom
                multiple
                accept={getAcceptableString()}
                onChange={(e) => fileUpload(e)}
              />
            </div>
          )}
          {progress === false && (
            <div>
              <Alert variant="success" className="successloaded col-md-6">
                <h2>{t("uploadfile.file loaded successfully")}</h2>
              </Alert>
              <Button
                variant="primary"
                className="m-4 loadbtn"
                onClick={(e) => setProgress(true)}
              >
                {t("uploadfile.load another")}
              </Button>
            </div>
          )}
        </div>
      )}

      {uploadedFile.length ? (
        <div>
          {uploadedFile.map((row, index) => (
            <div className="input-group col-md-4" key={index}>
              <Alert variant="success">{row.name}</Alert>
              <Button
                variant="danger"
                onClick={() => removeFile(row, index)}
              >
                {t("uploadfile.remove")}
              </Button>
            </div>
          ))}
          {/* <InputGroup className="col-md-4">
            <InputGroup.Prepend>
              <InputGroup.Text
              >
                {t("password")}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroup" />
          </InputGroup> */}
          <Button
            variant="primary"
            className="m-4 loadbtn"
            onClick={handleSubmit}
          >
            {t("uploadfile.load")}
          </Button>
        </div>
      ) : ''}
    </div>
    </>
  )
};
export default Uploadfile
