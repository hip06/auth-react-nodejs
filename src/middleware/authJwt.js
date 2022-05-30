import jwt from 'jsonwebtoken'
import config from '../config/auth.config'
import db from '../models/index'

let verifyToken = (req, res, next) => {
    // console.log(req.query);
    if (!req.query || !req.query.userId) return res.status(200).json({
        err: 2,
        msg: 'UserId is not provided'
    })
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(200).json({
            err: 1,
            msg: 'Token is not provided'
        })
    }
    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(200).send({
                err: 2,
                msg: `Unauthorized: ${err}`
            })
        }
        req.query.userId = decoded.id
        next()
    })
}
let isAdmin = async (req, res, next) => {
    let response = await db.User.findOne({
        where: { id: req.query.userId },
        raw: true
    })
    if (response && response.role === 'ADMIN') {
        next()
        return
    } else {
        return res.status(200).json({
            err: 5,
            msg: 'Required role Admin'
        })
    }
}
let isMod = async (req, res, next) => {
    let response = await db.User.findOne({
        where: { id: req.query.userId },
        raw: true
    })
    if (response && response.role === 'MOD') {
        next()
        return
    } else {
        return res.status(200).json({
            err: 5,
            msg: 'Required role Moderator'
        })
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isMod
}