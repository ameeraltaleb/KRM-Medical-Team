import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Small artificial delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const success = login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-secondary">تسجيل الدخول</h1>
          <p className="text-gray-500 mt-2 text-sm">أدخل بيانات الاعتماد للوصول للوحة الإدارة</p>
          <div className="bg-blue-50 text-blue-800 text-xs mt-4 p-3 rounded-lg border border-blue-100 text-right">
             <p className="font-bold mb-1">دخول تجريبي:</p>
             <p>البريد: admin@krm.com</p>
             <p>الرمز: admin123</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-2 border border-red-100">
             <ShieldAlert className="w-5 h-5 shrink-0" />
             <p className="pt-0.5">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-secondary mb-2" htmlFor="email">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-left"
              dir="ltr"
              placeholder="admin@krm.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-2" htmlFor="password">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-left"
              dir="ltr"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
               'دخول'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
