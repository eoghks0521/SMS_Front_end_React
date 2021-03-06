import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_CUSTOMER = 'customertable/GET_CUSTOMER';
export const GET_CUSTOMER_SUCCESS = 'customertable/GET_CUSTOMER_SUCCESS';
export const GET_CUSTOMER_FAILURE = 'customertable/GET_CUSTOMER_FAILURE';

const DELETE_CUSTOMER = 'customertable/DELETE_CUSTOMER';
const DELETE_CUSTOMER_SUCCESS = 'customertable/DELETE_CUSTOMER_SUCCESS';
const DELETE_CUSTOMER_FAILURE = 'customertable/DELETE_CUSTOMER_FAILURE';

export const getCustList = () => async dispatch => {
    dispatch({ type: GET_CUSTOMER });
    try {
        const res = await api.getCustList();
        console.log("resrersrserserserser", res);
        dispatch({
            type: GET_CUSTOMER_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const deleteCustomer = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_CUSTOMER});
    try{
        console.log("selectedRowKeysselectedRowKeys",selectedRowKeys);
        await api.deleteCustomer(selectedRowKeys);
        dispatch({type: DELETE_CUSTOMER_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_CUSTOMER });
    try {
        const response = await api.getCustList();
        dispatch({
            type: GET_CUSTOMER_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: DELETE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

const initialState = {
    customerList : null,
    loadingTable: false
}

const customertable = handleActions(
    {
        [GET_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CUSTOMER_SUCCESS]: ( state, action ) => ({
            ...state,
            customerList: action.payload,
            loadingTable: false
        }),
        [GET_CUSTOMER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_CUSTOMER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default customertable;