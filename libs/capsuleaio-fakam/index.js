const CryptoJS = require('qq-crypto/google')
const { InputFingerprint } = require('db')

const AES_ENCRYPTION_KEY = 'ENCRYPTION_KEY_HERE'

module.exports.inputFingerprint = ({event, context, callback}) => {
    try {

        const fAkam = JSON.parse(CryptoJS.AES.decrypt(event.body, AES_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8))

        const id = fAkam.id
        delete fAkam.id

        await InputFingerprint(id, fAkam)

        return
    } catch (err) {
        console.error('Error in lib\\capsuleaio-fakam', err.message) // Log error into AWS Cloudwatch lambda function logs
        throw err
    }
}