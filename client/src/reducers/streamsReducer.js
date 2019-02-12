import _ from 'lodash';
import { 
    CREATE_STREAM,
    DELETE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    UPDATE_STREAM } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return _.mapKeys(action.payload, 'id');
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, { id: action.payload });
        default:
            return state;
    }
}