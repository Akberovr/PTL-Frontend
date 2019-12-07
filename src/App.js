import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companies : []
    };
  }
  componentDidMount(){
    axios.get('http://localhost:8080/companies').then((res) => {
      console.log(res.data.content)
      this.setState({companies: res.data.content})
    }); 
  }
  render(){
      const table = this.state.companies.map((a) => {
       console.log(a.first_name)
        return(        
         
          <tr key = {a.id}>
            <td>{a.first_name}</td>
            <td>{a.last_name}</td>
            <td>{a.email}</td>
            <td>
              <Button color="success" size="sm" className="mr-2"> Edit</Button>
              <Button color="danger" size="sm" className="mr-2"> Delete</Button>
            </td>
          </tr>
 
         

        )
     });
    return (
      <div className= "App container">
        <Table>
          <thead>
            <tr>
            <th>#</th>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </Table>
        
      </div>
    )
  }
}

export default App;