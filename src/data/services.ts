import type { Service } from '../types/service';

export const services: Service[] = [
  {
    id: 1,
    title: "Knowledge & Training",
    description: "Comprehensive training programs for youth, farmers, and agribusiness entrepreneurs covering value addition, business planning, and climate-smart agriculture.",
    icon: "FaGraduationCap",
    features: ["Training Programs", "Information Resources", "Video Demonstrations"],
    link: "/knowledge-training"
  },
  {
    id: 2,
    title: "Agricultural Inputs",
    description: "Smart technology solutions, farm tools, and quality planting materials to enhance agricultural productivity.",
    icon: "FaTractor",
    features: ["Smart Technology", "Farm Tools", "Planting Materials"],
    link: "/agricultural-inputs"
  },
  {
    id: 3,
    title: "Enterprise Building",
    description: "Business support services, youth engagement programs, and strategic partnerships for sector development.",
    icon: "FaHandshake",
    features: ["Business Support", "Youth Programs", "Partnerships"],
    link: "/enterprise-building"
  },
  {
    id: 4,
    title: "Analytical & Advisory",
    description: "Professional soil, water, and pesticide analysis with expert advisory services.",
    icon: "FaMicroscope",
    features: ["Soil Analysis", "Water Testing", "Advisory Support"],
    link: "/analytical-services"
  }
];
