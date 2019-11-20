import axios from 'axios';

const USER_API_BASE_URL = 'localhost:8080/ptl/api/employees/all';

class ApiService{
    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }
}

export default new ApiService();    