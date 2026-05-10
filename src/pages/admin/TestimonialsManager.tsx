import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function TestimonialsManager() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);

  const handleEdit = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الرأي؟')) {
      deleteTestimonial(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTestimonial.id) {
      updateTestimonial(currentTestimonial.id, currentTestimonial);
    } else {
      addTestimonial(currentTestimonial);
    }
    setIsEditing(false);
    setCurrentTestimonial(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary">إدارة الآراء</h1>
          <p className="text-gray-500 mt-1">إضافة، تعديل وحذف آراء العملاء</p>
        </div>
        <button
          onClick={() => {
            setCurrentTestimonial({ name: '', role: '', content: '', rating: 5 });
            setIsEditing(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          إضافة رأي
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex flex-col mb-4">
                 <h3 className="text-lg font-bold text-secondary leading-tight">{testimonial.name}</h3>
                 <span className="text-gray-500 text-sm">{testimonial.role}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                 "{testimonial.content}"
              </p>
              <div className="flex gap-1 mb-6">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                 ))}
              </div>
              <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> تعديل
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> حذف
                </button>
              </div>
            </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
             <button
                onClick={() => { setIsEditing(false); setCurrentTestimonial(null); }}
                className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
             >
                <X className="w-6 h-6" />
             </button>
             <h2 className="text-2xl font-bold text-secondary mb-6">
                {currentTestimonial.id ? 'تعديل الرأي' : 'إضافة رأي جديد'}
             </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">اسم العميل</label>
                 <input
                   type="text"
                   value={currentTestimonial.name}
                   onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                   required
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">الوظيفة / الصفة</label>
                 <input
                   type="text"
                   value={currentTestimonial.role}
                   onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                   placeholder="مثال: سياحة علاجية"
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">النص</label>
                 <textarea
                   value={currentTestimonial.content}
                   onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, content: e.target.value })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all h-24 resize-none"
                   required
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-secondary mb-2">التقييم (من 1 إلى 5)</label>
                 <input
                   type="number"
                   min="1"
                   max="5"
                   value={currentTestimonial.rating}
                   onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) })}
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
