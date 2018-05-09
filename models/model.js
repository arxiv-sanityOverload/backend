const Sequelize = require('sequelize')
const sequelize = require('../db/sql')

const METADATA = sequelize.define('metadata', {
    'arxiv_id': Sequelize.STRING(40),
    'title': Sequelize.TEXT,
    'abstract': Sequelize.TEXT,
    'primary_category': Sequelize.STRING(45),
    'all_categories': Sequelize.TEXT,
    'author': Sequelize.TEXT,
    'last_author': Sequelize.TEXT,
    'authors': Sequelize.TEXT,
    'published': Sequelize.STRING(45),
    'journal_ref': Sequelize.TEXT,
    'comment': Sequelize.TEXT,
    'abs_page_link': Sequelize.STRING(45),
    'pdf_link': Sequelize.STRING(45),
    'feed_title': Sequelize.TEXT,
    'feed_upadted': Sequelize.TEXT,
    'opensearch_totalresults': Sequelize.STRING(45),
    'opensearch_itemsperpage': Sequelize.STRING(45),
    'opensearch_startindex': Sequelize.STRING(45)
},
    {
        timestamps: false
    })

const category = sequelize.define('categ', {
    'category': Sequelize.STRING(45),
    'sub_categories': Sequelize.JSON,
    'category_name': Sequelize.STRING(45)
},
    {
        timestamps: false
    })

module.exports = { METADATA, category }