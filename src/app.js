const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode  = require('../utils/geocode')
const forecast = require('../utils/forecast')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../views/templates')
const partialsDirectory = path.join(__dirname, '../views/partials')

const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsDirectory)

app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather app',
        name: 'Dimitar Stojanovski'
     })
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Weather app',
        name: 'Dimitar Stojanovski'
     })
})

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Weather app',
        message : 'Weather app help page',
        name: 'Dimitar Stojanovski'
     })
})

app.get('/weather', (req, res) => { 
    if (!req.query.address){
        res.send({
            error: "you must provide address"
        })

        return
    }

    geocode(req.query.address, (error, data) => { 
  
        if (error)
        {
           res.send({ error: error})
        }
        else
        {  
           forecast(data, (error,data) => {
             
              if (error)
              {
                 res.send({ error: error})
              }
              else
              {
                res.send({ forcast: data})
              }
     
           })
        }
     })
})

app.get('*', (req, res) => { 
    res.render('help', { 
        title: 'Weather app',
        message : 'page not found',
        name: 'Dimitar Stojanovski'
     })
})


const port = process.env.PORT
app.listen(port, () => { 
    console.log('server is up on port ' + port)
})