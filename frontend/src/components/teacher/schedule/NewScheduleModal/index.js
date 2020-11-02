import React, { useState } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import "./style.scss";
import enhancer from "./enhancer";
import Liveclass from "./Liveclass";
import Homework from "./Homework";
import Revision from "./Revision";
import DailyAcitivity from "./DailyAcitvity";

const ScheduleModal = (props) => {
  let {
    handleClose,
    handleShow,
    show,
  } = props;

  const [selected, setSelected] = useState("liveclass");

  return (
    <div>
      <div className="schedule-modal-div">
        <h1 id="schedule-modal-heading">Schedule</h1>
        <Button
          id="schedule-modal-btn"
          //  variant="primary"
          onClick={handleShow}
        >
          SCHEDULE NEW CLASS
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <p id="modal-heading"><h2>Schedule</h2></p>
          <Container>
            <Row>
              <Col><p id="modal-subheading" className={selected === "liveclass" ? "scheduleType" : ""} onClick={() => setSelected("liveclass")}
              ><h4>Live Class</h4></p></Col>
              <Col><p id="modal-subheading" className={selected === "dailyactivity" ? "scheduleType" : ""} onClick={() => setSelected("dailyactivity")}
              ><h4>Daily Activity</h4></p></Col>
              <Col><p id="modal-subheading" className={selected === "homework" ? "scheduleType" : ""} onClick={() => setSelected("homework")}
              ><h4>Homework</h4></p></Col>
              <Col><p id="modal-subheading" className={selected === "revision" ? "scheduleType" : ""} onClick={() => setSelected("revision")}
              ><h4>Revision</h4></p></Col>
            </Row>
          </Container>
          {selected === "liveclass" ? <Liveclass /> : null}
          {selected === "dailyactivity" ? <DailyAcitivity /> : null}
          {selected === "homework" ? <Homework /> : null}
          {selected === "revision" ? <Revision /> : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default enhancer(ScheduleModal);