import express, { Router,Request, Response } from 'express';
import User from '../models/user'
import  { GoogleGenerativeAI, GoogleGenerativeAIResponseError } from "@google/generative-ai";
import path from 'path';
import dotenv from 'dotenv';


dotenv.config({ path: path.resolve(__dirname, '../../../../secrets.env') });

async function start(req:Request,res:Response) {
    const { topic,genre,age,setting,characters,length } = req.body;
    if (!genre) {
        return res.status(404).send("please provide the content, genre");
    }
    if (!process.env.MODEL_API_KEY) {
        return res.status(404).send("Api key not provided");
    } else {
        const genAI = new GoogleGenerativeAI(process.env.MODEL_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const msg = `Give me a story whose description is and ask question to user and the options  :
                    genre: ${genre},
                    topic: ${topic},
                    ageGroup: ${age},
                    setting: ${setting},
                    all the characters: ${characters}},
                    length: ${length}
                    give me in json format example: 
                    {
                        "title":"title of the story",
                        "story": "Prikshit, Raunit, and Priyanshu, three close friends, embarked on their journey to become Pokemon Masters. They had grown up together, sharing dreams of catching powerful Pokemon and battling their way to the top. One sunny afternoon, while exploring the Viridian Forest, they stumbled upon a wounded Pikachu. The little Pokemon was weak and scared, its tail flickering faintly. Prikshit, an aspiring Pokemon Doctor, immediately took charge. He carefully examined Pikachu, realizing it needed immediate medical attention. However, the only known cure was a rare berry found on the perilous Thunder Mountain, a day's journey away.",
                          "question": "What will the friends do?",
                          "options": {
                            "i": "Prikshit decides to face the dangers of Thunder Mountain alone to save Pikachu.",
                            "ii": "Raunit, known for his bravery, volunteers to go to Thunder Mountain, believing speed is key.",
                            "iii": "Priyanshu suggests they all go together, knowing their friendship can overcome any obstacle."
                          }
                      }
                    `;
        try{
            const result = await model.generateContentStream(msg);
            let text = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                console.log(chunkText);
                text += chunkText;
            }
            // Remove the initial and final ```
           // Remove the initial ```
            const jsonString = text.replace(/^```json\n/, '');

            // Remove the last ```
            const trimmedJsonString = jsonString.replace(/\n```\s*$/, '');

            // Parse the JSON string to an object
            const jsonObject = JSON.parse(trimmedJsonString);
            console.log("story: "+ jsonObject.story);
            console.log("questions; "+jsonObject.question);
            console.log("options: "+ jsonObject.options.i);
            res.status(200).send(jsonObject);
        }catch(error){
            if (error instanceof GoogleGenerativeAIResponseError) {
                console.error('Google Generative AI Error:', error.message);
                res.status(500).json({ message: 'Failed to generate story due to safety concerns' });
              } else {
                console.error('Unexpected Error:', error);
                res.status(500).json({ message: 'An unexpected error occurred' });
              }
        }
        
                

        
    }
}


async function yourStory(req:Request,res:Response) {
  const { story,question,option } = req.body;
  if (!story && !option) {
      return res.status(404).send("please provide the story,userChoice");
  }
  if (!process.env.MODEL_API_KEY) {
      return res.status(404).send("Api key not provided");
  } else {
      const genAI = new GoogleGenerativeAI(process.env.MODEL_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const msg = `Continue the story given below based on the user's choice:
                  Story: ${story}
                  question: ${question}
                  User's choice: ${option}
                  Continue the story in json format with the next part of the story and another question with options.
                  give me in json format example: 
                  {
                      "story": "Prikshit, Raunit, and Priyanshu, three close friends, embarked on their journey to become Pokemon Masters. They had grown up together, sharing dreams of catching powerful Pokemon and battling their way to the top. One sunny afternoon, while exploring the Viridian Forest, they stumbled upon a wounded Pikachu. The little Pokemon was weak and scared, its tail flickering faintly. Prikshit, an aspiring Pokemon Doctor, immediately took charge. He carefully examined Pikachu, realizing it needed immediate medical attention. However, the only known cure was a rare berry found on the perilous Thunder Mountain, a day's journey away.",
                        "question": "What will the friends do?",
                        "options": {
                          "i": "Prikshit decides to face the dangers of Thunder Mountain alone to save Pikachu.",
                          "ii": "Raunit, known for his bravery, volunteers to go to Thunder Mountain, believing speed is key.",
                          "iii": "Priyanshu suggests they all go together, knowing their friendship can overcome any obstacle."
                        }
                    }
                  `;
      try{
          const result = await model.generateContentStream(msg);
          let text = '';
          for await (const chunk of result.stream) {
              const chunkText = chunk.text();
              console.log(chunkText);
              text += chunkText;
          }
          // Remove the initial and final ```
         // Remove the initial ```
          const jsonString = text.replace(/^```json\n/, '');

          // Remove the last ```
          const trimmedJsonString = jsonString.replace(/\n```\s*$/, '');

          // Parse the JSON string to an object
          const jsonObject = JSON.parse(trimmedJsonString);
          console.log("story: "+ jsonObject.story);
          console.log("questions; "+jsonObject.question);
          console.log("options: "+ jsonObject.options.i);
          res.status(200).send(jsonObject);
      }catch(error){
          if (error instanceof GoogleGenerativeAIResponseError) {
              console.error('Google Generative AI Error:', error.message);
              res.status(500).json({ message: 'Failed to generate story due to safety concerns' });
            } else {
              console.error('Unexpected Error:', error);
              res.status(500).json({ message: 'An unexpected error occurred' });
            }
      }
      
              

      
  }
}

export default{
    start,
    yourStory
};