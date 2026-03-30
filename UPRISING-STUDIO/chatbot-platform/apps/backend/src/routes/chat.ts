import { Router } from 'express';
import prisma from '../lib/prisma';
import { GeminiEngine } from '../chatEngines/gemini';

const router = Router();
const geminiEngine = new GeminiEngine(process.env.GEMINI_API_KEY || '');

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    const bot = await prisma.botConfig.findUnique({
      where: { id },
    });

    if (!bot) return res.status(404).json({ error: 'Bot not found' });

    const response = await geminiEngine.generateResponse(bot, messages);
    res.json({ response });
  } catch (error) {
    console.error("[ChatRoute] Error:", error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

export default router;
