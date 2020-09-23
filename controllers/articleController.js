const Article = require('../models/article');

exports.deleteArticle = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
}
exports.addArticle = (req, res) => {
    res.render('articles/new', { article: new Article() })
}
exports.editArticle = async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
}
exports.getArticle = async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
}