import React from "react"

import { connect } from "react-redux"
import { Form, InputGroup, FormControl, Alert, Button } from "react-bootstrap"
import axios from "axios"

import { withTranslation } from "react-i18next"

import "../assets/styles/_uploadfile.scss"
import Header from "../layout/Header"

class Uploadfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: true,
      uploadedfile: null,
      password: ""
    }
  }

  fileupload = (e) => {
    this.setState({
      uploadedfile: e.target.files[0]
    })
  }

  handlesubmit = () => {
    let data = new FormData()
    data.append("file", this.state.uploadedfile)

    let headers = {
      "content-type": "application/json",
      Authorization: "Bearer " + this.props.currentUser.token
    }

    axios
      .post(
        "http://eshkolserver.azurewebsites.net/api/convert/storeFile?pass=0542",
        data,
        {
          headers: headers
        }
      )
      .then((res) => {
        this.setState({ progress: false, uploadedfile: null })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
  render() {
    const { uploadedfile, progress } = this.state
    const { t } = this.props
    return (
      <div>
        <Header />

        <div className="content">
          {uploadedfile === null && (
            <div>
              {progress === true && (
                <div>
                  <h2>{t("uploadfile.load data")}</h2>
                  <Form.File
                    id="upload-file"
                    className="col-md-4"
                    label={t("uploadfile.choose file")}
                    custom
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => this.fileupload(e)}
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
                    onClick={(e) => this.setState({ progress: true })}
                  >
                    {t("uploadfile.load another")}
                  </Button>
                </div>
              )}
            </div>
          )}

          {uploadedfile !== null && (
            <div>
              <div className="input-group col-md-4">
                <Alert variant="success">{uploadedfile.name} selected</Alert>
                <Button
                  variant="danger"
                  onClick={() => this.setState({ uploadedfile: null })}
                >
                  {t("uploadfile.remove")}
                </Button>
              </div>
              <InputGroup className="col-md-4">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  >
                    {t("password")}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="inlineFormInputGroup" />
              </InputGroup>
              <Button
                variant="primary"
                className="m-4 loadbtn"
                onClick={this.handlesubmit}
              >
                {t("uploadfile.load")}
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(withTranslation()(Uploadfile))
