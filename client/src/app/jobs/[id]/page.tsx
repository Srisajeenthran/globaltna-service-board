'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getJob, updateJobStatus, deleteJob } from '@/lib/api';
import { Badge } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, MapPin, User, Mail, Calendar, Trash2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const params = useParams();
  const id = params.id as string;
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJob(id);
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      const updated = await updateJobStatus(id, newStatus);
      setJob(updated);
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteJob(id);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job');
      setDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-500 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Open': return 'success';
      case 'In Progress': return 'warning';
      case 'Closed': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to jobs
        </Link>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="px-4 py-6 sm:px-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {job.category}
                </span>
                <Badge variant={getStatusVariant(job.status)} className="text-sm px-3 py-1">
                  {job.status}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            </div>

            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    id="status"
                    value={job.status}
                    onChange={handleStatusChange}
                    disabled={updating}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm bg-white"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={deleting}
                  className="inline-flex items-center justify-center p-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  title="Delete job"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-6 sm:px-8">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Job Description</h3>
          <p className="mt-2 text-base leading-7 text-gray-600 whitespace-pre-wrap">
            {job.description}
          </p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500 gap-2">
                <MapPin className="h-4 w-4" /> Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{job.location}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500 gap-2">
                <Calendar className="h-4 w-4" /> Posted On
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(new Date(job.createdAt), 'PPP')}
              </dd>
            </div>
            
            <div className="sm:col-span-2 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 gap-2 mb-1">
                    <User className="h-4 w-4" /> Name
                  </dt>
                  <dd className="text-sm text-gray-900">{job.contactName}</dd>
                </div>
                <div>
                  <dt className="flex items-center text-sm font-medium text-gray-500 gap-2 mb-1">
                    <Mail className="h-4 w-4" /> Email
                  </dt>
                  <dd className="text-sm text-indigo-600 hover:underline">
                    <a href={`mailto:${job.contactEmail}`}>{job.contactEmail}</a>
                  </dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Job Request"
        variant="danger"
        footer={
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={deleting}
            className="sm:ml-3 sm:w-auto w-full"
          >
            Delete
          </Button>
        }
      >
        Are you sure you want to delete this job request? This action cannot be undone and will remove all information associated with this request.
      </Modal>
    </div>
  );
}
