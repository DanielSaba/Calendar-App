const { Router } = require('express');
const {check} = require('express-validator');
const {validarJWT}=require('../middlewares/validar-jwt');

const router=Router();

const {crearUsuario}=require('../controllers/auth');
const {loginUsuario}=require('../controllers/auth');
const {revalidarToken}=require('../controllers/auth');

const {validarCampos} =require('../middlewares/validar-campos');

router.post(
    '/new',
    [
        check('name','nombre obligatorio').not().isEmpty(),
        check('email','El email obligatorio').isEmail(),
        check('password','Debe de ser 5 caracteres como minimo').isLength({min:5}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email','imail obligatorio').isEmail(),
        check('password','password oblogatorio').isLength({min:5}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',validarJWT,revalidarToken);

module.exports=router