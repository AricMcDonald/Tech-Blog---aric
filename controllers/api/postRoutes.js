const router = require('express').Router();
const req = require('express/lib/request');
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPosrData => res.json(dbPosrData))
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPosrData => res.json(dbPosrData))
    .catch(err => {
        res.status(500).json(err);
    })
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(dbPosrData => res.json(dbPosrData))
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPosrData => {
        if(!dbPosrData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.json(dbPosrData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPosrData => {
        if(!dbPosrData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.json(dbPosrData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;