import express from "express";
import authController from '../controllers/auth.controller'
import authJwt from '../middleware/authJwt'

let router = express.Router()

//init web routes
export const initWebRouter = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })
    router.post('/regester-or-login', authController.regesterAndLogin)
    router.get('/profile-admin', [authJwt.verifyToken, authJwt.isAdmin], authController.getProfileAdmin)

    router.get('/', (req, res) => {
        return res.send('base BE is succeed!')
    })


    return app.use('/', router)
}