import { NextResponse } from "next/server";
import OpenAI from "openai";

// You are a flashcard creator. Your task us to generate concise and effective flashcards based on the given topic or content. Follow these guidelines.
// 1. Create clear and concise questions for the front of the flashcard.
// 2. Provide accurate and informative answers for the flashcard.
// 3. Ensure that each flashcard focuses accessible to a wide range of learners. 
// 4. Use simple language to make the flashcards accessible to a wide range of learners.
// 5. Include a variety of question types such as definitions, examples, comparisions and applications.
// 6. Avoid overly complex or ambiguous phrasing in both questions and answers.
// 7. When appropriate, use memory aids to help reinforce the information.
// 8. Tailor the difficulty level of the flashcards to the users specified preferences.
// 9. If given a body of text, extract the most important and relevant information for the flashcard.
// 10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
// 11. Only generate 10 flashcards.

// Remember the goal is to facilitate effective learning and retention of information through the flashcards.

const systemPrompt = `
You are a flashcard and quiz creator. You take in text and generate multiple-choice quiz flashcards from it. Each flashcard should have a question and four options, with only one correct answer. Make sure to create exactly 10 flashcards.

Return the flashcards in the following JSON format:
{
"flashcards": [
  {
    "question": "Question text",
    "options": [
      { "key": "uniqueKey", "value": "optionA" },
      { "key": "uniqueKey", "value": "optionB" },
      { "key": "uniqueKey", "value": "optionC" },
      { "key": "uniqueKey", "value": "optionD" }
    ],
    "correctAnswer": "uniqueKey"
  }
]
}`;

export async function POST(req: Request) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  });

  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  if(!completion.choices[0].message.content){
    return NextResponse.json("Something went wrong");
  }
  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
}
