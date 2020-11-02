import React, { useEffect, useRef } from "react";
import enhancer from "./enhancer";
import "./style.scss";
import ChatInit from "./chatDemo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Loading from "../../../shared/Components/Loading/index";

const TeacherChatBox = (props) => {
  let {
    auth,
    handleEvent,
    chat,
    activeUser,
    handleMessageSendText,
    newMessage,
    loader,
    studentsList,
    sendMessage
  } = props;

  const dummy = useRef();
  useEffect(() => {
      if (!loader) {
          dummy.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [chat.length]);

  // console.log("Chat data in Index", chat);
  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
          <Grid container >
            <Grid item md={12} xs={12}>
              <div className="msger">
                <header className="msger-header">
                  <div className="msger-header-title">
                    <i className="fas fa-comment-alt"></i> {activeUser.name}
                  </div>
                </header>

                <div className="chatWindow">
                  <div className="all-chats">
                    {/* {console.log(chat)} */}
                    {studentsList && studentsList.map((user, index) => {
                      return (
                        <List key={"studentNameList" + user.name + index}>
                          <ListItem
                            button
                            key={user.name}
                            onClick={(event) => handleEvent(user)}
                          >
                            {/* <ListItemAvatar>
                              <Avatar></Avatar>
                            </ListItemAvatar> */}
                            <ListItemText
                              key={user.name}
                              primary={user.name}
                            />
                          </ListItem>
                        </List>
                      );
                    })}
                  </div>

                  {
                    // chat.map((user) => {
                    <div className="msger-body">
                      {chat && chat.map((eachMessage) => {
                        // console.log("Each Message index", eachMessage);
                        let hr = new Date(eachMessage.date).getHours();
                        let min = new Date(eachMessage.date).getMinutes();
                        if (!eachMessage.isMessageFromTutor) {
                          return (
                            <div className="msg left-msg">
                              <div className="msg-img"></div>

                              <div className="msg-bubble">
                                <div className="msg-info">
                                  <div className="msg-info-name">{eachMessage.name}</div>
                                  <div className="msg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                </div>

                                <div className="msg-text">{eachMessage.message}</div>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className="msg right-msg">
                              <div className="msg-img"></div>
                              <div className="msg-bubble">
                                <div className="msg-info">
                                  <div className="msg-info-name">{eachMessage.name}</div>
                                  <div className="msg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                </div>
                                <div className="msg-text">{eachMessage.message}</div>
                              </div>
                            </div>
                          );
                        }
                      })}
                      <span ref={dummy}></span>
                    </div>
                  }
                </div>

                <form className="msger-inputarea">
                  <input
                    type="text"
                    className="msger-input"
                    placeholder="Enter your message..."
                    onChange={(e) => handleMessageSendText(e.target.value)}
                    value={newMessage}
                  />
                  <button className="msger-send-btn" onClick={(e) => sendMessage(e)}>
                    Send
                </button>
                </form>
              </div>
            </Grid>
          </Grid>
        )}
    </div>
  );
};

export default enhancer(TeacherChatBox);