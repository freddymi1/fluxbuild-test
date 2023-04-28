/**
 * @author Freddy Michel <michelfreddy1992@gmail.com>
 * @description file service
 */

import axios from "axios";
import { DataInterface } from "../utils/interface";

const apiUrl = "http://universities.hipolabs.com/";

/**
 * @description fetch all data
 * @returns 
 */
const findAll = async () => {
    const response = await axios.get<DataInterface[]>(`${apiUrl}search`);

    return response;
}

/**
 * @description fetch data by name
 * @param name
 * @returns 
 */

/**
 * 
 */

const searchByName = async (name: string) => {
    const response = await axios.get<any[]>(`${apiUrl}search?name=${name}`);

    return response;
}

const TestService = {
    findAll,
    searchByName
}
  
export default TestService;
