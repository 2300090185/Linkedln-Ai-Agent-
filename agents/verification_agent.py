import logging
from agents.llm_base import LLMBaseAgent
import json

logger = logging.getLogger(__name__)

class VerificationAgent(LLMBaseAgent):
    def __init__(self):
        super().__init__()
        self.system_instruction = (
            "You are a strict fact-checking AI. Your job is to verify technical terminology, company names, "
            "dates, and statistics in the given draft post against the provided original context. "
            "Return a JSON with two keys: 'confidence' (high, medium, low) and 'flags' (list of strings highlighting potential errors or hallucinations)."
        )

    def verify(self, draft_post: str, context: dict) -> dict:
        """Verifies the facts in the post."""
        prompt = f"Original Context:\n{json.dumps(context, indent=2)}\n\nDraft Post:\n{draft_post}\n\nVerify this post."
        
        logger.info("Calling LLM to verify post facts...")
        verification = self.generate_json(prompt=prompt, system_instruction=self.system_instruction)
        
        if not verification or not isinstance(verification, dict):
            logger.warning("Failed to get response from verification agent.")
            return {"confidence": "unknown", "flags": ["Could not verify automatically."]}
            
        return verification
