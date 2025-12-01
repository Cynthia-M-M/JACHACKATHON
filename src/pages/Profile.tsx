import { useState } from 'react';
import { toast } from 'sonner';
import { Upload, User, PlusCircle, Edit } from 'lucide-react';

const initialSkills = ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Node.js'];

export default function Profile() {
  const [resumeText, setResumeText] = useState('');
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState('');

  const handleResumeUpload = () => {
    if (!resumeText) {
      toast.error('Please paste your resume content first.');
      return;
    }
    toast.success('Resume parsed and skills updated!');
    // In a real app, you'd parse the resume and update skills state.
    setSkills([...skills, 'Python', 'REST APIs']);
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
      toast.info(`Skill '${newSkill}' added.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your skills and experience to get personalized career insights.</p>
      </div>

      {/* Resume Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold flex items-center mb-4"><Upload className="mr-3" /> Upload or Paste Resume</h2>
        <textarea
          className="w-full h-40 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>
        <button
          onClick={handleResumeUpload}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Upload size={18} />
          Process Resume
        </button>
      </div>

      {/* Skills Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold flex items-center mb-4"><User className="mr-3" /> My Skills</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {skills.map((skill, index) => (
            <span key={index} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
              {skill}
              <button className="text-indigo-400 hover:text-indigo-600">
                <Edit size={14} />
              </button>
            </span>
          ))}
        </div>

        <h3 className="text-lg font-medium mb-2">Add a new skill</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-grow p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Docker"
          />
          <button
            onClick={addSkill}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
