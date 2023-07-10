const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
Tag.findAll({
    include: [
    {
        model: Product,
        through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
    },
    ],
})
    .then((tags) => res.json(tags))
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
});

// get one tag by id
router.get('/:id', (req, res) => {
Tag.findOne({
    where: {
    id: req.params.id,
    },
    include: [
    {
        model: Product,
        through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
    },
    ],
})
    .then((tag) => {
    if (!tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(tag);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
});

// create a new tag
router.post('/', (req, res) => {
Tag.create(req.body)
    .then((tag) => res.json(tag))
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
});

// update a tag's name by id
router.put('/:id', (req, res) => {
Tag.update(req.body, {
    where: {
    id: req.params.id,
    },
})
    .then((tag) => {
    if (!tag[0]) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
});

// delete a tag by id
router.delete('/:id', (req, res) => {
Tag.destroy({
    where: {
    id: req.params.id,
    },
})
    .then((tag) => {
    if (!tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;
