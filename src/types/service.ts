export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}
