import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    category: string;
    location: string;
    status: string;
    createdAt: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Open':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Closed':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <Link href={`/jobs/${job._id}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-900/5 group-hover:ring-indigo-200">
        <div className="flex justify-between items-start mb-4">
          <Badge variant={getStatusVariant(job.status)} className="px-2 py-0.5 rounded-lg">
            {job.status}
          </Badge>
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">
            {job.category}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center group-hover:border-indigo-50 transition-colors">
          <span className="text-indigo-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
