 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')
 const errorMessage = document.querySelector('#EM')
 const forcastMessage = document.querySelector('#FI')

 errorMessage.textContent = ''
 forcastMessage.textContent = ''

 weatherForm.addEventListener('submit', (e) => { 
     
     e.preventDefault()

     errorMessage.textContent = "Searching... please wait"
     forcastMessage.textContent = ''

     const location = search.value

     fetch(window.location + 'weather?address=' + location).then((response) => {
    
        response.json().then((data) => { 
        
           if (data.error) 
           {
               errorMessage.textContent = 'error: ' + JSON.stringify(data.error)
           }
           else 
           {
               errorMessage.textContent = ''
               forcastMessage.textContent = 'Temperature: ' + data.forcast.Temperature + ", Precip(%): " + data.forcast.Precip + ", Humidity: " + data.forcast.Humidity 
           }
       })
    })    
 })