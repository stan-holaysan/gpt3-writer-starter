import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "In the verbal style of Kobe Bryant, write a short introductory paragraph stating the usefulness of the basketball move ";
const basePromptPostfix = ". Then, give a detailed step-by-step tutorial for performing the move in the format of a numbered list."
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}"${req.body.userInput}"${basePromptPostfix}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}"${req.body.userInput}"${basePromptPostfix}\n`,
    temperature: 0.9,
    max_tokens: 300,
    top_p: 1
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;