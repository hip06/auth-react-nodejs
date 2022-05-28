import express from "express";

let router = express.Router()

//init web routes
export const initWebRouter = (app) => {

    router.get('/', (req, res) => {
        return res.send('base BE is succeed!')
    })


    return app.use('/', router)
}