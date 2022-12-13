import axios from "axios";


export const getAppConfiguration = async( appId: string) => {

    let responseData;
    try {
        responseData = await axios({
            method: 'GET',
            url: "../configuration.json"
        });
    } catch (err) {
        console.error(err);
    }
    
    return responseData;
}