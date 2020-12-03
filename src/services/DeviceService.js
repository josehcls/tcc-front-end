import api from '../utils/Api';
import { trackPromise } from 'react-promise-tracker';

const SERVICE_URL = 'http://localhost:5000'

export const getDevices = (page, size) =>
trackPromise(
    api({
        url: SERVICE_URL + '/v1/recipes',
        method: 'GET',
        params: {page: page, size: size},
    }).then((resp) => {
        return resp.data;
    })
)
