import mongoose from 'mongoose';

export const connectionDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("DB COnnected Succefully");
    }catch(err){
        console.log("DB Connection Error",err);
    }
}