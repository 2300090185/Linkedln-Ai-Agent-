import google.genai as genai
from config import Config
import logging
import json
from typing import Optional, Union

logger = logging.getLogger(__name__)

class LLMBaseAgent:
    def __init__(self):
        self.api_key = Config.GEMINI_API_KEY
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None
        self.model = "gemini-3.5-flash"

    def generate_content(self, prompt: str, system_instruction: str = None) -> Optional[str]:
        if not self.client:
            logger.error("Gemini API key not configured.")
            return None
            
        try:
            config = genai.types.GenerateContentConfig(
                system_instruction=system_instruction
            )
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=config
            )
            return response.text
        except Exception as e:
            logger.error(f"Error calling LLM: {e}")
            return None

    def generate_json(self, prompt: str, system_instruction: str = None) -> Optional[Union[dict, list]]:
        if not self.client:
            logger.error("Gemini API key not configured.")
            return None
            
        try:
            config = genai.types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json"
            )
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=config
            )
            try:
                return json.loads(response.text)
            except json.JSONDecodeError:
                logger.error(f"Failed to decode JSON from response: {response.text}")
                return None
        except Exception as e:
            logger.error(f"Error calling LLM for JSON: {e}")
            return None
