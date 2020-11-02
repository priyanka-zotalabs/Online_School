import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./deleteBatchStyle.module.css";
import enhancer from "./enhancer";
import _ from "lodash";

const Index = (props) => {
  let { auth, deleteParicularBatches, loader } = props;

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
        <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>

        <Modal.Body style={{ padding: "15px" }}>
          <div
            className={styles.deleteBatchtHeaderDiv}
            style={{ textAlign: "center", marginBottom: "10%" }}
          >
            <p id={styles.deleteBatchtContent}>
              {/* Are you sure you want to Delete this Batch ?*/}
              Deleting batch will delete all its students and tests. Do you still want to delete it ? 
            </p>
            <p>{props.onClickedDelete}</p>
          </div>
          <Button
            // variant="outline-orange"
            id={styles.deleteBatchtbtns1}
            
            onClick={props.onHide}
            size="sm"
          >
            {" "}
            CANCEL
          </Button>{" "}
          <Button
            // variant="orange"
            style={{backgrounfColor:"#8499ff"}}
            size="sm"
            id={styles.deleteBatchtbtns}
            style={{ float: "right" }}
            // onClick={deleteParicularBatches}
            onClick={props.onClickedDelete}
          >
            CONFIRM
          </Button>{" "}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default enhancer(Index);
