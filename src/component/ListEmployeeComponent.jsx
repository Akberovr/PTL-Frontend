import React, { Component } from 'react'
import ApiService from "../service/ApiService";

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        //this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList=() => {
        ApiService.fetchUsers()
        .then((res) => {
            console.log(res.data);
            this.setState({ users: res.data })
        });
    }

    render(){
        return (
            <div>
            <h2 className="text-center">User Details</h2>
        
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th>FirstName</th>
                        <th>FirstName</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(
                            user=>
                            <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
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