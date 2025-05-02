
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
import { Eye, Search, Filter, FileText, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Proposals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tenderFilter, setTenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique tender IDs for filtering
  const uniqueTenders = Array.from(new Set(proposals.map(proposal => proposal.tenderId)));

  // Filter proposals based on search and filters
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = 
      proposal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTender = tenderFilter === 'all' || proposal.tenderId === tenderFilter;
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    
    return matchesSearch && matchesTender && matchesStatus;
  });

  // View proposal details
  const viewProposal = (proposalId: string) => {
    navigate(`/proposal/${proposalId}`);
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground mt-2">
            View and manage vendor proposals for tenders
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Proposals</CardTitle>
            <CardDescription>
              View proposals submitted by vendors for evaluation
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
      </div>
    </MainLayout>
  );
};

export default Proposals;
