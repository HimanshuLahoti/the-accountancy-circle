
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Calendar,
  Bookmark,
  MessageSquare,
  Bell,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const studyProgressData = [
  { month: 'Jan', hours: 10 },
  { month: 'Feb', hours: 15 },
  { month: 'Mar', hours: 12 },
  { month: 'Apr', hours: 18 },
  { month: 'May', hours: 20 },
  { month: 'Jun', hours: 25 },
];

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'CA Intermediate Tax Laws Webinar',
    date: '2025-04-10',
    time: '16:00 - 17:30',
  },
  {
    id: 2,
    title: 'Mock Test: Corporate Accounting',
    date: '2025-04-15',
    time: '10:00 - 12:00',
  },
  {
    id: 3,
    title: 'Study Group: Advanced Audit Techniques',
    date: '2025-04-20',
    time: '18:00 - 19:00',
  },
];

// Mock recent discussions
const recentDiscussions = [
  {
    id: 1,
    title: 'How to approach Cost Accounting problems?',
    author: 'Rahul K',
    replies: 8,
    lastActivity: '2 hours ago',
  },
  {
    id: 2,
    title: 'Best books for CA Final Audit preparation',
    author: 'Priya S',
    replies: 12,
    lastActivity: '4 hours ago',
  },
  {
    id: 3,
    title: 'Help with Tax implications on foreign investments',
    author: 'Amit V',
    replies: 5,
    lastActivity: '1 day ago',
  },
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Section with Student Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary-100">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-primary-100 text-primary-800 text-xl">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-gray-500">
              {user?.course} {user?.level} Student
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/resources">
              <BookOpen className="w-4 h-4" />
              <span>Resources</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/community">
              <MessageSquare className="w-4 h-4" />
              <span>Community</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
            <Link to="/events">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Study Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-gray-500">Current syllabus completion</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Saved Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Items in your library</p>
            <Button variant="link" className="p-0 h-auto text-primary-700" asChild>
              <Link to="/resources/saved" className="flex items-center text-xs mt-2">
                <Bookmark className="w-3 h-3 mr-1" /> View Saved
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Discussion Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">Active discussions</p>
            <Button variant="link" className="p-0 h-auto text-primary-700" asChild>
              <Link to="/community" className="flex items-center text-xs mt-2">
                <MessageSquare className="w-3 h-3 mr-1" /> Join Discussions
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">Events this week</p>
            <Button variant="link" className="p-0 h-auto text-primary-700" asChild>
              <Link to="/events" className="flex items-center text-xs mt-2">
                <Calendar className="w-3 h-3 mr-1" /> View Calendar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Study Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Study Hours Trend</CardTitle>
          <CardDescription>Your learning activity over the past months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studyProgressData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-700" />
              <span>Upcoming Events</span>
            </CardTitle>
            <CardDescription>Events and webinars scheduled for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="bg-primary-50 text-primary-700 p-2 rounded-md">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              ))}
              
              <Button variant="link" className="pl-0" asChild>
                <Link to="/events" className="flex items-center">
                  View All Events <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Discussions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-700" />
              <span>Recent Discussions</span>
            </CardTitle>
            <CardDescription>Stay updated with community conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDiscussions.map(discussion => (
                <div key={discussion.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <div className="bg-secondary-50 text-secondary-700 p-2 rounded-md">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{discussion.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>By {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                      <span>•</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              ))}
              
              <Button variant="link" className="pl-0" asChild>
                <Link to="/community" className="flex items-center">
                  View All Discussions <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* To Do List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary-700" />
            <span>Study To-Do List</span>
          </CardTitle>
          <CardDescription>Track your learning goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="task1" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="task1" className="text-sm font-medium text-gray-700">Complete Company Law chapter 5 by Wednesday</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="task2" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" checked readOnly />
              <label htmlFor="task2" className="text-sm font-medium text-gray-400 line-through">Submit tax case study assignment</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="task3" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="task3" className="text-sm font-medium text-gray-700">Practice 25 MCQs on Corporate Accounting</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="task4" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="task4" className="text-sm font-medium text-gray-700">Register for upcoming Advanced Audit webinar</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="task5" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="task5" className="text-sm font-medium text-gray-700">Revise Economics chapters 1-3 for mock test</label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
