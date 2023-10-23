// untuk memformat result agar lebih bagus

const response = (statusCode,data,message,res) => {
    res.status(statusCode).json({
        payload:data,
        message,
        pagination:{
            prev:"",
            next:"",
            max:""
        }
    })
}

module.exports = response