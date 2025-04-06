import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Book, ScrollText, BarChart2, CheckCircle2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Animation variants for components
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Type for onboarding state
type CourseType = 'CA' | 'CS' | 'CMA';
type CALevel = 'Foundation' | 'Intermediate' | 'Final';
type CSLevel = 'Executive' | 'Professional';
type CMALevel = 'Intermediate' | 'Final';

// Schema for form validation
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and privacy policy',
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Onboarding = () => {
  const navigate = useNavigate();
  const { register: authRegister, loginWithGoogle, isLoading } = useAuth();
  
  // State for multi-step form
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [level, setLevel] = useState<CALevel | CSLevel | CMALevel | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form handling
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      agreeTerms: false,
    }
  });

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleSelectCourse = (selected: CourseType) => {
    setCourse(selected);
    setStep(step + 1);
  };

  const handleSelectLevel = (selected: CALevel | CSLevel | CMALevel) => {
    setLevel(selected);
    setStep(step + 1);
  };

  const onSubmit = async (data: SignupFormValues) => {
    try {
      if (!course || !level) {
        toast.error('Please select your course and level');
        return;
      }

      await authRegister({
        name: data.name,
        email: data.email,
        role: 'student',
        course: course as 'CA' | 'CS' | 'CMA',
        level: level as 'Foundation' | 'Intermediate' | 'Final',
      }, data.password);

      setStep(step + 1);
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (!course || !level) {
        toast.error('Please select your course and level first');
        return;
      }
      
      await loginWithGoogle();
      setStep(step + 1);
    } catch (error) {
      console.error('Google sign in failed', error);
    }
  };

  const getLevelOptions = () => {
    if (!course) return [];

    switch (course) {
      case 'CA':
        return [
          { value: 'Foundation', label: 'Foundation', description: 'First step towards becoming a CA' },
          { value: 'Intermediate', label: 'Intermediate', description: 'Advanced concepts and practical knowledge' },
          { value: 'Final', label: 'Final', description: 'Comprehensive preparation for CA certification' },
        ];
      case 'CS':
        return [
          { value: 'Executive', label: 'Executive', description: 'Core company law and management concepts' },
          { value: 'Professional', label: 'Professional', description: 'Advanced corporate governance and legal expertise' },
        ];
      case 'CMA':
        return [
          { value: 'Intermediate', label: 'Intermediate', description: 'Cost accounting fundamentals and applications' },
          { value: 'Final', label: 'Final', description: 'Strategic cost management and decision making' },
        ];
      default:
        return [];
    }
  };

  const getCourseIcon = (courseType: CourseType) => {
    switch (courseType) {
      case 'CA':
        return <Book className="h-12 w-12" />;
      case 'CS':
        return <ScrollText className="h-12 w-12" />;
      case 'CMA':
        return <BarChart2 className="h-12 w-12" />;
    }
  };

  const getCourseColor = (courseType: CourseType) => {
    switch (courseType) {
      case 'CA':
        return 'bg-primary-100 border-primary-300 hover:bg-primary-200';
      case 'CS':
        return 'bg-purple-100 border-purple-300 hover:bg-purple-200';
      case 'CMA':
        return 'bg-green-100 border-green-300 hover:bg-green-200';
    }
  };

  const getActiveThemeColor = () => {
    if (!course) return 'from-primary-500 to-primary-700';
    
    switch (course) {
      case 'CA':
        return 'from-primary-500 to-primary-700';
      case 'CS':
        return 'from-purple-500 to-purple-700';
      case 'CMA':
        return 'from-green-500 to-green-700';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Progress indicator */}
        <div className="w-full mb-8 flex justify-between">
          {[0, 1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-1 flex-1 rounded-full mx-1 ${s <= step ? `bg-gradient-to-r ${getActiveThemeColor()}` : 'bg-gray-200'}`}
            />
          ))}
        </div>
        
        <Card className="w-full overflow-hidden shadow-lg border-0 bg-white backdrop-blur-sm">
          {/* Step 1: Welcome Screen */}
          {step === 0 && (
            <motion.div 
              className="p-6 flex flex-col items-center text-center"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeIn}>
                <AspectRatio ratio={16/9} className="w-48 mb-6 mx-auto">
                  <img 
                    src="/placeholder.svg" 
                    alt="Study Circle"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </AspectRatio>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-2xl font-bold mb-2">
                Welcome to Study Circle
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-gray-600 mb-8">
                A place for future CAs, CSs & CMAs to learn, share, and grow together.
              </motion.p>
              
              <motion.div variants={fadeIn}>
                <Button 
                  onClick={handleContinue} 
                  className={`w-full font-semibold bg-gradient-to-r ${getActiveThemeColor()} text-white`}
                >
                  Let's Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
          
          {/* Step 2: Choose Course */}
          {step === 1 && (
            <motion.div 
              className="p-6"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={fadeIn} className="text-xl font-bold mb-2 text-center">
                Choose Your Course
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-gray-600 mb-6 text-center">
                Select the course you're pursuing
              </motion.p>
              
              <motion.div variants={fadeIn} className="grid gap-4">
                {(['CA', 'CS', 'CMA'] as CourseType[]).map((courseType) => (
                  <motion.div 
                    key={courseType}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      onClick={() => handleSelectCourse(courseType)}
                      className={`p-4 cursor-pointer border transition-all flex items-center ${getCourseColor(courseType)}`}
                    >
                      <div className={`p-2 rounded-full mr-4 ${
                        courseType === 'CA' ? 'text-primary-600' : 
                        courseType === 'CS' ? 'text-purple-600' : 'text-green-600'
                      }`}>
                        {getCourseIcon(courseType)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {courseType === 'CA' ? 'Chartered Accountant' : 
                           courseType === 'CS' ? 'Company Secretary' : 
                           'Cost & Management Accountant'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {courseType === 'CA' ? 'Financial accounting and auditing' : 
                           courseType === 'CS' ? 'Corporate governance and compliance' : 
                           'Cost accounting and management'}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
          
          {/* Step 3: Choose Level */}
          {step === 2 && (
            <motion.div 
              className="p-6"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={fadeIn} className="text-xl font-bold mb-2 text-center">
                Select Your Level
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-gray-600 mb-6 text-center">
                Where are you in your {course} journey?
              </motion.p>
              
              <motion.div variants={fadeIn} className="grid gap-4">
                {getLevelOptions().map((option) => (
                  <motion.div 
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      onClick={() => handleSelectLevel(option.value as any)}
                      className={`p-4 cursor-pointer border border-gray-200 hover:border-${course === 'CA' ? 'primary' : course === 'CS' ? 'purple' : 'green'}-300 transition-all`}
                    >
                      <h3 className="font-semibold text-lg">{option.label}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
          
          {/* Step 4: Create Account Form */}
          {step === 3 && (
            <motion.div 
              className="p-6"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={fadeIn} className="text-xl font-bold mb-2 text-center">
                Create Your Account
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-gray-600 mb-6 text-center">
                Join the {course} {level} community
              </motion.p>
              
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div variants={fadeIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...form.register('name')}
                      className="focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...form.register('email')}
                      className="focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        {...form.register('password')}
                        className="pr-10 focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      {...form.register('agreeTerms')}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                  {form.formState.errors.agreeTerms && (
                    <p className="text-sm text-red-500">{form.formState.errors.agreeTerms.message}</p>
                  )}
                  
                  <Button
                    type="submit"
                    className={`w-full font-semibold bg-gradient-to-r ${getActiveThemeColor()} text-white`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleGoogleSignIn}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Sign in with Google
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          )}
          
          {/* Step 5: Success Screen */}
          {step === 4 && (
            <motion.div 
              className="p-6 flex flex-col items-center text-center"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={fadeIn}
                className={`p-4 rounded-full mb-6 ${
                  course === 'CA' ? 'bg-primary-100 text-primary-600' : 
                  course === 'CS' ? 'bg-purple-100 text-purple-600' : 
                  'bg-green-100 text-green-600'
                }`}
              >
                <CheckCircle2 className="h-16 w-16" />
              </motion.div>
              
              <motion.h2 variants={fadeIn} className="text-xl font-bold mb-2">
                Welcome to Study Circle!
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-gray-600 mb-8">
                You've joined the {course} {level} community
              </motion.p>
              
              <motion.div variants={fadeIn} className="w-full space-y-4 mb-6">
                <Card className="p-4 text-left border border-gray-200 hover:border-gray-300 cursor-pointer transition-all">
                  <h3 className="font-medium">🎁 Join Study Groups</h3>
                  <p className="text-sm text-gray-600">Connect with peers preparing for the same exams</p>
                </Card>
                
                <Card className="p-4 text-left border border-gray-200 hover:border-gray-300 cursor-pointer transition-all">
                  <h3 className="font-medium">📥 Upload Your First Note</h3>
                  <p className="text-sm text-gray-600">Share your knowledge with the community</p>
                </Card>
                
                <Card className="p-4 text-left border border-gray-200 hover:border-gray-300 cursor-pointer transition-all">
                  <h3 className="font-medium">👥 Join Batchmates</h3>
                  <p className="text-sm text-gray-600">Connect with students from your batch</p>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className={`w-full font-semibold bg-gradient-to-r ${getActiveThemeColor()} text-white`}
                >
                  Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
