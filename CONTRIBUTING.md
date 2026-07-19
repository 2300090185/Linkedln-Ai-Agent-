# Contributing to AI LinkedIn Research Agent

Welcome! We are excited that you want to help develop this project. 

### 📝 How to Contribute & Approval Process
1. **Fork the Repository:** Create a personal copy of this repository on your own GitHub account.
2. **Make Changes:** Clone your fork, create a new branch, and implement your changes.
3. **Submit a Pull Request (PR):** Submit a PR back to the main repository's `main` branch.
4. **Owner Approval:** As the repository owner, I will review all incoming pull requests, test your contributions, and approve them before they are merged into the live project.

Please review the guidelines below before starting.

---

## 1. Getting Started (Local Setup)

To set up your local development environment:

1. **Fork and Clone the Repository:**
   ```bash
   git clone https://github.com/2300090185/Linkedln-Ai-Agent-.git
   cd Linkedln-Ai-Agent-
   ```

2. **Set Up a Virtual Environment:**
   - **On Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **On macOS/Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your test credentials (like your `GEMINI_API_KEY`, Telegram Bot tokens, or SMTP email details). **Note: `.env` is listed in `.gitignore` and will never be committed to GitHub.**

5. **Test Your Setup:**
   Run the orchestrator script locally to ensure everything works:
   ```bash
   python app.py
   ```

---

## 2. Development Workflow & Branching Strategy

We follow a clean branching workflow:

1. Make sure your local `main` branch is up-to-date:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create a new branch for your feature or bug fix:
   - For new features: `feature/your-feature-name` (e.g., `feature/web-dashboard`)
   - For bug fixes: `bugfix/issue-name` (e.g., `bugfix/smtp-port-crash`)
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Implement your changes, test them locally, and commit.

---

## 3. Coding Standards

- **PEP 8 Compliance:** Follow PEP 8 guidelines for Python code style (use descriptive names, 4 spaces for indentation).
- **Docstrings and Comments:** Include docstrings for all new classes and methods (see `config.py` as an example).
- **Security:** Do not commit any raw API keys, SMTP passwords, or tokens. Ensure all credentials are loaded through the `Config` class from the environment.
- **SQLite Database Integrity:** If you test the code locally, your local runs might modify `history/history.db`. To prevent pushing your personal testing database history online, run a database reset or keep database commits focused.

---

## 4. Web Application Migration Roadmap

As we build the web application dashboard:
- Keep the backend API layer separated (e.g., using **FastAPI**).
- Place static frontend files (HTML, CSS, JS) inside a dedicated `static/` or `web/` directory.
- Avoid using bloated styling libraries unless agreed upon; prefer **Vanilla CSS** with a modern dark/glassmorphic design system.

---

## 5. Commit Messages & Pull Requests

### Commit Message Guidelines
We use descriptive prefixes to make our git log clean and readable:
- `feat:` for new features (e.g., `feat: add database method to delete posts`)
- `fix:` for bug fixes (e.g., `fix: fallback for empty environment variables`)
- `docs:` for documentation changes (e.g., `docs: add contributing guidelines`)
- `chore:` for utility tasks, packages, or configurations.

### Submitting a Pull Request (PR)
1. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Go to the GitHub repository and click **"Compare & pull request"**.
3. Provide a clear description of the changes you made, what was tested, and why it is necessary.
4. Request review from a teammate. Once approved, the changes will be merged into the `main` branch!
