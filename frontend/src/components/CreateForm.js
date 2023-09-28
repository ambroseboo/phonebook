import axios from 'axios';
import {useState} from 'react';
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export function CreateForm() {
    const [state, setState] = useState({name: null, phoneNum: null, addressField: null})

    const navigate = useNavigate(); 

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        axios.post('/create', {
            name: state.name,
            phone_number: state.phoneNum,
            address_field: state.addressField
        }).then((res) => 
            navigate('/')
            )
    }

    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" name="name" placeholder="Enter name" required onChange={handleChange}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="phone_number" name='phoneNum' placeholder="Enter phone number" required onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddressField">
          <Form.Label>Address Field</Form.Label>
          <Form.Control type="address_field" name="addressField" placeholder="Enter address field" required onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
  