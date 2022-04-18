const request = require('request')
const url_geo = process.env.URL_GEO
const api_key_geo = process.env.API_KEY_GEO

const geocode =  (address, callback) => {

    const url =  url_geo + encodeURIComponent(address) + '.json?access_token=' + api_key_geo + '&limit=1'
    request({ url: url, json: true}, (error, response) => {
        if (error)
        {
           callback('unable to connect to geo data service', undefined)
        }
        else if (response.body.message)
        {
           callback(response.body.message, undefined)
        }
        else if (response.body.features.length == 0)
        {
           callback('unable to find location', undefined)
        }
        else
        {
           callback(undefined, { latitude: response.body.features[0].center[0], 
                                 longitude: response.body.features[0].center[1], 
                                 location: response.body.features[0].place_name})
        }
    })
 }

 module.exports = geocode