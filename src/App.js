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
      editCompanyData: {
        id: '',
        first_name: '',
        last_name: '',
        email: ''
      },
      newCompanyModel: false,
      ediCompanyModel: false
    };
  }
  componentDidMount(){
    this._refreshCompanies();
  }
  toggleNewCompanyModel(){
    this.setState({
      newCompanyModel: ! this.state.newCompanyModel
    })
  }

  toggleEditCompanyModel(){
    this.setState({
      editCompanyModel: ! this.state.editCompanyModel
    })
  }

  addCompany(){
    axios.post('http://localhost:8080/companies', this.state.newCompanyData).then((response) => {
      let { companies } = this.state;
      companies.push(response.data);
      this.setState({ companies, newCompanyModel:false,newCompanyData: {
        first_name: '',
        last_name: '',
        email: ''
      } })


      console.log(response.data)
    })
  }

  updateCompany(){
    let { first_name , last_name , email } = this.state.editCompanyData;

    axios.put('http://localhost:8080/companies/' + this.state.editCompanyData.id, {
      first_name,last_name,email
    }).then((response) => {
      this._refreshCompanies();

      this.setState({
        editCompanyModel: !this.state.editCompanyModel, editCompanyData: {id: '', first_name: '',last_name: '',email: ''}
      })
    });
  }
  deleteCompany(id){
    axios.delete('http://localhost:8080/companies/'+ id).then((response) => {
      this._refreshCompanies()
    });
  }
  _refreshCompanies(){
    axios.get('http://localhost:8080/companies').then((res) => {
      console.log(res.data.content)
      this.setState({companies: res.data.content})
    });
  }

  editCompany(id,first_name,last_name,email){
      this.setState({
        editCompanyData: {id,first_name,last_name,email},
        editCompanyModel: ! this.state.ediCompanyModel
      });
  }




  render(){
      const table = this.state.companies.map((company) => {
        return(        
         
          <tr key = {company.id}>
            <td>{company.first_name}</td>
            <td>{company.last_name}</td>
            <td>{company.email}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editCompany.bind(this,company.id,company.first_name,company.last_name,company.email)}> Edit</Button>
              <Button color="danger" size="sm" className="mr-2" onClick={this.deleteCompany.bind(this,company.id)}> Delete</Button>
            </td>
          </tr>
 
         

        )
     });
    return (
      <div className= "App container">

          <h1>Partial Truckload Service</h1>



        <Button  className="my-3"color="primary" onClick={this.toggleNewCompanyModel.bind(this)}> Add Company </Button>
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

          {/*  Edit Modal      */}

          <Modal isOpen={this.state.editCompanyModel} toggle={this.toggleEditCompanyModel.bind(this)}>
            <ModalHeader toggle={this.toggleEditCompanyModel.bind(this)}>Edit book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="first_name">Name</Label>
                <Input  name="first_name" id="first_name" value={this.state.editCompanyData.first_name} onChange={(e) => {
                    let {editCompanyData} = this.state;
                    editCompanyData.first_name = e.target.value;
                    this.setState({editCompanyData})
                }} />
                <Label for="last_name">Surname</Label>
                <Input  name="last_name" id="last_name" value={this.state.editCompanyData.last_name} onChange={(e) => {
                    let {editCompanyData} = this.state;
                    editCompanyData.last_name = e.target.value;
                    this.setState({editCompanyData})
                }} />
                <Label for="email">Email</Label>
                <Input  name="email" id="email" value={this.state.editCompanyData.email} onChange={(e) => {
                    let {editCompanyData} = this.state;
                    editCompanyData.email = e.target.value;
                    this.setState({editCompanyData})
                }} />
            </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateCompany.bind(this)}>Update Company</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditCompanyModel.bind(this)}>Cancel</Button>
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