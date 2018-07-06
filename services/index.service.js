'use strict'

const URI = require('../config/uri')
const models = require('../models/model')
const sequelize = require('../db/sql')
const Sequelize = require('sequelize')

const getIndex = (req) => {
    let requestObject = URI.getIndex
    const result = "Success"
    req.log.info({ result }, "[index.service-getIndex] requestCommand : " + requestObject.endpoint)
    return Promise.resolve(result)
}

const getUsers = (req, id) => {
    // db operations
    x.findById(id, (err, response) => {
        if (err) {
            return Promise.reject(err)
        }
        return Promise.resolve(response)
    })
}


const getCategoryRecents = (req, limit, offset) => {
    let categ = req.params.category
    return new Promise((resolve, reject) => {
        models.METADATA.findAll({
            attributes: ['arxiv_id', 'title', 'abstract', 'primary_category', 'all_categories', 'author', 'last_author', 'authors', 'published', 'journal_ref', 'comment', 'abs_page_link', 'pdf_link'],
            where: { primary_category: { $like: categ + '%' } },
            order: [['published', 'DESC']],
            limit: limit,
            offset: offset
        })
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const getSubCategoryRecents = (req, limit, offset) => {
    let categ = req.params.subcategory
    return new Promise((resolve, reject) => {
        models.METADATA.findAll({
            attributes: ['arxiv_id', 'title', 'abstract', 'primary_category', 'all_categories', 'author', 'last_author', 'authors', 'published', 'journal_ref', 'comment', 'abs_page_link', 'pdf_link'],
            where: { primary_category: categ },
            order: [['published', 'DESC']],
            limit: limit,
            offset: offset
        })
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    getIndex,
    getUsers,
    getCategories,
    getSubCategories,
    getCategoryRecents,
    getSubCategoryRecents
}