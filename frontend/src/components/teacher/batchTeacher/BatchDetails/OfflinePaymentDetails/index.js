import React, { useState } from "react";
import styles from "./offlinePaymentTable.module.css";
import { makeStyles } from "@material-ui/core/styles";

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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardHeading: {
    // maxWidth: 345,
    width: "100%",
  },
  table: {
    minWidth: 650,
  },

  editquestion: {
    width: "100%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  editheading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  radioInput: {
    minWidth: "100%",
  },
  markSubTime: {
    width: "100%",
  },
  formControlSelect: {
    margin: theme.spacing(1),
    minWidth: 100,
    marginTop: -20,
    marginLeft: 10,
  },
}));

function createData(studentName, amount, dueDate) {
  return { studentName, amount, dueDate };
}

const rows = [
  createData(
    "Pankaj Rathi",

    "2000",
    "25 July 2020"
  ),
  createData(
    "Priya Yadav",

    "4000",
    "27 July 2020"
  ),
  createData(
    "Amit Mule",

    "2000",
    "20 July 2020"
  ),
  createData(
    "Rajiv varma",

    "3500",
    "15 July 2020"
  ),
  createData(
    "Rashi Modi",

    "1200",
    "23 July 2020"
  ),
];

const AssignBatch = (props) => {
  const classes = useStyles();
  // table functions &
  const [modalShow, setModalShow] = useState(false);

  const [scoremodalShow, setscoremodalShow] = useState(false);

  const handleEditTest = (e) => {
    props.history.push("/teacher/editTest");
  };

  // table functio end

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/*  Table */}
        <Paper
          className={classes.paper}
          elevation={1}
          id={styles.paper_offlinePayment_header}
        >
          <span
            className={styles.offlinePayment_discription}
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Offline Payment Requests
          </span>

          <TableContainer style={{ marginBottom: "0.1%" }}>
            {/* <span className={styles.offlinePayment_discription}>Assign to Batch</span> */}

            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Amount(Rs.) </TableCell>
                  <TableCell align="center">Due Date</TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "10%" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "10%" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "300px" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.studentName}>
                    <TableCell component="th" scope="row">
                      {row.studentName}
                    </TableCell>
                    {/* <TableCell align="center">{row.batchName}</TableCell> */}
                    <TableCell align="center">{row.amount}</TableCell>

                    <TableCell align="center">{row.dueDate}</TableCell>

                    <TableCell align="center" style={{ width: "10%" }}>
                      <Button
                        size="sm"
                        id={styles.accept_batch_btn}

                        //   onClick={handleCreateTest}
                        // onClick={() => setModalShow(true)}
                      >
                        Accept
                      </Button>
                    </TableCell>

                    <TableCell align="center" style={{ width: "10%" }}>
                      <Button size="sm" id={styles.decline_batch_btn}>
                        Decline
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "300px" }}
                    ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default AssignBatch;
