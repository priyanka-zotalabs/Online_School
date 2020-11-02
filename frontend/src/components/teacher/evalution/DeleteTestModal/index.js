import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./deleteTestStyle.module.css";

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
              Are you sure you want to Delete this Test ?
            </p>
          </div>
        </Modal.Header>

        <Modal.Body style={{ padding: "15px" }}>
          <Button
            // variant="outline-orange"
            id={styles.deleteTestbtns1}
            style={{backgrounfColor:"white"}}
            onClick={props.onHide}
            size="sm"
          >
            {" "}
            Cancel
          </Button>{" "}
          <Button
            // variant="orange"
            style={{backgrounfColor:"#8499ff"}}
            size="sm"
            id={styles.deleteTestbtns}
            style={{ float: "right" }}
            onClick={props.onClickedDelete}
          >
            CONFIRM
          </Button>{" "}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default index;
