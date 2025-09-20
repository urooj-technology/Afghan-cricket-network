# React Query CRUD Hooks

Dynamic and reusable hooks for all CRUD operations with React Query.

## Available Hooks

### 1. useFetchData - GET Requests
```javascript
import { useFetchData } from '../hooks'

// Basic usage
const { data, isLoading, error } = useFetchData('/news')

// With search and filters
const { data, isLoading, error } = useFetchData('/news', {
  params: {
    search: 'cricket',
    status: 'published',
    page: 1,
    page_size: 20
  }
})
```

### 2. usePagination - Paginated Data
```javascript
import { usePagination } from '../hooks'

const {
  data,
  pagination,
  isLoading,
  error,
  goToPage,
  nextPage,
  previousPage,
  resetPage
} = usePagination('/news', {
  search: searchTerm,
  filters: { status: 'published' },
  ordering: '-created_at',
  pageSize: 10
})
```

### 3. useAdd - POST Requests
```javascript
import { useAdd } from '../hooks'

const addNews = useAdd('/news', {
  onSuccess: (data) => {
    console.log('News added:', data)
    router.push('/admin/news')
  },
  onError: (error) => {
    console.error('Error:', error)
  }
})

// Usage
addNews.mutate({ title: 'New Article', content: '...' })
```

### 4. useEdit - PUT/PATCH Requests
```javascript
import { useEdit } from '../hooks'

const editNews = useEdit('/news', {
  method: 'PATCH', // or 'PUT'
  onSuccess: () => {
    console.log('Updated successfully')
  }
})

// Usage
editNews.mutate({ id: 1, data: { title: 'Updated Title' } })
```

### 5. useDelete - DELETE Requests
```javascript
import { useDelete } from '../hooks'

const deleteNews = useDelete('/news', {
  onSuccess: () => {
    console.log('Deleted successfully')
  }
})

// Usage
deleteNews.mutate(1) // Pass the ID
```

## API Endpoints

### Available Endpoints:
- `/news` - News articles with search, filters, pagination
- `/events` - Cricket events and matches
- `/players` - Player profiles and statistics
- `/team-rankings` - Team rankings by format
- `/player-rankings` - Player rankings by category
- `/media` - Media files and galleries

### Supported Filters:

**News:**
- `search` - Search in title, content, excerpt
- `status` - published, draft, archived
- `category` - Filter by news category
- `is_featured` - Featured articles only
- `author` - Filter by author

**Events:**
- `search` - Search in title, description
- `status` - upcoming, ongoing, completed, cancelled
- `event_type` - international, domestic, training, tournament
- `venue` - Filter by venue
- `is_featured` - Featured events only

**Players:**
- `search` - Search in name, position
- `role` - batsman, bowler, all-rounder, wicket-keeper
- `status` - active, injured, retired, suspended
- `is_captain` - Captain/Vice-captain only
- `is_featured` - Featured players only

### Pagination:
- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 20)
- `ordering` - Sort field (prefix with `-` for descending)

## Features

- ✅ Public read access (no authentication required)
- ✅ Admin write access (authentication required)
- ✅ Automatic error handling
- ✅ Loading states
- ✅ Automatic cache invalidation
- ✅ Search functionality
- ✅ Advanced filtering
- ✅ Pagination support
- ✅ Retry logic with exponential backoff
- ✅ Optimistic updates support
- ✅ TypeScript ready
- ✅ Fully customizable

## Implementation Examples

See the following pages for complete implementation examples:
- `/src/app/admin/news/page.js` - Admin news management
- `/src/app/admin/events/page.js` - Admin events management
- `/src/app/news/page.js` - Public news listing

## Configuration

The hooks are configured with:
- Base URL: `http://localhost:8000/api/v1`
- Cache time: 10 minutes
- Stale time: 5 minutes
- Retry attempts: 3 with exponential backoff
- Authentication: Token-based for admin operations