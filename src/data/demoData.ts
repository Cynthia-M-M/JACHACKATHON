import { User, Skill, Role, Roadmap, JobPosting } from '../types';

export const demoUsers: User[] = [
  {
    id: 'demo-1',
    name: 'Alice Chen',
    email: 'alice@example.com',
    current_role: 'Student (Computer Science)',
    resume_text: 'BS in CS, Python, JavaScript, SQL, basic React. Interested in data engineering and machine learning.',
  },
  {
    id: 'demo-2',
    name: 'Bob Martinez',
    email: 'bob@example.com',
    current_role: 'Full Stack Developer',
    resume_text: 'Senior Dev with 5y experience. Expert in Node.js, React, PostgreSQL. Seeking to transition into Product Management.',
  },
];

export const demoSkills: Skill[] = [
  { id: 'skill-1', name: 'Python', description: 'General-purpose programming language' },
  { id: 'skill-2', name: 'JavaScript', description: 'Web development language' },
  { id: 'skill-3', name: 'React', description: 'Frontend UI library' },
  { id: 'skill-4', name: 'SQL', description: 'Database query language' },
  { id: 'skill-5', name: 'Data Engineering', description: 'Data pipeline design and implementation' },
  { id: 'skill-6', name: 'Machine Learning', description: 'ML algorithms and model training' },
  { id: 'skill-7', name: 'Product Management', description: 'Product strategy and roadmapping' },
  { id: 'skill-8', name: 'Node.js', description: 'Backend JavaScript runtime' },
  { id: 'skill-9', name: 'PostgreSQL', description: 'Relational database system' },
  { id: 'skill-10', name: 'AWS', description: 'Cloud infrastructure' },
];

export const demoRoles: Role[] = [
  {
    id: 'role-1',
    title: 'Data Engineer',
    description: 'Design and build scalable data pipelines, ETL systems, and data warehouses. Master Python, SQL, and cloud platforms (AWS, GCP, Azure).',
    average_salary: 165000,
    required_skills: ['Python', 'SQL', 'Data Engineering', 'AWS'],
  },
  {
    id: 'role-2',
    title: 'Machine Learning Engineer',
    description: 'Build and deploy machine learning models in production. Focus on MLOps, model optimization, and real-time inference systems.',
    average_salary: 185000,
    required_skills: ['Python', 'Machine Learning', 'AWS'],
  },
  {
    id: 'role-3',
    title: 'Product Manager',
    description: 'Drive product vision, roadmap, and strategy. Lead cross-functional teams and make data-driven decisions to maximize user impact.',
    average_salary: 170000,
    required_skills: ['Product Management', 'Communication', 'Analytics'],
  },
  {
    id: 'role-4',
    title: 'Senior Full Stack Engineer',
    description: 'Architect and lead backend and frontend systems. Mentor junior engineers and drive technical excellence across the stack.',
    average_salary: 175000,
    required_skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
  },
];

export const demoCourses = [
  {
    id: 'course-1',
    title: 'The Complete Python for Data Engineering',
    provider: 'Udemy',
    url: 'https://www.udemy.com/course/the-complete-python-for-data-engineering/',
    duration_hours: 40,
    skill_tags: ['Python', 'Data Engineering'],
  },
  {
    id: 'course-2',
    title: 'Machine Learning Specialization',
    provider: 'Coursera',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    duration_hours: 120,
    skill_tags: ['Machine Learning', 'Python'],
  },
  {
    id: 'course-3',
    title: 'Advanced SQL for Data Analysis',
    provider: 'DataCamp',
    url: 'https://www.datacamp.com/courses/advanced-sql-for-data-engineers',
    duration_hours: 30,
    skill_tags: ['SQL'],
  },
  {
    id: 'course-4',
    title: 'AWS Data Engineering on AWS',
    provider: 'Linux Academy',
    url: 'https://www.linuxacademy.com/course/aws-data-engineering-on-aws/',
    duration_hours: 50,
    skill_tags: ['AWS', 'Data Engineering'],
  },
  {
    id: 'course-5',
    title: 'Reforge: Product Management',
    provider: 'Reforge',
    url: 'https://www.reforge.com/courses/product-management',
    duration_hours: 35,
    skill_tags: ['Product Management'],
  },
];

export const demoJobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Data Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA (Remote)',
    url: 'https://stripe.com/jobs/listing/senior-data-engineer',
    description: 'Build and maintain data infrastructure for payment processing. Work with petabyte-scale datasets.',
    required_skills: ['Python', 'SQL', 'Data Engineering', 'AWS'],
    salary_range: '$170k - $220k',
  },
  {
    id: 'job-2',
    title: 'Machine Learning Engineer',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    url: 'https://openai.com/careers/machine-learning-engineer',
    description: 'Develop and deploy ML models for language AI. Work on cutting-edge deep learning systems.',
    required_skills: ['Python', 'Machine Learning', 'AWS'],
    salary_range: '$180k - $250k',
  },
  {
    id: 'job-3',
    title: 'Senior Product Manager',
    company: 'Figma',
    location: 'San Francisco, CA (Remote)',
    url: 'https://fig.ma/jobs/product-manager-senior',
    description: 'Lead product strategy for design collaboration tools. Shape the future of design software.',
    required_skills: ['Product Management'],
    salary_range: '$170k - $240k',
  },
  {
    id: 'job-4',
    title: 'Full Stack Engineer',
    company: 'Vercel',
    location: 'Remote',
    url: 'https://vercel.com/careers/full-stack-engineer',
    description: 'Build next-gen deployment and frontend infrastructure. Work on Next.js ecosystem.',
    required_skills: ['React', 'Node.js', 'PostgreSQL'],
    salary_range: '$150k - $220k',
  },
];

export const demoRoadmaps: Roadmap[] = [
  {
    id: 'roadmap-1',
    user_id: 'demo-1',
    target_role: 'Data Engineer',
    missing_skills: ['Data Engineering', 'AWS'],
    recommended_courses: [
      { skill: 'Data Engineering', courses: [demoCourses[0], demoCourses[3]] },
      { skill: 'AWS', courses: [demoCourses[3]] },
    ],
    timeline_weeks: 16,
    status: 'in_progress',
    created_at: new Date('2025-12-01').toISOString(),
    milestones: [
      { week: 4, milestone: 'Complete Python for Data Engineering' },
      { week: 8, milestone: 'Build first data pipeline project' },
      { week: 12, milestone: 'Complete AWS certification' },
      { week: 16, milestone: 'Ready for entry-level Data Engineer role' },
    ],
  },
  {
    id: 'roadmap-2',
    user_id: 'demo-2',
    target_role: 'Product Manager',
    missing_skills: ['Product Management'],
    recommended_courses: [
      { skill: 'Product Management', courses: [demoCourses[4]] },
    ],
    timeline_weeks: 8,
    status: 'not_started',
    created_at: new Date('2025-12-01').toISOString(),
    milestones: [
      { week: 4, milestone: 'Complete Product Management Masterclass' },
      { week: 8, milestone: 'Deliver PM case studies; Ready for transition' },
    ],
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  current_role: string;
  resume_text: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  title: string;
  description: string;
  average_salary: number;
  required_skills: string[];
}

export interface Roadmap {
  id: string;
  user_id: string;
  target_role: string;
  missing_skills: string[];
  recommended_courses: { skill: string; courses: typeof demoCourses }[];
  timeline_weeks: number;
  status: 'not_started' | 'in_progress' | 'completed';
  created_at: string;
  milestones: { week: number; milestone: string }[];
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  required_skills: string[];
  salary_range: string;
}
