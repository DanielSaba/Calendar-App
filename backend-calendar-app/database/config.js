const mongoose=require('mongoose');

const dbConection= async ()=>{

    try{
        await mongoose.connect(process.env.DB_CNN, 
        {useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true
    });
    console.log('DB in Line');

    }catch(error){
        console.log('error');
    }
}

module.exports={
    dbConection
}