const Evento=require('../models/Evento');

const getEvento= async (req, res)=>{

    const evento =await Evento.find().populate('user','name');

    res.status(400).json({
        ok:true,
        msg:'get evet',
        evento
    });
}

const crearEvento=async (req, res)=>{
    const evento=new Evento(req.body);
    try{
        evento.user=req.uid;
        const eventoGuardado=await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }

   // res.status(400).json({
   //     ok:true,
   //     msg:'getEvent'
   // })
}


const actualizarEvento= async (req, res)=>{

    const eventoId=req.params.id;
   
    const uid=req.uid;
 
    try{
        const evento=await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Invalido por el id',
                eventoId
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios'
            });
        }

        const nuevoEvento ={
            ...req.body,
            user:uid
        }

        const eventoActualizado= await Evento.findByIdAndUpdate(eventoId, nuevoEvento,{new:true});
        res.json({
            ok:true,
            evento:eventoActualizado 
        });

    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}


const eliminarEvento=async (req, res)=>{

    const eventoId=req.params.id;
    const uid=req.uid;
 
    try{
        const evento=await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Invalido por el id',
                eventoId
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios'
            });
        }

        const eventoEliminado= await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok:true,
            msg:'eliminado con exito',
            eventoEliminado
        });

    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports={
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}

