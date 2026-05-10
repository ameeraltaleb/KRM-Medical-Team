import { useState } from 'react';
import { Plus, Edit2, Trash2, X, ContentLocation } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ServicesManager() {
  const { services, addService, updateService, deleteService } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      deleteService(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService.id) {
      updateService(currentService.id, currentService);
    } else {
      addService(currentService);
    }
    setIsEditing(false);
    setCurrentService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary">إدارة الخدمات</h1>
          <p className="text-gray-500 mt-1">إضافة، تعديل وحذف الخدمات المقدمة</p>
        </div>
        <button
          onClick={() => {
            setCurrentService({ title: '', icon: 'Activity' });
            setIsEditing(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          إضافة خدمة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => {
          const Icon = (Icons[service.icon as keyof typeof Icons] as React.ElementType) || Icons.Activity;
          return (
            <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                 <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-4">{service.title}</h3>
              <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> تعديل
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> حذف
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
             <button
                onClick={() => { setIsEditing(false); setCurrentService(null); }}
                className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
             >
                <X className="w-6 h-6" />
             </button>
             <h2 className="text-2xl font-bold text-secondary mb-6">
                {currentService.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
             </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">اسم الخدمة</label>
                 <input
                   type="text"
                   value={currentService.title}
                   onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                   required
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">اسم الأيقونة (من مكتبة Lucide)</label>
                 <input
                   type="text"
                   value={currentService.icon}
                   onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-left"
                   placeholder="e.g. Activity, Heart, Stethoscope"
                   required
                 />
               </div>
               <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 mt-4 rounded-xl transition-colors"
               >
                  حفظ التغييرات
               </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
