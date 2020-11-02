import React, { useState, useEffect } from "react";
import styles from "./allFeeStructureTableStyle.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

import DeleteFeesStructureModal from "./DeleteFeeStructureModal/index";
import { useHistory } from "react-router-dom";

import Checkbox from "@material-ui/core/Checkbox";
import MaterialTable from "material-table";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
// import { urls } from "../../../../../";

import { urls } from "../../../../../url";
import { appConfig } from "../../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../../../../shared/Components/Loading";
import moment from "moment";
import _ from "lodash";
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

function createData(
  structure,
  noOfInstallmaents,
  dateOfStarting,
  dueDate,
  amount
) {
  return { structure, noOfInstallmaents, dateOfStarting, dueDate, amount };
}

const rows = [
  createData(
    "Early Bird Offer",

    "2",
    "20/07/2020",
    "20/12/2020",

    "4000"
  ),
  createData(
    "Structure -0",

    "2",
    "20/08/2020",
    "20/12/2020",

    "4500"
  ),
  createData(
    "Structure 1",

    "4",
    "20/05/2020",
    "20/12/2020",

    "2000"
  ),
];

const AssignBatch = (props) => {
  const [checked, setChecked] = React.useState(false);
  console.log(" is checked", checked);

  const handleChange = (event, id) => {
    // let clicked;
    console.log(" is checked in function", id);

    if (checked == true) {
      // if checked ...
      alert("chbox clicked check");
    } else {
      alert("chbox clicked uncheck");
      // if not checked ...
    }
    // alert("I am Clicked with id ", event.target.checked);
  };
  // const handleChange = (event, id) => {
  //   setChecked(event.target.checked);
  //   console.log(" is checked in function", id,checked);
  //   // alert("I am Clicked with id ", event.target.checked);
  // };
  let history = useHistory();
  const classes = useStyles();

  const alertShow = (e, id) => {
    alert("I am Clicked with id ", id);
  };
  console.log("start date in fees parentpassed from ", props.feesStartDate);
  console.log("end date in fees passed from parent", props.feesEndDate);
  console.log("batch id in addnew fees structure", props.batchId);
  // const params = { data: {fname: 'john', lname: 'doe' } };
  // this.props.history.push('/target-page', params);
  let startFeesDate = props.feesStartDate;
  let endFeesDate = props.feesEndDate;
  let batchIds = props.batchId;
  let batchName = props.batchName;
  let onChildClick = props.onChildClick;
  // props.onChildClick();
  // let clickAlert = props.clickAlert;

  console.log("startFeesDate in fees parentpassed from ", startFeesDate);
  console.log("endFeesDate in fees passed from parent", endFeesDate);
  console.log("batchIds in addnew fees structure", batchIds);
  // table functions &
  const [modalShow, setModalShow] = useState(false);
  let [loader, setLoader] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const [allFeesStructure, setAllFeesStructure] = useState([]);
  const [pariticularFeesStructure, setpariticularFeesStructure] = useState([]);

  const [currency,setCurrency]=useState("");


  console.log("Currency reciveed",currency)
  console.log("allFeesStructure",allFeesStructure,allFeesStructure.length);
  useEffect(() => {
    console.log("fees stuct table before function call in useeffect");
    getAllFeesStructureList();
  }, []);

//   useEffect(()=>{

//     if(allFeesStructure && allFeesStructure.length> 0 && allFeesStructure!== undefined){

//       let datatemp = [];
//       // console.log("allFeesStructure bbb",allFeesStructure);
//       allFeesStructure &&
//       allFeesStructure.length &&
//       allFeesStructure.forEach((fees) => {
//       // allFeesStructure.forEach((fees) => {
//         // setCurrency(Currency);

//         // if()
//         let num = fees.installmentCalculator.length;
//         let nums = Number(num) - 1;
//         let temp = {};
//         temp["structureName"] = (
//           <span key={fees._id}>
//             <Checkbox></Checkbox>
//           </span>
//         );
// // fees.currency

// // let Currency=(fees.currency) == "INR(Rs)" ? "INR(Rs)" : "USD($)" ;
// // console.log("Currency comming",Currency);


//         temp["structureName"] = fees.name;
//         temp["noOfInstall"] = fees.numberOfInstallments;
//         temp["dateOfStarting"] = fees.installmentCalculator[0].date;
//         temp["dueDate"] = fees.installmentCalculato[nums].date;
//         temp["amount"] = fees.totalAmount;

//         temp["edit"] = (
//           <Grid container spacing={1} key={fees._id}>
//             <Grid>
//               <i
//                 style={{ float: "right", paddingRight: "22px" }}
//                 class="fas fa-pen"
//                 // onClick={handleEditTest}
//                 // onClick={() => setModalShow(true)}
//               ></i>
//               {/* <a
//                 style={{ color: "blue", textDecoration: "underline" }}
//                 // onClick={() => setscoremodalShow(true)}
//                 // onClick={(e) => passTestIdToScoreModal(e, test._id)}
//               >
//                 edit
//               </a> */}
//             </Grid>
//             {/* <Grid>
//           <DeleteIcon onClick={() => onDelete(gallery._id)} />
//         </Grid> */}
//           </Grid>
//         );
//         // temp["delete"] = (
//         //   <Grid container spacing={1} key={test._id}>
//         //     <Grid>
//         //       <DeleteIcon
//         //         onClick={() =>
//         //           onDeleteSpecificStudent(student.studentId, batchId)
//         //         }
//         //       />
//         //     </Grid>
//         //   </Grid>
//         // );
//         datatemp.push(temp);
//       });
//       setFeesData(datatemp);
//     }

//   },[allFeesStructure.length]);



  // const getBatchList = (event) => {
  //   console.log("before clone deep in batch details");
  //   console.log("batchlist list function enhancer", specificBatchData);
  //   setSpecificBatchInfo(_.cloneDeep(specificBatchData));
  // };
  // console.log("After clone deep", specificBatchInfo);
 

  const columns = [
    { title: "Actions", field: "actions" },

    { title: "Structure Name", field: "structureName" },
    { title: "No. of Installments ", field: "noOfInstall" },
    { title: "Date of Starting ", field: "dateOfStarting" },
    { title: "Due Date", field: "dueDate" },
    { title: `Amount ${currency}`, field: "amount" },
    { title: `currency`, field: "currency" },

    { title: "Edit", field: "edit" },
  ];

  const getAllFeesStructureList = (e) => {
    console.log("fees stuct table after function call in useeffect");
    let datatemp = [];
    setLoader(true);
    axios
      .get(`${appConfig.host}${urls.getAllFeesSrtructures}${batchIds}`)
      .then((result) => {
        console.log(
          "Success getting all fees structure data",
          result.data.data
        );

        setAllFeesStructure(_.cloneDeep(result.data.data));
        // setSpecificBatchData(result.data.data);
        let getAllFeesStructures = result.data.data;
        getAllFeesStructures &&
          getAllFeesStructures.length &&
          getAllFeesStructures.forEach((fees) => {
            setCurrency(fees.currency);

            // if()
            let num = fees.installmentCalculator.length;
            let num2 = Number(num) - 1;
            let temp = {};
            temp["structureName"] = (
              <span key={fees._id}>
                <Checkbox></Checkbox>
              </span>
            );
// fees.currency

let Currency=(fees.currency) == "INR(Rs)" ? "INR(Rs)" : "USD($)" ;
console.log("Currency comming",Currency);

console.log("Currency in table",fees.currency);
            temp["structureName"] = fees.name;
            temp["noOfInstall"] = fees.numberOfInstallments;
            temp["dateOfStarting"] = fees.installmentCalculator[0].date;
            // temp["dueDate"] = fees.installmentCalculato[num2].date;
            // temp["amount"] = `${fees.totalAmount}- ${fees.currency} `;
            // currency
            temp["currency"] = fees.currency;

            temp["edit"] = (
              <Grid container spacing={1} key={fees._id}>
                <Grid>
                  <i
                    style={{ float: "right", paddingRight: "22px" }}
                    class="fas fa-pen"
                    // onClick={handleEditTest}
                    // onClick={() => setModalShow(true)}
                  ></i>
                  {/* <a
                    style={{ color: "blue", textDecoration: "underline" }}
                    // onClick={() => setscoremodalShow(true)}
                    // onClick={(e) => passTestIdToScoreModal(e, test._id)}
                  >
                    edit
                  </a> */}
                </Grid>
                {/* <Grid>
              <DeleteIcon onClick={() => onDelete(gallery._id)} />
            </Grid> */}
              </Grid>
            );
            // temp["delete"] = (
            //   <Grid container spacing={1} key={test._id}>
            //     <Grid>
            //       <DeleteIcon
            //         onClick={() =>
            //           onDeleteSpecificStudent(student.studentId, batchId)
            //         }
            //       />
            //     </Grid>
            //   </Grid>
            // );
            // datatemp.push(temp);
          });

        // setFeesData(datatemp);

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const [passFeesStructureId, setPassFeesStructureId] = useState();
  const [passFeesStructureName, setPassFeesStructureName] = useState();

  const handleDeleteFeesStructure = (e, feesId, feesName) => {
    console.log("Fees Id passed from table to delete modal", feesId, feesName);
    // let specificTestId = testId;
    if (feesId !== undefined && feesName !== undefined) {
      console.log("inside If to chk fees id", feesId, feesName);
      setPassFeesStructureId(feesId);
      setPassFeesStructureName(feesName);
    }

    setModalShow(true);
  };

  const handleEditFeesStucture = (e, feesId) => {
    // history.push("/home");
    let temp = [];

    allFeesStructure.forEach((element) => {
      if (feesId == element._id) {
        temp.push({
          element,
        });
      }
    });
    console.log("selected fees id is=", feesId);
    // history.push("/batch/feesstructure/editFeesStructure");
    setpariticularFeesStructure([...temp]);

    history.push({
      pathname: "/batch/feesstructure/editFeesStructure",
      state: {
        particularFees: [...temp],
        batchId: batchIds,
        feesStartDate: props.feesStartDate,
        feesEndDate: props.feesEndDate,
        batchName: batchName,
      },
    });
  };

  // const location = useLocation();
  // let history = useHistory();
  // let batchId = location.state.batchId;
  // let feesStartDate = location.state.feesStartDate;
  // let feesEndDate = location.state.feesEndDate;

  // let particularFees = location.state.particularFees;
  // console.log(
  //   "particularFees & batch Id",
  //   batchId,
  //   particularFees,
  //   feesStartDate,
  //   feesEndDate
  // );

  const handleAddNewFeeStructure = (
    e,
    feesStartDates,
    feesEndDates,
    batchIds
    // clickAlert
  ) => {
    // history.push("/batch/feesstructure");

    history.push({
      pathname: "/batch/feesstructure",
      state: {
        feesStartDate: feesStartDates,
        feesEndDate: feesEndDates,
        batchId: batchIds,
        batchName: batchName,
        // clickAlert: clickAlert,
      },
    });
  };

  return (
    <React.Fragment>
      <DeleteFeesStructureModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        passFeesStructureId={passFeesStructureId}
        passFeesStructureName={passFeesStructureName}
        batchId={batchIds}
        onChildClick={onChildClick}
        batchName={batchName}
      ></DeleteFeesStructureModal>
      <div className={classes.root}>
        {/*  Table */}
        {/* <Paper
          className={classes.paper}
          elevation={1}
          id={styles.paper_FeeStructure_header}
        >
          <Grid item xs={12} style={{ marginTop: "20px" }}>
          
            <MaterialTable
              title={
                <span
                  className={styles.create_batch_discription}
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  All Fee Structures
                </span>
              }
              columns={columns}
              data={feesData}
            />
          </Grid>{" "}
          <Button
            id={styles.FeeStructure_btn}
            // as={Link}
            // to="/batch/feesstructure"

            // onClick={handlenextPage}

            onClick={(e) =>
              handleAddNewFeeStructure(
                e,
                props.feesStartDate,
                props.feesEndDate,
                props.batchId
                // props.clickAlert
              )
            }
            // onClick={(e) => handleAddNewFeeStructure(e, one, two, three)}
          >
            ADD NEW STRUCTURE
          </Button>
        </Paper> */}
        <Paper
          className={classes.paper}
          elevation={1}
          id={styles.paper_FeeStructure_header}
        >
          <span
            className={styles.FeeStructure_discription}
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            All Fee Structures
          </span>

          <TableContainer style={{ marginBottom: "0.1%" }}>
            {/* <span className={styles.FeeStructure_discription}>Assign to Batch</span> */}

            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {/* <TableCell>
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
                          // onClick={handleEditFeesStucture}

                          // as={Link}
                          // to="/batch/feesstructure/editFeesStructure"
                        >
                          Edit{" "}
                        </a>

                        <a
                          class="dropdown-item"
                          //   onClick={() => setdeleteTestModalShow(true)}
                          onClick={() => setModalShow(true)}
                        >
                          Delete{" "}
                        </a>
                      </span>
                    </span>
                  </TableCell> */}

                  {/* <TableCell>Structure</TableCell> */}
                  <TableCell>Structure Name</TableCell>
                  <TableCell align="center">No. of Installments </TableCell>
                  <TableCell align="center">Date of Starting </TableCell>
                  <TableCell align="center">Due Date</TableCell>
                <TableCell align="center">Amount</TableCell>

                {/* <TableCell align="center">Amount {currency}</TableCell> */}
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allFeesStructure.map((row, i) => (
                  // {rows.map((row) => (
                  <TableRow key={i}>
                    {/* <TableCell key={row._id} padding="checkbox">
                      <Checkbox
                        key={row._id}
                        // checked={checked}
                        onChange={(e) => handleChange(e, row._id)}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                      {/* <Checkbox
                        // onClick={alertShow}
                        onClick={(e) => alertShow(e, row._id)}

                        // onClick={(e) => handleEditFeesStucture(e, row._id)}
                      /> *
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {/* <TableCell align="center">{row.batchName}</TableCell> */}
                    <TableCell align="center" style={{ width: "17%" }}>
                      {row.numberOfInstallments}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {row.installmentCalculator[0].date}
                    </TableCell>
                    <TableCell align="center">
                      {
                        row.installmentCalculator[
                          Number(row.installmentCalculator.length) - 1
                        ].date
                      }
                    </TableCell>
                    <TableCell align="center">{row.totalAmount}
                    {/* {row.currency} */}
                    
                    {
                    
                    
                    row.currency== "INR" ?"Rs" : "$"
                    
                     }
                    </TableCell>
                    <TableCell align="center" key={row._id}>
                      <span>
                        <i
                          style={{ float: "right", paddingRight: "22px" }}
                          class="fas fa-pen"
                          // onClick={handleEditTest}
                          onClick={(e) => handleEditFeesStucture(e, row._id)}
                        ></i>
                      </span>
                    </TableCell>
                    <TableCell align="center" key={row._id}>
                      {/* <React.Fragment>
                     <DeleteIcon  onClick={(e) => handleDeleteFeesStructure(e, row._id) />
                   
                   </React.Fragment> */}
                      <span>
                        <i
                          style={{ float: "right", paddingRight: "22px" }}
                          class="fa fa-trash"
                          // onClick={handleEditTest}
                          onClick={(e) =>
                            handleDeleteFeesStructure(e, row._id, row.name)
                          }
                          // onClick={() => setModalShow(true)}
                        ></i>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <button
                              id="view-batch-btn"
                              // onClick={handleBatchDetails}
                              // value={element._id}
                              onClick={(e) =>
                                handleBatchDetails(e, element._id)
                               */}
          <Button
            id={styles.FeeStructure_btn}
            // as={Link}
            // to="/batch/feesstructure"

            // onClick={handlenextPage}

            onClick={(e) =>
              handleAddNewFeeStructure(
                e,
                props.feesStartDate,
                props.feesEndDate,
                props.batchId
                // props.clickAlert
              )
            }
            // onClick={(e) => handleAddNewFeeStructure(e, one, two, three)}
          >
            ADD NEW STRUCTURE
          </Button>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default AssignBatch;

//  <DeleteIcon  onClick={(e) => handleDeleteFeesStructure(e, row._id) />
// </Grid>
//  <span>
//    <i
//      style={{ float: "right", paddingRight: "22px" }}
//      class="fa fa-trash"
//      // onClick={handleEditTest}
//      onClick={(e) => handleDeleteFeesStructure(e, row._id)}
//      // onClick={() => setModalShow(true)}
//    ></i>
//  </span>
