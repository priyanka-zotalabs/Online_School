import React from "react";
import PropTypes from "prop-types";
import {
  useTheme,
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MaterialTableDemo from "./content/index";
import DiscussionBoard from "./discussionBoard";

const HorizontalColoredTab = withStyles({
  indicator: {
    height: "100%",
    background: "#D0D6F2 ",
    zIndex: 1,
  },
})(Tabs);

const ColoredTab = withStyles((theme) =>
  createStyles({
    root: {
      textTransform: "none",
      display: "block",
      "&:hover": {
        opacity: 1,
      },
      "&$selected": {
        fontWeight: theme.typography.fontWeightMedium,
        color: "black",
        backgroundColor: "#D0D6F2",

        zIndex: 2,
      },
    },

    selected: {},
  })
)((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log("tab", props);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  // console.log("index", index)
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="default">
        <HorizontalColoredTab
          value={value}
          onChange={handleChange}
          // indicatorColor="primary"
          indicator={{ height: "100%", background: "#FFBB80 !important" }}
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* <ColoredTab label="Overview" {...a11yProps(0)} /> */}
          <ColoredTab label="Content" {...a11yProps(1)} />
          <ColoredTab label="Discussion" {...a11yProps(2)} />
        </HorizontalColoredTab>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <MaterialTableDemo {...props} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <DiscussionBoard {...props} />
      </TabPanel>
      {/* </SwipeableViews> */}
    </div>
  );
}

// import React from "react";
// import PropTypes from "prop-types";
// // import SwipeableViews from "react-swipeable-views";
// import {
//   useTheme,
//   makeStyles,
//   withStyles,
//   createStyles,
//   Theme,
// } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import MaterialTableDemo from "./content/index";

// const HorizontalColoredTab = withStyles({
//   indicator: {
//     height: "100%",
//     background: "#eb952d",
//     zIndex: 1,
//   },
// })(Tabs);

// const ColoredTab = withStyles((theme) =>
//   createStyles({
//     root: {
//       textTransform: "none",

//       "&:hover": {
//         opacity: 1,
//       },
//       "&$selected": {
//         fontWeight: theme.typography.fontWeightMedium,
//         color: "black",
//         zIndex: 2,
//       },
//     },
//     selected: {},
//   })
// )((props) => <Tab disableRipple {...props} />);

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     // width: 500,
//   },
// }));

// export default function FullWidthTabs(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" color="default">
//         <HorizontalColoredTab
//           value={value}
//           onChange={handleChange}
//           indicatorColor="primary"
//           indicator={{ height: "100%", background: "#eb952d" }}
//           textColor="primary"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//         >
//           <ColoredTab label="Overview" {...a11yProps(0)} />
//           <ColoredTab label="Content" {...a11yProps(1)} />
//           <ColoredTab label="Discussion" {...a11yProps(2)} />
//         </HorizontalColoredTab>
//       </AppBar>
//       {/* <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       > */}
//       <TabPanel value={value} index={0} dir={theme.direction}>
//         <div>
//           <h2>{props.data.name}</h2>
//           <p>{props.data.description}</p>
//           <hr />

//           <span style={{ fontWeight: "bold" }}>Subject</span>
//           <span style={{ paddingLeft: "25%" }}> Physics</span>
//           <br />
//           <span style={{ fontWeight: "bold" }}>Format</span>
//           <span style={{ paddingLeft: "25%" }}> {props.data.classType}</span>
//           <br />
//           <span style={{ fontWeight: "bold" }}>No of classes</span>
//           <span style={{ paddingLeft: "25%" }}> {props.data.totalClasses}</span>
//           <br />
//           <span style={{ fontWeight: "bold" }}>Thaught by</span>
//           <span style={{ paddingLeft: "25%" }}> Unkonwn</span>
//         </div>
//       </TabPanel>
//       <TabPanel value={value} index={1} dir={theme.direction}>
//         <MaterialTableDemo
//           content={props.topic.content}
//           linkHandle={props.linkHandle}
//         />
//       </TabPanel>
//       <TabPanel value={value} index={2} dir={theme.direction}>
//         Item Three
//       </TabPanel>
//       {/* </SwipeableViews> */}
//     </div>
//   );
// }
