
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  VideoIcon,
  ChevronRight,
  BarChart4,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const studentEngagementData = [
  { subject: 'Tax', students: 45 },
  { subject: 'Audit', students: 30 },
  { subject: 'Accounts', students: 37 },
  { subject: 'Law', students: 28 },
  { subject: 'Costing', students: 22 },
];

const resourcePopularityData = [
  { name: 'Notes', value: 45 },
  { name: 'Videos', value: 30 },
  { name: 'MCQs', value: 15 },
  { name: 'Case Studies', value: 10 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

// Mock scheduled sessions
const scheduledSessions = [
  {
    id: 1,
    title: 'Corporate Tax Laws - Advanced Concepts',
    date: '2025-04-12',
    time: '15:00 - 16:30',
    registeredStudents: 78,
  },
  {
    id: 2,
    title: 'Audit Preparation Masterclass',
    date: '2025-04-18',
    time: '18:00 - 19:30',
    registeredStudents: 64,
  },
  {
    id: 3,
    title: 'Pre-Exam Doubt Clearing Session',
    date: '2025-04-25',
    time: '16:00 - 17:00',
    registeredStudents: 112,
  },
];

// Mock student questions
const recentQuestions = [
  {
    id: 1,
    question: 'What are the key differences between IFRS and Indian Accounting Standards?',
    student: 'Rahul K',
    subject: 'Accounting',
    timestamp: '2 hours ago',
    replies: 2,
  },
  {
    id: 2,
    question: 'Can you explain Section 80C deductions with examples?',
    student: 'Priya S',
    subject: 'Taxation',
    timestamp: '5 hours ago',
    replies: 1,
  },
  {
    id: 3,
    question: 'How to approach case studies in Company Law exams?',
    student: 'Amit V',
    subject: 'Law',
    timestamp: '1 day ago',
    replies: 3,
  },
];

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Section with Faculty Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-secondary-100">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-secondary-100 text-secondary-800 text-xl">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Prof. {user?.name?.split(' ')[0]}!</h1>
            <p className="text-gray-500">
              Faculty Member
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/faculty/resources">
              <BookOpen className="w-4 h-4" />
              <span>Manage Resources</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/faculty/sessions">
              <VideoIcon className="w-4 h-4" />
              <span>Sessions</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/faculty/students">
              <Users className="w-4 h-4" />
              <span>Students</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">Study materials shared</p>
            <Button variant="link" className="p-0 h-auto text-secondary-700" asChild>
              <Link to="/faculty/resources" className="flex items-center text-xs mt-2">
                <FileText className="w-3 h-3 mr-1" /> Manage Resources
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Scheduled this month</p>
            <Button variant="link" className="p-0 h-auto text-secondary-700" asChild>
              <Link to="/faculty/sessions" className="flex items-center text-xs mt-2">
                <Calendar className="w-3 h-3 mr-1" /> View Schedule
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-500">Learning from you</p>
            <Button variant="link" className="p-0 h-auto text-secondary-700" asChild>
              <Link to="/faculty/students" className="flex items-center text-xs mt-2">
                <Users className="w-3 h-3 mr-1" /> View Students
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Questions to answer</p>
            <Button variant="link" className="p-0 h-auto text-secondary-700" asChild>
              <Link to="/faculty/queries" className="flex items-center text-xs mt-2">
                <MessageSquare className="w-3 h-3 mr-1" /> Answer Questions
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="w-5 h-5 text-secondary-700" />
              <span>Student Engagement by Subject</span>
            </CardTitle>
            <CardDescription>Number of students per subject area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentEngagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Resource Popularity Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary-700" />
              <span>Resource Type Popularity</span>
            </CardTitle>
            <CardDescription>Which resources are most accessed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourcePopularityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {resourcePopularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary-700" />
              <span>Your Upcoming Sessions</span>
            </CardTitle>
            <CardDescription>Scheduled webinars and classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledSessions.map(session => (
                <div key={session.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="bg-secondary-50 text-secondary-700 p-2 rounded-md">
                    <VideoIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{session.title}</p>
                    <div className="grid grid-cols-2 text-sm text-gray-500 gap-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(session.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{session.registeredStudents} registered</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Manage</Button>
                </div>
              ))}
              
              <Button variant="link" className="pl-0" asChild>
                <Link to="/faculty/sessions" className="flex items-center">
                  View All Sessions <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary-700" />
              <span>Recent Student Questions</span>
            </CardTitle>
            <CardDescription>Questions waiting for your expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuestions.map(question => (
                <div key={question.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="bg-primary-50 text-primary-700 p-2 rounded-md">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{question.question}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>By {question.student}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{question.subject}</span>
                      <span>•</span>
                      <span>{question.timestamp}</span>
                    </div>
                  </div>
                  <Button size="sm">Answer</Button>
                </div>
              ))}
              
              <Button variant="link" className="pl-0" asChild>
                <Link to="/faculty/queries" className="flex items-center">
                  View All Questions <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
