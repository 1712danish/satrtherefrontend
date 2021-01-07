
import React, { useState } from "react";
import { useHistory } from "react-router-dom"
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

function ResetPass() {
    const [email, setEmail] = useState("")
    const history = useHistory()
    const [status, setStatus] = useState("")
    const [msg, setMessage] = useState("")

    const reset = () => {
        fetch("/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        }).then(res =>
            res.json())
            .then(data => {
                if (data.error) {
                    setStatus("False")
                    setMessage(data.details && data.details.body[0].message || data.error)


                } else {
                    setStatus("True")
                    setMessage(data.message)
                }


            })
        // history.push("/admin/index")


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
                    <large><b>RESET PASSWORD</b></large>
                </div>
                <Form role="form">
                    <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-email-83" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={() => reset()} >
                            Send mail
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

export default ResetPass;
