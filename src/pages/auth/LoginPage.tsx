
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<'student' | 'faculty'>('student');
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password, activeRole);
      navigate('/dashboard');
    } catch (error) {
      // Error is already handled in the login function
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setActiveRole(value as 'student' | 'faculty')}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input 
                    id="student-email"
                    type="email" 
                    placeholder="you@example.com"
                    {...register('email')} 
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="student-password"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Student"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="faculty">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty-email">Email</Label>
                  <Input 
                    id="faculty-email"
                    type="email" 
                    placeholder="faculty@institute.edu"
                    {...register('email')} 
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="faculty-password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="faculty-password"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Faculty"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4">
            <p className="text-center text-sm text-gray-600">
              Demo Credentials:
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div>
                <p>Student Login:</p>
                <p>student@example.com</p>
                <p>password</p>
              </div>
              <div>
                <p>Faculty Login:</p>
                <p>faculty@example.com</p>
                <p>password</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-700 font-medium hover:text-primary-800">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
