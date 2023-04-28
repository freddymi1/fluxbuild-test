import axios from "axios";

const apiUrl = "http://universities.hipolabs.com/";


const findAll = async () => {
    const response = await axios.get<any[]>(`${apiUrl}search`);

    return response;
}

const searchByName = async (name: string) => {
    const response = await axios.get<any[]>(`${apiUrl}search?name=${name}`);

    return response;
}

const TestService = {
    findAll,
    searchByName
}
  
export default TestService;
