const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

// Get a single tag by its id
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, { include: Product });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});

// Create a new tag
router.post('./api/tags', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create tag' });
  }
});

// Update a tag by its id
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    const updatedTag = await Tag.findByPk(req.params.id);
    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update tag' });
  }
});

// Delete a tag by its id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
