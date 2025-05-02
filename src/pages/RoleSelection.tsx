
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCog, Users, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RoleSelection = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const selectRole = (role: 'procurement-officer' | 'evaluator' | 'vendor') => {
    setRole(role);
    toast({
      title: "Role Selected",
      description: `You are now logged in as a ${role.replace('-', ' ')}.`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Smart Procurement Platform</h1>
        <p className="text-center text-muted-foreground mb-8">
          Please select your role to continue
        </p>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <UserCog size={32} className="text-blue-700" />
              </div>
              <CardTitle>Procurement Officer</CardTitle>
              <CardDescription>Manage tenders and make award decisions</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center">
              Create tenders, manage evaluators, and award contracts based on evaluations.
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="default"
                onClick={() => selectRole('procurement-officer')}
              >
                Enter as Procurement Officer
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Users size={32} className="text-amber-700" />
              </div>
              <CardTitle>Evaluator</CardTitle>
              <CardDescription>Evaluate and vote on proposals</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center">
              Review assigned tenders and evaluate vendor proposals based on criteria.
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => selectRole('evaluator')}
              >
                Enter as Evaluator
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Send size={32} className="text-green-700" />
              </div>
              <CardTitle>Vendor</CardTitle>
              <CardDescription>Submit proposals for open tenders</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-center">
              Browse open tenders, submit proposals, and track submission status.
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => selectRole('vendor')}
              >
                Enter as Vendor
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
