import { BookOpen, Zap } from 'lucide-react';

const mockCourses = [
  { title: 'Advanced GraphQL', provider: 'Udemy', skill: 'GraphQL', description: 'Master GraphQL by building real-world applications with Node.js and React.' },
  { title: 'DevOps Essentials: CI/CD', provider: 'Coursera', skill: 'CI/CD Pipelines', description: 'Learn to build automated CI/CD pipelines with Jenkins, Docker, and Kubernetes.' },
  { title: 'Mastering TypeScript', provider: 'Pluralsight', skill: 'Advanced TypeScript', description: 'Deep dive into advanced TypeScript features like generics, decorators, and mapped types.' },
  { title: 'React Performance Optimization', provider: 'Frontend Masters', skill: 'React', description: 'Identify and fix performance bottlenecks in your React applications.' },
  { title: 'AWS for Developers', provider: 'A Cloud Guru', skill: 'AWS', description: 'Understand core AWS services and how to leverage them in your applications.' },
];

export default function Learning() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning & Development</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Courses recommended to help you bridge your skill gaps.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
                <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Zap size={12} />
                  {course.skill}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">{course.provider}</p>
              <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">{course.description}</p>
            </div>
            <a href="#" className="w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors">
              <BookOpen size={18} />
              Start Learning
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
