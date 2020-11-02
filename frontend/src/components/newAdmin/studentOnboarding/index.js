import React,{useState} from "react";
import enhancer from "./enhancer";
import { MDBBtn } from "mdbreact";
import MaterialTable, { MTableBodyRow } from "material-table";
import AddTeacherModal from "./addStudentModal/index";
import "./style.scss";
import {Paper} from "@material-ui/core"; 

import { Container, Row, Col, Button, } from "react-bootstrap";
import ReactFileReader from "react-file-reader";

const TeacherOnboarding = (props) => {
  let {
    addTeacherModalShow,
    handleAddTeacherModal1,
    handleAddTeacherModal2,

    handleCloseModal,
    data,
    handleStudentDetails,
    studentId,
    instituteId,
    singleStudentOnboarding,
    multipleStudentOnboarding,
    clickAlert
  } = props;
  // console.log("student info ",userMetaData);

  const columns = [
    // { title: "Student Name", field: "userMetaData.name",sorting: false },

    { title: "Student Name", field: "userMetaData.name" },
    { title: "Email ID", field: "email" },
    { title: "Mobile No.", field: "contactNumber" },
    { title: "Course Name", field: "userMetaData.courses[0].courseId.name" },
    { title: "Batch Name", field: "userMetaData.courses[0].batchId.name" },
  ];

  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      console.log("csv file reader", reader.result, e);
      alert("csv file reader", reader.result);
    };
    reader.readAsText(files[0]);
  };
// let single=true;
// let multiple=true;
  // const [singleStudentOnboarding, setSingleStudentOnboarding]=useState(true);
  // const [multipleStudentOnboarding, setMultipleStudentOnboarding]=useState(true);

  return (
    <div>

        {/* import {Paper} from "@material-ui/core";  */}

        <Paper elevation={1} id="paper-test-header" style={{height:"60px"}}>
<div>

        {/* <Container>
        <Row
        //  style={{marginLeft:"3%",Position:"relative"}}
         > */}
        <AddTeacherModal
        onChildClick={clickAlert}
              show={addTeacherModalShow}
              onHide={handleCloseModal}
              single={singleStudentOnboarding}
              multiple={multipleStudentOnboarding}
              
            />
{/* <Col xs={5} md={5}> */}

<span className="create-test" style={{float:"left"}}>Student Onboarding</span>
{/* </Col> */}

{/* 
<Col xs={5} md={5} 
// style={{marginRight:"-5%"}}
> */}

<Button
              id="create-test-btn"
              onClick={handleAddTeacherModal1}

            >
               ADD NEW STUDENT
        </Button>
{/* </Col> */}

{/* <Col 
xs={2.5} md={2.5} 
style={{marginLeft:"3%",Position:"absolute"}}> */}
<Button
//  style={{marginLeft:"3%",Position:"absolute"}}
              id="create-test-btn"
              onClick={handleAddTeacherModal2}
            >
             BULK UPLOAD
        </Button>
{/* </Col>

        </Row>
        </Container> */}
</div>
          </Paper>

          
      {/* <div className="course-title">
        <Container>
          <Row>
            <AddTeacherModal
              show={addTeacherModalShow}
              onHide={handleCloseModal}
              single={singleStudentOnboarding}
              multiple={multipleStudentOnboarding}
            />
            <Col xs={6} md={6}>
              {" "}
              <span id="main-heading-courses-new" style={{ color: "#175592" }}>
                Student Onboarding
              </span>
            </Col>

            <Col xs={3} md={3}>
              <MDBBtn
                id="create-course-btn-new"
                onClick={handleAddTeacherModal1}
            

              >
                ADD NEW STUDENT
              </MDBBtn>
            </Col>

            <Col xs={2.5} md={2.5}>

            <MDBBtn
                id="create-course-btn-new"
                onClick={handleAddTeacherModal2}
              >
                BULK UPLOAD
              </MDBBtn>


            
            </Col>
          </Row>
        </Container>
      </div> */}



        {/* <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
                <MDBBtn id="create-course-btn-new">upload csv</MDBBtn>
                {/* <button className='btn'>Upload</button> *
              </ReactFileReader> */}
{/* previous code for student onboarding */}
{/* 
      <div className="course-title">
        <span id="main-heading-courses-new" style={{color:"#175592"}}>Student Onboarding</span>
        <AddTeacherModal show={addTeacherModalShow} onHide={handleCloseModal} />
        <MDBBtn id="create-course-btn-new" onClick={handleAddTeacherModal}>
          ADD NEW STUDENT
        </MDBBtn>
      </div> */}
      <div className="all-teacher-table">
        <MaterialTable
          // to make table row responsive on duble click
          components={{
            Row: (props) => (
              <MTableBodyRow
                {...props}
                onDoubleClick={(e) => handleStudentDetails(e, props)}
              />
            ),
          }}
          title="All Students"
          columns={columns}
          data={data}
          options={{
            search: true,
            selection: false,
            filtering: false,
            grouping: false,
          }}
        />
      </div>
    </div>
  );
};

export default enhancer(TeacherOnboarding);
