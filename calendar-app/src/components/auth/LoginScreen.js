import React from 'react';
import './login.css';
import {useForm} from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { auth, startRegister } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch=useDispatch();

    const [formLogin, handleInputChangeForm]=useForm({
        correo:'danielantoniowww@gmail.com',
        Rpassword:'Daniel2021'
    });

    const [formRegister, registerInputChange]=useForm({

        lname:'',
        email:'',
        password:''
        
    })

    //Datos register
    const {lname,email,password}=formRegister;

    //Datos Login
    const {correo, Rpassword}=formLogin;

    const handleClick=(e)=>{
        e.preventDefault();
        dispatch(auth(correo,Rpassword));
    }

    const hanledRegiste=(e)=>{
        e.preventDefault();
        console.log(formRegister);
        dispatch(startRegister(lname,email, password));
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form 
                        onSubmit={handleClick}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="correo"
                                name="correo"
                                value={correo}
                                onChange={handleInputChangeForm}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="Rpassword"
                                value={Rpassword}
                                onChange={handleInputChangeForm}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={
                        hanledRegiste
                    }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="lname"
                                value={lname}
                                onChange={registerInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={registerInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="password"
                                value={password}
                                onChange={registerInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}