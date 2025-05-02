
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Textarea 
} from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ChevronLeft, ThumbsUp, ThumbsDown, Award, FileText, Download } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

// Mock data for a proposal
const proposalData = {
  id: 'P-2023-001',
  tenderId: 'T-2023-42',
  tenderTitle: 'IT Infrastructure Upgrade',
  vendorName: 'TechSolutions Inc.',
  vendorId: 'V-2023-01',
  submissionDate: '2025-04-20',
  status: 'under_review',
  evaluationScore: 87,
  evaluationVotes: 2,
  evaluationsRequired: 3,
  documents: [
    { name: 'Technical Proposal.pdf', size: '2.4 MB', type: 'application/pdf' },
    { name: 'Financial Proposal.xlsx', size: '1.1 MB', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { name: 'Company Credentials.pdf', size: '4.8 MB', type: 'application/pdf' },
  ],
  evaluations: [
    { evaluatorId: 'E001', evaluatorName: 'John Smith', score: 85, comment: 'Strong technical approach, reasonable pricing.', recommended: true },
    { evaluatorId: 'E002', evaluatorName: 'Emma Wilson', score: 89, comment: 'Excellent proposal with comprehensive coverage of requirements.', recommended: true },
    { evaluatorId: 'E003', evaluatorName: 'Michael Brown', score: null, comment: null, recommended: null },
  ],
  technicalScore: 88,
  financialScore: 86,
  totalScore: 87,
};

const ProposalDetail = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState('overview');
  const [evaluationComment, setEvaluationComment] = useState('');
  const [evaluationScore, setEvaluationScore] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<boolean | null>(null);
  
  // Navigate back to proposals list
  const goBack = () => {
    navigate('/proposals');
  };
  
  // Submit evaluation (for evaluators)
  const submitEvaluation = () => {
    if (!evaluationScore || evaluationComment.trim() === '' || recommendation === null) {
      toast({
        title: "Incomplete Evaluation",
        description: "Please provide a score, comment, and recommendation before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Evaluation Submitted",
      description: "Your evaluation has been submitted successfully.",
    });
    
    // In a real application, we would update the proposal evaluation data
    // and redirect back to the proposals list or evaluations dashboard
  };
  
  // Award contract (for procurement officers)
  const awardContract = () => {
    toast({
      title: "Contract Awarded",
      description: `Contract has been awarded to ${proposalData.vendorName}.`,
    });
    
    // In a real application, we would update the proposal status
    // and redirect back to the tender detail page
  };

  // Render evaluator form
  const renderEvaluatorForm = () => {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Submit Your Evaluation</CardTitle>
          <CardDescription>
            Please evaluate this proposal based on the provided documentation and requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Score (0-100)</h3>
            <div className="flex gap-2">
              {[70, 75, 80, 85, 90, 95, 100].map((score) => (
                <Button
                  key={score}
                  variant={evaluationScore === score ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEvaluationScore(score)}
                >
                  {score}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Recommendation</h3>
            <div className="flex gap-2">
              <Button
                variant={recommendation === true ? "default" : "outline"}
                size="sm"
                onClick={() => setRecommendation(true)}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                Recommend
              </Button>
              <Button
                variant={recommendation === false ? "default" : "outline"}
                size="sm"
                onClick={() => setRecommendation(false)}
                className="flex items-center gap-1"
              >
                <ThumbsDown className="h-4 w-4" />
                Do Not Recommend
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Evaluation Comments</h3>
            <Textarea
              placeholder="Enter your evaluation comments and feedback..."
              value={evaluationComment}
              onChange={(e) => setEvaluationComment(e.target.value)}
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={submitEvaluation} className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Submit Evaluation
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={goBack} className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Proposals</span>
            </Button>
          </div>
          
          {role === 'procurement-officer' && proposalData.evaluationVotes === proposalData.evaluationsRequired && (
            <Button 
              onClick={awardContract}
              className="flex items-center gap-1"
            >
              <Award className="h-4 w-4" />
              Award Contract
            </Button>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proposal {proposalData.id}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-blue-100 text-blue-800">
              {proposalData.status === 'under_review' ? 'Under Review' : proposalData.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Submitted by <span className="font-medium">{proposalData.vendorName}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              for Tender <span className="font-medium">{proposalData.tenderId}</span>
            </span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Vendor Information</h3>
                    <p className="font-medium">{proposalData.vendorName}</p>
                    <p className="text-sm text-muted-foreground">ID: {proposalData.vendorId}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Tender</h3>
                      <p className="font-medium">{proposalData.tenderTitle}</p>
                      <p className="text-sm text-muted-foreground">ID: {proposalData.tenderId}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Submitted On</h3>
                      <p>{new Date(proposalData.submissionDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-md p-4">
                      <h3 className="text-sm font-medium text-blue-800 mb-2">Technical Score</h3>
                      <p className="text-2xl font-bold text-blue-800">
                        {proposalData.technicalScore}%
                      </p>
                    </div>
                    
                    <div className="bg-green-50 rounded-md p-4">
                      <h3 className="text-sm font-medium text-green-800 mb-2">Financial Score</h3>
                      <p className="text-2xl font-bold text-green-800">
                        {proposalData.financialScore}%
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-md p-4">
                      <h3 className="text-sm font-medium text-purple-800 mb-2">Overall Score</h3>
                      <p className="text-2xl font-bold text-purple-800">
                        {proposalData.totalScore}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Status</CardTitle>
                <CardDescription>
                  {proposalData.evaluationVotes} of {proposalData.evaluationsRequired} evaluations completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposalData.evaluations.map((evaluation, index) => (
                    <div 
                      key={index}
                      className={`p-4 border rounded-md ${
                        evaluation.score !== null 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{evaluation.evaluatorName || `Evaluator ${index + 1}`}</h3>
                          <p className="text-sm text-muted-foreground">ID: {evaluation.evaluatorId}</p>
                        </div>
                        {evaluation.score !== null ? (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </div>
                      
                      {evaluation.score !== null && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-muted-foreground">Score:</div>
                            <div className="font-medium">{evaluation.score}/100</div>
                          </div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-muted-foreground">Recommendation:</div>
                            <div>
                              {evaluation.recommended ? (
                                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3" /> 
                                  Recommended
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                                  <ThumbsDown className="h-3 w-3" /> 
                                  Not Recommended
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {evaluation.comment && (
                            <div className="mt-2">
                              <div className="text-sm text-muted-foreground mb-1">Comment:</div>
                              <div className="text-sm p-2 bg-white rounded-md border border-gray-100">
                                {evaluation.comment}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {role === 'evaluator' && renderEvaluatorForm()}
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Documents</CardTitle>
                <CardDescription>
                  Documents submitted as part of this proposal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proposalData.documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <div>{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.size}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="evaluations">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Details</CardTitle>
                <CardDescription>
                  Complete evaluation breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                {role === 'vendor' ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Detailed evaluation information is only available to evaluators and procurement officers.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border rounded-md p-6">
                      <h3 className="text-lg font-medium mb-4">Technical Evaluation</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span>Technical compliance</span>
                          <span className="font-medium">92/100</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Methodology</span>
                          <span className="font-medium">85/100</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Experience & qualifications</span>
                          <span className="font-medium">90/100</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Timeline & approach</span>
                          <span className="font-medium">86/100</span>
                        </div>
                        <div className="flex justify-between font-medium text-blue-800">
                          <span>Overall technical score</span>
                          <span>{proposalData.technicalScore}/100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-6">
                      <h3 className="text-lg font-medium mb-4">Financial Evaluation</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span>Budget adherence</span>
                          <span className="font-medium">83/100</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Cost effectiveness</span>
                          <span className="font-medium">87/100</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span>Value for money</span>
                          <span className="font-medium">88/100</span>
                        </div>
                        <div className="flex justify-between font-medium text-green-800">
                          <span>Overall financial score</span>
                          <span>{proposalData.financialScore}/100</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-md">
                      <span className="text-lg font-medium">Final score</span>
                      <span className="text-2xl font-bold text-purple-800">{proposalData.totalScore}/100</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProposalDetail;
