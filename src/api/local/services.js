import client from "./client";

const getData = (enpoint) => client.get(`${enpoint}`);


export { getData };