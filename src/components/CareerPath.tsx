import { Lightbulb, Target, BookMarked } from 'lucide-react';

const mockData = {
  targetRole: 'Senior Frontend Developer',
  gapSkills: ['GraphQL', 'CI/CD Pipelines', 'Advanced TypeScript'],
  recommendedCourses: [
    { name: 'Advanced GraphQL', provider: 'Udemy' },
    { name: 'DevOps Essentials: CI/CD with Jenkins', provider: 'Coursera' },
    { name: 'Mastering TypeScript', provider: 'Pluralsight' },
  ],
};

export default function CareerPath() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
      <div className="flex items-center mb-6">
        <Lightbulb className="h-8 w-8 text-indigo-500 mr-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">AI-Powered Career Path Insights</h2>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-200 mb-3">
            <Target className="mr-3 text-green-500" />
            Target Role: <span className="ml-2 text-indigo-500 dark:text-indigo-400">{mockData.targetRole}</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Based on your profile and aspirations, this is your next ideal career step.</p>
        </div>

        <div className="p-4 border border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Skill Gaps Identified</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">To reach your target role, focus on acquiring these skills:</p>
          <div className="flex flex-wrap gap-3">
            {mockData.gapSkills.map((skill, index) => (
              <span key={index} className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 text-sm font-medium px-3 py-1.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-200 mb-3">
            <BookMarked className="mr-3 text-blue-500" />
            Recommended Learning Path
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Here are some highly-rated courses to bridge your skill gaps:</p>
          <ul className="space-y-3">
            {mockData.recommendedCourses.map((course, index) => (
              <li key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{course.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{course.provider}</p>
                </div>
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">View Course</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
