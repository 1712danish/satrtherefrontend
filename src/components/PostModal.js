import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "../components/Loader"
import Alert from '@material-ui/lab/Alert';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function PostModal() {
    const history = useHistory()

    const [post, setPost] = useState("")
    const [postUrl, setPostUrl] = useState("")
    const [postTitle, setTitle] = useState("")
    const [description, setDescription] = useState()
    const [status,setStatus] = useState("")
    const [message,setMssg] = useState("")

    useEffect(() => {
        const ac = new AbortController();
        

        if (postUrl) {
            const signal = ac.signal
            fetch("/userpost", {
                signal: signal,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                    postUrl,
                    postTitle,
                    description

                })
            }).then(res => {
                return res.json()

            }).then(data => {
                // console.log("@@@@@@@",data)

                if (data.error) {
                    setStatus("False")
                    setMssg(data.error+" please login or signup")

                    console.error(data.error)
                } else {
                    setStatus("True")
                    setMssg("Post Successfully Uploaded")
                    console.log("uploaded")


                }
                window.location.reload(false)


                return () => ac.abort();

               
            }).catch(err => {
                console.log(err);
            })

            // setOpen(false)
        }
        return () => ac.abort();


    }, [postUrl])



    function myPost() {
        const Post = new FormData();
        Post.append("file", post);
        Post.append("upload_preset", "userPost");
        Post.append("cloud_name", "danish1712");


        console.log("in here")
        fetch("https://api.cloudinary.com/v1_1/danish1712/image/upload", {
            method: "post",
            body: Post

        }).then(res => {

            // console.log("---->", res)
            return res.json()
        }).then(
            data => {
                // console.log("?????",data.error.message)
                if(data.error){
                    setStatus("False")
                    setMssg(data.error.message)

                }
                setPostUrl(() => data.url)

            }

        ).catch(err => {
            console.log(err);
        })

    }



    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Add Post</h2>
            <FormGroup>
                <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                    </InputGroupAddon>
                    <Input placeholder="Post Title" type="text" onChange={(e) => { setTitle(e.target.value) }} />
                </InputGroup>
            </FormGroup>

            <input type="file" lable="Choose" onChange={(e) => { setPost(e.target.files[0]) }} />

            <FormGroup>
                <label>Post Description</label>
                <Input
                    className="form-control-alternative"
                    onChange={(e) => { setDescription(e.target.value) }}

                    // placeholder={data && data[0] ? data[0].about : null}
                    rows="4"
                    // disabled={flag}

                    type="textarea"
                />
            </FormGroup>


            <Button
                className="float-right"
                color="default"
                href="#pablo"
                onClick={() => {
                    myPost()
                }}
                size="md"
            >
                Save
            </Button>

            {
                  status != "" ? status == "False" ?
                    <Alert severity="error">{message}</Alert>
                    : <Alert severity="success">{message}</Alert>
                    : null


                }


        </div>
    );

    return (
        <div>
            <IconButton color="primary" aria-label="add an alarm" onClick={handleOpen}>
                <Button
                    className="float-center"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                >
                    Add Post
                    </Button>
            </IconButton>
            {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default PostModal