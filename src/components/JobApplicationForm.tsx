import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api, Job } from '../lib/api';

const applicationSchema = z.object({
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  resumeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JobApplicationForm({
  job,
  isOpen,
  onClose,
  onSuccess,
}: JobApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      // In a real app, you'd upload this to S3/Blob storage and get the URL
      // For now, we'll just store the file reference
    }
  };

  const onSubmit = async (data: ApplicationForm) => {
    setError(null);
    setLoading(true);

    try {
      // TODO: Upload resume file to storage and get URL
      // For now, using portfolioUrl as a placeholder
      const resumeUrl = resumeFile ? 'https://example.com/resume.pdf' : data.resumeUrl;

      const response = await api.submitApplication(
        job.id,
        data.coverLetter,
        resumeUrl,
        data.portfolioUrl || undefined
      );

      if (response.success) {
        reset();
        setResumeFile(null);
        onSuccess();
      } else {
        setError(response.error?.message || 'Failed to submit application');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Apply for {job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="label">Cover Letter *</label>
            <textarea
              {...register('coverLetter')}
              rows={8}
              className="input"
              placeholder="Tell us why you're a great fit for this position..."
            />
            {errors.coverLetter && (
              <p className="mt-1 text-sm text-red-600">{errors.coverLetter.message}</p>
            )}
          </div>

          <div>
            <label className="label">Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="input"
            />
            <p className="mt-1 text-xs text-gray-500">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
            {resumeFile && (
              <p className="mt-2 text-sm text-green-600">✓ {resumeFile.name} selected</p>
            )}
          </div>

          <div>
            <label className="label">Resume URL (Alternative)</label>
            <input
              type="url"
              {...register('resumeUrl')}
              className="input"
              placeholder="https://example.com/resume.pdf"
            />
            {errors.resumeUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.resumeUrl.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Or provide a link to your resume online
            </p>
          </div>

          <div>
            <label className="label">Portfolio/GitHub/LinkedIn URL (Optional)</label>
            <input
              type="url"
              {...register('portfolioUrl')}
              className="input"
              placeholder="https://github.com/username or https://linkedin.com/in/username"
            />
            {errors.portfolioUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.portfolioUrl.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-outline-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-primary"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

