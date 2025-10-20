import client from "./client";

const getFunval = (endpoint, config = {}) => client.get(endpoint, config);
const postFunval = (endpoint, body, config = {}) => client.post(endpoint, body, config);
const updateFunval = (endpoint, body, config = {}) => client.patch(endpoint, body, config);
const deleteFunval = (endpoint, config = {}) => client.delete(endpoint, config);

export { getFunval, postFunval, updateFunval, deleteFunval };
