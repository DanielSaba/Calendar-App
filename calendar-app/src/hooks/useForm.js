import React, { useState } from 'react';

export const useForm=(initialState={})=>{

const [stateForm, setForm]=useState(initialState);


const handleInputChange=({target})=>{
    setForm({
        ...stateForm,
        [target.name]:target.value
    });
}

return [stateForm, handleInputChange];

}