import React from "react"

import { connect } from "react-redux"
import { Form, InputGroup, FormControl, Alert, Button } from "react-bootstrap"
import axios from "axios"
import https from "https"

import "../assets/styles/_uploadfile.scss"

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

    // At instance level
    // axios
    //   .post(
    //     "https://d0fea59b8dd7.ngrok.io/api/convert/storeFile?pass=0542",
    //     data
    //   )
    //   .then((res) => {
    //     console.log(res)
    //   })
    this.setState({ progress: false, uploadedfile: null })
  }

  render() {
    const { uploadedfile, progress } = this.state
    return (
      <div className="content">
        {uploadedfile === null && (
          <div>
            {progress === true && (
              <div>
                <h2>Load Data</h2>
                <Form.File
                  id="upload-file"
                  className="col-md-4"
                  label="Choose File"
                  custom
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) => this.fileupload(e)}
                />
              </div>
            )}
            {progress === false && (
              <div>
                <Alert variant="success" className="successloaded col-md-6">
                  <h2>File Loaded Successfully</h2>
                </Alert>
                <Button
                  variant="primary"
                  className="m-4 loadbtn"
                  onClick={(e) => this.setState({ progress: true })}
                >
                  Load another
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
                Remove
              </Button>
            </div>
            <InputGroup className="col-md-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  onChange={(e) => this.setState({ password: e.target.value })}
                >
                  Password
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="inlineFormInputGroup" />
            </InputGroup>
            <Button
              variant="primary"
              className="m-4 loadbtn"
              onClick={this.handlesubmit}
            >
              Load
            </Button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Uploadfile)
