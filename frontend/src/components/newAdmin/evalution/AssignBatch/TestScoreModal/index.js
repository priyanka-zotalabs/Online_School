import React, { useState, useEffect } from 'react'
import styles from "./testScoreModal.module.css"
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Loading from "../../../../../shared/Components/Loading";
import _ from "lodash";

function createData(name, mark, totalMark, medalWinner,) {
  return { name, mark, totalMark, medalWinner };
}


let rows = [
  createData('Zotalabs', 50, 50, 'Gold'),
  createData('Zotalabs ', 41, 50, 'silver'),
  createData('Zotalabs', 42, 50, 'silver'),
  createData('Zotalabs', 43, 50, 'silver'),
  createData('Zotalabs', 44, 50, 'silver'),
  createData('Zotalabs', 45, 50, 'silver'),
  createData('Zotalabs', 46, 50, 'silver'),
  createData('Zotalabs', 47, 50, 'silver'),
  createData('Zotalabs Zotalabs', 48, 50, 'silver'),
  createData('Zotalabs Zotalabs', 49, 50, 'silver'),
  createData('Zotalabs Zotalabs', 50, 50, 'silver'),
  createData('Zotalabs', 50, 50, 'silver'),
  createData('Zotalabs', 43, 50, 'silver'),
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
  return order === 'desc'
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Student Name' },
  { id: 'mark', numeric: true, disablePadding: true, label: 'Marks Scored' },
  { id: 'totalMark', numeric: true, disablePadding: false, label: 'Total Marks ' },
  { id: 'medalWinner', numeric: true, disablePadding: false, label: 'Medal Winner' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <div></div>
  )
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));



const TestscoreModal = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('mark');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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
        selected.slice(selectedIndex + 1),
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

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [batchName, setBatchName] = useState(props.batchName);
  const [batchId, setBatchId] = useState(props.batchId);
  const [testId, setTestId] = useState(props.testId);
  const [totalMarks, setTotalMarks] = useState(props.totalMarks);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setBatchName(props.batchName);
    setBatchId(props.batchId);
    setTestId(props.testId);
    setTotalMarks(props.totalMarks);

  }, [props.batchName, props.batchId, props.testId, props.totalMarks])
  // console.log("Props", props);
  // console.log("Selected Batch Id", batchId);
  // console.log("Selected Batch Name", batchName);
  // console.log("Selected Test ID", testId);
  // console.log("Total Marks", totalMarks);
  // console.log("Access", rows);

  useEffect(() => {
    if (batchId && testId) {
      getAllScores();
    }
  }, [batchId, testId]);

  const getAllScores = () => {
    setLoader(true);
    axios
      .get(`${appConfig.host}${urls.getAllScores}?testId=${testId}&batchId=${batchId}`)
      .then((success) => {
        // console.log("Success getting all scores of test", success.data.data);

        let tempArray = success.data.data;
        let myMap = new Map();
        tempArray.forEach(object => {
          myMap.set(object.studentUserId, object);
        });
        tempArray = [];
        for (let value of myMap.values()) {
          tempArray.push(value);
        }
        let tempRow = [];
        tempArray.forEach((eachStudent, index) => {
          tempRow.push({
            name: eachStudent.student.name,
            totalMark: eachStudent.totalMarks,
            mark: eachStudent.score,
            medalWinner: "N/A",
          });
        });

        tempRow.sort((a, b) => {
          return a.mark - b.mark;
        })
        if (tempRow[0]) {
          tempRow[0].medalWinner = "Gold"
        }
        if (tempRow[1]) {
          tempRow[1].medalWinner = "Silver"
        }
        if (tempRow[2]) {
          tempRow[2].medalWinner = "Bronze"
        }
        rows = _.cloneDeep(tempRow);
        setLoader(false);
      })
      .catch((error) => {
        console.log("get all scores of test error", error);
        setLoader(false);
      });
  }
  return (
    <>
      {loader ? (<Loading isLoading={true} ></Loading>) :
        (<>
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
                  <span className={styles.score_Modal_heading}>{batchName}</span>
                </div>
              </Modal.Header>


              <Modal.Body >
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                      >
                        <EnhancedTableHead
                          classes={classes}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
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
                                >
                                  <TableCell
                                  //   padding="checkbox"
                                  >
                                    {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="center">{row.mark}</TableCell>
                                  <TableCell align="center">{row.totalMark}</TableCell>
                                  <TableCell align="center">{row.medalWinner}</TableCell>

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
                      count={rows.length}
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
        </>)
      }
    </>
  )
}

export default TestscoreModal



