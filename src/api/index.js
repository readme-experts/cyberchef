import express from 'express'
import router from './router.js'


const app = express()

app.use(express.json())
app.use('/api',router)

async function startApp(){
    try{
        app.listen(process.env.PORT ,() => console.log(`Server started on PORT ${PORT}`))
 
    } catch(e){
        console.log(e)
    }
}

startApp()