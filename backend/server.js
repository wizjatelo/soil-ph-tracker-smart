import express, { response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {GoogleGenerativeAI} from "@google/generative-ai"
dotenv.config()


const app = express()

app.use(express.json())




const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
const API_KEY = process.env.GEMINI_API_KEY


async function getGeminiResponse(prompt) {
    try {

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const prompt = "Explain how AI works";
        
        const result = await model.generateContent(prompt);
        console.log(result.response.text());   
        

        
    } catch (error) {

        console.error('Error with Gemini API:', error);
        return 'Error generating response';
        
    }
}




app.get("/ai", async(req, res) => {



    const prompt = "Explains how AI works"
    const res = await getGeminiResponse()
    return res.json({prompt ,response})
})


mongoose.connect(MONGODB_URI)
.then(() => {

    app.listen(PORT, () => {
        console.log(`Connected to server on port: ${PORT} `)
        console.log(`App connected to DB`)
    })

})

.catch((error) => {
    console.log(error)
})

