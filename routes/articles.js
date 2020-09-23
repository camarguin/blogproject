// const { render } = require('ejs')
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const articleController = require('../controllers/articleController');
const article = require('./../models/article');

router.use(express.static(__dirname + '/public'))

router.get('/new', articleController.addArticle)

router.get('/edit/:id', articleController.editArticle)

//test
// router.put('/:id', async(req, res, next) => {
//     req.article = await Article.findById(req.params.id)
//     next
// }, addOneLike())


router.get('/:id', articleController.getArticle)

// router.post('/', async (req, res) => {
//     req.article = await Article.findById(req.params.id)
//     let article = req.article
//     article.like = article.like + 1
//     try {
//         article = await article.save()
//         res.render('/')
//     } catch(e) {
//         console.log(e)
//         res.render('/')
//     }
// })

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleRedirect('edit'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
})

router.delete('/:id', articleController.deleteArticle)

function saveArticleRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.author = req.body.author
        article.text = req.body.text
        try {
            article = await article.save()
            res.redirect(`/articles/${article.id}`)
        } catch (e) {
            console.log(e)
            res.render(`articles/${path}`, { article: article })
        }

    }
}

// function addOneLike() {
//     let article = req.article
//     article.like = + 1
//     try {
//         article = await article.save()
//         res.redirect('/')
//     } catch (e) {
//         console.log(e)
//         res.render('/')
//     }
// }

// function addOneDislike() {
//     let article = req.article
//     article.dislike = + 1
//     try {
//         article = await article.save()
//         res.redirect('/')
//     } catch (e) {
//         console.log(e)
//         res.render('/')
//     }
// }

module.exports = router