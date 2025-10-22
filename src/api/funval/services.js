import client from "./client";

const getFunval = (endpoint, config = {}) => client.get(endpoint, config);
const postFunval = (endpoint, body, config = {}) => client.post(endpoint, body, config);
const putFunval = (endpoint, body, config = {}) => client.put(endpoint, body, config);
const patchFunval = (endpoint, body, config = {}) => client.patch(endpoint, body, config);
const deleteFunval = (endpoint, config = {}) => client.delete(endpoint, config);

export { getFunval, postFunval, putFunval, patchFunval, deleteFunval };
