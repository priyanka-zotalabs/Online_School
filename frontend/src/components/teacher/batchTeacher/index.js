import React, { useState } from "react";
import "./style.scss";
import DeleteBatchModal from "./DeleteBatchModal/index";
import AddNewBatchModal from "./AddNewBatchModal/index";
import enhancer from "./enhancer";
// import lodash from
import _ from "lodash";
import { useHistory } from "react-router-dom";

import {
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
// import Loading from "../../../../shared/Components/Loading";
import Loading from "../../../shared/Components/Loading";
import axios from "axios";
import { urls } from "../../../url";

import { appConfig } from "../../../constants";

const Batch = (props) => {
  let history = useHistory();
  let {
    auth,
    allbatchList,
    allTeacherList,
    clickAlert,
    loader,
    getAllBatches,
    batchTeacher
  } = props;

  const [deleteBatchmodalShow, setdeleteBatchModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [batchIdPasstoDeleteModal, setBatchIdPasstoDeleteModal] = useState();
  // let batchId[];

  const deleteBatchModalShowfun = (e, batchIds) => {
    console.log("selected batch id on delete modal", batchIds);
    // // setCurrentTestInFocus(e.target.value);
    // console.log("Value when clicked on 3 dots", e.target.value);
    window.CurrentBatchId = batchIds;
    console.log("from current Batch id to delete  ", window.CurrentBatchId);
    setdeleteBatchModalShow(true);
  };
  const deleteBatch = (batchId = window.CurrentBatchId) => {
    console.log("batchId inside axios call");
    axios
      .delete(
        `${appConfig.host}${urls.deleteParticularBatch}?batchId=${batchId}`
      )
      .then((success) => {
        console.log("Delete Batch Success", success.data);
        setdeleteBatchModalShow(false);

        getAllBatches();
      })
      .catch((error) => {
        console.log("Delete Batch Error error", error);
        setdeleteBatchModalShow(false);
      });
  };
  // const handleBatchDetails = (e) => {
  //   props.history.push("/batch/details");
  // };

  const handleBatchDetails = (e, batchIds) => {
    // console.log("Batch to View", e.target.value);

    // props.history.push("/teacher/assignTest");
    history.push({
      pathname: "/batch/details",
      state: { batchId: batchIds },
    });
  };

  //   <Paper
  //   className={classes.paper}
  //   elevation={1}
  //   id={styles.paper_batch_header}
  // >
  //   {specificBatchData.name}

  // </Paper>

  return (
    <React.Fragment>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div>
          <AddNewBatchModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onChildClick={clickAlert}
          />

          {/* <DeleteBatchModal
        show={deleteBatchmodalShow}
        onHide={() => setdeleteBatchModalShow(false)}
      ></DeleteBatchModal> */}
          <DeleteBatchModal
            show={deleteBatchmodalShow}
            onHide={() => setdeleteBatchModalShow(false)}
            onClickedDelete={() => deleteBatch(window.CurrentBatchId)}
          ></DeleteBatchModal>

          <Paper elevation={1} id="paper-batch-header">
            <span className="create-batch">Batches</span>
            <Button id="create-batch-btn" onClick={() => setModalShow(true)}>
              ADD NEW BATCH
            </Button>
          </Paper>

          {/* <div className={classes.root} className="batch_card"> */}

          <div className="batch_card">
            {/* </Container> */}
            <Grid container spacing={3}>
              {/* first card */}

              {/* {Object.values(allbatchList).map(
            ({ id, batchName, courseName }, i) => {
              return ( */}


              {allbatchList.length > 0 &&
                allbatchList.map((element) => {
                  
                  return (
                    <React.Fragment style={{marginTop:"10%"}}>
                      <Grid item xs={4} key={element._id} >  

                      {console.log("batch data for multiple teacher",allbatchList,element)}
                        <Card className="batch_cardHeading">
                          <CardContent id="batch-card-heading-bgcolor">
                            <div>
                              {/* 3 verticle dots  */}
                              <div
                                class="dropdown"
                                style={{
                                  display: "flex",
                                  float: "right",
                                  marginRight: "5px",
                                  marginTop: "5px",
                                }}
                              >
                                <a
                                  type="button"
                                  id="dropdownMenu2"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  onClick={() => console.log("hello")}
                                >
                                  <i
                                    class="fas fa-ellipsis-v"
                                    style={{ marginLeft: "auto" }}
                                  ></i>
                                </a>
                                <div
                                  class="dropdown-menu dropdown-primary"
                                  style={{ marginLeft: "-130px" }}
                                  // value={element._id}
                                  value={"10"}

                                  // onClick={(e) => deleteBatchModalShow(e)}
                                >
                                  <a
                                    class="dropdown-item"
                                    onClick={(e) =>
                                      deleteBatchModalShowfun(e, element._id)
                                    }

                                    // onClick={deleteBatchModalShowfun(element._id)}

                                    // onClick={() => setdeleteBatchModalShow(true)}
                                    // value={"10"}

                                    // value={element._id}
                                  >
                                    Delete Batch
                                  </a>
                                </div>
                              </div>

                              {/* card heading */}
                              <Typography
                                gutterBottom
                                variant="bold"
                                component="h6"
                              >
                                {/* Batch A */}
                                {element.name}
                                {/* {element._id} */}
                                {console.log(
                                  "element inside ijex of batch contains all elements"
                                )}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                style={{ color: "white" }}
                              >
                                {/* {element.courseId.name} */}
                                {element.course.name}





                                {/* {console.log("teacherName at 114 line ",teachers)} */}
                                {/* Physics Class 10 */}
                              </Typography>
                            </div>
                          </CardContent>
                          <CardContent>
                            {/* batch.teacherName.length > 0 && */}
                            {/* {allbatchList.map((b, i) => ( */}
                            {/* {shoot.shoots.map(shoot => (<p>{shoot}</p>))} */}

                            <div>
                              <Typography
                                variant="body2"
                                component="p"
                                // key={teacher.teacherId}
                              >
                                <span style={{ fontWeight: "bold" }}>
                                  Teacher :{" "}
                                </span>
                               
{/* 
{batchTeacher.map((teacher, index) => (

<span key={teacher.teacherId}>
  {teacher.teacherName},{" "}
</span>
))} */}



{element.teachers.map((teacher, index) => (

<span key={teacher.teacherId}>
  {teacher.name},{" "}
</span>
))}
                                <br />
                              </Typography>
                            </div>

                            {/* {auth.userMetaData.Teacher.name} */}

                            <Typography variant="body2" component="p">
                              <span style={{ fontWeight: "bold" }}>
                                No. of Students :{" "}
                              </span>
                              {element.students.length}
                              <br />
                            </Typography>

                            {/* <Button
          id="view-batch-btn"
          // style={{float:"right"}}
          //  variant="primary"
          // onClick={handleCreateTest}
        >
          ASSIGN
        </Button>  */}

                            <button
                              id="view-batch-btn1"
                              style={{backgroundColor:"#8499ff"}}
                              // onClick={handleBatchDetails}
                              // value={element._id}
                              onClick={(e) =>
                                handleBatchDetails(e, element._id)
                              }
                            >
                              VIEW
                            </button>
                          </CardContent>
                        </Card>
                      </Grid>
                    </React.Fragment>
                  );
                })}

              {/* );
            }
          )} */}

              {allbatchList.length === 0 && (
                <div style={{ marginTop: "50px", marginLeft: "25%" }}>
                  No Batch created yet
                </div>
              )}
              {/*first card end here */}
            </Grid>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default enhancer(Batch);
