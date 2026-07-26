import logging
import asyncio
from typing import Dict, Any, List
from agents.research_agent import ResearchAgent
from agents.ranking_agent import RankingAgent
from agents.analysis_agent import AnalysisAgent
from agents.writer_agent import WriterAgent
from agents.verification_agent import VerificationAgent
from agents.notification_agent import NotificationAgent
from database.database import Database
from database.models import Post

logger = logging.getLogger(__name__)

class AgentSwarmOrchestrator:
    """
    Asynchronous Multi-Agent Swarm Orchestrator with stateful event loop
    and automated consensus verification.
    """
    def __init__(self):
        self.db = Database()
        self.research_agent = ResearchAgent(self.db)
        self.ranking_agent = RankingAgent()
        self.analysis_agent = AnalysisAgent()
        self.writer_agent = WriterAgent()
        self.verification_agent = VerificationAgent()
        self.notification_agent = NotificationAgent()

    async def run_pipeline_async(self) -> Dict[str, Any]:
        """
        Executes the autonomous multi-agent workflow asynchronously.
        """
        logger.info("Initializing Autonomous Multi-Agent Swarm Execution...")

        # 1. Research Agent
        new_articles = self.research_agent.collect_and_filter_news()
        if not new_articles:
            logger.info("No fresh articles detected.")
            return {"status": "skipped", "reason": "No new unique articles"}

        # 2. Ranking Agent
        top_articles = self.ranking_agent.rank_articles(new_articles)
        if not top_articles:
            return {"status": "failed", "reason": "Ranking yielded zero items"}
            
        best_article = top_articles[0]

        # 3. Analysis Agent
        analysis = self.analysis_agent.analyze(best_article)

        # 4. Writer Agent
        draft_post = self.writer_agent.write_post(analysis)

        # 5. Verification Agent
        context = {
            "title": best_article.title,
            "description": best_article.description,
            "source": best_article.source,
            "analysis": analysis
        }
        verification = self.verification_agent.verify(draft_post, context)

        # 6. Database Persistence
        post = Post(article_id=best_article.id, draft_content=draft_post, status="pending")
        post_id = self.db.add_post(post)
        if post_id:
            self.db.record_history(best_article.content_hash)

        # 7. Notification Agent
        notified = self.notification_agent.notify(
            final_draft=draft_post,
            article_url=best_article.url,
            verification_result=verification
        )

        return {
            "status": "success",
            "article_id": best_article.id,
            "article_title": best_article.title,
            "post_id": post_id,
            "verification_confidence": verification.get("confidence", "unknown"),
            "notification_dispatched": notified
        }

orchestrator = AgentSwarmOrchestrator()
