# Admin Portal - Afghan Cricket Network

## Overview
A complete admin portal has been created for managing all content sections of the Afghan Cricket Network website.

## Access Information
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`

## Features

### 🔐 Authentication
- Simple login system with demo credentials
- Session management using localStorage
- Automatic redirect to login if not authenticated

### 📊 Dashboard
- Central hub with overview of all sections
- Quick access to all management areas
- Statistics display for each section

### 📰 News Management (`/admin/news`)
- **List**: View all news articles with status indicators
- **Add**: Create new news articles with rich content
- **Edit**: Modify existing articles
- **Delete**: Remove articles with confirmation

### 🏏 Events Management (`/admin/events`)
- **List**: View all events with status tracking
- **Add**: Create new events with venue and timing details
- **Edit**: Update event information
- **Delete**: Remove events

### 👥 Team Management (`/admin/team`)
- **List**: View all players with their statistics
- **Add**: Add new players with detailed profiles
- **Edit**: Update player information
- **Delete**: Remove players from roster

### 🏆 Rankings Management (`/admin/rankings`)
- **List**: View all ranking categories and positions
- **Add**: Add new ranking entries
- **Edit**: Update ranking positions and points
- **Delete**: Remove ranking entries

### 📸 Media Management (`/admin/media`)
- **List**: View all media files with type indicators
- **Add**: Upload new media with categorization
- **Edit**: Update media information
- **Delete**: Remove media files

### 📧 Contact Management (`/admin/contact`)
- **List**: View all contact messages
- **Status Management**: Update message status (New/Pending/Replied)
- **Delete**: Remove processed messages

## File Structure

```
frontend/src/app/admin/
├── page.js                    # Login page
├── dashboard/
│   └── page.js               # Main dashboard
├── news/
│   ├── page.js               # News list
│   ├── add/
│   │   └── page.js           # Add news form
│   └── edit/[id]/
│       └── page.js           # Edit news form
├── events/
│   ├── page.js               # Events list
│   ├── add/
│   │   └── page.js           # Add event form
│   └── edit/[id]/
│       └── page.js           # Edit event form
├── team/
│   ├── page.js               # Team list
│   ├── add/
│   │   └── page.js           # Add player form
│   └── edit/[id]/
│       └── page.js           # Edit player form
├── rankings/
│   ├── page.js               # Rankings list
│   ├── add/
│   │   └── page.js           # Add ranking form
│   └── edit/[id]/
│       └── page.js           # Edit ranking form
├── media/
│   ├── page.js               # Media list
│   ├── add/
│   │   └── page.js           # Upload media form
│   └── edit/[id]/
│       └── page.js           # Edit media form
└── contact/
    └── page.js               # Contact messages list
```

## Key Features

### 🎨 UI/UX
- Clean, professional design using Tailwind CSS
- Responsive layout for all screen sizes
- Consistent navigation and breadcrumbs
- Status indicators with color coding
- Confirmation dialogs for destructive actions

### 🔧 Functionality
- **CRUD Operations**: Complete Create, Read, Update, Delete for all sections
- **Form Validation**: Required field validation
- **Status Management**: Track content status (Published/Draft, Active/Inactive, etc.)
- **Sample Data**: Pre-populated with realistic demo data
- **Navigation**: Easy navigation between sections

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimized
- Touch-friendly buttons and forms

## Usage Instructions

1. **Login**: Navigate to `/admin` and use demo credentials
2. **Dashboard**: Overview of all sections with quick access
3. **Manage Content**: Click on any section to view, add, edit, or delete items
4. **Forms**: Fill out forms with required information
5. **Navigation**: Use breadcrumb navigation to move between sections
6. **Logout**: Use logout button to end session

## Sample Data Included

Each section includes realistic sample data:
- **News**: 3 sample articles with different statuses
- **Events**: 3 sample events (upcoming, ongoing, completed)
- **Team**: 4 sample players with detailed profiles
- **Rankings**: 4 sample ranking categories
- **Media**: 4 sample media files of different types
- **Contact**: 3 sample contact messages

## Technical Notes

- Built with Next.js 13+ App Router
- Uses React hooks for state management
- Tailwind CSS for styling
- Client-side routing with Next.js navigation
- localStorage for simple authentication
- Responsive design principles

## Future Enhancements

- Integration with backend API
- File upload functionality
- Rich text editor for content
- Image optimization
- User role management
- Advanced search and filtering
- Bulk operations
- Export functionality

## Security Note

The current authentication is for demonstration purposes only. In production, implement proper authentication with:
- Secure password hashing
- JWT tokens or session management
- Role-based access control
- HTTPS enforcement
- CSRF protection