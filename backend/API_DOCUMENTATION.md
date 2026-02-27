# CodeNexus Studio API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Register User
**POST** `/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Client"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Client"
  }
}
```

### Login
**POST** `/auth/login`

Request Body:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Admin"
  }
}
```

### Refresh Token
**POST** `/auth/refresh-token`

Request Body:
```json
{
  "token": "old_jwt_token"
}
```

---

## Clients

### Create Client
**POST** `/clients`
**Auth Required**: Admin, Manager

Request Body:
```json
{
  "name": "Ravi Sharma",
  "email": "ravi@techstartup.in",
  "phone": "+91 98765 43210",
  "company": "TechStartup Solutions",
  "address": "Sector 62, Mohali, Punjab",
  "gst": "GST03ABCDE1234F1Z5",
  "website": "https://techstartup.in",
  "industry": "Technology",
  "type": "Startup",
  "status": "Active",
  "servicePreference": ["Website", "Web App"],
  "paymentStatus": "Paid"
}
```

### Get All Clients
**GET** `/clients?status=Active&type=Startup&page=1&limit=10`
**Auth Required**: Admin, Manager

Query Parameters:
- `status`: Filter by status (Lead, Active, On Hold, Completed, Lost)
- `type`: Filter by type (Startup, Business, Personal)
- `paymentStatus`: Filter by payment status (Paid, Unpaid, Partial)
- `search`: Search in name, email, company, phone
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Get Client by ID
**GET** `/clients/:id`
**Auth Required**: Admin, Manager

### Update Client
**PUT** `/clients/:id`
**Auth Required**: Admin, Manager

Request Body: (any fields to update)
```json
{
  "status": "Completed",
  "paymentStatus": "Paid"
}
```

### Delete Client
**DELETE** `/clients/:id`
**Auth Required**: Admin, Manager

---

## Projects

### Create Project
**POST** `/projects`
**Auth Required**: Admin, Manager

Request Body:
```json
{
  "name": "E-commerce Website",
  "clientId": "client_uuid",
  "service": "Web App",
  "status": "In Progress",
  "deadline": "2026-04-10",
  "developerId": "developer_uuid",
  "progress": 40,
  "description": "Full-featured e-commerce platform"
}
```

### Get All Projects
**GET** `/projects?status=In Progress&service=Web App&page=1&limit=10`
**Auth Required**: Admin, Manager, Developer

Query Parameters:
- `status`: Filter by status (Pending, In Progress, Delivered)
- `service`: Filter by service (Website, Web App, SEO, Maintenance)
- `clientId`: Filter by client
- `page`: Page number
- `limit`: Items per page

### Get Project by ID
**GET** `/projects/:id`
**Auth Required**: Admin, Manager, Developer

### Update Project
**PUT** `/projects/:id`
**Auth Required**: Admin, Manager

Request Body:
```json
{
  "status": "Delivered",
  "progress": 100
}
```

### Delete Project
**DELETE** `/projects/:id`
**Auth Required**: Admin, Manager

---

## Leads

### Create Lead
**POST** `/leads`
**Auth Required**: Admin, Manager

Request Body:
```json
{
  "name": "Deepak Rao",
  "email": "deepak@example.com",
  "phone": "+91 91234 56789",
  "source": "Website",
  "service": "Web App",
  "status": "New",
  "notes": "Wants a CRM for his team"
}
```

### Get All Leads
**GET** `/leads?status=New&source=Website&page=1&limit=10`
**Auth Required**: Admin, Manager

Query Parameters:
- `status`: Filter by status (New, In Review, Converted, Lost)
- `source`: Filter by source (Website, WhatsApp, Email, Referral)
- `page`: Page number
- `limit`: Items per page

### Get Lead by ID
**GET** `/leads/:id`
**Auth Required**: Admin, Manager

### Update Lead
**PUT** `/leads/:id`
**Auth Required**: Admin, Manager

### Convert Lead to Client
**POST** `/leads/:id/convert`
**Auth Required**: Admin, Manager

Response:
```json
{
  "success": true,
  "client": { ... },
  "lead": { ... }
}
```

### Delete Lead
**DELETE** `/leads/:id`
**Auth Required**: Admin, Manager

---

## Invoices

### Create Invoice
**POST** `/invoices`
**Auth Required**: Admin, Manager

Request Body:
```json
{
  "clientId": "client_uuid",
  "projectId": "project_uuid",
  "amount": 120000,
  "paid": 60000,
  "paymentMode": "UPI",
  "dueDate": "2026-03-15",
  "notes": "50% advance payment received"
}
```

### Get All Invoices
**GET** `/invoices?status=Unpaid&clientId=uuid&page=1&limit=10`
**Auth Required**: Admin, Manager

Query Parameters:
- `status`: Filter by status (Paid, Unpaid, Partial)
- `clientId`: Filter by client
- `page`: Page number
- `limit`: Items per page

### Get Invoice by ID
**GET** `/invoices/:id`
**Auth Required**: Admin, Manager

### Update Invoice
**PUT** `/invoices/:id`
**Auth Required**: Admin, Manager

### Mark Invoice as Paid
**POST** `/invoices/:id/mark-paid`
**Auth Required**: Admin, Manager

Request Body:
```json
{
  "paidAmount": 120000,
  "paymentMode": "Bank Transfer"
}
```

### Get Revenue Statistics
**GET** `/invoices/stats/revenue`
**Auth Required**: Admin, Manager

Response:
```json
{
  "success": true,
  "stats": {
    "totalRevenue": 375000,
    "collectedRevenue": 200000,
    "outstandingRevenue": 175000
  }
}
```

### Delete Invoice
**DELETE** `/invoices/:id`
**Auth Required**: Admin, Manager

---

## Dashboard

### Get Dashboard Data
**GET** `/dashboard`
**Auth Required**: Admin, Manager

Response:
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 375000,
      "collected": 200000,
      "outstanding": 175000
    },
    "clients": {
      "total": 6,
      "byStatus": {
        "Active": 4,
        "Lead": 1,
        "Completed": 1
      }
    },
    "projects": {
      "total": 8,
      "byStatus": {
        "In Progress": 4,
        "Delivered": 2,
        "Pending": 2
      }
    },
    "leads": {
      "total": 5,
      "byStatus": {
        "New": 2,
        "In Review": 2,
        "Converted": 1
      }
    },
    "paymentBreakdown": {
      "Paid": 2,
      "Unpaid": 2,
      "Partial": 2
    },
    "recentActivity": [...]
  }
}
```

### Get Activity Feed
**GET** `/dashboard/activity?page=1&limit=20`
**Auth Required**: Admin, Manager

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Role-Based Access

- **Admin**: Full access to all endpoints
- **Manager**: Access to clients, projects, leads, invoices, dashboard
- **Developer**: Read access to projects
- **Client**: Limited access (to be implemented)
