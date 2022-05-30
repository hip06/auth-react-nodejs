
import authServices from '../services/auth.service'
let regesterAndLogin = async (req, res) => {
    try {
        if (!req.body || !req.body.type) {
            return res.status(200).json({
                err: 2.1,
                msg: 'Missing input !'
            })
        }
        else {
            let response = await authServices.regesterOrLoginService(req.body)
            return res.status(200).json(response)
        }

    } catch (error) {
        return res.status(200).json({
            err: -1,
            msg: error
        })
    }
}
let getProfileAdmin = (req, res) => {
    try {
        console.log('Admin here');

    } catch (error) {
        return res.status(200).json({
            err: -1,
            msg: error
        })
    }
}

module.exports = {
    regesterAndLogin,
    getProfileAdmin
}
