import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

export const getBatch = (batchId) =>
trackPromise(
    api({
        url: `http://127.0.0.1:8082/batch-service/v1/batches/${batchId}`,
        method: 'GET',
        params: {},
    }).then((resp) => {
        return resp.data;
    })
)

export const postBatch = (batch) => 
trackPromise(
    api({
        url: `http://127.0.0.1:8082/batch-service/v1/batches`,
        method: 'POST',
        data: batch,
    }).then((resp) => {
        return resp.data;
    })
)


export const putBatch = (batchId, batch) => 
trackPromise(
    api({
        url: `http://127.0.0.1:8082/batch-service/v1/batches/${batchId}`,
        method: 'PUT',
        data: batch,
    }).then((resp) => {
        return resp.data;
    })
)

export const deleteBatch = (batchId) =>
trackPromise(
    api({
        url: `http://127.0.0.1:8082/batch-service/v1/batches/${batchId}`,
        method: 'DELETE',
    }).then((resp) => {
        return resp.data;
    })
)
