const express = require('express');
const app = express.Router();
const taskModel = require('../models/task');
const { StatusCodes } = require('http-status-codes');

app.get('/', (req, res, next) => {
    taskModel
        .getList()
        .then((tasks) =>
            res
                .status(StatusCodes.OK)
                .json({ success: true, errors: [], data: tasks })
        )
        .catch(next);
})
    .get('/:id', (req, res, next) => {
        taskModel
            .get(req.params.id)
            .then((task) =>
                res
                    .status(StatusCodes.OK)
                    .json({ success: true, errors: [], data: task })
            )
            .catch(next);
    })
    .post('/', (req, res, next) => {
        taskModel
            .create(req.body)
            .then((task) =>
                res
                    .status(StatusCodes.CREATED)
                    .json({ success: true, errors: [], data: task })
            )
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        taskModel
            .remove(req.params.id)
            .then(() =>
                res
                    .status(StatusCodes.OK)
                    .send({ success: true, errors: [], data: task })
            )
            .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        taskModel
            .update(req.params.id, req.body)
            .then((task) =>
                res
                    .status(StatusCodes.OK)
                    .json({ success: true, errors: [], data: task })
            )
            .catch(next);
    })
    .post('/seed', (req, res, next) => {
        taskModel
            .seed()
            .then((task) =>
                res
                    .status(StatusCodes.CREATED)
                    .json({ success: true, errors: [], data: task })
            )
            .catch(next);
    });

module.exports = app;
