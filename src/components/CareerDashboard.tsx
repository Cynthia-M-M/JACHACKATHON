import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2, Clock, Target, TrendingUp, Briefcase, LogOut } from 'lucide-react';
import { demoRoadmaps, demoRoles, demoJobs, demoSkills } from '@/data/demoData';

interface Roadmap {
  id: string;
  user_id: string;
  target_role: string;
  missing_skills: string[];
  timeline_weeks: number;
  status: 'not_started' | 'in_progress' | 'completed';
  milestones: { week: number; milestone: string }[];
}

export function CareerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(demoRoadmaps);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(demoRoadmaps[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        await loadUserRoadmaps(session.user.id);
      } else {
        // Use demo data if not logged in
        setRoadmaps(demoRoadmaps);
        setSelectedRoadmap(demoRoadmaps[0]);
      }
      setLoading(false);
    });
  }, []);

  const loadUserRoadmaps = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading roadmaps:', error);
        setRoadmaps(demoRoadmaps);
      } else if (data && data.length > 0) {
        // Convert DB data to component format
        const formattedRoadmaps = data.map((r: any) => ({
          id: r.id,
          user_id: r.user_id,
          target_role: r.roadmap?.target_role || 'Unknown',
          missing_skills: r.roadmap?.missing_skills || [],
          timeline_weeks: r.roadmap?.timeline_weeks || 12,
          status: r.roadmap?.status || 'not_started',
          milestones: r.roadmap?.milestones || [],
        }));
        setRoadmaps(formattedRoadmaps);
        setSelectedRoadmap(formattedRoadmaps[0] || null);
      } else {
        setRoadmaps(demoRoadmaps);
        setSelectedRoadmap(demoRoadmaps[0]);
      }
    } catch (err) {
      console.error('Error:', err);
      setRoadmaps(demoRoadmaps);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRoadmaps(demoRoadmaps);
    setSelectedRoadmap(demoRoadmaps[0]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  const roadmap = selectedRoadmap || demoRoadmaps[0];
  const targetRole = demoRoles.find(r => r.title === roadmap.target_role);
  const relatedJobs = demoJobs.filter(j => j.required_skills.some(s => targetRole?.required_skills.includes(s)));

  const progressPercent = roadmap.status === 'completed' ? 100 : roadmap.status === 'in_progress' ? 50 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-12">
      {/* Header with Auth Info */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Career Navigator</h1>
            {!user && <p className="text-sm text-slate-400">Demo Mode - Log in to see your personal roadmaps</p>}
            {user && <p className="text-sm text-emerald-400">Logged in: {user.email}</p>}
          </div>
          {user && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Career Path Navigator</h1>
        <p className="text-slate-400">Your personalized AI-powered career roadmap</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Roadmap Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Roadmap Card */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">{roadmap.target_role}</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">
                    Expected timeline: {roadmap.timeline_weeks} weeks
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      roadmap.status === 'completed'
                        ? 'bg-green-500/20 text-green-300 border-green-500'
                        : roadmap.status === 'in_progress'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500'
                          : 'bg-slate-500/20 text-slate-300 border-slate-500'
                    }`}
                  >
                    {roadmap.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-300">Progress</span>
                  <span className="text-sm text-slate-400">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              {/* Skills Overview */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-blue-400" />
                  Skills to Acquire
                </h3>
                <div className="flex flex-wrap gap-2">
                  {roadmap.missing_skills.map(skill => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-200 border-blue-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  Milestones
                </h3>
                <div className="space-y-2">
                  {roadmap.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-3 bg-slate-700/30 rounded-lg border border-slate-600/50"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-blue-300">W{m.week}</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-200">{m.milestone}</p>
                        <p className="text-xs text-slate-500">Week {m.week}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Details */}
          {targetRole && (
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
                  Role Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Description</p>
                  <p className="text-slate-200">{targetRole.description}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Average Salary</p>
                  <p className="text-lg font-semibold text-green-400">
                    ${targetRole.average_salary.toLocaleString()}/year
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {targetRole.required_skills.map(skill => (
                      <Badge key={skill} variant="outline" className="border-purple-500/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Matching Jobs */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-lg">
                <TrendingUp className="w-4 h-4 mr-2 text-amber-400" />
                Matching Jobs
              </CardTitle>
              <CardDescription className="text-slate-400">{relatedJobs.length} open positions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedJobs.slice(0, 3).map(job => (
                <div
                  key={job.id}
                  className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-amber-500/50 transition"
                >
                  <h4 className="text-sm font-semibold text-white">{job.title}</h4>
                  <p className="text-xs text-slate-400">{job.company}</p>
                  <p className="text-xs text-slate-500 mt-1">{job.location}</p>
                  <p className="text-xs font-medium text-amber-300 mt-2">{job.salary_range}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 border-slate-600 hover:bg-slate-700">
                View All Jobs <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Completion</span>
                <span className="text-sm font-bold text-green-400">{progressPercent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Est. Salary</span>
                <span className="text-sm font-bold text-green-400">
                  ${targetRole?.average_salary ? (targetRole.average_salary / 1000).toFixed(0) : 0}k
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Weeks Left</span>
                <span className="text-sm font-bold text-blue-400">
                  {Math.max(0, roadmap.timeline_weeks - (roadmap.status === 'completed' ? roadmap.timeline_weeks : roadmap.status === 'in_progress' ? roadmap.timeline_weeks / 2 : 0))}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6">
            <Clock className="w-4 h-4 mr-2" />
            Start Learning Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CareerDashboard;
