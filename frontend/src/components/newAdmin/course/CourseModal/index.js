import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./style.scss";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";

function index(props) {
  // console.log("props", props);

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ borderRadius: "25px" }}
      >
        {/* <Modal.Header closeButton>
        
      </Modal.Header> */}
        <Modal.Body>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to Delete this course ?
          </Modal.Title>
          {/* <p id="contained-modal-title-vcenter"> Are you sure you want to Delete this course ?</p> */}

          <Button
            id="detele-course-btn"
            onClick={props.handleDelete}
            //  id="schedule-modal-btn"
          >
            Yes
          </Button>
          <Button onClick={props.onHide} id="cancel-course">
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default index;
