import React, { useState, useEffect } from "react";
import styles from "./testscoreModalStyle.module.css";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { compose } from "redux";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../shared/Components/Loading";
import moment from "moment";
import { validate } from "../../../../../shared/helpers/formValidation";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Paper from "@material-ui/core/Paper";

function createData(name, mark, totalMark, medalWinner) {
  return { name, mark, totalMark, medalWinner };
}

const allTestStructure = [
  createData("Gaurav kontrod", 50, 50, "Gold"),
  createData("Priyanka Tavle ", 41, 50, "silver"),
  createData("Naresh Nishad", 42, 50, "silver"),
  createData("Akshay Patil", 43, 50, "silver"),
  createData("Kruttika Patwardhan", 44, 50, "silver"),
  createData("Anant Sharma", 45, 50, "silver"),
  createData("Shankar Varat", 46, 50, "silver"),
  createData("Shivangi", 47, 50, "silver"),
  createData("Priyanka Tavle", 48, 50, "silver"),
  createData("Naresh Nishad", 49, 50, "silver"),
  createData("Akshay Patil", 50, 50, "silver"),
  createData("Kruttika Patwardhan", 50, 50, "silver"),
  createData("Anant Sharma", 43, 50, "silver"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Student Name" },
  { id: "mark", numeric: true, disablePadding: true, label: "Marks Scored" },
  {
    id: "totalMark",
    numeric: true,
    disablePadding: false,
    label: "Total Marks ",
  },
  {
    id: "medalWinner",
    numeric: true,
    disablePadding: false,
    label: "Medal Winner",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  // all function soutside the functional compponent

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
        //    padding="checkbox"
        >
          {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            /> */}
        </TableCell>
        {headCells.map((headCell) => (
          // align={headCell.numeric ? "right" : "left"}

          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return <div></div>;
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const TestscoreModal = (props) => {
  const batchId = props.batchId;
  const testIds = props.passTestId;
  const batchName = props.batchName;
  const passTestName = props.passTestName;
  // batchName={specificBatchInfo.name}
  // passTestName={passTestName}

  const [testId, setTestId] = useState(props.passTestId);
  let [loader, setLoader] = useState(false);
  const [allTestStructure, setAllTestStructure] = useState([]);

  // console.log(
  //   "bathcId and test Id in test score modal",
  //   batchId,
  //   testId,
  //   props.passTestId
  // );
  useEffect(() => {
    // console.log("batch test modal useEffect");
    if (props.passTestId !== undefined) {
      getDataOfBatchTestScore();
    }
  }, [props.passTestId]);
  const getDataOfBatchTestScore = (e) => {
    // console.log("batch test modal before aPI call");
    // console.log(
    //   "bathcId and test Id in test score modal axio call before",
    //   batchId,
    //   testId,
    //   props.passTestId
    // );

    // if()
    setLoader(true);
    axios
      .get(
        `${appConfig.host}${urls.getAllScoreOfParticulatTestInBatch}?batchId=${batchId}&testId=${props.passTestId}`
      )
      .then((result) => {
        // console.log("batch test score success data", result.data);

        // setAllTestStructure(_.cloneDeep(result.data.data));

        //  to make unique student rows with only one student
        let tempArray = result.data.data;
        let myMap = new Map();
        tempArray.forEach((object) => {
          myMap.set(object.student._id, object);
        });
        tempArray = [];
        for (let value of myMap.values()) {
          tempArray.push(value);
        }
        // simple sorting to assign gold , silver, and bronz medals
        let tempRow = [];
        tempArray.forEach((eachStudent, index) => {
          tempRow.push({
            name: eachStudent.student.name,
            totalMark: eachStudent.totalMarks,
            score: eachStudent.score,
            medalWinner: "N/A",
          });
        });
        tempRow.sort((a, b) => {
          return a.mark - b.mark;
        });
        if (tempRow[0]) {
          tempRow[0].medalWinner = "Gold";
        }
        if (tempRow[1]) {
          tempRow[1].medalWinner = "Silver";
        }
        if (tempRow[2]) {
          tempRow[2].medalWinner = "Bronze";
        }

        // rows = _.cloneDeep(tempRow);
        // setAllTestStructure(_.cloneDeep(result.data.data));
        setAllTestStructure(_.cloneDeep(tempRow));

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("mark");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  // const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allTestStructure.map((n) => n.student.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, allTestStructure.length - page * rowsPerPage);

  return (
    <div>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ borderRadius: "25px" }}
      >
        <Modal.Header style={{ border: "none" }} closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
          <div id={styles.testScoreModalHeading}>
            <span className={styles.score_Modal_heading}>
              Scores of {batchName}- {passTestName}
            </span>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={"small"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={allTestStructure.length}
                  />
                  <TableBody>
                    {stableSort(allTestStructure, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        // const isItemSelected = isSelected(row.student.name);

                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                          //   hover
                          //   onClick={(event) => handleClick(event, row.name)}
                          //   role="checkbox"
                          //   aria-checked={isItemSelected}
                          //   tabIndex={-1}
                          //   key={row.name}
                          //   selected={isItemSelected}

                          // key={row.student._id}
                          >
                            <TableCell
                            //   padding="checkbox"
                            >
                              {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.name}
                              {/* {row.student.name} */}
                            </TableCell>
                            <TableCell align="center">{row.score}</TableCell>
                            <TableCell align="center">
                              {row.totalMark}
                              {/* {row.totalMarks} */}
                            </TableCell>
                            <TableCell align="center">
                              {row.medalWinner}

                              {/* {(row.score / row.totalMarks) * 100 >= 90 ? (
                                <span>Gold</span>
                              ) : (
                                <span>silver</span>
                              )} */}
                              {/* {row.medalWinner} */}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 33 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allTestStructure.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TestscoreModal;
