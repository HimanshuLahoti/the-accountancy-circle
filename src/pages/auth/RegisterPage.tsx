
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  course: z.enum(['CA', 'CS', 'CMA']),
  level: z.enum(['Foundation', 'Intermediate', 'Final']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const facultySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  specialization: z.string().min(2, 'Specialization is required'),
  experience: z.string().min(1, 'Years of experience is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type StudentFormValues = z.infer<typeof studentSchema>;
type FacultyFormValues = z.infer<typeof facultySchema>;

const RegisterPage: React.FC = () => {
  const { register: authRegister, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<'student' | 'faculty'>('student');
  
  const studentForm = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      course: 'CA',
      level: 'Foundation',
    }
  });
  
  const facultyForm = useForm<FacultyFormValues>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      specialization: '',
      experience: '',
    }
  });
  
  const onStudentSubmit = async (data: StudentFormValues) => {
    try {
      const { confirmPassword, ...userData } = data;
      await authRegister({
        ...userData,
        role: 'student',
      }, data.password);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  
  const onFacultySubmit = async (data: FacultyFormValues) => {
    try {
      const { confirmPassword, specialization, experience, ...userData } = data;
      await authRegister({
        ...userData,
        role: 'faculty',
      }, data.password);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Join our community to access all features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setActiveRole(value as 'student' | 'faculty')}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input 
                    id="student-name"
                    placeholder="Your full name"
                    {...studentForm.register('name')} 
                  />
                  {studentForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{studentForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input 
                    id="student-email"
                    type="email" 
                    placeholder="you@example.com"
                    {...studentForm.register('email')} 
                  />
                  {studentForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{studentForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-course">Course</Label>
                    <Select 
                      onValueChange={(value) => studentForm.setValue('course', value as 'CA' | 'CS' | 'CMA')} 
                      defaultValue={studentForm.getValues('course')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">CA</SelectItem>
                        <SelectItem value="CS">CS</SelectItem>
                        <SelectItem value="CMA">CMA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="student-level">Level</Label>
                    <Select 
                      onValueChange={(value) => studentForm.setValue('level', value as 'Foundation' | 'Intermediate' | 'Final')} 
                      defaultValue={studentForm.getValues('level')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Foundation">Foundation</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Final">Final</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input 
                    id="student-password"
                    type="password"
                    {...studentForm.register('password')}
                  />
                  {studentForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{studentForm.formState.errors.password.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-confirm-password">Confirm Password</Label>
                  <Input 
                    id="student-confirm-password"
                    type="password"
                    {...studentForm.register('confirmPassword')}
                  />
                  {studentForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{studentForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Student Account"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="faculty">
              <form onSubmit={facultyForm.handleSubmit(onFacultySubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty-name">Full Name</Label>
                  <Input 
                    id="faculty-name"
                    placeholder="Your full name"
                    {...facultyForm.register('name')} 
                  />
                  {facultyForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{facultyForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faculty-email">Email</Label>
                  <Input 
                    id="faculty-email"
                    type="email" 
                    placeholder="faculty@institute.edu"
                    {...facultyForm.register('email')} 
                  />
                  {facultyForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{facultyForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-specialization">Specialization</Label>
                    <Input 
                      id="faculty-specialization"
                      placeholder="Subject area"
                      {...facultyForm.register('specialization')} 
                    />
                    {facultyForm.formState.errors.specialization && (
                      <p className="text-sm text-red-500">{facultyForm.formState.errors.specialization.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faculty-experience">Experience (Years)</Label>
                    <Input 
                      id="faculty-experience"
                      placeholder="Years of teaching"
                      type="number"
                      min="0"
                      {...facultyForm.register('experience')} 
                    />
                    {facultyForm.formState.errors.experience && (
                      <p className="text-sm text-red-500">{facultyForm.formState.errors.experience.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faculty-password">Password</Label>
                  <Input 
                    id="faculty-password"
                    type="password"
                    {...facultyForm.register('password')}
                  />
                  {facultyForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{facultyForm.formState.errors.password.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faculty-confirm-password">Confirm Password</Label>
                  <Input 
                    id="faculty-confirm-password"
                    type="password"
                    {...facultyForm.register('confirmPassword')}
                  />
                  {facultyForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{facultyForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Faculty Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 w-full">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-700 font-medium hover:text-primary-800">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
