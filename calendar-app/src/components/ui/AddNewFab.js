import React from 'react';
import { useDispatch } from 'react-redux';
import { ui } from '../../actions/ui';

export const AddNewFab=()=>{

    const dispatch=useDispatch();

    const activeModal=()=>{
        dispatch(ui());
    }

    return(
        <div>
            <button
                className="btn btn-primary fab"
                onClick={activeModal}
            >
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
    
}
