import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Create a new bot
router.post('/', async (req, res) => {
  try {
    const { name, systemPrompt, language, welcomeMessage } = req.body;
    const bot = await prisma.botConfig.create({
      data: { name, systemPrompt, language, welcomeMessage },
    });
    res.status(201).json(bot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bot' });
  }
});

// List all bots
router.get('/', async (req, res) => {
  try {
    const bots = await prisma.botConfig.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bots' });
  }
});

// Get a single bot
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await prisma.botConfig.findUnique({
      where: { id },
    });
    if (!bot) return res.status(404).json({ error: 'Bot not found' });
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bot' });
  }
});

// Update a bot
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, systemPrompt, language, welcomeMessage } = req.body;
    const bot = await prisma.botConfig.update({
      where: { id },
      data: { name, systemPrompt, language, welcomeMessage },
    });
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bot' });
  }
});

// Delete a bot
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.botConfig.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bot' });
  }
});

export default router;
