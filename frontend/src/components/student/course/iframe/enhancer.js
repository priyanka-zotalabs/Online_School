import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { withRouter } from "react-router";

export let enhancer = compose(
  connect(({ courseModule, studentCurrentCourse, course }) => ({
    courseModule,
    studentCurrentCourse,
    course,
  })),
  withRouter,
  (VideoPlayer) => ({
    courseModule,
    studentCurrentCourse,
    course,
    ...props
  }) => {
    let { id } = props.match.params;
    let [data, setData] = useState();
    let [loader, setLoader] = useState(true);
    let [moduleData, setModuleData] = useState();
    const [url, setUrl] = useState("");
    const [selected, setSelected] = useState(0);
    const [imageShow, setImageShow] = useState(false);

    useEffect(() => {
      course.filter((course) => {
        course.modules.filter((item) => {
          item.chapters.filter((data) => {
            if (data._id == id) {
              setLoader(false);
              setData(data);
              setModuleData(item);
              handleLink(data.content[0]);
              setImageShow(true);
              // props.module();
              return;
              // return;
            }
          });
        });
      });
    }, [id]);

    const handleLink = (link, contentNumber) => {
      // console.log("link", link, contentNumber);
      setImageShow(false);
      setSelected(contentNumber);
      setUrl(link);
    };

    return (
      <VideoPlayer
        {...props}
        {...{
          data,
          moduleData,
          loader,
          url,
          handleLink,
          studentCurrentCourse,
          selected,
          imageShow,
        }}
      />
    );
  }
);

export default enhancer;
