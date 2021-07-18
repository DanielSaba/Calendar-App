const {Router}=require('express');
const {validarJWT}=require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos');
const {isDate}=require('../helpers/isDate');

const router=Router();

const {getEvento}=require('../controllers/events');
const {crearEvento}=require('../controllers/events');
const {actualizarEvento}=require('../controllers/events');
const {eliminarEvento}=require('../controllers/events');

router.get('/',validarJWT,getEvento);

router.post('/',
[
    check('title','titulo obligatorio').not().isEmpty(),
    check('start','Fecha de Inicio Obligatorio').custom(isDate),
    check('end','Fecha de Fin Obligatorio').custom(isDate),
    validarCampos
]
,validarJWT,crearEvento);

router.put('/:id',validarJWT,actualizarEvento);

router.delete('/:id',validarJWT,eliminarEvento);



module.exports=router;