import { useState } from 'react';
import { featuresList, stepsList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Home() {
  const { siteSettings, services: servicesList, testimonials: mockTestimonials, statsList, packagesList } = useData();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-40 lg:pt-28 lg:pb-56 flex items-center justify-center overflow-visible bg-gradient-to-br from-primary/10 via-white to-white">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Abstract shapes matching the medical theme */}
           <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent"></div>
           <Icons.Plus className="absolute top-20 right-20 text-primary/20 w-8 h-8" />
           <Icons.Plus className="absolute top-40 left-1/4 text-primary/20 w-12 h-12" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-get-6xl font-black leading-tight text-secondary">
                تغيير حياتك، <br/>
                <span className="text-primary font-light">استعادة صحتك</span>
              </h1>
              
              <p className="text-lg text-gray-500 font-medium max-w-xl leading-relaxed">
                سواء كنت مقيماً أو قادماً بغرض العلاج، كادرنا الطبي المتخصص يوفر لك كافة احتياجاتك الطبية في الفندق أو المنزل براحة تامة.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href={`https://wa.me/${siteSettings.whatsappNumber}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-primary hover:bg-primary-dark transition-all duration-300 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/30 flex items-center gap-2"
                >
                  <Icons.ArrowRight className="w-5 h-5 -rotate-180" />
                  احجز الخدمة الآن
                </a>
              </div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] lg:h-[550px] flex justify-center items-end"
            >
               <div className="absolute bottom-0 w-3/4 h-3/4 bg-primary/10 rounded-[3rem] -z-10 blur-xl"></div>
               {/* Doctor Image - Using a transparent PNG style image if possible, or a well-blended one */}
               <img 
                 src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop" 
                 alt="طبيب"
                 className="w-[85%] h-full object-cover object-top rounded-[2rem] shadow-2xl relative z-10 border-8 border-white" 
               />
               
               {/* Floating Badge */}
               <div className="absolute top-1/4 -right-10 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                 <div className="bg-orange-100 p-2 rounded-full text-orange-500">
                    <Icons.Star className="w-6 h-6 fill-current" />
                 </div>
                 <div>
                    <p className="text-sm font-black text-secondary">4.9/5</p>
                    <p className="text-xs text-gray-400 font-bold">تقييم المرضى</p>
                 </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Cards Overlap */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 lg:-mt-32 mb-16 lg:mb-24">
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuresList.map((feature, i) => {
              const Icon = Icons[feature.icon as keyof typeof Icons] as React.ElementType;
              const bgColors = ['bg-indigo-50', 'bg-emerald-50', 'bg-violet-50', 'bg-rose-50'];
              const iconColors = ['text-indigo-600', 'text-emerald-600', 'text-violet-600', 'text-rose-600'];
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={feature.id}
                  className={cn(
                    "rounded-3xl p-6 lg:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300",
                    bgColors[i % bgColors.length]
                  )}
                >
                  <div className={cn("w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6", iconColors[i % iconColors.length])}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-3">{feature.title}</h3>
                  <p className="text-secondary/70 text-sm leading-relaxed font-medium mb-6 flex-grow">{feature.desc}</p>
                  <a href={`https://wa.me/${siteSettings.whatsappNumber}`} className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1 hover:text-primary transition-colors mt-auto">
                    <Icons.Plus className="w-3 h-3" /> مزيد من التفاصيل
                  </a>
                </motion.div>
              )
            })}
         </div>
      </div>

      {/* About Amenities Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Text Layout (RTL -> Right) */}
              <div className="order-1 lg:order-1 relative z-10">
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary leading-tight mb-6">
                    نوفر أفضل رعاية طبية <br className="hidden sm:block" /> ووسائل راحة للمرضى
                 </h2>
                 <p className="text-gray-500 font-medium leading-relaxed mb-8 text-lg">
                    الرعاية الصحية الممتازة تبدأ في بيئة مريحة. فريقنا الطبي المختص جاهز لتقديم خدمات رعاية متكاملة وشاملة في منزلك أو الفندق لضمان تماثلك للشفاء بكل يسر وسهولة.
                 </p>
                 
                 <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icons.Check className="w-4 h-4" strokeWidth={3} />
                       </div>
                       <span className="font-bold text-secondary text-base">رعاية سلسة ومستمرة</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icons.Check className="w-4 h-4" strokeWidth={3} />
                       </div>
                       <span className="font-bold text-secondary text-base">بيئة تعافي آمنة</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icons.Check className="w-4 h-4" strokeWidth={3} />
                       </div>
                       <span className="font-bold text-secondary text-base">أطباء متخصصون</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icons.Check className="w-4 h-4" strokeWidth={3} />
                       </div>
                       <span className="font-bold text-secondary text-base">رعاية تركز على المريض</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icons.Check className="w-4 h-4" strokeWidth={3} />
                       </div>
                       <span className="font-bold text-secondary text-base">نهج طبي حديث</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icons.Check className="w-4 h-4" strokeWidth={3} />
                       </div>
                       <span className="font-bold text-secondary text-base">تقييمات إيجابية ممتازة</span>
                    </div>
                 </div>

                 <a 
                   href={`https://wa.me/${siteSettings.whatsappNumber}`} 
                   className="bg-primary hover:bg-primary-dark transition-colors text-white px-8 py-3.5 rounded-full font-bold inline-flex items-center gap-2"
                 >
                   <Icons.ArrowRight className="w-5 h-5 -rotate-180" /> المزيد عنا
                 </a>
              </div>

              {/* Image Composition (RTL -> Left) */}
              <div className="relative order-2 lg:order-2 mt-10 lg:mt-0 px-4 sm:px-0">
                 {/* Decorative background */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
                 
                 <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl h-[400px] sm:h-[500px]">
                    <img 
                       src="https://images.unsplash.com/photo-1551076805-e18690c5e56c?q=80&w=1000&auto=format&fit=crop" 
                       alt="طبيب يتابع حالة مريض" 
                       className="w-full h-full object-cover" 
                    />
                 </div>

                 {/* Floating Stat 1 */}
                 <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-blue-100 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-white flex flex-col items-center justify-center z-20">
                    <span className="text-3xl sm:text-4xl font-black text-secondary mb-1">5K+</span>
                    <span className="text-xs sm:text-sm font-bold text-secondary/70 uppercase">مرضى سعداء</span>
                 </div>

                 {/* Floating Stat 2 */}
                 <div className="absolute top-10 -left-6 sm:-left-10 bg-[#e0dfff] p-6 rounded-3xl shadow-xl border-4 border-white flex flex-col items-center justify-center z-20">
                    <span className="text-3xl font-black text-secondary mb-1">22</span>
                    <span className="text-xs font-bold text-secondary/70 uppercase">كادر طبي</span>
                 </div>
              </div>
              
           </div>
        </div>
      </section>

      {/* Stats Banner Section */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute inset-0 z-0 pointer-events-none">
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
               <Icons.Activity className="absolute -left-10 -bottom-10 w-64 h-64 text-white/5" />
               <Icons.Plus className="absolute right-10 top-10 w-16 h-16 text-white/5" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 p-8 sm:p-12 relative z-10 gap-y-12 items-center justify-items-center">
              {statsList.map((stat, index) => (
                <div key={stat.id} className={cn(
                  "flex flex-col items-center text-center w-full relative group",
                  index !== 3 && "lg:after:content-[''] lg:after:absolute lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:left-0 lg:after:h-16 lg:after:w-px lg:after:bg-white/10"
                )}>
                   <div className="text-4xl sm:text-5xl font-black text-white mb-3 flex items-baseline gap-1 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-primary-light drop-shadow-sm">{stat.value}</span>
                      <span className="text-primary-light text-2xl sm:text-3xl">{stat.suffix}</span>
                   </div>
                   <span className="font-bold text-gray-300 text-sm sm:text-base tracking-widest">{stat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/80 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-sm font-bold text-primary mb-3 tracking-widest uppercase">خدماتنا</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-secondary leading-tight">
               نتشرف بتقديم خدمات خبيرة <br className="hidden sm:block" /> في مجالات طبية مختلفة
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {servicesList.map((service, idx) => {
              const Icon = Icons[service.icon as keyof typeof Icons] as React.ElementType || Icons.Activity;
              const bgColors = ['bg-blue-50', 'bg-emerald-50', 'bg-violet-50', 'bg-rose-50', 'bg-amber-50', 'bg-cyan-50'];
              const iconColors = ['text-blue-600', 'text-emerald-600', 'text-violet-600', 'text-rose-600', 'text-amber-600', 'text-cyan-600'];
              const colorIdx = idx % bgColors.length;

              return (
                <div key={service.id} className="bg-white rounded-3xl p-5 sm:p-6 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 group flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent -z-10 rounded-br-[3rem] group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex items-start justify-between mb-5">
                     <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", bgColors[colorIdx], iconColors[colorIdx])}>
                       <Icon className="w-6 h-6 stroke-[2]" />
                     </div>
                     <span className="text-3xl font-black text-gray-50 group-hover:text-primary/10 transition-colors select-none">
                        {(idx + 1).toString().padStart(2, '0')}
                     </span>
                  </div>
                  
                  <h4 className="font-bold text-secondary text-lg mb-2">{service.title}</h4>
                  <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed mb-5 flex-grow">
                     نوفر رعاية متكاملة تحت إشراف كادرنا المتخصص لضمان خطة علاج تناسب احتياجات المريض بدقة.
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <a href={`https://wa.me/${siteSettings.whatsappNumber}?text=أريد الاستفسار عن خدمة ${service.title}`} className="text-xs font-bold text-secondary flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Icons.ArrowRight className="w-3.5 h-3.5 -rotate-180" /> طلب الخدمة
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-sm font-bold text-secondary flex items-center justify-center gap-2 flex-wrap">
                نقدم خدمات طبية متكاملة تشمل الطوارئ والمتابعة. <a href={`https://wa.me/${siteSettings.whatsappNumber}`} className="text-primary hover:underline flex items-center gap-1">ألق نظرة على جميع الخدمات <Icons.ArrowLeft className="w-4 h-4" /></a>
             </p>
          </div>
        </div>
      </section>

      {/* Track Record & Testimonials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Text Layout (RTL -> Right) */}
              <div className="order-1 lg:order-1 relative z-10">
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary leading-tight mb-6">
                    سجلنا يتحدث عن نفسه. الكثير من العملاء اختارونا وحظوا بتجارب إيجابية.
                 </h2>
                 <p className="text-gray-500 font-medium leading-relaxed mb-8 text-lg">
                    نفخر بتقديم رعاية طبية استثنائية لمرضانا. رضاهم التام هو المقياس الحقيقي لنجاحنا المستمر.
                 </p>
                 <div className="flex justify-start">
                    <Icons.Wind className="w-16 h-16 text-primary/20 -rotate-45" />
                 </div>
              </div>

              {/* Image Collage & Ratings (RTL -> Left) */}
              <div className="relative order-2 lg:order-2 px-4 sm:px-0">
                 <div className="grid grid-cols-2 gap-4">
                    <img 
                       src="https://images.unsplash.com/photo-1596541223130-5d56a73fb845?w=600&h=800&fit=crop" 
                       alt="فريق طبي" 
                       className="rounded-[2rem] w-full h-full object-cover shadow-lg" 
                    />
                    <img 
                       src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=800&fit=crop" 
                       alt="طبيب ومريض" 
                       className="rounded-[2rem] w-full h-full object-cover shadow-lg mt-12" 
                    />
                 </div>
                 
                 {/* Floating Rating Badge */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-50 px-6 py-4 rounded-full border-4 border-white shadow-xl whitespace-nowrap flex items-center gap-2">
                    <span className="text-xs font-bold text-green-700">تقييم ممتاز للخدمات</span>
                    <span className="flex items-center gap-1 text-green-700 font-black text-xl">
                       <Icons.Star className="w-5 h-5 fill-current" /> 4.9
                    </span>
                 </div>
              </div>
              
           </div>

           {/* Single Quote Box overlapping below */}
           <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
              <div className="bg-[#f0f4ff] rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
                 <Icons.Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10  rotate-180" />
                 
                 <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center text-right sm:text-right">
                    <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
                       <img src={mockTestimonials[activeTestimonial].avatar} alt={mockTestimonials[activeTestimonial].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                       <p className="text-lg sm:text-xl text-secondary object-cover font-medium leading-relaxed italic mb-6">
                         "{mockTestimonials[activeTestimonial].text}"
                       </p>
                       <h4 className="font-bold text-primary text-xl">{mockTestimonials[activeTestimonial].name}</h4>
                       <p className="text-gray-500 font-medium text-sm">{mockTestimonials[activeTestimonial].role}</p>
                    </div>
                 </div>

                 {/* Pagination dots */}
                 <div className="flex justify-center md:justify-end gap-2 mt-8">
                    {mockTestimonials.map((_, i) => (
                       <button 
                         key={i} 
                         onClick={() => setActiveTestimonial(i)}
                         className={cn(
                           "w-3 h-3 rounded-full transition-all duration-300 outline-none",
                           i === activeTestimonial ? "bg-primary w-6" : "bg-primary/20 hover:bg-primary/40"
                         )}
                         aria-label={`تغيير الرأي ${i + 1}`}
                       />
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="mt-12 text-center">
              <p className="text-sm font-bold text-secondary">
                 www.krmmedical.com
              </p>
           </div>
        </div>
      </section>

      {/* Pricing/Packages Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8" id="packages">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-secondary mb-4">خطط الرعاية الشاملة</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">اختر الباقة الأنسب لاحتياجاتك، صممنا حلولاً مرنة لتناسب جميع الحالات الطبية.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-center max-w-5xl mx-auto">
             {packagesList.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={cn(
                    "rounded-[2.5rem] p-8 border transition-all duration-300 relative overflow-hidden flex flex-col h-full",
                    pkg.recommended 
                      ? "bg-primary text-white shadow-2xl scale-100 md:scale-105 z-10 border-transparent py-10" 
                      : "bg-white text-secondary hover:shadow-xl border-gray-100"
                  )}
                >
                   {pkg.recommended && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-bold px-4 py-1.5 rounded-b-xl shadow-md">
                        الخيار الأفضل
                      </div>
                   )}
                   
                   <h3 className="font-bold text-2xl mb-2 mt-4">{pkg.title}</h3>
                   <div className="mb-6 flex items-baseline gap-1">
                      <span className={cn("text-lg font-medium", pkg.recommended ? "text-white/80" : "text-gray-500")}>حسب</span>
                      <span className="text-3xl font-black">{pkg.price}</span>
                   </div>

                   <ul className="space-y-4 mb-8 flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                           <div className={cn("rounded-full p-1", pkg.recommended ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}>
                              <Icons.Check className="w-4 h-4" strokeWidth={3} />
                           </div>
                           <span className={cn("font-medium text-sm leading-relaxed", pkg.recommended ? "text-white/90" : "text-gray-600")}>
                             {feature}
                           </span>
                        </li>
                      ))}
                   </ul>

                   <a 
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=أريد الاستفسار عن ${pkg.title}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className={cn(
                      "w-full py-4 rounded-full font-bold transition-transform text-center mt-auto hover:scale-105",
                      pkg.recommended 
                        ? "bg-white text-primary shadow-lg" 
                        : "bg-background text-primary border border-primary/20"
                    )}
                   >
                     اختيار الباقة
                   </a>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Blog/Articles Snippet */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-gray-100" id="blog">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-black text-secondary mb-4">المدونة الطبية</h2>
              <p className="text-gray-500 font-medium">اطلع على أحدث المقالات والنصائح للتعامل مع مختلف الحالات الصحية المنزلية.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&h=400&fit=crop', title: 'خطوات تهيئة المنزل لكبار السن', date: '12 مايو 2026' },
                { img: 'https://images.unsplash.com/photo-1551076805-e18690c5e56c?w=600&h=400&fit=crop', title: 'كيفية العناية بالجروح لمرضى السكري', date: '05 أبريل 2026' },
                { img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop', title: 'أهمية العلاج الطبيعي المنزلي بعد العمليات', date: '22 مارس 2026' }
              ].map((blog, i) => (
                 <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="h-56 overflow-hidden">
                       <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8">
                       <div className="text-xs font-bold text-primary mb-3 flex items-center gap-2">
                         <Icons.Calendar className="w-4 h-4" /> {blog.date}
                       </div>
                       <h3 className="font-bold text-secondary text-xl group-hover:text-primary transition-colors leading-snug mb-4">{blog.title}</h3>
                       <div className="font-bold text-sm text-secondary flex items-center gap-2 group-hover:text-primary transition-colors mt-auto w-fit">
                          اقرأ المزيد 
                          <Icons.ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                       </div>
                    </div>
                 </div>
              ))}
            </div>
         </div>
      </section>

    </div>
  );
}

