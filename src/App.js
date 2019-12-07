import React, { Component } from 'react';
import { Table,FormGroup,Input ,Label, Modal, ModalHeader,ModalBody,ModalFooter, Button } from 'reactstrap'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companies : [],
      newCompanyData: {
        first_name: '',
        last_name: '',
        email: ''
      },
      newCompanyModel: false
    };
  }
  componentDidMount(){
    axios.get('http://localhost:8080/companies').then((res) => {
      console.log(res.data.content)
      this.setState({companies: res.data.content})
    }); 
  }
  toggleNewCompanyModel(){
    this.setState({
      newCompanyModel: ! this.state.newCompanyModel
    })
  }

  addCompany(){
    axios.post('http://localhost:8080/companies', this.state.newCompanyData).then((response) => {
      console.log(response.data)
    })
  }
  render(){
      const table = this.state.companies.map((a) => {
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
        <Button color="primary" onClick={this.toggleNewCompanyModel.bind(this)}> Add Company </Button>
          <Modal isOpen={this.state.newCompanyModel} toggle={this.toggleNewCompanyModel.bind(this)}>
            <ModalHeader toggle={this.toggleNewCompanyModel.bind(this)}>Modal title</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="first_name">Name</Label>
                <Input  name="first_name" id="first_name" value={this.state.newCompanyData.first_name} onChange={(e) => {
                    let {newCompanyData} = this.state;
                    newCompanyData.first_name = e.target.value;
                    this.setState({newCompanyData})
                }} />
                <Label for="last_name">Surname</Label>
                <Input  name="last_name" id="last_name" value={this.state.newCompanyData.last_name} onChange={(e) => {
                    let {newCompanyData} = this.state;
                    newCompanyData.last_name = e.target.value;
                    this.setState({newCompanyData})
                }} />
                <Label for="email">Email</Label>
                <Input  name="email" id="email" value={this.state.newCompanyData.email} onChange={(e) => {
                    let {newCompanyData} = this.state;
                    newCompanyData.email = e.target.value;
                    this.setState({newCompanyData})
                }} />
            </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addCompany.bind(this)}>Add Company</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewCompanyModel.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
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