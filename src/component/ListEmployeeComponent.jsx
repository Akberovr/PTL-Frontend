import React, { Component } from 'react'
import ApiService from "../service/ApiService";

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    render(){
        return (
            <div>
            <h2 className="text-center">User Details</h2>
        
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="hidden">Id</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Emmail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(
                    user =>
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
        );

    }

}

export default ListEmployeeComponent;