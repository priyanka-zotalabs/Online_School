import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import moment from "moment";
import { useHistory } from "react-router-dom";


export let enhancer = compose(
  withRouter,
  (TeacherOnboardingComponent) => ({ ...props }) => {
    const [addTeacherModalShow, setAddTeacherModalShow] = useState(false);
    const [data, setData] = useState();
const [singleStudentOnboarding, setSingleStudentOnboarding]=useState(false);
  const [multipleStudentOnboarding, setMultipleStudentOnboarding]=useState(false);


  const clickAlert=()=> {
    console.log("Is this function called");
    getAllStudents();
  }
    useEffect(() => {
      getAllStudents();
    }, []);


   

    console.log("dataaaaa", data)

    const history = useHistory();

    const handleStudentDetails = (e, props) => {
      console.log("student info from table", e.target, e.target.value, props, props.index, data[(props.index)]);
      // props.path[0] will give correct index of row in materail ui table
      // let dataStudent = data[(props.path[0])];
      let dataStudent = data[(props.data.tableData.id)];


      console.log("all data", dataStudent.userMetaData._id, dataStudent.userMetaData.instituteId);
      history.push({
        pathname: "/batch/details/students/viewdetails",
        state: { studentId: dataStudent.userMetaData._id, instituteId: dataStudent.userMetaData.instituteId },
      });

    };


    const getAllStudents = () => {
      axios
        .get(`${appConfig.host}${urls.getStudents}`)
        .then((success) => {
          console.log("data for all students : ", success.data.data);
          setData(success.data.data);


        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleAddTeacherModal1 = () => {
      setSingleStudentOnboarding(true);
      setMultipleStudentOnboarding(false)
      setAddTeacherModalShow(true);
     
    };
    const handleAddTeacherModal2 = () => {
      setMultipleStudentOnboarding(true)
      setSingleStudentOnboarding(false);
      setAddTeacherModalShow(true);
    };

    const handleCloseModal = () => {
      setAddTeacherModalShow(false);
    };

    return (
      <TeacherOnboardingComponent
        {...props}
        {...{
          addTeacherModalShow,
          handleAddTeacherModal1,
          handleAddTeacherModal2,
          handleCloseModal,
          data,
          handleStudentDetails,
          singleStudentOnboarding,
          multipleStudentOnboarding,
          clickAlert

         
        }}
      />
    );
  }
);

export default enhancer;
