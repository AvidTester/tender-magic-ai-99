
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Eye, Search, Filter, FileText, ThumbsUp, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';

// Sample proposal data
const proposals = [
  {
    id: 'P-2023-001',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    vendorName: 'TechSolutions Inc.',
    submissionDate: '2025-04-20',
    status: 'under_review',
    evaluationScore: 87,
    evaluationVotes: 2,
    evaluationsRequired: 3
  },
  {
    id: 'P-2023-002',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    vendorName: 'Digital Innovators',
    submissionDate: '2025-04-18',
    status: 'under_review',
    evaluationScore: 72,
    evaluationVotes: 0,
    evaluationsRequired: 3
  },
  {
    id: 'P-2023-003',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    vendorName: 'NextGen Systems',
    submissionDate: '2025-04-22',
    status: 'under_review',
    evaluationScore: 81,
    evaluationVotes: 1,
    evaluationsRequired: 3
  },
  {
    id: 'P-2023-004',
    tenderId: 'T-2023-41',
    tenderTitle: 'Office Furniture Procurement',
    vendorName: 'ModernSpace Furnishings',
    submissionDate: '2025-04-15',
    status: 'pending_review',
    evaluationScore: 0,
    evaluationVotes: 0,
    evaluationsRequired: 3
  },
  {
    id: 'P-2023-005',
    tenderId: 'T-2023-41',
    tenderTitle: 'Office Furniture Procurement',
    vendorName: 'Corporate Interiors Ltd',
    submissionDate: '2025-04-16',
    status: 'pending_review',
    evaluationScore: 0,
    evaluationVotes: 0,
    evaluationsRequired: 3
  },
  {
    id: 'P-2023-006',
    tenderId: 'T-2023-39',
    tenderTitle: 'Marketing Campaign Implementation',
    vendorName: 'Creative Solutions Agency',
    submissionDate: '2025-04-10',
    status: 'awarded',
    evaluationScore: 92,
    evaluationVotes: 3,
    evaluationsRequired: 3
  }
];

// Sample vendor proposals (for vendor role view)
const vendorProposals = [
  {
    id: 'P-2023-007',
    tenderId: 'T-2023-42',
    tenderTitle: 'IT Infrastructure Upgrade',
    submissionDate: '2025-04-21',
    status: 'under_review',
    feedback: null
  },
  {
    id: 'P-2023-008',
    tenderId: 'T-2023-39',
    tenderTitle: 'Marketing Campaign Implementation',
    submissionDate: '2025-04-05',
    status: 'rejected',
    feedback: 'Budget constraints exceeded the acceptable threshold.'
  },
];

const Proposals = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const [searchTerm, setSearchTerm] = useState('');
  const [tenderFilter, setTenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique tender IDs for filtering
  const uniqueTenders = Array.from(new Set(proposals.map(proposal => proposal.tenderId)));

  // Filter proposals based on search, filters, and role
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = 
      proposal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTender = tenderFilter === 'all' || proposal.tenderId === tenderFilter;
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    
    // For evaluator role, we'd filter to show only assigned proposals
    // For this demo, we'll just show all
    
    return matchesSearch && matchesTender && matchesStatus;
  });

  // View proposal details
  const viewProposal = (proposalId: string) => {
    navigate(`/proposal/${proposalId}`);
  };

  // Evaluate proposal (for evaluators)
  const evaluateProposal = (proposalId: string) => {
    navigate(`/evaluations/${proposalId}`);
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'evaluated':
        return <Badge className="bg-purple-100 text-purple-800">Evaluated</Badge>;
      case 'awarded':
        return <Badge className="bg-green-100 text-green-800">Awarded</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Render vendor view
  const renderVendorView = () => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Proposals</CardTitle>
            <CardDescription>
              View and track your submitted proposals
            </CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            Submit New Proposal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorProposals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      You haven't submitted any proposals yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  vendorProposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{proposal.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{proposal.tenderId}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {proposal.tenderTitle}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(proposal.status)}</TableCell>
                      <TableCell>
                        {new Date(proposal.submissionDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        {proposal.feedback ? (
                          <span className="text-sm text-muted-foreground">{proposal.feedback}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">No feedback yet</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => viewProposal(proposal.id)}
                          className="inline-flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
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

  // Render evaluator/procurement officer view
  const renderEvaluatorView = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Proposals</CardTitle>
          <CardDescription>
            {role === 'evaluator' 
              ? 'Evaluate vendor proposals assigned to you' 
              : 'View and manage vendor proposals for tenders'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search proposals..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={tenderFilter} onValueChange={setTenderFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by tender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tenders</SelectItem>
                  {uniqueTenders.map((tenderId) => (
                    <SelectItem key={tenderId} value={tenderId}>{tenderId}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="evaluated">Evaluated</SelectItem>
                  <SelectItem value="awarded">Awarded</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Tender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Evaluation Progress</TableHead>
                  <TableHead className="text-center">Votes</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProposals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No proposals found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{proposal.id}</TableCell>
                      <TableCell>{proposal.vendorName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{proposal.tenderId}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {proposal.tenderTitle}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(proposal.status)}</TableCell>
                      <TableCell className="text-center">
                        {proposal.evaluationVotes}/{proposal.evaluationsRequired}
                      </TableCell>
                      <TableCell className="text-center">
                        {proposal.evaluationVotes > 0 && (
                          <div className="flex items-center justify-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-blue-500" />
                            <span>{proposal.evaluationVotes}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(proposal.submissionDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => viewProposal(proposal.id)}
                          className="inline-flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {role === 'evaluator' && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => evaluateProposal(proposal.id)}
                            className="inline-flex items-center"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Evaluate
                          </Button>
                        )}
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {role === 'vendor' ? 'My Proposals' : 'Proposals'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {role === 'vendor' 
              ? 'Track your submitted proposals and their status'
              : role === 'evaluator'
                ? 'Evaluate vendor proposals assigned to you'
                : 'View and manage vendor proposals for tenders'}
          </p>
        </div>
        
        {role === 'vendor' ? renderVendorView() : renderEvaluatorView()}
      </div>
    </MainLayout>
  );
};

export default Proposals;
