import CareerPath from '../components/CareerPath';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Your Smart Career Path Navigator</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Welcome back, let's shape your future.</p>
      </div>
      <CareerPath />
    </div>
  );
}
