import mongoose from "mongoose";

const bookSchema=new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        author:{
            type: String,
            
        },
        genre:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Genre"
        },
   
       
    }
)
export const Books=mongoose.model("Books",bookSchema)