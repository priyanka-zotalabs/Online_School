import React from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./style.scss";

function index(props) {
    return (
        <div>
             <Modal
      {...props}

      id="testModalforRadius"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered

      style={{borderRadius:"25px",}}
    >
      {/* <Modal.Header closeButton>
        
      </Modal.Header> */}
      
      <Modal.Header  style={{border:"none"}} closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
          <div id="addquestionModalHeading">
        <div className="addQuestionModalBodyDiv" 
        style={{textAlign:"center"}} >
          <span id="QuestionModalHeading">Add Extra Question ?</span></div>

            {/* <span className="score_Modal_heading">Assign Test</span>  */}
            </div>
        </Modal.Header>

      <Modal.Body style={{padding:"15px"}}>
     
        <div  className="addQuestionModalBodypara" ><p id="addQuestionModalBody"> Are you sure you want to add a question ? This will change the total number of questions in Test Details.</p>
</div>       
        <Button variant="outline-orange" id="addQuestionbtns"  size="sm"> Cancel</Button>{' '}
                  <Button variant="orange" 
                  onClick={props.onHide}
                  size="sm" id="addQuestionbtns"  style={{ float: "right"}}>
                  CONFIRM
    </Button>{' '}


        {/* <MDBBtn
                    outline
                    style={{ float: "left" }}
                    color="orange"
                    // onClick={swapFormActive(1)(1)}
                  >
                    CANCEL
                  </MDBBtn>
                  <MDBBtn style={{ float: "right" }}
                   color="orange" 
                   onClick={props.onHide}>
                    CONFIRM
                  </MDBBtn> */}


        {/* <Button
         id="detele-course-btn"
        //  id="schedule-modal-btn"
         >Yes</Button>
        <Button onClick={props.onHide} id="cancel-course">Cancel</Button> */}
      </Modal.Body>
     
    </Modal>
        </div>
    )
}

export default index
