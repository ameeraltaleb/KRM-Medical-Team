import { useData } from '../../context/DataContext';

export default function Dashboard() {
  const { services, testimonials, packagesList } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">نظرة عامة</h1>
        <p className="text-gray-500 mt-1">مرحباً بك في لوحة تحكم KRM Medical Team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">إجمالي الخدمات</h3>
          <p className="text-3xl font-bold text-secondary">{services.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">الباقات النشطة</h3>
          <p className="text-3xl font-bold text-secondary">{packagesList.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">إجمالي الآراء</h3>
          <p className="text-3xl font-bold text-secondary">{testimonials.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">عدد الزوار الأسبوعي</h3>
          <p className="text-3xl font-bold text-secondary">+120</p>
        </div>
      </div>
    </div>
  );
}

