-- PostgreSQL / Supabase Schema for AI Content Intelligence Platform

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin', 'researcher', 'creator'
    avatar_url TEXT,
    bio TEXT,
    target_audience VARCHAR(255) DEFAULT 'Tech Professionals',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Master Domains Table
CREATE TABLE IF NOT EXISTS domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g., 'Core Tech', 'Cloud & Infrastructure', 'Industry'
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. User Domains Junction Table
CREATE TABLE IF NOT EXISTS user_domains (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    domain_id UUID REFERENCES domains(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, domain_id)
);

-- 4. Articles Table
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    url TEXT UNIQUE NOT NULL,
    source_name VARCHAR(100) NOT NULL, -- 'OpenAI', 'Google AI', 'TechCrunch', etc.
    source_category VARCHAR(50) NOT NULL, -- 'Tech Company', 'Tech Website'
    published_date TIMESTAMP WITH TIME ZONE,
    content_hash VARCHAR(64) UNIQUE,
    reading_time_minutes INT DEFAULT 5,
    difficulty_level VARCHAR(20) DEFAULT 'Intermediate', -- 'Beginner', 'Intermediate', 'Expert'
    domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Research Papers Table
CREATE TABLE IF NOT EXISTS research_papers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    authors TEXT[] NOT NULL,
    publisher VARCHAR(100) NOT NULL, -- 'arXiv', 'Semantic Scholar', 'IEEE', 'ACM', etc.
    url TEXT UNIQUE NOT NULL,
    doi VARCHAR(100),
    pdf_url TEXT,
    published_date TIMESTAMP WITH TIME ZONE,
    domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
    citation_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    paper_id UUID REFERENCES research_papers(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_bookmark_target CHECK (article_id IS NOT NULL OR paper_id IS NOT NULL)
);

-- 7. Generated Posts Table
CREATE TABLE IF NOT EXISTS generated_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
    platform VARCHAR(50) NOT NULL, -- 'LinkedIn', 'Twitter/X', 'Blog', 'Newsletter', 'Instagram'
    writing_style VARCHAR(50) NOT NULL, -- 'Professional', 'Educational', 'Storytelling', etc.
    draft_content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'scheduled', 'published'
    verification_score FLOAT,
    fact_check_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Learning History & Progress Table
CREATE TABLE IF NOT EXISTS learning_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    paper_id UUID REFERENCES research_papers(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    time_spent_seconds INT DEFAULT 0,
    difficulty_rating VARCHAR(20),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'article', 'paper', 'project', 'repository', 'course'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link TEXT NOT NULL,
    reason TEXT, -- e.g., "Based on your interest in AI Agents"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- 'info', 'success', 'warning', 'digest'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. User Analytics Aggregates Table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    articles_read_count INT DEFAULT 0,
    posts_generated_count INT DEFAULT 0,
    total_reading_minutes INT DEFAULT 0,
    current_learning_streak_days INT DEFAULT 0,
    last_active_date DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AI Prompt Templates Table
CREATE TABLE IF NOT EXISTS prompt_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    style VARCHAR(50) NOT NULL,
    template_text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. System Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Domains
INSERT INTO domains (name, slug, category, description, icon_name) VALUES
('Artificial Intelligence', 'artificial-intelligence', 'Core Tech', 'Generative AI, LLMs, AI Agents, Neural Networks', 'Brain'),
('Machine Learning', 'machine-learning', 'Core Tech', 'Deep Learning, PyTorch, TensorFlow, Computer Vision', 'Cpu'),
('Data Science', 'data-science', 'Core Tech', 'Big Data, Analytics, Pandas, Data Engineering', 'Database'),
('Cybersecurity', 'cybersecurity', 'Security', 'Zero Trust, Network Security, Ethical Hacking', 'ShieldCheck'),
('Cloud Computing', 'cloud-computing', 'Cloud', 'Multi-cloud, Serverless, Infrastructure', 'Cloud'),
('AWS', 'aws', 'Cloud', 'Amazon Web Services, Lambda, S3, EC2', 'CloudLightning'),
('Azure', 'azure', 'Cloud', 'Microsoft Azure Cloud Services', 'CloudSun'),
('Oracle Cloud', 'oracle-cloud', 'Cloud', 'Oracle Cloud Infrastructure & AI Services', 'CloudCog'),
('DevOps', 'devops', 'Infrastructure', 'CI/CD, Infrastructure as Code, Automation', 'Workflow'),
('Kubernetes', 'kubernetes', 'Infrastructure', 'Container Orchestration, Cloud Native', 'Layers'),
('Docker', 'docker', 'Infrastructure', 'Containerization & Microservices', 'Box'),
('Python', 'python', 'Programming', 'Python 3, FastAPI, Django, Data Libraries', 'Code'),
('Java', 'java', 'Programming', 'Java Enterprise, Spring Boot, Microservices', 'Code2'),
('React', 'react', 'Programming', 'React 18+, Next.js, Web Interfaces', 'Layout'),
('Node.js', 'nodejs', 'Programming', 'Node.js runtime, Express, Async JS', 'Server'),
('Flutter', 'flutter', 'Programming', 'Cross-platform Mobile & Web Development', 'Smartphone'),
('Blockchain', 'blockchain', 'Emerging Tech', 'Smart Contracts, Web3, Distributed Ledgers', 'Link'),
('IoT', 'iot', 'Emerging Tech', 'Internet of Things, Edge Computing', 'Wifi'),
('Quantum Computing', 'quantum-computing', 'Emerging Tech', 'Qiskit, Quantum Algorithms, Superconducting Qubits', 'Atom'),
('Software Engineering', 'software-engineering', 'Core Tech', 'System Design, Design Patterns, Code Quality', 'Binary'),
('UI/UX', 'ui-ux', 'Design', 'User Interface, User Experience, Figma, Design Systems', 'Palette'),
('HR Technology', 'hr-technology', 'Business', 'People Analytics, Talent Tech, HR Automation', 'Users'),
('Business Analytics', 'business-analytics', 'Business', 'BI Tools, Executive Reporting, Metrics', 'TrendingUp'),
('Digital Marketing', 'digital-marketing', 'Business', 'SEO, Content Strategy, Social Media Growth', 'Megaphone'),
('Healthcare Technology', 'healthcare-technology', 'Industry', 'BioTech, Health AI, Medical Imaging', 'Activity'),
('FinTech', 'fintech', 'Industry', 'Financial Tech, Open Banking, Payment Gateways', 'DollarSign'),
('Education Technology', 'edtech', 'Industry', 'EdTech, Adaptive Learning, LMS Platforms', 'GraduationCap')
ON CONFLICT (slug) DO NOTHING;
