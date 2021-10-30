const express = require('express')
const route = express.Router();
//const bodyParser = require('body-parser')
const { request } = require('express')
const {WebhookClient} = require('dialogflow-fulfillment');

const app = express()
//app.use(bodyParser.json())
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/dialogflow-fullfillment', (request, response)=>{
    dialogflowFullfillment(request, response)
})

app.listen(port,() =>{
    console.log(`Listening on port ${port}`)
})

const dialogflowFullfillment =(request, response) => {
    const agent = new WebhookClient({request, response})
    var soma = request.body.queryResult.parameters['number'] + request.body.queryResult.parameters['number1']

    function Soma(agent){
        agent.add("O resultado é: "+ soma)
    } 
    route.post('/dialogflow', (req, res, next) => {

        console.log(req.body);
        
        const telegramButton = req.body.originalDetectIntentRequest.payload.data.callback_query;
        
        // Detectando plataforma e número de indentificação e ajutando os parametros da requisição
    
        const sourceTelegram = req.body.originalDetectIntentRequest.source
        //const sourceWhatsapp = req.body.originalDetectIntentRequest.payload.source
    
        if(telegramButton === undefined){
    
            // verifica se a mensagem foi enviada por um botão do telegram
            console.log("BOTÃO TELEGRAM")
    
            var idPlataforma = req.body.originalDetectIntentRequest.payload.data.from.id;
    
        } else {
            console.log("N/ BOTÃO TELEGRAM")
            var idPlataforma = req.body.originalDetectIntentRequest.payload.data.callback_query.from.id;
    
        }
    
        if (sourceTelegram == '' || sourceTelegram === null || sourceTelegram === undefined){
            console.log("ENVIADO PELO GOOGLE")
    
            // armazenando o whatsapp como plataforma e o numero do celular como celular
    
            //req.body.queryResult.parameters.plataforma = sourceWhatsapp;
            //req.body.queryResult.parameters.celular = idPlataforma;
    
        } else {
            console.log("ENVIADO PELO TELEGRAM")
            // armazenando o telegram como plataforma e o id como celular
            //req.body.queryResult.parameters.plataforma = sourceTelegram; 
        }
        next();
        
    })

    let intentMap = new Map();
    intentMap.set("Soma", Soma)
    agent.handleRequest(intentMap)
}