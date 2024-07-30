import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { resumeContent } = await request.json();
    const chatCompletion = await getGroqChatCompletion(resumeContent);
    const resumeQuestions = chatCompletion.choices[0]?.message?.content || ""
    return NextResponse.json({ message: 'Questions generated from Resume PDF successfully', resumeQuestions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate questions from PDF' }, { status: 500 });
  }
}

export const getGroqChatCompletion = async (resumeContent: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
						You are an AI assistant designed to conduct job interviews.
						Your task is to analyze resumes and generate relevant, personalized interview 
						questions based on the candidate's experience, skills, and qualifications.
						Provide thoughtful, professional questions that will help assess the 
						candidate\'s suitability for the position. 
						The response should only contain the list of questions and no other information.
					`
      },
      {
        role: "user",
        content: `
						Please generate 10-15 personalized interview questions based on this resume. 
						Focus on the candidate's experience, skills, and any interesting points in their background. 
						Questions can either technical or behavior or both.
						Ensure the questions are open-ended and encourage detailed responses.
    
						Here is the candidate's resume:

						${resumeContent}
    			`
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0.7,
    max_tokens: 1024,
  });
};
