import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"

import io from "socket.io-client";

import {

    Button,

    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from "@material-ui/core";
const SOCKET_IO_URL = "http://localhost:5000";
const socket = io(SOCKET_IO_URL);


function Chat() {
    const [initialized, setInitialized] = useState(false);
    const [mssg, setMssg] = useState("");
    const { id } = useParams();

    const connectToRoom = () => {
        console.log("---------id", localStorage.getItem("_id"))
        socket.emit("join", {
            id: localStorage.getItem("_id")
        });

        socket.on("newMessage", data => {
            console.log("hi recieved a new message", data)
        });
        setInitialized(true);
    };
    useEffect(() => {
        if (!initialized) {
            connectToRoom();
        }
    });

    var mssgArr = []
    mssgArr.push(mssg)
    return (
        <>
            <Card variant="outlined" style={{ margin: "100px" }}>
                <List style={{ padding: "100px" }}>
                    {
                        mssgArr.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>{value}</ListItemText>
                                </ListItem>
                            )

                        })
                    }

                </List>
                <Row style={{ margin: "20px" }}>
                    <Col>
                        <Input
                            placeholder="Type...."
                            type="text"
                            value={mssg}
                            onChange={(e) => { setMssg(e.target.value) }}
                        />
                    </Col>
                    <Col>
                        <Button
                            onClick={() => {
                                fetch('/chat', {
                                    method: "post",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        to: id,
                                        from: localStorage.getItem("_id"),
                                        message: mssg

                                    })

                                }).then((res) =>
                                res.json()).then((data)=>{
                                    
                                })

                                // setMssg("")

                            }

                        }
                        >
                            Send
                </Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
}



export default Chat