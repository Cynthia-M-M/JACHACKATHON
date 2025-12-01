import { Search, MapPin, Filter } from 'lucide-react';

const mockRoles = [
  { title: 'Senior Frontend Developer', company: 'Asante Shop', location: 'Nairobi, Kenya', skills: ['React', 'TypeScript', 'GraphQL'], salary: 'KES 250k - 350k' },
  { title: 'Full-Stack Engineer (Python/React)', company: 'Imani Systems', location: 'Lagos, Nigeria', skills: ['Python', 'Django', 'React', 'AWS'], salary: 'NGN 800k - 1.2M' },
  { title: 'UI/UX Designer', company: 'Jollof Kitchen', location: 'Accra, Ghana', skills: ['Figma', 'User Research', 'Prototyping'], salary: 'GHS 15k - 22k' },
  { title: 'DevOps Engineer', company: 'Sankofa Solutions', location: 'Remote', skills: ['AWS', 'Kubernetes', 'CI/CD'], salary: '$5k - $7k USD' },
];

export default function ExploreRoles() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Roles</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Discover job opportunities that match your career goals.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8 sticky top-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search job title or keyword"
              className="w-full pl-10 p-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 p-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="w-full md:w-auto bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2 px-4 rounded-md flex items-center justify-center gap-2">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Role Listings */}
      <div className="space-y-6">
        {mockRoles.map((role, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{role.title}</h3>
                <p className="text-md font-semibold text-gray-800 dark:text-gray-200">{role.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <MapPin size={14} className="mr-1.5" />
                  {role.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{role.salary}</p>
                <button className="mt-2 bg-indigo-600 text-white text-sm py-1.5 px-4 rounded-full hover:bg-indigo-700">Apply</button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {role.skills.map(skill => (
                  <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
