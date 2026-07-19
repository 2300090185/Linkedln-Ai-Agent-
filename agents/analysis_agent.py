import logging
from database.models import Article
from agents.llm_base import LLMBaseAgent
import os
import json

logger = logging.getLogger(__name__)

class AnalysisAgent(LLMBaseAgent):
    def __init__(self):
        super().__init__()
        self.prompt_template = self._load_prompt()

    def _load_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'prompts', 'analysis_prompt.txt')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"Prompt file not found at {prompt_path}")
            return "Analyze this article and return JSON."

    def analyze(self, article: Article) -> dict:
        """Analyzes an article and returns a structured dictionary."""
        prompt = self.prompt_template.replace("{title}", article.title).replace("{description}", article.description)
        
        logger.info(f"Calling LLM to analyze article: {article.title}")
        analysis_json = self.generate_json(prompt=prompt)
        
        if not analysis_json or not isinstance(analysis_json, dict):
            logger.warning("Failed to get valid JSON from analysis agent.")
            return {
                "executive_summary": article.description,
                "technical_summary": "Not available",
                "business_impact": "Not available",
                "future_outlook": "Not available",
                "key_takeaways": [article.title]
            }
            
        return analysis_json
