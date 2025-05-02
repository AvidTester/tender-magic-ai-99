
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';
import { ThumbsUp, Search, Filter, FileText, Eye } from 'lucide-react';

// Sample evaluation assignments
const evaluationAssignments = [
  {
    id: 'E-2023-001',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    proposalId: 'P-2023-001',
    vendorName: 'TechSolutions Inc.',
    assignedDate: '2025-04-21',
    status: 'pending',
    dueDate: '2025-04-28',
  },
  {
    id: 'E-2023-002',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    proposalId: 'P-2023-002',
    vendorName: 'Digital Innovators',
    assignedDate: '2025-04-21',
    status: 'completed',
    dueDate: '2025-04-28',
    completedDate: '2025-04-23',
    score: 78
  },
  {
    id: 'E-2023-003',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    proposalId: 'P-2023-003',
    vendorName: 'NextGen Systems',
    assignedDate: '2025-04-21',
    status: 'pending',
    dueDate: '2025-04-28',
  },
  {
    id: 'E-2023-004',
    tenderId: 'T-2023-41',
    tenderTitle: 'Office Furniture Procurement',
    proposalId: 'P-2023-004',
    vendorName: 'ModernSpace Furnishings',
    assignedDate: '2025-04-16',
    status: 'pending',
    dueDate: '2025-04-26',
  },
];

// Sample evaluation committee assignments for procurement officers
const committeeAssignments = [
  {
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    committeeSize: 3,
    evaluationsCompleted: 2,
    evaluationsTotal: 9,
    progress: 22,
  },
  {
    tenderId: 'T-2023-41',
    tenderTitle: 'Office Furniture Procurement',
    committeeSize: 3,
    evaluationsCompleted: 0,
    evaluationsTotal: 6,
    progress: 0,
  },
  {
    tenderId: 'T-2023-39',
    tenderTitle: 'Marketing Campaign Implementation',
    committeeSize: 3,
    evaluationsCompleted: 3,
    evaluationsTotal: 3,
    progress: 100,
  },
];

const Evaluations = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter evaluations based on search and filters
  const filteredEvaluations = evaluationAssignments.filter(evaluation => {
    const matchesSearch = 
      evaluation.tenderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || evaluation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Go to evaluation form
  const goToEvaluation = (proposalId: string) => {
    navigate(`/proposal/${proposalId}`);
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // View committee details
  const viewCommittee = (tenderId: string) => {
    navigate(`/tender/${tenderId}`);
  };

  // Render evaluator view
  const renderEvaluatorView = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Evaluation Assignments</CardTitle>
          <CardDescription>
            Review and evaluate proposals assigned to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search assignments..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tender</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No evaluation assignments found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{evaluation.tenderId}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {evaluation.tenderTitle}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{evaluation.vendorName}</TableCell>
                      <TableCell>
                        {new Date(evaluation.assignedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(evaluation.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {renderStatusBadge(evaluation.status)}
                          {evaluation.status === 'completed' && (
                            <div className="mt-1 flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Score:</span>
                              <span className="text-xs font-medium">{evaluation.score}/100</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={evaluation.status === 'pending' ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToEvaluation(evaluation.proposalId)}
                          className="inline-flex items-center"
                        >
                          {evaluation.status === 'pending' ? (
                            <>
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Evaluate
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render procurement officer view
  const renderProcurementOfficerView = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Committees</CardTitle>
          <CardDescription>
            Monitor evaluation progress across all tenders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tender</TableHead>
                  <TableHead>Committee Size</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-center">Evaluations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {committeeAssignments.map((committee) => (
                  <TableRow key={committee.tenderId}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{committee.tenderId}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {committee.tenderTitle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{committee.committeeSize} evaluators</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-200 overflow-hidden">
                          <div 
                            className={`h-full ${
                              committee.progress === 100 
                                ? 'bg-green-500' 
                                : committee.progress > 0 
                                  ? 'bg-blue-500' 
                                  : 'bg-slate-300'
                            }`} 
                            style={{ width: `${committee.progress}%` }} 
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {committee.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {committee.evaluationsCompleted}/{committee.evaluationsTotal}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewCommittee(committee.tenderId)}
                        className="inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evaluations</h1>
          <p className="text-muted-foreground mt-2">
            {role === 'evaluator' 
              ? 'Review and evaluate proposals assigned to you' 
              : 'Monitor evaluation progress across all tenders'}
          </p>
        </div>

        {role === 'evaluator' ? renderEvaluatorView() : renderProcurementOfficerView()}
      </div>
    </MainLayout>
  );
};

export default Evaluations;
