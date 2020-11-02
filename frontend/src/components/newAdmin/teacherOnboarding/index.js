import React from "react";
import enhancer from "./enhancer";
import { MDBBtn } from "mdbreact";
import MaterialTable from "material-table";
import AddTeacherModal from "./addTeacherModal/index";
import "./style.scss";
import {Paper} from "@material-ui/core"; 
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const TeacherOnboarding = (props) => {
  let {
    addTeacherModalShow,
    handleAddTeacherModal,
    handleCloseModal,
    data,
    clickAlert
  } = props;
  const columns = [
    { title: "TeacherName", field: "userMetaData.name" },
    { title: "EmailId", field: "email" },
    { title: "Mobile No.", field: "userMetaData.contactNumber" },
    { title: "Role", field: "roleId[0].displayName" },
    { title: "Status", field: "userMetaData.status" },
  ];

  return (
    <div>

       {/* import {Paper} from "@material-ui/core";  */}

       <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">Teacher Onboarding</span>
            <AddTeacherModal
             show={addTeacherModalShow}
              onHide={handleCloseModal}
                onChildClick={clickAlert}
              />
            <Button
              id="create-test-btn"
              // onClick={() => setSelectTypeModalShow(true)}
              onClick={handleAddTeacherModal}
            >
               ADD NEW TEACHER
        </Button>
          </Paper>
      {/* <div className="course-title">
        <span id="main-heading-courses-new" style={{color:"#175592"}}>Teacher Onboarding</span>
        <AddTeacherModal show={addTeacherModalShow} onHide={handleCloseModal} />
        <MDBBtn id="create-course-btn-new" onClick={handleAddTeacherModal}>
          ADD NEW TEACHER
        </MDBBtn>
      </div> */}
      <div className="all-teacher-table">
        <MaterialTable
          title="All Teachers"
          columns={columns}
          data={data}
          options={{
            search: true,
            selection: false,
          }}
        />
      </div>
    </div>
  );
};

export default enhancer(TeacherOnboarding);
