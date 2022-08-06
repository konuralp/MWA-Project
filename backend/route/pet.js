const express = require('express');
const { get_all_pets } = require('../controller/pet');
const { verify_toke } = require('../middleware/verify_token');

const router = express.Router();

router.get('/search', verify_toke, get_all_pets);

// router.get('/:id', getTodoById)

// router.post('/', postTodo)

// router.put('/:id', updateTodo)

// router.patch('/:id', toggleTodoCompleted)

// router.delete('/:id', deleteTodo)

module.exports = router;
