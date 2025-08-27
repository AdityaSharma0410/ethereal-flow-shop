// Core pagination and filtering types
export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string; // e.g., "createdAt,desc"
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// Products
export interface UpsertProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  images: string[];
  tags?: string[];
  featured?: boolean;
  specifications?: Record<string, string>;
}

export interface ProductFilter extends PageRequest {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export interface CategoryUpsertRequest {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

// Users
export type UserRole = 'admin' | 'manager' | 'support' | 'customer';

export interface UserFilter extends PageRequest {
  role?: UserRole;
  status?: 'active' | 'banned' | 'suspended';
  search?: string;
}

export interface UpdateUserRoleRequest {
  role: UserRole;
}

export interface ModerationRequest {
  reason: string;
}

// Orders
export interface OrderFilter extends PageRequest {
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  userId?: string;
  dateFrom?: string; // ISO
  dateTo?: string;   // ISO
}

export interface UpdateOrderStatusRequest {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notifyCustomer?: boolean; // triggers email/SMS
}

export interface InvoiceResponse {
  url: string; // downloadable PDF link
}

export interface ReturnRequest {
  orderId: string;
  reason: string;
  items: Array<{ productId: string; quantity: number }>;
}

// Payments
export interface PaymentFilter extends PageRequest {
  status?: 'success' | 'failed' | 'pending';
  gateway?: 'stripe' | 'razorpay' | 'paypal';
}

export interface RefundRequest {
  paymentId: string;
  amount?: number; // partial allowed
  reason?: string;
}

export interface GatewayLogFilter extends PageRequest {
  gateway?: 'stripe' | 'razorpay' | 'paypal';
  level?: 'info' | 'warn' | 'error';
}

// Analytics
export interface SalesOverviewRequest {
  granularity: 'daily' | 'weekly' | 'monthly';
  dateFrom?: string;
  dateTo?: string;
}

export interface SalesOverviewPoint {
  period: string; // e.g., 2024-08-01 or 2024-W32
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  name: string;
  metric: number;
}

export interface CustomerInsights {
  repeatBuyersRate: number;
  cartAbandonmentRate: number;
}

// Reports
export interface ExportReportRequest {
  type: 'sales' | 'products' | 'customers' | 'orders';
  format: 'csv' | 'pdf';
  dateFrom?: string;
  dateTo?: string;
}

export interface ExportReportResponse {
  url: string; // downloadable file link
}

// Promotions
export interface CouponUpsertRequest {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  expiresAt?: string; // ISO
  usageLimit?: number;
  perUserLimit?: number;
}

export interface CouponUsage {
  code: string;
  used: number;
}

// Communications
export interface EmailCampaignRequest {
  subject: string;
  audience: 'all' | 'repeat';
  html: string;
}

export interface PushConfigRequest {
  enabled: boolean;
}

export interface SupportReplyRequest {
  ticketId: string;
  message: string;
}

// Security & Settings
export interface TwoFactorRequest {
  enabled: boolean;
}

export interface ConfigUpdateRequest {
  paymentApiKey?: string;
  smtpHost?: string;
  smtpUser?: string;
}

export interface AuditLogFilter extends PageRequest {
  actorId?: string;
  action?: string;
}

// Dev Tools
export interface ApiConsoleRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  body?: unknown;
}

export interface FeatureToggleRequest {
  key: string;
  enabled: boolean;
}

export interface ErrorLogFilter extends PageRequest {
  level?: 'info' | 'warn' | 'error';
  service?: 'frontend' | 'backend';
}


