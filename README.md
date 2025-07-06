# 📚 Student Task & Deadline Organizer

A modern, feature-rich web application designed to help students manage their academic tasks, deadlines, and schedules efficiently. Built with React, TypeScript, and a beautiful UI using shadcn/ui components.

![Student Task Organizer](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, and organize academic tasks
- **Deadline Tracking**: Never miss important due dates with smart reminders
- **Calendar View**: Visual calendar interface for better planning
- **Timetable Management**: Organize your daily schedule efficiently
- **User Authentication**: Secure login and registration system
- **Profile Management**: Personalize your experience

### 🎨 User Interface
- **Modern Design**: Clean and intuitive interface using shadcn/ui
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Drag & Drop**: Intuitive task organization with drag-and-drop functionality
- **Real-time Updates**: Instant feedback and updates

### 📊 Dashboard Features
- **Task Overview**: Quick summary of pending and completed tasks
- **Progress Tracking**: Visual progress indicators for ongoing tasks
- **Priority Management**: Organize tasks by priority levels
- **Category Filtering**: Filter tasks by subject or category
- **Search Functionality**: Quickly find specific tasks

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naveenkm07/student-task-organizer.git
   cd student-task-organizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:8080](http://localhost:8080)

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🏗️ Project Structure

```
student-task-organizer/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AppLayout.tsx   # Main layout component
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── TaskForm.tsx    # Task creation/editing form
│   │   ├── TaskItem.tsx    # Individual task component
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── Auth/           # Authentication pages
│   │   ├── Dashboard/      # Main dashboard
│   │   ├── Calendar/       # Calendar view
│   │   ├── Timetable/      # Timetable management
│   │   └── Profile/        # User profile
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── backend/                # Spring Boot backend (if applicable)
└── package.json            # Project dependencies
```

## 🎯 Key Features Explained

### 📅 Calendar Integration
- Monthly, weekly, and daily views
- Task scheduling and deadline visualization
- Color-coded task categories
- Quick task creation from calendar

### ⏰ Timetable Management
- Drag-and-drop schedule creation
- Time slot management
- Subject and activity organization
- Export functionality

### 🔐 Authentication System
- Secure user registration and login
- Password protection
- Session management
- User profile customization

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts
- Cross-device compatibility

## 🛡️ Security Features

- **Form Validation**: Client-side and server-side validation
- **Input Sanitization**: Protection against XSS attacks
- **Secure Authentication**: JWT-based authentication
- **Data Encryption**: Sensitive data protection

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, minimalist interface
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized for fast loading
- **User Experience**: Intuitive navigation and interactions

## 🔧 Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and dev server
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **React Router 6.26.2** - Client-side routing
- **React Hook Form 7.53.0** - Form management
- **Zod 3.23.8** - Schema validation

### UI Components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **Recharts** - Data visualization
- **Date-fns** - Date manipulation

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📈 Performance

- **Fast Loading**: Optimized bundle size
- **Lazy Loading**: Code splitting for better performance
- **Caching**: Efficient data caching strategies
- **Optimized Images**: Compressed and optimized assets

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contributing Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the amazing frontend library

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/Naveenkm07/student-task-organizer/issues) page
2. Create a new issue if your problem isn't already addressed
3. Contact the maintainers

## 📸 Screenshots

![Screenshot 1](screenshots/screenshort1%20(1).jpg)
![Screenshot 2](screenshots/screenshort1%20(2).jpg)
![Screenshot 3](screenshots/screenshort1%20(3).jpg)
![Screenshot 4](screenshots/screenshort1%20(4).jpg)
![Screenshot 5](screenshots/screenshort1%20(5).jpg)

---

**Made with ❤️ for students everywhere**

⭐ **Star this repository if you find it helpful!**
