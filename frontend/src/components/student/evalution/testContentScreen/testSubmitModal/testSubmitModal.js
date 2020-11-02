import React from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./style.scss";

const testSubmitModal = (props) => {

    return (
        <>
            <div>
                <Modal
                    {...props}
                    id="testModalforRadius"
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ borderRadius: "25px", }}
                >
                    <Modal.Header style={{ border: "none" }}>
                        <div id="addquestionModalHeading">
                            <div className="addQuestionModalBodyDiv"
                                style={{ textAlign: "center" }} >
                                <span id="QuestionModalHeading">Test Submitted Successfully !</span></div>
                        </div>
                    </Modal.Header>

                    <Modal.Body style={{ padding: "15px" }}>
                        <div className="addQuestionModalBodypara" ><p id="addQuestionModalBody"> You Score : {props.scoredMarks}/{props.outOf}</p>
                        </div>
                        <Button variant="outline-orange" id="addQuestionbtns" size="sm" onClick={props.onHide}>
                            CANCEL</Button>{' '}
                        <Button variant="orange"
                            onClick={props.onViewResult}
                            size="sm" id="addQuestionbtns" style={{ float: "right" }}>
                            VIEW DETAILS
                        </Button>{' '}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default testSubmitModal;
