module.exports = (req, res) =>{
    if (req.session.userId) {
        return res.render('create', {
            create: true
        });
    }
    res.redirect('/auth/login')
}