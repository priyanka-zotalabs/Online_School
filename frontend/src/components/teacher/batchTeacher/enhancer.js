import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../url";

import { appConfig } from "../../../constants";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import _ from "lodash";
// import addNewBatchFormInit from "./addNewBatchForm";
// import { validate } from "../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";

export let enhancer = compose(
  connect(({ auth, teacherCourse }) => ({ auth, teacherCourse })),
  withRouter,
  (NewBatch) => ({
    auth,

    ...props
  }) => {
    let [loader, setLoader] = useState(false);

    const [allbatchList, setAllBatchList] = useState([]);
    const [batchTeacher, setBatchTeacher] = useState([]);

    const [allTeacherList, setAllTeacherList] = useState([]);
    // const [batchIdPasstoDeleteModal, setBatchIdPasstoDeleteModal] = useState();

    useEffect(() => {
      getAllBatches();
    }, []);
  

  



    
    // useEffect(() => {
    //   getBatchList();
    // getTeacherList();

    // }, [allbatchList.length > 0]);

    // someArray.find(isNotNullNorUndefined)

    const getBatchList = () => {
     
      console.log("batch list length", allbatchList.length);
      let temp = [];

      let finalCourseModule = [];
      // if (courseList.length > 0) {
      // event.preventDefault();

      allbatchList.forEach((element) => {
        console.log("batchelement", element);

        temp.push({
          id: element._id,
          batchName: element.name,
          courseName: element.course.name,
          teacherName: element.teachers,
          // teacher: element.teacher,
        });
      });

      setAllBatchList([...temp]);
    };

    const getTeacherList = () => {
      console.log("batch teacher list function enhancer", allTeacherList);

      let temp2 = [];

      allbatchList.forEach((element) => {
        console.log("teacher array elements in batch", element);
        element.teachers.forEach((t) => {
          temp2.push({
            teacherId: t.teacherId,
            teacherName: t.name,
          });
        });
      });

      setAllTeacherList([...temp2]);
    };

    console.log("batch list state outside  function", allbatchList);
    console.log("batch teacher list state outside  function", allTeacherList);

    // console.log("batch list eacher name array",allbatchList[0].teacherName);

    const getAllBatches = () => {
      setLoader(true);
      axios
        .get(`${appConfig.host}${urls.getAllBatchList}`)
        .then((result) => {
          console.log("get all batch list ",result.data, result.data.data);

          setAllBatchList(_.cloneDeep(result.data.data.reverse()));
          console.log("batch list get scuessfully");

          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    };


    console.log("batch list function enhancer at 107", allbatchList);
    function clickAlert() {
      // alert("Updated Batch details");

      // setTimeout(getDataOfBatch, 10000);
      getAllBatches();
    }
    return (
      <NewBatch
        {...props}
        {...{
          auth,
          getAllBatches,
          getBatchList,
          allbatchList,
          allTeacherList,
          batchTeacher,
          loader,
          getAllBatches,
          clickAlert,
          batchTeacher
        }}
      />
    );
  }
);

export default enhancer;
