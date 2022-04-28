const Product = require('../models/Product');
const express = require('express');
const redis = require('redis');

const searchRoute = express.Router()


searchRoute.use(express.json())

const client = redis.createClient({
    host: 'localhost',
    port: 5000,
    password: 'airshopredit'
});


client.connect()


client.on('error', (err)=>{
    console.log(`[REDIS] ${err}`);
})


client.on('connect', ()=>{
    console.log(`[REDIS] redis connected!`)
})


searchRoute.post('/search', async (req, res) => {
    try {
      console.log(req.body.query)
        if (!req.body.query) {
            res.sendStatus(400);
            return;
        }
        let cache = await client.get(req.body.query);
        if(cache)
        {   
            console.log('redis cace found!');
            console.log(`redis cache ${cache}`);
            res.status(200).json(JSON.parse(cache));
            return;
        }


        let results;
        results = await Product.aggregate([{
            $search: {
                index: 'auto',
                autocomplete: {
                    query: req.query.q,
                    path: 'name'
                },
            }
        },
        {
            $project: {
                name: 1,
                __id: 1
            }
        },
        {
            $limit: 10
        }
        ])

        if (results.length) {
            let temp = JSON.stringify(results);
            console.log('Setting up the cache!');
            client.set(req.query.q, temp); //don't wait for the return
            res.status(200).json(results);
        }
        else {
            res.status(404).json([]);// don't change
        }
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error ${error}` })
    }
})


module.exports = searchRoute;
