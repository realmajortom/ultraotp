import axios from 'axios';

export default axios.create({
	baseURL: 'http://192.168.1.111:8080/api/doc',
	headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}
});