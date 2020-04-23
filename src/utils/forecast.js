const request = require('request')


const forecast = (longitude,latitude,callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=c3bcaa3fa65b989450d01eabf1c83b70&query='+latitude+','+longitude+'&units=f'
    request({url,json: true},(error,{body}) =>
    {
    if (error){
        callback('Unable to reach weather stack API',undefined)
    } else if (body.error){
            callback('Unable to find location',undefined)
    } else {
            //console.log(response.body.current.weather_descriptions[0])
            //console.log(url)
            callback(undefined,{
                Feels: body.current.weather_descriptions[0],
                Currenttemp: body.current.temperature, 
                Feelslike: body.current.feelslike
            })
    
        }
    }
    )
}

module.exports = forecast
