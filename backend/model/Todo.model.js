import mongoose from 'mongoose';

const TodoSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },completed:{
        type:Boolean,
        default:false
    },user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},{timestamps:true})
const Todo=mongoose.model('Todos',TodoSchema);
export default Todo;