const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //added heroku port , 3000 if not heroku

//Define path for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')


//Set handler engine and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

//set up static directory to serve
app.use(express.static(publicDirectorypath))


//handlers
app.get('', (req,res)=> {
    
    res.render('index',{
        name: 'Subhendu',
        title: 'Weather'
    })
}
)

app.get('/about',(req,res)=>{
    
    res.render('about',{
        name: 'Subhendu',
        title: 'Weather'
    }

    )
})

app.get('/help',(req,res)=>{
    
    res.render('help',{
        message: 'This is a help file',
        summary: 'Summary of Help',
        name: 'Subhendu',
        title:'Weather'
        
    }

    )
})

//test
app.get('/weather',(req,res)=>{
     if (!req.query.address) {
         return res.send('Please provide an address')
     }

//searching geocode and forecast 
     const location = req.query.address

     geoCode(location,(error,{latitude,longitude}={})=>{
        if (error){
            console.log({error})
            return res.send({error})
        }else{
            //console.log('Place: '+ data.place + ' latitude: '+data.latitude+' longitude: '+data.longitude)
            
            forecast(longitude, latitude,(error, {Feels, Currenttemp,Feelslike}) => {
                if (error){
                    return res.send({error})
                }else{
                    //console.log('location', data)
                    const geoloc = 'Latitude '+latitude+'Longitude '+longitude
                    const forecast = 'forecast Feels'+Feels+' Current Tempareture '+Currenttemp+' Feels Like '+ Feelslike
                    res.send(
                        {
                            geoloc: geoloc,
                            forecast:forecast

                        }
                    )
                    
                }
                
              })
    
        }
    }
    )
   
    // res.send({
    //     Address:req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404-page',
        {
            errorMsg: "ERROR : 404 - Help article not found",
            name: 'Subhendu'
        }
    )
})

app.get('*',(req,res)=>{
    res.render('404-page',
        {
            errorMsg: "ERROR : 404 - Page not found",
            name: 'Subhendu'
        }
    )
})



app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})




