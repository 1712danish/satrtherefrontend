import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import {Button} from "reactstrap"
import { usePromiseTracker, trackPromise } from "react-promise-tracker";


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

function SimpleModal(){
    const history = useHistory()

    const [image,setImage] = useState("")
    // const [imageUrl, setImageUrl] = useState("")





     function myPic() {
        const profilePic = new FormData();
        profilePic.append("file", image);
        profilePic.append("upload_preset", "learnerConsultant");
        profilePic.append("cloud_name", "danish1712");
    
    
       console.log("in here")
         fetch("https://api.cloudinary.com/v1_1/danish1712/image/upload", {
            method: "post",
            body: profilePic
    
          }).then(res =>{

          console.log("---->",res)
            return res.json()
        }).then(

              data => {
                console.log("--1-->",data,typeof data,data.url)

                // setImageUrl(data.url)
                // console.log("ppppppp",imageUrl ,data.url)

                //profile API

                fetch("/profile", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                    body: JSON.stringify({
                      imageUrl: (data.url != "" ? data.url : undefined)
                    })
                  }).then(res =>
                    res.json()
              
                  ).then(data => {
                    console.log()
                    // console.log(data);
                    // console.log(image)
              
                    if (data.error) {
                      console.error(data.error)
                    } else {
              
                    }
              
              
              
                  }).catch(err => {
                    console.log(err);
                  })



                setOpen(false)

                history.push("/admin/user-profile")
                window.location.reload(false);


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
            <h2 id="simple-modal-title">Choose a Profile Picture</h2>
            <input type="file" lable="Choose"  onChange={(e)=>{setImage(e.target.files[0])}}/>

            <Button
                className="float-right"
                color="default"
                href="#pablo"
                onClick={()=>{myPic() }}
                size="md"
            >
                Save
            </Button>


        </div>
    );

    return (
        <div>
            <IconButton color="primary" aria-label="add an alarm" onClick={handleOpen}> <PhotoCamera /> </IconButton>
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

export default SimpleModal