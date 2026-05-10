import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function PackagesManager() {
  const { packagesList, addPackage, updatePackage, deletePackage } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<any>(null);
  const [newFeature, setNewFeature] = useState('');

  const handleEdit = (pkg: any) => {
    setCurrentPackage(pkg);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
      deletePackage(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPackage.id) {
      updatePackage(currentPackage.id, currentPackage);
    } else {
      addPackage(currentPackage);
    }
    setIsEditing(false);
    setCurrentPackage(null);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setCurrentPackage({
        ...currentPackage,
        features: [...(currentPackage.features || []), newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...currentPackage.features];
    newFeatures.splice(index, 1);
    setCurrentPackage({ ...currentPackage, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary">إدارة الباقات</h1>
          <p className="text-gray-500 mt-1">إضافة، تعديل وحذف باقات الرعاية</p>
        </div>
        <button
          onClick={() => {
            setCurrentPackage({ title: '', price: '', period: '', recommended: false, features: [] });
            setIsEditing(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          إضافة باقة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packagesList.map((pkg: any) => (
          <div key={pkg.id} className={`bg-white p-6 rounded-3xl shadow-sm border ${pkg.recommended ? 'border-primary shadow-primary/10 relative mt-4' : 'border-gray-100'} flex flex-col`}>
             {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  الأكثر طلباً
                </div>
             )}
            <h3 className="text-xl font-bold text-secondary mb-2">{pkg.title}</h3>
            <div className="flex items-baseline gap-1 mb-6">
               <span className="text-3xl font-black text-secondary">{pkg.price}</span>
               <span className="text-gray-500 text-sm font-medium">/ {pkg.period}</span>
            </div>
            <ul className="space-y-3 mb-6 flex-grow">
               {pkg.features.map((feature: string, idx: number) => (
                 <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                   <Check className="w-5 h-5 text-primary shrink-0" />
                   <span className="pt-0.5">{feature}</span>
                 </li>
               ))}
            </ul>

            <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => handleEdit(pkg)}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors"
              >
                <Edit2 className="w-4 h-4" /> تعديل
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative my-8">
             <button
                onClick={() => { setIsEditing(false); setCurrentPackage(null); }}
                className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
             >
                <X className="w-6 h-6" />
             </button>
             <h2 className="text-2xl font-bold text-secondary mb-6">
                {currentPackage.id ? 'تعديل الباقة' : 'إضافة باقة جديدة'}
             </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">اسم الباقة</label>
                 <input
                   type="text"
                   value={currentPackage.title}
                   onChange={(e) => setCurrentPackage({ ...currentPackage, title: e.target.value })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                   required
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">السعر</label>
                    <input
                      type="text"
                      value={currentPackage.price}
                      onChange={(e) => setCurrentPackage({ ...currentPackage, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="مثال: $299"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2">المدة</label>
                    <input
                      type="text"
                      value={currentPackage.period}
                      onChange={(e) => setCurrentPackage({ ...currentPackage, period: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="مثال: شهرياً"
                      required
                    />
                  </div>
               </div>

               <div className="flex items-center gap-2 mt-4 mb-2">
                  <input
                     type="checkbox"
                     id="recommended"
                     checked={currentPackage.recommended || false}
                     onChange={(e) => setCurrentPackage({ ...currentPackage, recommended: e.target.checked })}
                     className="w-4 h-4 text-primary rounded focus:ring-primary/20 cursor-pointer"
                  />
                  <label htmlFor="recommended" className="text-sm font-bold text-secondary cursor-pointer">
                     باقة مميزة (الخيار الأفضل)
                  </label>
               </div>

               <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-secondary mb-2">المميزات</label>
                  <div className="flex gap-2 mb-3">
                     <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="أضف ميزة..."
                     />
                     <button
                        type="button"
                        onClick={addFeature}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm transition-colors"
                     >
                        إضافة
                     </button>
                  </div>
                  <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                     {currentPackage.features?.map((feature: string, idx: number) => (
                        <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                           <span>{feature}</span>
                           <button type="button" onClick={() => removeFeature(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                              <X className="w-4 h-4" />
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>

               <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 mt-6 rounded-xl transition-colors"
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
