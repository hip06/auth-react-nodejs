import db from '../models/index'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.config'


let regesterOrLoginService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (body && body.type === 'regester') {
                if (!body.username || !body.email || !body.password) resolve({ err: 2.2, msg: 'Missing input !' })
                let response = await db.User.findOrCreate({
                    where: { username: body.username },
                    defaults: {
                        username: body.username,
                        email: body.email,
                        password: body.password,
                        role: body.role ? body.role : 'USER'
                    }
                })
                response ? resolve({ err: 0, msg: 'OK', user: response }) : resolve({ err: 3, msg: 'Fail to create user' })
            } else
                if (body && body.type === 'login') {
                    if (!body.username || !body.password) resolve({ err: 2.2, msg: 'Missing input !' })
                    let response = await db.User.findOne({
                        where: { username: body.username, password: body.password },
                        raw: true
                    })
                    if (response) {
                        let token = jwt.sign({ id: response.id }, authConfig.secretKey, { expiresIn: 86400 }) // genarate token when login succeed
                        resolve({
                            err: 0,
                            msg: 'Login is succeed !',
                            user: {
                                ...response,
                                accessToken: token
                            }
                        })
                    } else {
                        resolve({ err: 3, msg: 'Fail to login' })
                    }
                }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    regesterOrLoginService
}