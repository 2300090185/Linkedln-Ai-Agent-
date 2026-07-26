export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  source_name: string;
  source_category: 'Tech Company' | 'Tech Website' | 'LinkedIn Creator';
  published_date: string;
  content_hash?: string;
  reading_time_minutes: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Expert';
  tags: string[];
  related_paper?: ResearchPaper;
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publisher: string;
  url: string;
  pdf_url?: string;
  published_date: string;
  citation_count: number;
  doi?: string;
}

export interface AIExplanation {
  summary: string;
  key_takeaways: string[];
  beginner_explanation: string;
  intermediate_explanation: string;
  expert_explanation: string;
  real_world_applications: string[];
  related_technologies: string[];
  recommended_next_topics: string[];
  suggested_learning_roadmap: string[];
  estimated_reading_time_minutes: number;
  difficulty_level: string;
}

export interface GeneratedPost {
  id: string;
  topic: string;
  platform: 'LinkedIn' | 'Twitter/X' | 'Blog' | 'Newsletter' | 'Instagram';
  writing_style: string;
  headline: string;
  content: string;
  hashtags?: string[];
  status: 'draft' | 'scheduled' | 'published';
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string;
  target_audience: string;
  domains: string[];
}

export interface DomainItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon_name: string;
}

export interface DailyQuiz {
  id: string;
  date: string;
  concept_title: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  xp_reward: number;
}

export interface HashtagTrend {
  tag: string;
  posts_count: string;
  growth: string;
  avg_engagement: string;
  category: string;
}

export interface PostScheduleItem {
  id: string;
  post: GeneratedPost;
  scheduled_time: string;
  target_slot: string;
  is_published: boolean;
}

