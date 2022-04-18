const request = require('request')

const api_key_weather = process.env.API_KEY_WEATHER
url_weather = process.env.URL_WEATHER + api_key_weather + '&units=m&query='

const forecast =  (location_definition, callback) => {
    const url = url_weather + location_definition.longitude + ',' + location_definition.latitude
    request({ url: url, json: true }, (error, response) => {
        if (error)
        {
            callback('unable to connect to weather service', undefined)  
        }
        else if (response.body.error)
        {
            callback(response.body.error.info, undefined)
        }
        else
        {
            callback(undefined, { Temperature: response.body.current.temperature, 
                                  Precip: response.body.current.precip, 
                                  Humidity: response.body.current.humidity,
                                  Pressure: response.body.current.pressure,
                                  Place: location_definition.location
                                })
        }
    })
}

module.exports = forecast