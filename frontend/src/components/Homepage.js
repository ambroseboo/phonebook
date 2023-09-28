import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';


export function Homepage() {
    const [data, setData] = useState(null)

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get('/data')
        .then((response) => {
        const res = response.data
        setData(res)
        }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
    })}
    
    function deleteContact(id) {
        axios.delete('/'+id)
        .then((res) => getData())
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
    })}

  return (
    <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center', width: '80%', margin: 'auto', marginTop: '5rem'}}>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address Field</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { data?.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.address_field}</td>
                    <td><Button href={`/edit/${item.id}`} variant="primary">Edit</Button></td>
                    <td><Button onClick={() => deleteContact(item.id)} variant="danger">Delete</Button></td>
                </tr>
                ))}
            </tbody>
        </Table>
    </div>
  );
}