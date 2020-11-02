import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./deleteFeesStructureStyle.module.css";

import axios from "axios";
// import { urls } from "../../../../src/url";
import { urls } from "../../../../../../url";

// import { appConfig } from "../../../../../src/constants";
import { appConfig } from "../../../../../../constants";

const Index = (props) => {
  let [loader, setLoader] = useState(false);

  const batchId = props.batchId;
  const feesIds = props.passFeesStructureId;
  const batchName = props.batchName;
  const passFeesStructureName = props.passFeesStructureName;
  // useEffect(() => {
  //   deleteParicularBatches();
  // }, []);

  const deleteParicularFees = () => {
    setLoader(true);
    console.log(
      "batch id & FeesId in dlete fee structure axios call",
      batchId,
      props.batchId,
      feesIds,
      props.passFeesStructureId,
      batchName,
      passFeesStructureName
    );
    let params = {
      batchId: batchId,
      feeStructureId: feesIds,
    };
    axios
      .delete(`${appConfig.host}${urls.deleteEachFeesStructure}`, {
        // data: params,
        data: {
          batchId: batchId,
          feeStructureId: feesIds,
        },
      })
      .then((result) => {
        console.log("delete Fees structure API called ", result.data.data);

        props.onHide();
        props.onChildClick();
        // setAllBatchList(result.data.data);
        // console.log("batch list get scuessfully");

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

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
            <p> {props.passFeesStructureId}</p> */}
            <p style={{ fontSize: "14px",color:"#0D1925" }}>
              Are you sure you want to delete the{" "}
              <span style={{ fontWeight: "bold" }}>
                {passFeesStructureName}
              </span>{" "}
              from <span style={{ fontWeight: "bold" }}>{batchName}</span> batch
              ?
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
            onClick={deleteParicularFees}
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
