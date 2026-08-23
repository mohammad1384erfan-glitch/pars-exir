import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';
import { PageLoader } from '@/components/ui';

export function AdminLoginPage() {
  const { signIn, session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session) navigate('/admin', { replace: true });
  }, [session, navigate]);

  if (loading) return <PageLoader />;
  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('ایمیل و رمز عبور الزامی هستند.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError(authError);
      setSubmitting(false);
    } else {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PE</span>
          </div>
          <h1 className="text-white text-2xl font-bold">پارس اکسیر</h1>
          <p className="text-navy-300 text-sm mt-1">ورود به پنل مدیریت</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label htmlFor="email" className="label">ایمیل</label>
              <input
                id="email"
                type="email"
                className="input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                autoFocus
                required
                dir="ltr"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="label">رمز عبور</label>
              <input
                id="password"
                type="password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                dir="ltr"
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full"
            >
              {submitting ? 'در حال ورود...' : 'ورود'}
            </button>
          </form>
        </div>

        <p className="text-center text-navy-400 text-xs mt-6">
          برای دسترسی به پنل مدیریت، باید مدیر سیستم باشید.
        </p>
      </div>
    </div>
  );
}
