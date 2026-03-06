# PILLARS
# Sales, Leadership, Systems, Discipline, Community

CATEGORIZATION_PROMPT = """
You are an expert content strategist for Olivier, a business performance coach.
Your task is to categorize the following transcript into one of his 5 core pillars:

1. **Sales**: Focuses on client acquisition, closing deals, revenue generation, and sales psychology.
2. **Leadership**: Focuses on team management, vision, decision making, and leading others.
3. **Systems**: Focuses on processes, automation, efficiency, and scaling operations.
4. **Discipline**: Focuses on personal habits, mindset, routine, and individual high performance.
5. **Community**: Focuses on building an audience, brand loyalty, networking, and social proof.

TRANSCRIPT:
{transcript}

Return the result strictly in the following JSON format:
{{
    "pillar": "Pillar Name",
    "reasoning": "A brief explanation of why it fits this pillar."
}}
"""

SCORING_PROMPT = """
You are an expert content analyzer. Evaluate the following transcript based on three criteria (0-10 scale):

1. **Hook Strength**: Does the beginning capture attention immediately?
2. **Clarity**: Is the message easy to understand and follow?
3. **CTA Strength**: Is there a clear and compelling call to action or takeaway?

TRANSCRIPT:
{transcript}

Return the result strictly in the following JSON format:
{{
    "hook_score": 0,
    "clarity_score": 0,
    "cta_score": 0,
    "overall_score": 0.0,
    "feedback": "Brief suggestions for improvement."
}}
"""
