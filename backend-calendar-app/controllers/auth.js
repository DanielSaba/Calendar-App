const Usuario=require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const crearUsuario=async (req,res)=>{

    const {name, email, password}=req.body;
    
    try{
        let usuario=await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'ya existe email'
            });
        }

        usuario=new Usuario(req.body);
        //bcrypt
        const  salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Almacenamiento en BD
        await usuario.save();

        //generar token

        const token=await generarJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            msg:'new',
            token
        });
    }catch(error){
        res.status(400).json({
            ok:false,
            msg:'Hablar con el admin'
        });
    }
    
};

const loginUsuario = async (req,res)=>{

    const {email, password} = req.body;

    try{
        let usuario=await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'no se encuentra registrado'
            });
        }
       
        //Confirmar Password
        const validPassword=bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña invalida'
            })
        }

           //generar token
           const token=await generarJWT(usuario.id, usuario.name);

        res.status(200).json({
            ok:true,
            msg:'Se encuentra registrado',
            uid:usuario.password,
            name:usuario.name,
            token
        });

    }catch(error){
        res.status(400).json({
            ok:false,
            msg:'Hablar con el admin'
        });
    }

    
};

const revalidarToken =async  (req, res)=>{

    const {uid, name}=req;

    const token=await generarJWT(uid, name);

    res.json({
        ok:true,
        token,
        uid,
        name,
        msg:'renew'
    });
}

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}