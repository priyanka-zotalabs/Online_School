import React, { useState } from "react";
import styles from "./addNewStudentTableStyle.module.css";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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
import AddStudentToBatchModal from "./AddStudentToBatchModal/index";

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

{
  /* <TableCell align="center">{row.feesStatuse}</TableCell> */
}

function createData(studentName, feesStructure, feesStatuse, details) {
  return { studentName, feesStructure, feesStatuse, details };
}

const rows = [
  createData(
    "Pankaj Rathi",

    "2",
    "complete",
    "View Details"
  ),
  createData(
    "Priya Yadav",

    "4",
    "pending",
    "View Details"
  ),
  createData(
    "Amit Mule",

    "2",
    "pending",
    "View Details"
  ),
  createData(
    "Rajiv varma",

    "3",
    "complete",

    "View Details"
  ),
  createData(
    "Rashi Modi",

    "1",
    "complete",

    "View Details"
  ),
];

const AssignBatch = (props) => {
  const classes = useStyles();

  const [modalShow, setModalShow] = useState(false);

  const handleEditTest = (e) => {
    props.history.push("/teacher/editTest");
  };

  return (
    <React.Fragment>
      <AddStudentToBatchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className={classes.root}>
        {/*  Table */}
        <Paper
          className={classes.paper}
          elevation={1}
          id={styles.paper_batch_header}
        >
          <span
            className={styles.create_batch_discription}
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Students
          </span>

          <TableContainer style={{ marginBottom: "0.1%" }}>
            {/* <span className={styles.create_batch_discription}>Assign to Batch</span> */}

            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>

                  <TableCell align="center">Fees Structure </TableCell>
                  <TableCell align="center">Fees Status </TableCell>

                  <TableCell align="center">Details</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "400px" }}
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
                    <TableCell align="center">{row.feesStructure}</TableCell>
                    <TableCell align="center">{row.feesStatuse}</TableCell>

                    <TableCell align="center">
                      {" "}
                      <a
                        style={{ color: "blue", textDecoration: "underline" }}
                        // onClick={() => setscoremodalShow(true)}
                      >
                        {row.details}
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      <DeleteIcon />
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: "400px" }}
                    ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Button
            id={styles.add_student_btn}
            onClick={() => setModalShow(true)}
          >
            ADD NEW STUDENT
          </Button> */}
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default AssignBatch;
