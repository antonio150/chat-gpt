// 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



console.log("this is Node js")
// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');


const bodyParser = require('body-parser')
const cors = require('cors')


const configuration = new Configuration({
    organization: "org-ul5eXL12sxPP8lPdMeUZXtBE", 
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines(); 



// create a simple express api that calls the function above




const app = express()
app.use(bodyParser.json())
app.use(cors())
//  can you please add cors to express


const port = 3080

app.post('/', async (req, res) => {
        const { message } = req.body;
        console.log(message, "message")
        
        const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${message}`,
                max_tokens: 100,
                temperature: 0.5,
        });

        console.log()
        res.json({
                // data: response.data
                message: response.data.choices[0].text,
        })
});

app.get('/models', async (req, res) => {
        const response = await openai.listEngines();
        console.log(response.data.data)
        res.json({
                models: response.data.data
        })
});
app.listen(port, () => {
        console.log(`Exemple app listening at https://prestashop.5.youpihost.fr/server`)
});

