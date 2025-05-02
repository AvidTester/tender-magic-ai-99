
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, FilePlus, Search, Filter } from 'lucide-react';

// Sample tenders data
const tenders = [
  {
    id: 'T-2023-42',
    title: 'IT Infrastructure Upgrade',
    status: 'open',
    category: 'IT Services',
    submissionsCount: 8,
    evaluationsComplete: 2,
    evaluationsRequired: 3,
    deadline: '2025-05-15',
    publishedDate: '2025-04-10'
  },
  {
    id: 'T-2023-41',
    title: 'Office Furniture Procurement',
    status: 'review',
    category: 'Equipment',
    submissionsCount: 12,
    evaluationsComplete: 0,
    evaluationsRequired: 3,
    deadline: '2025-05-10',
    publishedDate: '2025-04-05'
  },
  {
    id: 'T-2023-40',
    title: 'Consulting Services - Strategic Plan',
    status: 'closed',
    category: 'Professional Services',
    submissionsCount: 5,
    evaluationsComplete: 3,
    evaluationsRequired: 3,
    deadline: '2025-04-25',
    publishedDate: '2025-03-25'
  },
  {
    id: 'T-2023-39',
    title: 'Marketing Campaign Implementation',
    status: 'awarded',
    category: 'Marketing',
    submissionsCount: 7,
    evaluationsComplete: 3,
    evaluationsRequired: 3,
    deadline: '2025-04-20',
    publishedDate: '2025-03-20'
  }
];

export function TenderList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Function to filter tenders
  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = 
      tender.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tender.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Function to view tender details
  const viewTender = (tenderId: string) => {
    navigate(`/tender/${tenderId}`);
  };

  // Function to edit tender
  const editTender = (tenderId: string) => {
    navigate(`/tender/${tenderId}/edit`);
  };

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800">Open</Badge>;
      case 'review':
        return <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      case 'awarded':
        return <Badge className="bg-blue-100 text-blue-800">Awarded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tenders</CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate('/create-tender')} className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Create Tender</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 mb-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tenders..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Proposals</TableHead>
                <TableHead>Evaluation Progress</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No tenders found matching your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTenders.map((tender) => (
                  <TableRow key={tender.id}>
                    <TableCell className="font-medium">{tender.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {tender.title}
                    </TableCell>
                    <TableCell>{renderStatusBadge(tender.status)}</TableCell>
                    <TableCell>{tender.category}</TableCell>
                    <TableCell className="text-center">{tender.submissionsCount}</TableCell>
                    <TableCell>
                      {tender.evaluationsComplete}/{tender.evaluationsRequired}
                    </TableCell>
                    <TableCell>
                      {new Date(tender.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => viewTender(tender.id)}
                        className="inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => editTender(tender.id)}
                        disabled={tender.status === 'closed' || tender.status === 'awarded'}
                        className="inline-flex items-center"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
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
}
