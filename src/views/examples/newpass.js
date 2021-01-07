
import React, { useState } from "react";
import {useHistory,useParams} from "react-router-dom"
import Alert from '@material-ui/lab/Alert';



// reactstrap components
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

function NewPass() {

  const [password,setPassword] = useState("");
  const [status, setStatus] = useState("")
  const [msg, setMessage] = useState("")
  const history = useHistory()
  const {token}=useParams();
  console.log(token);

  const changePass =()=>{
    fetch(`/new-password?token=${token}`,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        token,
        password
      })
    }).then(res=>
      res.json()
     
    ).then(data=>{
      console.log(data);
  
      if (data.error) {
        setStatus("False")
        setMessage(data.details && data.details.body[0].message || data.error)


      } else {
        setStatus("True")
        setMessage(data.message)
        window.setTimeout(function(){

            // Move to a new location or you can do something else
            window.location.href = "http://localhost:3000/admin/index";
    
        }, 3000);
        // history.push("/admin/index")

      }
      
    }).catch(err=>{
      console.log(err);
    })

    

  }

  

  
  return (
    
        <Card className="bg-secondary shadow border-0" style={{
          margin: "100px auto",
          textAlign: "center",
          maxWidth: "600px",
          padding: "10px",
        }}>

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <large><b> Set Password</b></large>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-password-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick = {()=> changePass()} >
                  Change Password
                  </Button>
              </div>

              {
                  status != "" ? status == "False" ?
                    <Alert severity="error">{msg}</Alert>
                    : <Alert severity="success">{msg}</Alert>
                    : null


                }

              
            </Form>
          </CardBody>
        </Card>
        
      
    
  );

}

export default NewPass;
