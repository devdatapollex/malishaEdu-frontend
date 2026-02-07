'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { studentService } from '@/services/student.service';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const createStudentSchema = z.object({
  // User Information
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),

  // Contact Information
  phoneNumber: z.string().min(1, 'Phone number is required'),
  secondaryPhone: z.string().optional().or(z.literal('')),

  // Personal Details
  gender: z.string().optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  nationality: z.string().optional().or(z.literal('')),
  passportNum: z.string().optional().or(z.literal('')),

  // Study Preferences
  preferredCountry: z.string().optional().or(z.literal('')),
  courseLevel: z.string().optional().or(z.literal('')),
  courseSubject: z.string().optional().or(z.literal('')),
  intakeYear: z.string().optional().or(z.literal('')),
  intakeMonth: z.string().optional().or(z.literal('')),
  budgetAmount: z.string().optional().or(z.literal('')),
  budgetCurrency: z.string().optional().or(z.literal('')),
  sourceOfFunds: z.string().optional().or(z.literal('')),
  scholarshipReq: z.boolean().default(false),
  placementReq: z.boolean().default(false),

  // Qualification Details
  lastDegreeName: z.string().optional().or(z.literal('')),
  lastInstitute: z.string().optional().or(z.literal('')),
  cgpa: z.string().optional().or(z.literal('')),
  englishTestScore: z.string().optional().or(z.literal('')),
});

type CreateStudentValues = z.infer<typeof createStudentSchema>;

export function CreateStudentPage() {
  const router = useRouter();

  const form = useForm<CreateStudentValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      secondaryPhone: '',
      gender: '',
      dateOfBirth: '',
      nationality: '',
      passportNum: '',
      preferredCountry: '',
      courseLevel: '',
      courseSubject: '',
      intakeYear: '',
      intakeMonth: '',
      budgetAmount: '',
      budgetCurrency: '',
      sourceOfFunds: '',
      scholarshipReq: false,
      placementReq: false,
      lastDegreeName: '',
      lastInstitute: '',
      cgpa: '',
      englishTestScore: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: studentService.registerStudent,
    onSuccess: () => {
      toast.success('Student registered successfully');
      router.push('/dashboard/students');
    },
    onError: (error: Error) => {
      const errorMessage = (error as { message?: string }).message || 'Failed to register student';

      if (
        errorMessage.includes('email') ||
        errorMessage.includes('duplicate') ||
        errorMessage.includes('unique')
      ) {
        toast.error('A student with this email already exists');
      } else {
        toast.error(errorMessage);
      }
    },
  });

  function onSubmit(values: CreateStudentValues) {
    const data = {
      name: values.name,
      email: values.email,
      ...(values.password && values.password.length > 0 ? { password: values.password } : {}),
      student: {
        phoneNumber: values.phoneNumber,
        ...(values.secondaryPhone && { secondaryPhone: values.secondaryPhone }),
        ...(values.gender && { gender: values.gender }),
        ...(values.dateOfBirth && { dateOfBirth: values.dateOfBirth }),
        ...(values.nationality && { nationality: values.nationality }),
        ...(values.passportNum && { passportNum: values.passportNum }),
        ...(values.preferredCountry && { preferredCountry: [values.preferredCountry] }),
        ...(values.courseLevel && { courseLevel: values.courseLevel }),
        ...(values.courseSubject && { courseSubject: [values.courseSubject] }),
        ...(values.intakeYear && { intakeYear: [values.intakeYear] }),
        ...(values.intakeMonth && { intakeMonth: [values.intakeMonth] }),
        ...(values.budgetAmount && { budgetAmount: values.budgetAmount }),
        ...(values.budgetCurrency && { budgetCurrency: values.budgetCurrency }),
        ...(values.sourceOfFunds && { sourceOfFunds: values.sourceOfFunds }),
        scholarshipReq: values.scholarshipReq,
        placementReq: values.placementReq,
        ...(values.lastDegreeName && { lastDegreeName: values.lastDegreeName }),
        ...(values.lastInstitute && { lastInstitute: values.lastInstitute }),
        ...(values.cgpa && { cgpa: values.cgpa }),
        ...(values.englishTestScore && { englishTestScore: values.englishTestScore }),
      },
    };

    registerMutation.mutate(data);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/students')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Student</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the student details. Fields marked with * are required.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* User Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Password (Optional)</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Leave empty to use default: <code className="text-xs">12345678</code>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+880 1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+880 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Personal Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Bangladesh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passportNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input placeholder="A12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Study Preferences */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Study Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Country</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Canada, USA, UK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courseSubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Computer Science, Business" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intakeYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intake Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intakeMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intake Month</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="January">January</SelectItem>
                        <SelectItem value="February">February</SelectItem>
                        <SelectItem value="March">March</SelectItem>
                        <SelectItem value="April">April</SelectItem>
                        <SelectItem value="May">May</SelectItem>
                        <SelectItem value="June">June</SelectItem>
                        <SelectItem value="July">July</SelectItem>
                        <SelectItem value="August">August</SelectItem>
                        <SelectItem value="September">September</SelectItem>
                        <SelectItem value="October">October</SelectItem>
                        <SelectItem value="November">November</SelectItem>
                        <SelectItem value="December">December</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="BDT">BDT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourceOfFunds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source of Funds</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Personal, Family, Loan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex gap-6">
                <FormField
                  control={form.control}
                  name="scholarshipReq"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Scholarship Required</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="placementReq"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Placement Required</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Qualification Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Qualification Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastDegreeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Degree Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor of Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastInstitute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Institute</FormLabel>
                    <FormControl>
                      <Input placeholder="University of Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CGPA</FormLabel>
                    <FormControl>
                      <Input placeholder="3.75" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="englishTestScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Test Score</FormLabel>
                    <FormControl>
                      <Input placeholder="IELTS 7.0 / TOEFL 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 sticky bottom-0 bg-background py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/students')}
              disabled={registerMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Register Student
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
