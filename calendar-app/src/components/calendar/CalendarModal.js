import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { ui, uiCloseModal } from '../../actions/ui';
import { useSelector } from 'react-redux';
import { eventAddNew, eventClearActiveEvent, eventStartAddNew, eventStartUpdate, eventUpdate } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root');
  //Const de Inicio
  const now=moment().minutes(0).seconds(0).add(1,'hours');

  //Const de Fin
  const now2=now.clone().add(1,'hours');

  const initEvent = {
    title:'',
    notes:'',
    start:now.toDate(),
    end:now2.toDate()
  }

export const CalendarModal=()=>{
    
    const dispatch=useDispatch();

    const{modalOpen} =useSelector(state=>state.ui);

    const{activeEvent} =useSelector(state=>state.calendar);

    //useState INICIO
    const [dateStart, setdateStart]=useState(now.toDate());

    //useState FIN
    const [dateEnd, setdateEnd]=useState(now2.toDate());

    //useState Valided
    const [titleValid, setTitleValid]=useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const {notes, title, start, end}=formValues;

    useEffect(()=>{
        if(activeEvent){
            setFormValues(activeEvent);
        }else{
            setFormValues(initEvent);
        }
    },[activeEvent, setFormValues]);

    const handleInputChange=({target})=>{
        setFormValues({
            ...formValues,
            [target.name]:target.value
        });
    }

    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);

    }

    const handleStartDateChange =(e)=>{
        setdateStart(e);
        setFormValues({
            ...formValues,
            start:e
        })
    }

    const handleEndDateChange =(e)=>{
        setdateEnd(e);
        setFormValues({
            ...formValues,
            end:e
        });
    }

   

    const handleFormSubmit=(e)=>{
            e.preventDefault();
            console.log(formValues);

            const momentStart=moment(start);
            const momentEnd=moment(end);

            if(title.trim().length<2){
                return setTitleValid(false);
            }
            setTitleValid(true);

            if(activeEvent){
                dispatch(eventStartUpdate(formValues));
            }else{
                dispatch(eventStartAddNew(formValues));
            }

            closeModal();
    }

    return(
        <div>
            <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            contentLabel="Example Modal"
            >
            <h1> {activeEvent ? 'Editar Evento ': 'Nuevo Evento'} </h1>
            <hr />
            <form className="container"
                    onSubmit={handleFormSubmit}
            
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}   
                        className= "form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}   
                        minDate={dateStart}
                        className= "form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>
                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        value={notes}
                        onChange={handleInputChange}
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>

            </Modal>
        </div>
    )
}