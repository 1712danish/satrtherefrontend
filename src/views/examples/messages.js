import React, {useState,useEffect } from "react";
import { useHistory, useParams} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UserHeader from "components/Headers/UserHeader.js";




import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
        margin: '5px 50px',
        
        // padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        witdth: '40%',
        minHeight: '300px',
        padding: '15px',
        marginTop:'0px'

    },
    chatWindow: {
        witdth: '70%',
        minHeight: '300px',
        padding: '25px',
        borderLeft: '1px solid grey'

    },
    chatBox: {
        witdth: '85%'

    },
    button: {
        witdth: '15%',
       

    }
}));



export default function ChatUI() {
    const classes = useStyles();
    const [textValue,changeValue] =  useState('')
    const [data,setData] = useState()
    const [messages,setMessages] =  useState()
    const { id } = useParams();
    // const [consultantID,setID] =  useState()
    const [recieveId,setID] = useState("")
    // const [text, setText] = useState("");


    useEffect(() => {
    
        fetch(`/mssginfo?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          }
        })
          .then(res => res.json())
          .then((result) => {
            setData(result);
            // console.log(result)
          });
        // console.log(userName, email)
    
      }, [])

    


    return (
        <>
        <UserHeader />
        <div className={classes.root}>

            <Paper>
                <Typography variant="h5" component="h3" style={{textAlign:"center",padding:"5px"}} >
                    Chat App
                </Typography>
                <hr />
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            { data&&data[0]?
                                data.map(channel => {
                                    return (
                                        
                                        <ListItem key={channel} button  
                                            onClick={()=>{
                                                setID(channel._id)
                                                fetch(`/messages?id=${id}&to=${channel._id}`,{
                                                    headers: {
                                                      "Content-Type": "application/json",
                                                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                                                    }
                                                  })
                                                    .then(res => res.json())
                                                    .then((result) => {
                                                      setMessages(result);
                                                    //   console.log(result)
                                                    });
                                                  // console.log(userName, email)
                                              
                                                
                                            }}
                                        >
                                            <ListItemText primary={channel.name} />
                                        </ListItem>
                                    )
                                }):null
                            }

                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {messages&&messages[0]?
                            messages.map((message, i) => {
                                return (
                                    <div className={classes.flex} key={i}>
                                        <Chip label={message.to} />
                                        <Typography variant= 'p'>
                                            {message.message}
                                        </Typography>
                                    </div>


                                )
                            })
                            :null
                        }
                    </div>

                </div>
                <div className={classes.flex}>
                    <div className = {classes.chatBox}>
                        <TextField  label="send a chat" color="primary" value={textValue} 
                            onChange={(e) => { changeValue(e.target.value) }} />
                    </div>
                   


                    <Button variant="contained" color="primary" style={{witdh:"700px"}}
                    onClick={() => {
                        fetch('/chat', {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                to: recieveId,
                                from: localStorage.getItem("_id"),
                                message: textValue

                            })

                        }).then((res) =>
                            res.json()).then((data) => {
                                // NotificationManager.info(data.message);
                            })

                            // mssgArr.push(mssg)
                            changeValue("")

                    }

                    
                    }

                    >
                        Send
                    </Button>
                </div>
            </ Paper>
        </div>

    </>
    )
}