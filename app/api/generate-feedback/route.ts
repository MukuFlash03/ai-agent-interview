import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { summary, transcript } = await request.json();
    const chatCompletion = await getGroqChatCompletion(summary, transcript);
    const interviewFeedback = chatCompletion.choices[0]?.message?.content || ""
    console.log("Interview feedback after LLM evaluation");
    console.log(interviewFeedback);

    return NextResponse.json({ message: 'Feedback generated from interview transcripts successfully', interviewFeedback });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate questions from PDF' }, { status: 500 });
  }
}

export const getGroqChatCompletion = async (summary: string, transcript: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
						You are an AI assistant tasked with evaluating job candidates based on interview data. 
            You will be provided with a summary of the interview and the complete transcript. 
            Your job is to analyze this information and provide an evaluation of the candidate.

            Instructions:
            1. Carefully review the provided summary and transcript.
            2. Evaluate the candidate on the following metrics:
              - Technical skills relevance
              - Communication ability
              - Problem-solving approach
              - Cultural fit
              - Leadership potential
              - Adaptability/learning agility

            3. For each metric, provide a brief one-line assessment and a score out of 10.
            4. Calculate an overall score out of 10 based on the individual metric scores.

            Your output should be formatted as follows:

            Overall Score: [X/10]

            Metrics Summary:
            - Technical skills relevance: [Brief assessment] [X/10]
            - Communication ability: [Brief assessment] [X/10]
            - Problem-solving approach: [Brief assessment] [X/10]
            - Cultural fit: [Brief assessment] [X/10]
            - Leadership potential: [Brief assessment] [X/10]
            - Adaptability/learning agility: [Brief assessment] [X/10]

            Ensure your evaluation is based solely on the information provided in the summary and transcript. 
            Be objective and fair in your assessment, considering both strengths and areas for improvement.

            Important: Provide only the output in the exact format specified above. Do not include any additional text, explanations, or commentary before or after the requested output.
            Give me only the overall score and metric summary in the output and nothing else.
            I do not want any other text, just the output.
					`
      },
      {
        role: "user",
        content: `    
						Here is the candidate's interview responses:
            Summary: ${summary}
            Transcript: ${transcript}
    			`
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0.7,
    max_tokens: 1024,
  });
};
