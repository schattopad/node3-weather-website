console.log('Inside javascript file')

// fetch('http://puzzle.mead.io/puzzle').then((respose) => {
//     respose.json().then((data) => {
//         console.log(data)
//         }
//     )
// })

 
 
    const weatherFrom = document.querySelector('form')
    const search = document.querySelector('input')
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    weatherFrom.addEventListener("submit",(e)=>{
        e.preventDefault()
      
        const url = '/weather?address='+search.value
        console.log(url)
       
        messageOne.textContent = "Loading ..."
        messageTwo.textContent = ""

        fetch(url).then((response)=>{
    
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.geoloc 
                messageTwo.textContent = data.forecast
                
            }
        } )
        
    } )

    })

