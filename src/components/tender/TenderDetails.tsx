
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { FileText, Clock, Users, Award, Check, AlertCircle, ChevronLeft, ThumbsUp } from 'lucide-react';

// Mock data for a tender
const tender = {
  id: 'T-2023-42',
  title: 'IT Infrastructure Upgrade',
  description: 'Comprehensive upgrade of the organization\'s IT infrastructure including servers, networking equipment, and software systems.',
  status: 'review',
  category: 'IT Services',
  publishedDate: '2025-04-10',
  deadline: '2025-05-15',
  evaluatorsRequired: 3,
  evaluatorsCompleted: 2,
  documents: ['Technical Requirements.pdf', 'Financial Template.xlsx', 'Terms and Conditions.pdf'],
  evaluators: [
    { id: 'E1', name: 'John Smith', avatar: 'JS', department: 'IT', hasEvaluated: true },
    { id: 'E2', name: 'Emma Wilson', avatar: 'EW', department: 'Procurement', hasEvaluated: true },
    { id: 'E3', name: 'Michael Brown', avatar: 'MB', department: 'Finance', hasEvaluated: false }
  ]
};

// Mock data for proposals with evaluation votes
const proposals = [
  { 
    id: 'P-001', 
    vendorName: 'TechSolutions Inc.', 
    submissionDate: '2025-04-20', 
    totalScore: 87,
    evaluationVotes: 2,
    isRecommended: true,
    evaluations: [
      { evaluatorId: 'E1', score: 85, completed: true },
      { evaluatorId: 'E2', score: 89, completed: true },
      { evaluatorId: 'E3', score: null, completed: false }
    ]
  },
  { 
    id: 'P-002', 
    vendorName: 'Digital Innovators', 
    submissionDate: '2025-04-18', 
    totalScore: 72,
    evaluationVotes: 0,
    isRecommended: false,
    evaluations: [
      { evaluatorId: 'E1', score: 70, completed: true },
      { evaluatorId: 'E2', score: 74, completed: true },
      { evaluatorId: 'E3', score: null, completed: false }
    ]
  },
  { 
    id: 'P-003', 
    vendorName: 'NextGen Systems', 
    submissionDate: '2025-04-22', 
    totalScore: 81,
    evaluationVotes: 1,
    isRecommended: false,
    evaluations: [
      { evaluatorId: 'E1', score: 78, completed: true },
      { evaluatorId: 'E2', score: 84, completed: true },
      { evaluatorId: 'E3', score: null, completed: false }
    ]
  }
];

export function TenderDetails() {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [awardDialogOpen, setAwardDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<typeof proposals[0] | null>(null);
  
  // Handle tender navigation
  const goBack = () => {
    navigate('/tenders');
  };
  
  // Open award dialog
  const openAwardDialog = (proposal: typeof proposals[0]) => {
    setSelectedProposal(proposal);
    setAwardDialogOpen(true);
  };
  
  // Award the tender
  const awardTender = () => {
    if (selectedProposal) {
      toast({
        title: "Tender Awarded",
        description: `Tender has been successfully awarded to ${selectedProposal.vendorName}.`,
      });
      setAwardDialogOpen(false);
      // In a real app, you would update the tender status and selected vendor
    }
  };
  
  // Calculate completion percentage
  const completionPercentage = Math.round((tender.evaluatorsCompleted / tender.evaluatorsRequired) * 100);
  
  // Sort proposals by evaluation votes (descending)
  const rankedProposals = [...proposals].sort((a, b) => b.evaluationVotes - a.evaluationVotes);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={goBack} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Tenders</span>
          </Button>
        </div>
        <div>
          {tender.status === 'review' && tender.evaluatorsCompleted === tender.evaluatorsRequired && (
            <Button
              onClick={() => openAwardDialog(rankedProposals[0])}
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Award Tender
            </Button>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{tender.title}</h1>
        <div className="flex gap-2 mt-2">
          <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
          <span className="text-sm text-muted-foreground">ID: {tender.id}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="evaluators">Evaluators</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tender Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Description</h3>
                  <p>{tender.description}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Category</h3>
                    <p>{tender.category}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Published Date</h3>
                      <p>{new Date(tender.publishedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Deadline</h3>
                      <p>{new Date(tender.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Evaluator Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {tender.evaluatorsCompleted} of {tender.evaluatorsRequired} completed
                  </span>
                  <span className="text-sm font-medium">
                    {completionPercentage}%
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <div className="mt-4">
                  {tender.evaluators.map((evaluator) => (
                    <div key={evaluator.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Avatar className={`h-8 w-8 ${evaluator.hasEvaluated ? 'border-2 border-green-500' : ''}`}>
                          <AvatarFallback className={evaluator.hasEvaluated ? 'bg-green-100 text-green-800' : ''}>
                            {evaluator.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{evaluator.name}</div>
                          <div className="text-xs text-muted-foreground">{evaluator.department}</div>
                        </div>
                      </div>
                      {evaluator.hasEvaluated ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Top Ranking Proposal
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rankedProposals.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xl font-medium">{rankedProposals[0].vendorName}</div>
                        <div className="text-sm text-muted-foreground">Proposal {rankedProposals[0].id}</div>
                      </div>
                      <div className="text-3xl font-bold text-blue-600">{rankedProposals[0].totalScore}%</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Evaluation Votes:</span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{rankedProposals[0].evaluationVotes}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Evaluation Status:</span>
                        {completionPercentage === 100 ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">Complete</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            {tender.evaluatorsCompleted}/{tender.evaluatorsRequired} Evaluators
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Submission Date:</span>
                        <span>{new Date(rankedProposals[0].submissionDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">AI Recommended:</span>
                        {rankedProposals[0].isRecommended ? (
                          <Badge className="bg-green-100 text-green-800">Yes</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No proposals have been evaluated yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="proposals">
          <Card>
            <CardHeader>
              <CardTitle>Ranked Proposals</CardTitle>
              <CardDescription>
                Proposals are ranked based on evaluator votes and scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-center">Evaluation Votes</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>AI Recommended</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedProposals.map((proposal, index) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{proposal.id}</TableCell>
                      <TableCell>{proposal.vendorName}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{proposal.evaluationVotes}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{proposal.totalScore}%</TableCell>
                      <TableCell>{new Date(proposal.submissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {proposal.isRecommended ? (
                          <Badge className="bg-green-100 text-green-800">Yes</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => openAwardDialog(proposal)}
                          disabled={tender.evaluatorsCompleted < tender.evaluatorsRequired}
                        >
                          <Award className="h-4 w-4 mr-1" />
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {rankedProposals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No proposals found for this tender.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evaluators">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Evaluators</CardTitle>
              <CardDescription>
                Evaluation committee members assigned to review and score proposals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tender.evaluators.map((evaluator) => (
                  <div key={evaluator.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar className={`h-10 w-10 ${evaluator.hasEvaluated ? 'border-2 border-green-500' : ''}`}>
                        <AvatarFallback className={evaluator.hasEvaluated ? 'bg-green-100 text-green-800' : ''}>
                          {evaluator.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{evaluator.name}</div>
                        <div className="text-xs text-muted-foreground">{evaluator.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {evaluator.hasEvaluated ? (
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                ))}
                
                {tender.evaluators.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No evaluators assigned to this tender.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Tender Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tender.documents.map((document, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span>{document}</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
                
                {tender.documents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No documents available for this tender.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={awardDialogOpen} onOpenChange={setAwardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Award Tender</DialogTitle>
            <DialogDescription>
              As a Procurement Officer, you are selecting the winning proposal for this tender based on evaluator votes. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {selectedProposal.vendorName.substring(0, 2)}
                </div>
                <div>
                  <div className="text-lg font-medium">{selectedProposal.vendorName}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{selectedProposal.evaluationVotes} votes</span>
                    </div>
                    <div>Score: {selectedProposal.totalScore}%</div>
                  </div>
                </div>
              </div>
              
              {completionPercentage < 100 && (
                <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-start gap-2 border border-yellow-200">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Warning: Evaluation incomplete</p>
                    <p className="text-sm">
                      Not all evaluators have completed their reviews.
                      {tender.evaluatorsCompleted} of {tender.evaluatorsRequired} evaluations are complete.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAwardDialogOpen(false)}>Cancel</Button>
            <Button onClick={awardTender} className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              Confirm Award
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
