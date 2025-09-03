# Full Stack Developer Coding Test
## Task Management System with Team Collaboration

**Time Allocation:** 5-7 days (part-time after work + weekends)
**Tech Stack:** Next.js, Tailwind CSS, PostgreSQL, Prisma

**Important:** This is a test of problem-solving ability and ingenuity, not memorization. You are **strongly encouraged** to use all available resources including AI assistants (ChatGPT, Claude, Copilot), documentation, Stack Overflow, tutorials, and any other tools that help you build the best solution possible.

## Demo Login

For quick testing, you can use the following dummy credentials:

**Admin User**
- Email: `admin@gmail.com`
- Password: `123456`


## Development Approach

**We value resourcefulness over rote memorization.** This test evaluates:
- Your ability to learn and adapt quickly
- Problem-solving and debugging skills
- How well you leverage available tools and resources
- Code quality and architectural decisions
- Implementation efficiency and creativity

**Resources You Should Use:**
- 🤖 **AI Assistants** (ChatGPT, Claude, GitHub Copilot, etc.) - Use them liberally!
- 📚 **Official Documentation** (Next.js, Prisma, Tailwind docs)
- 🌐 **Community Resources** (Stack Overflow, GitHub, dev blogs)
- 🎥 **Tutorials and Guides** (YouTube, dev courses, articles)
- 💬 **Developer Communities** (Discord, Reddit, forums)

**The goal is to deliver the best possible solution using whatever tools help you succeed.**

---

## Project Overview

Build a **Task Management System** where users can create, manage, and collaborate on tasks within teams. This project tests core full-stack development skills while being achievable within the time constraint.

## Core Requirements

### 1. Authentication & User Management
- User registration and login (email/password)
- JWT-based authentication
- Basic profile management (name, email, avatar upload optional)

### 2. Database Schema Design (Prisma)
Design and implement the following entities:
- **Users** (id, email, name, password_hash, created_at)
- **Teams** (id, name, description, created_at, owner_id)
- **TeamMembers** (team_id, user_id, role, joined_at)
- **Tasks** (id, title, description, status, priority, due_date, assigned_to, team_id, created_by, created_at, updated_at)

### 3. Core Features
#### Team Management
- Create and manage teams
- Invite users to teams (simple email-based invite)
- View team members and their roles

#### Task Management
- Create, edit, and delete tasks
- Assign tasks to team members
- Set task priority (Low, Medium, High) and status (Todo, In Progress, Done)
- Set due dates
- View tasks in different formats (list view, board view like Kanban)

#### Dashboard
- Personal dashboard showing assigned tasks
- Team overview with task statistics
- Recent activity feed

### 4. API Implementation
- RESTful API endpoints using Next.js API routes
- Proper error handling and validation
- Authentication middleware
- Database operations using Prisma

### 5. Frontend (Next.js + Tailwind)
- Responsive design that works on desktop and mobile
- Clean, intuitive UI using Tailwind CSS
- Client-side routing and state management
- Form validation and loading states
- Real-time updates (optional: use polling or WebSocket)

---

## Technical Requirements

### Must Have
1. **Next.js 14+** with App Router
2. **Tailwind CSS** for styling
3. **PostgreSQL** database
4. **Prisma** ORM with migrations
5. **TypeScript** (mandatory)
6. Environment variable configuration
7. Basic error handling and validation
8. Responsive design

### Bonus Points (Choose 2-3)
1. **Unit Tests** using Jest/Vitest + React Testing Library
2. **Docker** setup (Dockerfile + docker-compose for app and database)
3. **Advanced UI/UX** 
   - Dark/light mode toggle
   - Drag-and-drop for Kanban board
   - Smooth animations and transitions
   - Toast notifications
4. **Additional Features**
   - Task comments/activity log
   - File attachments
   - Email notifications
   - Search and filtering
5. **Performance Optimization**
   - Image optimization
   - Caching strategies
   - Database query optimization

---

## Evaluation Criteria

### Problem-Solving & Resourcefulness (25%)
- Effective use of available tools and resources
- Creative solutions to technical challenges
- Ability to learn and implement unfamiliar concepts
- Quality of research and resource utilization

### Code Quality (25%)
- Clean, readable, and well-structured TypeScript code
- Proper type definitions and interfaces
- Type safety throughout the application
- Error handling and edge cases

### Database Design (20%)
- Proper schema design with relationships
- Efficient queries using Prisma
- Data validation and constraints
- Migration files

### Frontend Implementation (20%)
- Responsive and intuitive UI
- Proper component structure
- State management
- Form handling and validation

### API Design (15%)
- RESTful endpoints
- Proper HTTP status codes
- Authentication and authorization
- Input validation

### Bonus Features (15%)
- Implementation of bonus requirements
- Code documentation
- Git commit quality
- Innovative features or approaches

---

## Submission Guidelines

### Required Deliverables
1. **Forked GitHub Repository** with:
   - Complete source code in your forked repo
   - All commits showing your development progress
   - README.md with setup instructions (update the existing one)
   - Environment variables template (.env.example)
   - Database migration files

2. **Documentation** (update README.md)
   - API endpoints documentation
   - Setup and installation guide
   - Assumptions and design decisions
   - Resources and tools used (AI assistants, tutorials, etc.)
   - Challenges encountered and solutions found
   - Time spent on each feature (rough estimate)

3. **Demo**
   - Deployed version (Vercel/Netlify + Railway/Supabase) OR
   - Local setup instructions with screenshots in README
   - Brief video walkthrough (2-3 minutes) showcasing key features

### Submission Process
1. Complete your project in the forked repository
2. Ensure all code is committed and pushed to your fork
3. Deploy your application (if possible)
4. Update the README.md with comprehensive documentation
5. Send us the link to your forked repository
6. Include the deployed URL (if available) in your submission email

### Evaluation Process
1. Code review focusing on architecture and best practices
2. Testing the application functionality
3. Technical discussion about implementation choices
4. Questions about potential improvements and scaling

---

## Getting Started Hints

## Getting Started

### Step 1: Fork This Repository
1. Click the "Fork" button at the top right of this repository
2. Clone your forked repository to your local machine
3. Create a new branch for your development work
4. Start building your solution in the forked repository

### Step 2: Project Setup
```sql
-- Example: Create database and user
CREATE DATABASE taskmanager;
CREATE USER taskuser WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE taskmanager TO taskuser;
```

### Key Pages to Implement
- `/` - Landing/Dashboard page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/teams` - Teams overview
- `/teams/[id]` - Team detail with tasks
- `/tasks` - Personal tasks view
- `/profile` - User profile

### Recommended Packages
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "@types/bcryptjs": "^2.4.6",
    "jsonwebtoken": "^9.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## Success Metrics

A successful submission should demonstrate:
- ✅ Working authentication system
- ✅ CRUD operations for teams and tasks
- ✅ Proper database relationships and queries
- ✅ Responsive UI that's pleasant to use
- ✅ Clean, maintainable code structure in your forked repository
- ✅ Basic error handling
- ✅ Clear setup instructions and documentation
- ✅ Good commit history showing development progress

**Good luck! We're excited to see your implementation. Remember to commit frequently and push your progress to your forked repository.**