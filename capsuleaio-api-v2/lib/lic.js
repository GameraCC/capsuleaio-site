const { qqrSign } = require('kms')

const getIat = () => Math.round(new Date().getTime() / 1000);

/**
 * Get 4 hour license for qqRequest
 * @param {*} event 
 * @returns {Promise<string>} Base64 of license
 */
exports.getQqr = ({keyId}) => new Promise(async (res, rej) => {
    let data = {
        lic: keyId,
        exp: getIat()+2.5*60*60, // expires 2 hours 30 min after issue
        iat: getIat()
    }

    const sig = await qqrSign(JSON.stringify(data))
    data = { ...data, sig }

    console.log('licObj:', data)
    
    res(Buffer.from(JSON.stringify(data)).toString('base64'))
})