
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Upload, 
  Download, 
  Video, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Learn, Share, and Succeed Together
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Your one-stop platform for CA, CS, and CMA students in India to connect, 
                share resources, and boost your academic success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-white text-primary-900 hover:bg-gray-100">
                  <Link to="/register">Join the Community</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-primary-700">
                  <Link to="/resources">Browse Resources</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg" 
                alt="Students collaborating" 
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Features Designed for Students</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to excel in your CA, CS, or CMA journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Student Community</h3>
              <p className="mt-2 text-gray-600">
                Connect with fellow students, share experiences, ask questions, and get support.
              </p>
              <Link to="/community" className="mt-4 inline-flex items-center text-primary-700 font-medium">
                Join Discussions <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Study Materials</h3>
              <p className="mt-2 text-gray-600">
                Access and share quality notes, books, and study resources for all subjects.
              </p>
              <Link to="/resources" className="mt-4 inline-flex items-center text-primary-700 font-medium">
                Browse Resources <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Events & Webinars</h3>
              <p className="mt-2 text-gray-600">
                Stay updated with upcoming webinars, workshops, and important exam dates.
              </p>
              <Link to="/events" className="mt-4 inline-flex items-center text-primary-700 font-medium">
                View Schedule <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Expert Faculty</h3>
              <p className="mt-2 text-gray-600">
                Learn directly from experienced professors and industry professionals.
              </p>
              <Link to="/faculty" className="mt-4 inline-flex items-center text-secondary-700 font-medium">
                Meet Our Faculty <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-secondary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Share Knowledge</h3>
              <p className="mt-2 text-gray-600">
                Upload your notes, summaries, and help other students with your insights.
              </p>
              <Link to="/resources/upload" className="mt-4 inline-flex items-center text-secondary-700 font-medium">
                Contribute <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-secondary-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Live Sessions</h3>
              <p className="mt-2 text-gray-600">
                Participate in live doubt-clearing sessions and interactive webinars.
              </p>
              <Link to="/events" className="mt-4 inline-flex items-center text-secondary-700 font-medium">
                Join Sessions <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Paths Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Path</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Resources specially curated for your professional journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CA Path */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center mb-6">
                <span className="text-primary-700 font-bold text-xl">CA</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chartered Accountancy</h3>
              <p className="text-gray-700 mb-6">
                Complete resources for CA Foundation, Intermediate, and Final levels with expert guidance.
              </p>
              <Button variant="outline" className="border-primary-700 text-primary-700 hover:bg-primary-50">
                <Link to="/resources/ca">Explore CA Resources</Link>
              </Button>
            </div>

            {/* CS Path */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center mb-6">
                <span className="text-secondary-700 font-bold text-xl">CS</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Secretary</h3>
              <p className="text-gray-700 mb-6">
                Comprehensive study materials for CS Foundation, Executive, and Professional levels.
              </p>
              <Button variant="outline" className="border-secondary-700 text-secondary-700 hover:bg-secondary-50">
                <Link to="/resources/cs">Explore CS Resources</Link>
              </Button>
            </div>

            {/* CMA Path */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-purple-200 flex items-center justify-center mb-6">
                <span className="text-purple-700 font-bold text-xl">CMA</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cost Management Accountancy</h3>
              <p className="text-gray-700 mb-6">
                Full resources for CMA Foundation, Intermediate, and Final examination preparation.
              </p>
              <Button variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-50">
                <Link to="/resources/cma">Explore CMA Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Community Says</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=Priya+Sharma&background=1E40AF&color=fff" 
                    alt="Priya Sharma" 
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">CA Final Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform has been a game-changer for my CA preparation. The study resources 
                and community discussions helped me tackle difficult topics."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=Rahul+Kumar&background=047857&color=fff" 
                    alt="Rahul Kumar" 
                    className="h-12 w-12 rounded-full" 
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Rahul Kumar</h4>
                  <p className="text-sm text-gray-500">CS Executive Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The webinars and expert sessions gave me insights I couldn't find anywhere else. 
                The faculty here truly understand students' needs."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=Neha+Patel&background=7E22CE&color=fff" 
                    alt="Neha Patel" 
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Neha Patel</h4>
                  <p className="text-sm text-gray-500">CMA Intermediate Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Being able to connect with peers facing similar challenges has made my learning journey
                less stressful and more collaborative."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Academic Success?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our community of students and faculty today to access resources, 
            share knowledge, and excel in your professional journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-primary-900 hover:bg-gray-100">
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-primary-700">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
