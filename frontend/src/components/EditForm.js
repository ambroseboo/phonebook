import axios from 'axios';
import {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';


export function EditForm() {
    const [state, setState] = useState({})

    const navigate = useNavigate(); 
    const params = useParams();

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        axios.get(`/edit/${params.id}`)
        .then((response) => {
            const res = response.data
            setState(res)
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                }
            })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        axios.post(`/edit/${params.id}`, {
            name: state.name,
            phone_number: state.phone_number,
            address_field: state.address_field
        }).then((res) => 
            navigate('/')
            )
    }

    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" name="name" placeholder="Enter name" required onChange={handleChange} value={state ? state['name'] : ''}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="phone_number" name='phone_number' placeholder="Enter phone number" required onChange={handleChange} value={state ? state['phone_number'] : ''}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddressField">
          <Form.Label>Address Field</Form.Label>
          <Form.Control type="address_field" name="address_field" placeholder="Enter address field" required onChange={handleChange} value={state ? state['address_field'] : ''}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
  