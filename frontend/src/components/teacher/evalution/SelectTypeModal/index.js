import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./selectTypeModal.module.css";
import mcqTest from "../assets/survey.svg";
import subjectiveTest from "../assets/downloadFiles.svg";

function index(props) {
  return (
    <React.Fragment>
      <Modal
        {...props}
        id="testModalforRadius"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ borderRadius: "25px" }}
      >
        <Modal.Header style={{ border: "none" }} closeButton>
          <div className={styles.deleteTestHeaderDiv}>
            <p id={styles.deleteTestContent}>
              Select the type of test ?
            </p>
          </div>
        </Modal.Header>

        <Modal.Body style={{ padding: "15px", cursor: "pointer" }}>

          <Row xs={12}>
            <Col xs={6}>
              <div style={{ paddingLeft: "10%", textAlign: "center" }} onClick={props.onSelectSubjectiveTest}>
                <img src={subjectiveTest} width="100%" height="100%" />
              </div>
            </Col>
            <Col xs={6}>
              <div style={{ paddingRight: "10%", textAlign: "center" }} onClick={props.onSelectMCQTest}>
                <img src={mcqTest} width="100%" height="100%" />
              </div>
            </Col>
          </Row>
          <Row xs={12}>
            <Col xs={6} style={{ textAlign: "center" }} onClick={props.onSelectSubjectiveTest}>
              <p className={styles.selectTestType}>Subjective Test</p>
            </Col>
            <Col xs={6} style={{ textAlign: "center" }} >
              <p className={styles.selectTestType} onClick={props.onSelectMCQTest}>MCQ Test</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal >
    </React.Fragment >
  );
}

export default index;
