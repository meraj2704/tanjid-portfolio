export const projectsData = [
  {
    id: 1,
    name: "Ejazah.com",
    overview:
      "A modern travel agency platform offering seamless flight, hotel, and visa booking services for global travelers.",
    longDescription: `
Ejazah.com is a full-featured travel booking platform designed to simplify trip planning. 
It provides a one-stop solution for booking **flights, hotels, and visas**, ensuring a smooth and hassle-free travel experience.  
The platform offers secure payments, real-time availability checks, and personalized travel recommendations.  

Our team focused on creating a **user-friendly and responsive frontend** with intuitive navigation, clean UI, and fast performance, 
making the booking process simple for travelers worldwide.
    `,
    thumbnail: "/projects/ejazah/ejazah-thumbnail.png",
    images: [
      "/projects/ejazah/ejazah-thumbnail.png",
      "/projects/ejazah/ejazah-login.png",
      "/projects/ejazah/ejazah-search.png",
      "/projects/ejazah/ejazah-flights.png",
      "/projects/ejazah/ejazah-flight-responsive.png",
    ],
    liveDemo: "https://dev.ejazah.com/", // replace with actual live link if available
    githubLink: null, // private repo
    Technology: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
      { name: "React Query" },
    ],
    startDate: "2025-01-01",
    endDate: "Ongoing",
    status: "In Progress",
    featured: true,
  },
  {
    id: 5,
    name: "EMR (Electronic Medical Record)",
    overview:
      "A production-ready healthcare solution that enables doctors to create prescriptions, manage patient records, and access medical history — already deployed in 3 hospitals.",
    longDescription: `
The EMR system is a modern healthcare platform designed to simplify doctors’ workflow and improve patient care.  
It enables doctors to **create prescriptions digitally**, access complete **patient medical history**, and manage healthcare data securely.  

Key features include:  
- **Prescription Management** – doctors can create and edit prescriptions with ease.  
- **Patient Records** – maintain comprehensive patient profiles with medical history.  
- **Medicine Database** – integrated list of all medicines for quick selection.  
- **Test Database** – doctors can choose from predefined tests and add them to prescriptions.  
- **Previous History Access** – view patients' past prescriptions and test results.  
- **Data Accuracy & Security** – ensures sensitive patient data is stored and accessed safely.  

✅ **Business Impact:**  
The solution has already been **successfully sold and implemented in 3 hospitals**, where it is being actively used by doctors to digitize healthcare processes.  

This project demonstrates not only technical execution but also real-world adoption, making it a proven and scalable healthcare solution.
    `,
    thumbnail: "/projects/emr/emr-thumbnail.png",
    images: [
      "/projects/emr/emr-thumbnail.png",
      "/projects/emr/emr-rx-with-header.png",
      "/projects/emr/emr-rx.png",
      "/projects/emr/emr-medication.png",
      "/projects/emr/emr-pdf.png",
    ],
    liveDemo: null, // internal healthcare system, not public
    githubLink: null, // private repo
    Technology: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
      { name: "Redux" },
      { name: "Express.js" },
      { name: "MongoDB" },
    ],
    startDate: "2024-06-01",
    endDate: "2025-01-30",
    status: "Completed",
    featured: true,
  },
  {
    id: 2,
    name: "Her Power",
    overview:
      "A government-backed platform empowering women through education, career guidance, and resources in Bangladesh.",
    longDescription: `
Her Power is a comprehensive platform launched under the Bangladesh Government ICT initiative. 
It is designed to empower women by providing access to courses, career placement support, events, blogs, and other resources. 
The platform includes 6 main modules: Shop Now, Course, Career Placement, Events, Blogs, Resources, Success Stories, and Challenges. 
Our team successfully completed the **frontend development** using modern technologies, ensuring a responsive, user-friendly, and interactive experience.
    `,
    thumbnail: "/projects/her-power/her-power-thumbnail.png",
    images: [
      "/projects/her-power/her-power-thumbnail.png",
      "/projects/her-power/her-power-home.png",
      "/projects/her-power/her-power-shop-now.png",
      "/projects/her-power/her-power-course.png",
    ],
    liveDemo: "https://portal.herpower.gov.bd/en", // if no live demo yet
    githubLink: null, // if not public
    Technology: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
      { name: "React Query" },
    ],
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    status: "Completed",
    featured: true,
  },
  {
    id: 3,
    name: "ATI Limited Website",
    overview:
      "The official corporate website of ATI Limited, featuring career opportunities, job applications, and contact management with a secure backend.",
    longDescription: `
ATI Limited's official website was developed to provide an interactive and professional online presence.  
It showcases company services, career opportunities, and allows visitors to engage directly through job applications and contact forms.  

I worked on developing the **backend APIs** for the platform, including:  
- **Job Application Management** – candidates can apply for positions, and HR can track applications.  
- **Career Section** – displays open roles and manages applicant data.  
- **Contact Module** – enables secure communication with the company.  
- **Additional APIs** – for services, inquiries, and admin functionalities.  

The backend was built with **Express.js and MongoDB**, ensuring secure data handling, scalability, and smooth integration with the frontend.
    `,
    thumbnail: "/projects/ati-limited/ati-limited-thumbnail.png",
    images: [
      "/projects/ati-limited/ati-limited-thumbnail.png",
      "/projects/ati-limited/ati-home.png",
      "/projects/ati-limited/ati-about.png",
      "/projects/ati-limited/ati-blog.png",
    ],
    liveDemo: "https://atilimited.net", // replace with actual live link if needed
    githubLink: null, // private repo
    Technology: [
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Node.js" },
      { name: "Mongoose" },
    ],
    startDate: "2024-07-01",
    endDate: "2024-08-15",
    status: "Completed",
    featured: false,
  },
  {
    id: 4,
    name: "My Kitchen",
    overview:
      "A modern portfolio website for My Kitchen, showcasing company details, services, and project highlights with a clean and responsive UI.",
    longDescription: `
My Kitchen is a portfolio website designed to represent the brand identity and showcase its wide range of projects.  
The platform highlights **company details, services, and completed works** in a visually engaging way.  

I developed the **frontend** using **Next.js, Tailwind CSS, and Shadcn**, focusing on:  
- A **responsive design** optimized for mobile and desktop.  
- A **projects showcase section** highlighting My Kitchen’s completed works.  
- **Clean UI components** built with Shadcn for consistency and accessibility.  
- **Fast-loading pages** with smooth navigation and modern animations.  

The site reflects the company’s professionalism while providing visitors with an easy way to explore its services and achievements.
    `,
    thumbnail: "/projects/my-kitchen/my-kitchen-thumbnail.png",
    images: [
      "/projects/my-kitchen/my-kitchen-thumbnail.png",
      "/projects/my-kitchen/my-kitchen-home.png",
      "/projects/my-kitchen/my-kitchen-products.png",
      "/projects/my-kitchen/my-kitchen-image-gallery.png",
      "/projects/my-kitchen/my-kitchen-product-details.png",
    ],
    liveDemo: "https://www.mykitchen-bd.com/", // replace with actual link if available
    githubLink: null, // private repo
    Technology: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
    ],
    startDate: "2024-05-01",
    endDate: "2024-06-10",
    status: "Completed",
    featured: false,
  },

];