import logging
from agents.llm_base import LLMBaseAgent
import os
import json

logger = logging.getLogger(__name__)

class WriterAgent(LLMBaseAgent):
    def __init__(self):
        super().__init__()
        self.prompt_template = self._load_prompt()

    def _load_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'prompts', 'linkedin_writer.txt')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"Prompt file not found at {prompt_path}")
            return "Write a LinkedIn post based on the following analysis: {analysis}"

    def write_post(self, analysis: dict) -> str:
        """Drafts a LinkedIn post from the analysis."""
        analysis_str = json.dumps(analysis, indent=2)
        prompt = self.prompt_template.replace("{analysis}", analysis_str)
        
        logger.info("Calling LLM to write LinkedIn post...")
        post = self.generate_content(prompt=prompt)
        
        if not post:
            logger.warning("Failed to get response from writer agent.")
            return "Error: Could not generate post."
            
        return post
