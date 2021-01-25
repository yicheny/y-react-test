import axios from 'axios';

export default function testMockAxios(url){
    return axios.get(url);
}
