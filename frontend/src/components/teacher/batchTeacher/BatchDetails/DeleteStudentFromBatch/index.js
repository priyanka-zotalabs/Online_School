import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./deleteStudentFrmBatchStyle.module.css";

import axios from "axios";
// import { urls } from "../../../../src/url";
import { urls } from "../../../../../url";

// import { appConfig } from "../../../../../src/constants";
import { appConfig } from "../../../../../constants";

const Index = (props) => {
  let [loader, setLoader] = useState(false);

  const batchId = props.batchId;
  const studentId = props.passDeeleteStudId;
  const onChildClick = props.onChildClick;
  const batchName = props.batchName;
  const passDeleteStud = props.passDeleteStud;

  // batchName={specificBatchInfo.name}
  // passDeleteStud={passDeleteStud}

  const deleteParicularStud = () => {
    console.log("batch id in specific student delete", batchId);
    console.log("student batch id in specific student delete", studentId);

    setLoader(true);
    axios
      .delete(
        `${appConfig.host}${urls.deleteSpecificStudentFromSpecificBatch}?batchId=${batchId}&studentId=${studentId}`
      )
      .then((result) => {
        console.log("delete Specific student API called ", result.data);
        props.onHide();
        props.onChildClick();
        // setAllBatchList(result.data.data);
        // console.log("batch list get scuessfully");
        // getDataOfBatch();
        // clickAlert();
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };
  // useEffect(() => {
  //   deleteParicularBatches();
  // }, []);

  //   const deleteParicularFees = () => {
  //     setLoader(true);
  //     console.log(
  //       "batch id & FeesId in dlete fee structure axios call",
  //       batchId,
  //       props.batchId,
  //       feesIds,
  //       props.passFeesStructureId
  //     );
  //     let params = {
  //       batchId: batchId,
  //       feeStructureId: feesIds,
  //     };
  //     axios
  //       .delete(`${appConfig.host}${urls.deleteEachFeesStructure}`, {
  //         // data: params,
  //         data: {
  //           batchId: batchId,
  //           feeStructureId: feesIds,
  //         },
  //       })
  //       .then((result) => {
  //         console.log("delete Fees structure API called ", result.data.data);

  //         props.onHide();
  //         props.onChildClick();
  //         // setAllBatchList(result.data.data);
  //         // console.log("batch list get scuessfully");

  //         setLoader(false);
  //       })
  //       .catch((error) => {
  //         setLoader(false);
  //       });
  //   };

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
          <div className={styles.deleteBatchHeaderDiv}>
            {/* <p>{props.batchId}</p>
            <p> {props.studentId}</p> */}
            <p style={{ fontSize: "14px",color:"#0D1925" }}>
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: "bold" }}>{passDeleteStud}</span> from{" "}
              <span style={{ fontWeight: "bold" }}>{batchName}</span> batch ?
            </p>
          </div>
        </Modal.Header>

        <Modal.Body style={{ padding: "15px" }}>
          <Button
            // variant="outline-orange"
            id={styles.deleteBatchbtns1}
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
            id={styles.deleteBatchbtns}
            style={{ float: "right" }}
            onClick={deleteParicularStud}
          >
            CONFIRM
          </Button>{" "}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Index;

// `${appConfig.host}${urls.deleteEachFeesStructure},{batchId=${props.batchId},feeStructureId=${props.passFeesStructureId}}`

// `${appConfig.host}${urls.deleteEachFeesStructure}?batchId=${props.batchId}&feeStructureId=${props.passFeesStructureId}`

// `${appConfig.host}${urls.deleteEachFeesStructure}`,

// params

// .delete(
//   `${appConfig.host}${urls.deleteEachFeesStructure}?batchId=${batchId}&feeStructureId=${feesIds}`

// )
