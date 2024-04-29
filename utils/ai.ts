import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? i.e. does it contain negative emotions?'
      ),
    summary: z
      .string()
      .describe('quick summary of the entire journal entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the journal entry. Example #FF0000 for red representing anger.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text rated on a scale from -10 to 10, where -10 is extremely negative and 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content
  })

  return input

}

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo'}) 
  // temperature controls the window of what is likely to be selected next
  // can also be described as the silliness level
  // the closer to 0, the more factual
  // the closer to 1, the sillier and it might hallucinate
  const result = await model.invoke(input)
  console.log(result)
}