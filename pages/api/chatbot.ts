import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { messages, presencePenalty = 0, frequencyPenalty = 0, temperature, maxTokens } = req.body;

    try {
      const response = await axios.post(
        OPENAI_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: messages,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
          temperature: temperature,
          max_tokens: maxTokens,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const assistantMessage = response.data.choices[0].message.content;

      res.status(200).json({ message: assistantMessage });
    } catch (error) {
      console.error('OpenAI API Error:', error.response.data, error.response.message);
      res.status(500).json({ message: 'I am having trouble connecting to my server. Try sending me another message.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
