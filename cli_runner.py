import logging
from config import Config
from database.database import Database
from database.models import Post
from agents.research_agent import ResearchAgent
from agents.ranking_agent import RankingAgent
from agents.analysis_agent import AnalysisAgent
from agents.writer_agent import WriterAgent
from agents.verification_agent import VerificationAgent
from agents.notification_agent import NotificationAgent
import os

# Ensure logs and output directories exist
os.makedirs("logs", exist_ok=True)
os.makedirs("output", exist_ok=True)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join("logs", "app.log")),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def main():
    logger.info("Starting AI LinkedIn Research Agent Workflow")
    
    # Initialize Database
    db = Database()
    
    # 1. Collect News
    research_agent = ResearchAgent(db)
    new_articles = research_agent.collect_and_filter_news()
    
    if not new_articles:
        logger.info("No new unique articles found. Exiting.")
        return
        
    # 2. Rank News
    ranking_agent = RankingAgent()
    top_articles = ranking_agent.rank_articles(new_articles)
    
    if not top_articles:
        logger.warning("Ranking returned no articles.")
        return
        
    # Process the top ranked article
    best_article = top_articles[0]
    logger.info(f"Selected Top Article: {best_article.title}")
    
    # 3. Analyze
    analysis_agent = AnalysisAgent()
    analysis_result = analysis_agent.analyze(best_article)
    
    # 4. Generate LinkedIn Post
    writer_agent = WriterAgent()
    draft_post = writer_agent.write_post(analysis_result)
    
    # 5. Verify
    verification_agent = VerificationAgent()
    context = {
        "title": best_article.title,
        "description": best_article.description,
        "source": best_article.source,
        "analysis": analysis_result
    }
    verification_result = verification_agent.verify(draft_post, context)
    
    # 6. Save to Database
    post = Post(article_id=best_article.id, draft_content=draft_post, status="pending")
    post_id = db.add_post(post)
    if post_id:
        db.record_history(best_article.content_hash)
        logger.info("Post saved to database successfully.")
        
        # Save output draft locally as well for easy access
        try:
            with open(os.path.join("output", "latest_post.md"), "w", encoding="utf-8") as f:
                f.write(draft_post)
        except Exception as e:
            logger.error(f"Could not write latest_post.md: {e}")
    else:
        logger.error("Failed to save post to database.")
    
    # 7. Notify User
    notification_agent = NotificationAgent()
    notification_agent.notify(
        final_draft=draft_post,
        article_url=best_article.url,
        verification_result=verification_result
    )
    
    logger.info("Workflow completed successfully.")

if __name__ == "__main__":
    main()
