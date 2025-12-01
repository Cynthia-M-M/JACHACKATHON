'''
graph AkaziPath {
    has_entry_node: true;
}

// ------------------ Nodes (Named Types) ------------------

node User {
    has name: str;
    has email: str;
    has current_role: str;
    has resume_text: str;
}

node Skill {
    has name: str;
    has description: str;
}

node Role {
    has title: str;
    has description: str;
    has average_salary: float;
}

node Course {
    has title: str;
    has provider: str;
    has url: str;
}

node JobPosting {
    has title: str;
    has company: str;
    has location: str;
    has url: str;
}

// ------------------ Edges (Named Types) ------------------

edge has_skill;      // User -> Skill
edge requires;       // Role -> Skill
edge interested_in;  // User -> Role
edge teaches;        // Course -> Skill (inverse: Skill -> Course)
edge suggests;       // Role -> Course (recommended)

// ------------------ Multi-Agent Walkers ------------------

// 1) ResumeParser: extracts skills and summary from resume_text using byLLM
walker ResumeParser {
    can 'parse_resume' with User by llm('You are an extractor agent. Given the resume text, extract a list of skills and a short professional summary.');
}

// 2) SkillGraphManager: create/merge Skill/Role/Course nodes and edges in the OSP graph
walker SkillGraphManager {
    can 'ensure_skill' with str(skill_name) {
        // Create or return existing skill node
        sk = visitor::Skill(name==skill_name);
        if (!sk) {
            sk = new Skill(name=skill_name, description="");
        }
        report sk;
    }

    can 'link_user_skills' with User, list(skills) {
        for s in skills {
            sk = call 'ensure_skill'(s);
            if (!here--[has_skill]-->sk) {
                here -[has_skill]-> sk;
            }
        }
        report true;
    }

    can 'seed_role' with Role {
        // Add role and its required skills (expects Role.requires edges to be seeded elsewhere)
        r = new Role(title=Role.title, description=Role.description, average_salary=Role.average_salary);
        report r;
    }
}

// 3) RoadmapPlanner: uses byLLM to generate a learning plan and returns structured steps
walker RoadmapPlanner {
    has planner_name: str = "roadmap-planner-v1";

    can 'plan_for_role' with User, str(target_role) by llm('You are a career planner. Given the user skills and the target role, list missing skills, recommend relevant courses, and suggest a learning timeline.');
}

// 4) JobFetcher: placeholder walker to fetch job postings (could call external API via hooks)
walker JobFetcher {
    can 'search_jobs' with str(query), str(location) {
        // In a real deployment this would call out to an API; here we return a placeholder list
        jobs = [
            {"title":"{query} Engineer","company":"Acme","location":location,"url":"https://jobs.example/acme"}
        ];
        report jobs;
    }
}

// 5) Orchestrator walker: spawnable endpoints intended for Jac-Client / Spawn() calls
walker Orchestrator {
    can 'generate_roadmap' with User, str(target_role) {
        // Step 1: parse resume for skills
        parsed = spawn('ResumeParser','parse_resume', here);
        skills = parsed.skills ? parsed.skills : [];

        // Step 2: update graph with discovered skills
        call 'SkillGraphManager'::'link_user_skills'(here, skills);

        // Step 3: plan a roadmap using RoadmapPlanner
        roadmap = spawn('RoadmapPlanner','plan_for_role', here, target_role);

        // Step 4: attach some job suggestions
        jobs = spawn('JobFetcher','search_jobs', target_role, "remote");

        // Structured response suitable for frontend
        response = {"user":here.name, "target_role":target_role, "roadmap":roadmap, "jobs":jobs};
        
        // Step 5: Persist roadmap to Supabase via Express server
        if (here.email) {
            payload = {
                "user_id": here.email,
                "roadmap": {
                    "target_role": target_role,
                    "missing_skills": skills,
                    "timeline_weeks": 12,
                    "status": "not_started",
                    "milestones": [
                        {"week": 1, "milestone": "Foundation"},
                        {"week": 6, "milestone": "Intermediate"},
                        {"week": 12, "milestone": "Ready for Role"}
                    ]
                }
            };
            
            // Call Express endpoint to save roadmap
            std.http_post('http://localhost:4000/api/save-roadmap', payload);
            std.log("Roadmap saved to Supabase.");
        }
        
        report response;
    }

    can 'evaluate_profile' with User {
        // Quick profile evaluation + short summary
        parsed = spawn('ResumeParser','parse_resume', here);
        summary = parsed.summary ? parsed.summary : "";
        skills = parsed.skills ? parsed.skills : [];
        score = spawn('RoadmapPlanner','plan_for_role', here, here.current_role);
        report {"summary":summary, "skills":skills, "auto_plan":score};
    }
}

// ------------------ Example helper / seed walker ------------------
walker Loader {
    can 'init_graph' with entry {
        std.log("Seeding sample roles and skills...");
        // Example: seed a Role with required skills
        r = new Role(title="Data Engineer", description="Build data pipelines", average_salary=90000.0);
        s1 = new Skill(name="Python", description="Programming language");
        s2 = new Skill(name="ETL", description="ETL concepts");
        r -[requires]-> s1;
        r -[requires]-> s2;
        // Seed a course
        c = new Course(title="Intro to Data Engineering", provider="OpenLearn", url="https://example.com/course");
        c -[teaches]-> s2;
        std.log("Seed complete.");
    }
}

// ------------------ Notes ------------------
// - This file provides a minimal, hackathon-ready skeleton for the Smart Career Path Navigator.
// - `ResumeParser` and `RoadmapPlanner` use `by llm` prompts (placeholders) demonstrating byLLM usage.
// - `Orchestrator` walker exposes spawnable actions (`generate_roadmap`, `evaluate_profile`) meant
//   to be called from a Jac Client using `spawn()` rather than direct API calls.
// - To complete the project: connect real byLLM credentials, implement external job/courses APIs,
//   add unit/demo data, and document prompts and evaluation metrics in the README.
'''