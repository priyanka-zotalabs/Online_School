import React, { useState, useEffect } from 'react'
import enhancer from './enhancer'
import "./style.scss";
import ForumInit from "./discussionDemo"
import moment from "moment";
//Flag Self/Other (Optional)
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const DiscussionBoard = (props) => {
    let {
        auth,
        handleEvent,
        forum,
        activeUser,
        teacherCurrentCourse,
        teacherModule,
        // handleMessageSendText,
        // handleSendMessage,
        // newMessage,
        sendMessage,
        loader,
        courseid,
        moduleid,
        chapterid,
        contentid,
        allMessages,
        newMessage,
        handleMessageSendText,
        getDiscussionData,
        temp,
        contentName,
        batchList,
        handleBatchChange,
        selectedBatch,

    } = props;

    return (
        <>
            <div className="msger">
                <FormControl variant="filled" className="selectedBatch" style={{ fontSize: "12px" }}>
                    <InputLabel id="demo-simple-select-outlined-label"  style={{ fontSize: "12px" }}>Batch</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedBatch}
                        onChange={handleBatchChange}
                        style={{ fontSize: "12px" }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {batchList.map((eachBatch, index) => <MenuItem value={eachBatch.id} key={eachBatch.id}>{eachBatch.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <header className="msger-header">
                    <div className="msger-header-title">
                        <i className="fas fa-comment-alt"></i> {contentName}
                    </div>
                </header>

                {/* message from self or other flag required */}

                <div className="discussion-board">

                    {allMessages ? allMessages.map(eachMessage => {
                        let message = eachMessage.message;
                        // let name = eachMessage.senderDetails.name;
                        // let type = eachMessage.senderDetails.type;
                        let type = eachMessage.senderDetails ? eachMessage.senderDetails.type : "Server Error";
                        let name = eachMessage.senderDetails ? eachMessage.senderDetails.name : "Server Error";

                        { console.log("Length ", allMessages.length) }
                        if (type === "Teacher") {
                            return (
                                <div className="msg left-msg" key={eachMessage.date}>
                                    <div className="msg-img" style={{ width: "25px", height: "25px" }}></div>


                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                            <div className="msg-info-name">{name}</div>
                                            <div className="msg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                        </div>

                                        <div className="msg-text">{message}</div>
                                    </div>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className="msg right-msg" key={eachMessage.date}>
                                    <div className="msg-img" style={{ width: "25px", height: "25px" }}></div>

                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                            <div className="msg-info-name">{name}</div>
                                            <div className="msg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                        </div>
                                        <div className="msg-text">{message}</div>
                                    </div>
                                </div>
                            );
                        }
                    }) : null}
                </div>

                <form className="msger-inputarea">
                    <input type="text" id="messageInput" className="msger-input" placeholder="Enter your message..." onChange={(e) => handleMessageSendText(e.target.value)} value={newMessage}
                        value={newMessage} />
                    <button type="submit" className="msger-send-btn" onClick={(e) => sendMessage(e)}>Send</button>
                </form>
            </div>
        </>
    )

}

export default enhancer(DiscussionBoard);