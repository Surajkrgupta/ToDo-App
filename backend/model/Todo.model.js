import mongoose from 'mongoose';

const TodoSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const Todo=mongoose.model('Todos',TodoSchema);
export default Todo;