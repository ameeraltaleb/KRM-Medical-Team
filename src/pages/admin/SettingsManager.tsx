import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function SettingsManager() {
  const { siteSettings, updateSiteSettings } = useData();
  const [formData, setFormData] = useState(siteSettings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-secondary">الإعدادات العامة</h1>
        <p className="text-gray-500 mt-1">إعدادات الموقع، أرقام التواصل، والنصوص الرئيسية</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
         <form onSubmit={handleSubmit} className="space-y-6">
            <div>
               <label className="block text-sm font-bold text-secondary mb-2">رقم الواتساب</label>
               <input
                 type="text"
                 value={formData.whatsappNumber}
                 onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-left"
                 required
               />
               <p className="text-xs text-gray-500 mt-2">مرفقاً برمز الدولة بدون أصفار، مثال: 905377800983</p>
            </div>

            <div>
               <label className="block text-sm font-bold text-secondary mb-2">عنوان البطل (Hero Title)</label>
               <input
                 type="text"
                 value={formData.heroTitle}
                 onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                 required
               />
            </div>

            <div>
               <label className="block text-sm font-bold text-secondary mb-2">النص الفرعي للبطل (Hero Subtitle)</label>
               <textarea
                 value={formData.heroSubtitle}
                 onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-24 resize-none"
                 required
               />
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
               <button
                 type="submit"
                 className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-primary/20"
               >
                 حفظ الإعدادات
               </button>
               {isSaved && (
                  <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-lg">
                     تم الحفظ بنجاح ✓
                  </span>
               )}
            </div>
         </form>
      </div>
    </div>
  );
}
