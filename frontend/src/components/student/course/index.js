import React from "react";
import SideNavBar from "../../../shared/Components/sideNavBar/index";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MyCourse from "./courseList/index";
import ModuleView from "./module/index";
import Iframe from "./iframe/index";

const StudentCourse = (props) => {
  return (
    // <Container>
    <div>
      <div>
        <SideNavBar role={props.code} module={props.module} />
      </div>
      <Row>
        <Col md={{ span: "12" }}>
          <Switch>
            <Route
              exact
              strict
              path="/student/myCourses"
              component={MyCourse}
            />
            <Route
              exact
              strict
              path="/student/myCourses/modules/:id"
              component={ModuleView}
            />
            <Route
              exact
              strict
              path="/student/myCourses/modules/chapter/:id"
              component={Iframe}
            />
            <Redirect to="/student/myCourses" />
          </Switch>
        </Col>
      </Row>
      </div>
    // </Container>
  );
};

export default StudentCourse;
