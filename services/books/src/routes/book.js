const express = require('express');
const router = express.Router();
const request = require('request-promise');

// connect to db
const bookModel = require('../db/fake-model');
// authentication helper functions
const routeHelpers = require('./_fakehelpers');

// ==== define book service routes ============

/**
 * Test connection
 */
router.get('/ping', (req, res) => {
  res.send('pong');
});

/**
 * List all books (no need to authenticate)
 */
router.get('/', (req, res, next) => {
  return bookModel.getAll().then(data => {
    // call to category model to change cate id to cate name
    bookModel.getCategoryName(data).then(data => {
      // call user service to get authors data

      // 
      res.status(200).json({
        status: 'success',
        data: data
      })
    })
  }).catch(err => {
    return next(err);
  })
})

/**
 * Get book detail by id (no need to authenticate)
 */
router.get('/:alias', (req, res, next) => {
  return bookModel.getBookByAlias(req.params.alias).then(data => {
    res.status(200).json({
      status: 'success',
      data: data
    })
  }).catch(err => {
    return next(err);
  })
})

/**
 * Get books detail by category (no need to authenticate)
 */
router.get('/category/:categoryId', (req, res, next) => {
  return bookModel.getBookByCategory(req.params.categoryId).then(data => {
    res.status(200).json({
      status: 'success',
      data: data
    })
  }).catch(err => {
    return next(err);
  })
})

/**
 * Search book
 */

/**
 * Create a new book (authenticate that an user is logged in)
 */
router.post('/', routeHelpers.ensureAuthenticated, (req, res, next) => {
  // receive user_id from users service
  req.body.author_id = req.user;
  return bookModel.createBook(req.body).then(data => {
    res.status(200).json({
      status: 'success',
      data: data
    })
  }).catch(err => {
    return next(err);
  })
})

/**
 * Update a book (authenticate that an user is logged in)
 * send jwt token from user front page to routeHelpers.ensureAuthenticated
 * this middleware will call to users service to authenticate and receive the user id
 */
router.put('/:id', routeHelpers.ensureAuthenticated, (req, res, next) => {
  // receive user_id from users service
  req.body.author_id = req.user;
  return bookModel.updateBook(req.user, req.params.id, req.body.updateData).then(data => {
    res.status(200).json({
      status: 'success',
      data: data
    })
  }).catch(err => {
    return next(err);
  })
})

/**
 * Delete a book (authenticate that an user is logged in)
 */
router.delete('/:id', routeHelpers.ensureAuthenticated, (req, res, next) => {
  // receive user_id from users service
  req.body.author_id = req.user;
  return bookModel.deleteBook(req.user, req.params.id).then(data => {
    res.status(200).json({
      status: 'success',
      data: data
    })
  }).catch(err => {
    return next(err);
  })
})

module.exports = router;