import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import "./style.scss";
import enhancer from "./enhancer";

const AddTeacherModal = (props) => {
  let {
    teacherModalForm,
    inputBlurHandler,
    inputChangeHandler,
    handleSendTeacherData,
    error,
    colseModal
  } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     {/* <Modal.Header  closeButton> 
        <Modal.Title id="contained-modal-title-vcenter">
        <span style={{fontSize:"20px"}}>Add Teacher</span>
          
        </Modal.Title>
        <span className="a
        
        dd-teacher">Add Teacher</span>
      </Modal.Header> */}
      <Modal.Body  >
      {/* <Modal.Header closeButton>

      </Modal.Header> */}

        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div style={{marginBottom:"4%"}}>
            <span id="add-teacher-heading" style={{marginLeft:"40%",marginBottom:"4%",fontSize:"20px"}}>Add Teacher</span>
        <span style={{fontSize:"15px",float:"right",size:"20px"}} onClick={colseModal}> &#10005;</span>
            </div>
            </Col>
          
            <Col sm={4} md={4}>
           
              <TextField
                id="outlined-basic"
                label="Teacher Name*"
                variant="outlined"
                onChange={(e) => inputChangeHandler(e, "teacherName")}
                onBlur={(e) => inputBlurHandler(e, "teacherName")}
                value={teacherModalForm.teacherName.value}
                size="small"
              />
              <span id="error-message-student">
                {teacherModalForm.teacherName.invalid
                  ? teacherModalForm.teacherName.helperText
                  : ""}
              </span>
            </Col>
            <Col sm={4} md={4}>
              <TextField
                id="outlined-basic"
                label="Teacher Email*"
                variant="outlined"
                onChange={(e) => inputChangeHandler(e, "teacherEmail")}
                onBlur={(e) => inputBlurHandler(e, "teacherEmail")}
                value={teacherModalForm.teacherEmail.value}
                size="small"
              />
              <span id="error-message-student">
                {teacherModalForm.teacherEmail.invalid
                  ? teacherModalForm.teacherEmail.helperText
                  : ""}
              </span>
            </Col>
            <Col sm={4} md={4}>
              <TextField
                id="outlined-basic"
                label="Phone Number*"
                variant="outlined"
                onChange={(e) => inputChangeHandler(e, "teacherPhoneNumber")}
                onBlur={(e) => inputBlurHandler(e, "teacherPhoneNumber")}
                value={teacherModalForm.teacherPhoneNumber.value}
                size="small"
              />
              <span id="error-message-student">
                {teacherModalForm.teacherPhoneNumber.invalid
                  ? teacherModalForm.teacherPhoneNumber.helperText
                  : ""}
              </span>
            </Col>
            {/* <Col sm={5} md={5}></Col> */}
            <Col  
            sm={12} md={12}
           
            >
               {/* <Button id="modal-send-btn" onClick={handleSendTeacherData}>
          Send
        </Button> */}
      
      
<div style={{marginLeft:"43%",marginTop:"3%"}}> 
      <Button
              id="add-teacher-btn"
              onClick={handleSendTeacherData}
            >
            Save
        </Button>
        {/* <span id="error-message-student" >{error ? error : ""}</span> */}
        </div>
            </Col>
            <Col sm={12} md={12}>
            <div style={{marginLeft:"40%"}}>
            <span style={{textAlign:"center",color:"red",fontSize:"10px"}} >{error ? error : ""}</span>
            </div>
            </Col>

          </Row>
        </Container>
        
      </Modal.Body>
      {/* <Modal.Footer>
        <Button id="modal-send-btn" onClick={handleSendTeacherData}>
          Send
        </Button>
      </Modal.Footer>
      <span id="error-message-student">{error ? error : ""}</span> */}
    </Modal>
  );
};

export default enhancer(AddTeacherModal);
