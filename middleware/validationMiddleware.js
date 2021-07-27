module.exports = (req,res,next)=>{
    if(req.body.title == '' || req.body.body == '' ||  req.files == null){
    return res.redirect('/posts/new')
    }
    next()
}