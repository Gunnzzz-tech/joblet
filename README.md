# Taskify - Job Portal Platform

A modern, full-stack job portal platform connecting job seekers with employers. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth integration
- 🔍 **Advanced Job Search**: Filter by location, salary, experience level, work schedule, and more
- 📝 **Job Applications**: Easy application process with cover letter and resume upload
- 👔 **Employer Dashboard**: Manage job postings and applications
- 💰 **Pricing Plans**: Flexible pricing for both job seekers and employers
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18.3.1, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v7
- **Icons**: Lucide React
- **State Management**: React Context API
- **API Client**: Fetch API with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API server running (see backend repository)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gunnzzz-tech/taskify.git
cd taskify
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API URL:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # UI components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── JobCard.tsx     # Job listing card
│   ├── JobDetails.tsx  # Job details page
│   ├── JobListing.tsx  # Job listings with filters
│   ├── SearchFilters.tsx # Search filter sidebar
│   └── ...
├── lib/                # Utilities and helpers
│   ├── api.ts          # API client
│   └── auth-context.tsx # Authentication context
├── pages/              # Page components
│   ├── Landing.tsx     # Landing page
│   ├── Pricing.tsx     # Pricing page
│   ├── Contact.tsx     # Contact page
│   └── EmployerDashboard.tsx # Employer dashboard
└── App.tsx             # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Preview production build

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:5000/api)
- `VITE_FRONTEND_URL` - Frontend URL for OAuth callbacks

## Features in Development

- [ ] User profile management
- [ ] Application tracking
- [ ] Email notifications
- [ ] Saved jobs/bookmarks
- [ ] Advanced analytics
- [ ] AI-powered job matching

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@taskify.com or visit our [contact page](/contact).

