import logging
from typing import List
from database.models import Article
from agents.llm_base import LLMBaseAgent
import os

logger = logging.getLogger(__name__)

class RankingAgent(LLMBaseAgent):
    def __init__(self):
        super().__init__()
        self.prompt_template = self._load_prompt()

    def _load_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'prompts', 'ranking_prompt.txt')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"Prompt file not found at {prompt_path}")
            return "You are an AI ranking articles. Return JSON."

    def rank_articles(self, articles: List[Article]) -> List[Article]:
        """Rank articles and return the top 5."""
        if not articles:
            return []
            
        if len(articles) <= 5:
            return articles

        # Prepare articles string
        articles_str = ""
        for i, article in enumerate(articles):
            articles_str += f"[{i}] Title: {article.title}\nSource: {article.source}\nDescription: {article.description[:300]}...\n\n"

        prompt = self.prompt_template.replace("{articles}", articles_str)
        
        logger.info("Calling LLM to rank articles...")
        ranked_json = self.generate_json(prompt=prompt)
        
        if not ranked_json or not isinstance(ranked_json, list):
            logger.warning("Failed to get valid JSON from ranking agent, falling back to basic sorting.")
            # Fallback: Just return first 5
            return articles[:5]
            
        try:
            # Sort by score descending
            ranked_items = sorted(ranked_json, key=lambda x: x.get('score', 0), reverse=True)
            top_indices = [item['index'] for item in ranked_items[:5] if 'index' in item]
            
            top_articles = []
            for idx in top_indices:
                if 0 <= idx < len(articles):
                    top_articles.append(articles[idx])
            
            # Pad with other articles if LLM didn't return 5
            for article in articles:
                if len(top_articles) >= 5:
                    break
                if article not in top_articles:
                    top_articles.append(article)
                    
            return top_articles
        except Exception as e:
            logger.error(f"Error parsing ranked JSON: {e}")
            return articles[:5]
