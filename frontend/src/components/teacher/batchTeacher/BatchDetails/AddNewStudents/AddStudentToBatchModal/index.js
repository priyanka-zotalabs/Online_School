import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./addStudentToBatchModalStyle.module.css";

import DateFnsUtils from "@date-io/date-fns";

import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

import {
  Paper,
  Container,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
  },

  table: {
    minWidth: 650,
  },
}));
function createData(StudName, FeesStucture) {
  return { StudName, FeesStucture };
}

const rows = [
  createData("Anurag Sharma", "One time"),
  createData("Sanjiv Rai", "Half Yearly"),
  createData("John Deo ", "Monthly"),
];

const Index = (props) => {
  const classes = useStyles();
  //   const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ borderRadius: "25px", width: "100%" }}
      >
        <Modal.Header style={{ border: "none" }} closeButton>
          <div id={styles.addstudentModalHeading}>
            <span className={styles.addStudent_Modal_heading}>
              Add Student To Batch
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.root}>
            <TableContainer style={{ marginBottom: "0.1%" }}>
              {/* <span className={styles.create_test_discription}>Assign to Batch</span> */}

              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span
                        class="dropdown"
                        style={{
                          display: "flex",
                          float: "right",
                          marginRight: "5px",
                          marginTop: "5px",
                        }}
                      >
                        Actions
                        <a
                          type="button"
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={() => console.log("hello")}
                        >
                          <i
                            class="fa fa-angle-down"
                            style={{ marginLeft: "auto" }}
                          ></i>
                        </a>
                        <span class="dropdown-menu dropdown-primary">
                          <a
                            class="dropdown-item"
                            // href="#"
                            // onClick={() => console.log("Update")}
                          >
                            Edit{" "}
                          </a>

                          <a
                            class="dropdown-item"

                            //   onClick={() => setModalShow(true)}
                          >
                            Delete{" "}
                          </a>
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>Student Name</TableCell>

                    <TableCell>Fees Structure</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.StudName}>
                      <TableCell padding="checkbox">
                        <Checkbox
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={onSelectAllClick}
                        // inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.StudName}
                      </TableCell>
                      <TableCell align="left">{row.FeesStucture}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Button
            //   id="create-test-btn"
            id={styles.addStudent_btn}
            // style={{float:"right"}}
            //  variant="primary"

            //   onClick={handleCreateNewBatch}

            onClick={props.onHide}
          >
            ADD STUDENT
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Index;
