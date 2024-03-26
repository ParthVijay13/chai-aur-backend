import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import JsonWebToken  from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        username:String,
        required:true
        ,unique:true,
        trim:true,
        loewrcase:true,
        index:true
    },
    emal:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        loewrcase:true,   
    },
    fullname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    avatar:{
        type:String,
        required:true,
        
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    }
},{timestamps:true})


userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    JsonWebToken.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    JsonWebToken.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema);