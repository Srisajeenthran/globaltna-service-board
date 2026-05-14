'use client';

import { useEffect, useState } from 'react';
import { getJobs } from '@/lib/api';
import JobCard from '@/components/JobCard';
import { Search, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Landscaping', 'Other'];

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filter && filter !== 'All') params.category = filter;
      if (search) params.search = search;
      
      const data = await getJobs(params);
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold animate-fade-in">
          
          <span>The best place to find local experts</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Find your next <span className="text-indigo-600">service request</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          The easiest way for homeowners to connect with professional tradespeople in their area.
        </p>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 flex flex-col md:flex-row gap-4 items-center">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="What job are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-2xl border-0 py-3.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 bg-gray-50/50"
          />
        </form>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full rounded-2xl border-0 py-3.5 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all cursor-pointer appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <Button onClick={fetchJobs} size="lg" className="rounded-2xl px-8 hidden md:flex">
            Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in">
          <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Try adjusting your search or filter to find what you're looking for.</p>
          <Button variant="secondary" onClick={() => {setSearch(''); setFilter('All');}} className="mt-6">
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {jobs.map((job: any) => (
            <div key={job._id} className="animate-fade-in">
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
