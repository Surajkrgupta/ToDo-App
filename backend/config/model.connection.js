import mongoose from 'mongoose';

export const connectionDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("DB COnnected");
    }catch(err){
        console.log(err);
    }
}