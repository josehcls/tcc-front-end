import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

const SERVICE_URL = 'http://localhost:5000'

export const getBatch = (batchId) =>
trackPromise(
    api({
        url: SERVICE_URL + `/v1/batches/${batchId}`,
        method: 'GET',
        params: {},
    }).then((resp) => {
        return resp.data;
    })
)

export const postBatch = (batch) => 
trackPromise(

    api({
        url: SERVICE_URL + `/v1/batches`,
        method: 'POST',
        data: batch,
    }).then((resp) => {
        return resp.data;
    })
)


export const putBatch = (batchId, batch) => 
trackPromise(
    api({
        url: SERVICE_URL + `/v1/batches/${batchId}`,
        method: 'PUT',
        data: batch,
    }).then((resp) => {
        return resp.data;
    })
)

export const deleteBatch = (batchId) =>
trackPromise(
    api({
        url: SERVICE_URL + `/v1/batches/${batchId}`,
        method: 'DELETE',
    }).then((resp) => {
        return resp.data;
    })
)
