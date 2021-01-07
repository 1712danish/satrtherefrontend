import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"

// import io from "socket.io-client";

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
import AuthNavbar from "components/Navbars/AuthNavbar";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from "@material-ui/core";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// const SOCKET_IO_URL = "http://localhost:5000";
// const socket = io(SOCKET_IO_URL);

var mssgArr = []

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

function Chat() {



    const [mssg, setMssg] = useState("");
    const { id } = useParams();
    const classes = useStyles();


    
    return (
        <>
            <AuthNavbar />
            <Card variant="outlined" style={{ margin: "100px" }}>
                <List style={{ padding: "100px" }}>
                    {
                        mssgArr.map((value) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.purple}>
                                            
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
                                    res.json()).then((data) => {
                                        NotificationManager.info(data.message);
                                    })

                                    mssgArr.push(mssg)
                                    setMssg("")

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