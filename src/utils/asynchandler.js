// const asyncHandler = ()=>{

// }

export {asyncHandler}



const asyncHandler = (fn)=>{async(req,res,next)=>{
    try{
        await fn(req,res,next);
    }
    catch(err){
        res.status(errr.code||500).json({
            success: false,
            message:err.message

        })
    }
}}