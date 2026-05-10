import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { servicesList as initialServices, statsList as initialStats, mockTestimonials as initialTestimonials, packagesList as initialPackages, siteSettings as initialSiteSettings } from '../data/mockData';

interface DataContextType {
  siteSettings: typeof initialSiteSettings;
  updateSiteSettings: (settings: typeof initialSiteSettings) => void;
  
  services: typeof initialServices;
  addService: (service: any) => void;
  updateService: (id: string, service: any) => void;
  deleteService: (id: string) => void;

  testimonials: typeof initialTestimonials;
  addTestimonial: (testimonial: any) => void;
  updateTestimonial: (id: string, testimonial: any) => void;
  deleteTestimonial: (id: string) => void;

  statsList: typeof initialStats;
  packagesList: typeof initialPackages;
  addPackage: (pkg: any) => void;
  updatePackage: (id: string, pkg: any) => void;
  deletePackage: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [packagesList, setPackagesList] = useState(() => {
    const saved = localStorage.getItem('packages');
    return saved ? JSON.parse(saved) : initialPackages;
  });

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('packages', JSON.stringify(packagesList));
  }, [packagesList]);

  const updateSiteSettings = (settings: any) => setSiteSettings(settings);

  const addService = (service: any) => setServices([...services, { ...service, id: Date.now().toString() }]);
  const updateService = (id: string, updatedService: any) => setServices(services.map((s: any) => s.id === id ? { ...updatedService, id } : s));
  const deleteService = (id: string) => setServices(services.filter((s: any) => s.id !== id));

  const addTestimonial = (testimonial: any) => setTestimonials([...testimonials, { ...testimonial, id: Date.now().toString() }]);
  const updateTestimonial = (id: string, updatedTestimonial: any) => setTestimonials(testimonials.map((t: any) => t.id === id ? { ...updatedTestimonial, id } : t));
  const deleteTestimonial = (id: string) => setTestimonials(testimonials.filter((t: any) => t.id !== id));

  const addPackage = (pkg: any) => setPackagesList([...packagesList, { ...pkg, id: Date.now().toString() }]);
  const updatePackage = (id: string, updatedPackage: any) => setPackagesList(packagesList.map((p: any) => p.id === id ? { ...updatedPackage, id } : p));
  const deletePackage = (id: string) => setPackagesList(packagesList.filter((p: any) => p.id !== id));

  return (
    <DataContext.Provider value={{
      siteSettings, updateSiteSettings,
      services, addService, updateService, deleteService,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      packagesList, addPackage, updatePackage, deletePackage,
      statsList: initialStats,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
