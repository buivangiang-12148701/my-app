import {API, clientAuthentication} from "./base.api";

const getAllCustomer = async () => {
    return await clientAuthentication.get(API.pathCustomer);
}

export {
    getAllCustomer,
}
