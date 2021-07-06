import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Form, InputGroup, FormControl, Alert, Button } from "react-bootstrap"
import axios from "axios"

import { useTranslation } from 'react-i18next'

import "assets/styles/_uploadfile.scss"
import Header from "layout/Header"

const Uploadfile = () => {

  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.response)
  const [progress, setProgress] = useState(true)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [password, setPassword] = useState("")
  const [uploadedFileRoute, setUploadedFileRoute] = useState('')
  const excelTypeArrary = ['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
  const zipTypeArrary = ['.zip', 'application/octet-stream', 'application/zip', 'application/x-zip', 'application/x-zip-compressed']
  const pdfTypeArray = ['application/pdf']

  const fileUpload = (e) => {
    setUploadedFile(e.target.files[0])
    if (excelTypeArrary.includes(e.target.files[0].type)) {
      setUploadedFileRoute('storeFile')
    } else if (zipTypeArrary.includes(e.target.files[0].type)) {
      setUploadedFileRoute('readPdfZip')
    } else if (pdfTypeArray.includes(e.target.files[0].type)) {
      setUploadedFileRoute('readPdfFiles')
    }
  }

  const getAcceptableString = () => {
    let acceptString = ""
    acceptString = excelTypeArrary.concat(zipTypeArrary, pdfTypeArray).join()
    return acceptString
  }

  const handleSubmit = () => {

    let data = new FormData()
    data.append("file", uploadedFile)
    
    let headers = {
      "content-type": "application/json",
      Authorization: "Bearer " + currentUser.token
    }

    axios
      .post(
        `http://eshkolserver.azurewebsites.net/api/convert/${uploadedFileRoute}`,
        // ?pass=0542
        data,
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
      {uploadedFile === null && (
        <div>
          {progress === true && (
            <div>
              <h2>{t("uploadfile.load data")}</h2>
              <Form.File
                id="upload-file"
                className="col-md-4"
                label={t("uploadfile.choose file")}
                custom
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

      {uploadedFile !== null && (
        <div>
          <div className="input-group col-md-4">
            <Alert variant="success">{uploadedFile.name} selected</Alert>
            <Button
              variant="danger"
              onClick={() => setUploadedFile(null)}
            >
              {t("uploadfile.remove")}
            </Button>
          </div>
          <InputGroup className="col-md-4">
            <InputGroup.Prepend>
              <InputGroup.Text
                onChange={(e) => setPassword(e.target.value)}
              >
                {t("password")}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroup" />
          </InputGroup>
          <Button
            variant="primary"
            className="m-4 loadbtn"
            onClick={handleSubmit}
          >
            {t("uploadfile.load")}
          </Button>
        </div>
      )}
    </div>
    </>
  )
};
export default Uploadfile
