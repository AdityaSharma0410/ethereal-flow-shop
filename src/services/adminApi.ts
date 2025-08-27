import { api } from './api';
import type {
  PageRequest,
  PageResponse,
  UpsertProductRequest,
  ProductFilter,
  CategoryUpsertRequest,
  UserFilter,
  UpdateUserRoleRequest,
  ModerationRequest,
  OrderFilter,
  UpdateOrderStatusRequest,
  InvoiceResponse,
  ReturnRequest,
  PaymentFilter,
  RefundRequest,
  GatewayLogFilter,
  SalesOverviewRequest,
  SalesOverviewPoint,
  TopProduct,
  CustomerInsights,
  ExportReportRequest,
  ExportReportResponse,
  CouponUpsertRequest,
  CouponUsage,
  EmailCampaignRequest,
  PushConfigRequest,
  SupportReplyRequest,
  TwoFactorRequest,
  ConfigUpdateRequest,
  AuditLogFilter,
  ApiConsoleRequest,
  FeatureToggleRequest,
  ErrorLogFilter,
} from '@/types/admin';
import type { Product, Category, User, Order } from '@/types/product';

// Helper to pass pagination params
const withPage = (params?: PageRequest) => ({
  page: params?.page,
  size: params?.size,
  sort: params?.sort,
});

export const AdminAPI = {
  // Product Management
  listProducts: (filter?: ProductFilter) => api.get<PageResponse<Product>>('/admin/products', { params: { ...filter } }).then(r => r.data),
  getProduct: (id: string) => api.get<Product>(`/admin/products/${id}`).then(r => r.data),
  createProduct: (req: UpsertProductRequest) => api.post<Product>('/admin/products', req).then(r => r.data),
  updateProduct: (id: string, req: UpsertProductRequest) => api.put<Product>(`/admin/products/${id}`, req).then(r => r.data),
  deleteProduct: (id: string) => api.delete<void>(`/admin/products/${id}`).then(r => r.data),
  bulkUploadProducts: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post<{ imported: number; errors?: string[] }>('/admin/products/bulk', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
  },
  listCategories: (params?: PageRequest) => api.get<PageResponse<Category>>('/admin/categories', { params: withPage(params) }).then(r => r.data),
  createCategory: (req: CategoryUpsertRequest) => api.post<Category>('/admin/categories', req).then(r => r.data),
  updateCategory: (id: string, req: CategoryUpsertRequest) => api.put<Category>(`/admin/categories/${id}`, req).then(r => r.data),
  deleteCategory: (id: string) => api.delete<void>(`/admin/categories/${id}`).then(r => r.data),

  // User Management
  listUsers: (filter?: UserFilter) => api.get<PageResponse<User>>('/admin/users', { params: { ...filter } }).then(r => r.data),
  getUser: (id: string) => api.get<User>(`/admin/users/${id}`).then(r => r.data),
  updateUserRole: (id: string, req: UpdateUserRoleRequest) => api.patch<User>(`/admin/users/${id}/role`, req).then(r => r.data),
  banUser: (id: string, req: ModerationRequest) => api.post<void>(`/admin/users/${id}/ban`, req).then(r => r.data),
  suspendUser: (id: string, req: ModerationRequest) => api.post<void>(`/admin/users/${id}/suspend`, req).then(r => r.data),

  // Order Management
  listOrders: (filter?: OrderFilter) => api.get<PageResponse<Order>>('/admin/orders', { params: { ...filter } }).then(r => r.data),
  getOrder: (id: string) => api.get<Order>(`/admin/orders/${id}`).then(r => r.data),
  updateOrderStatus: (id: string, req: UpdateOrderStatusRequest) => api.patch<Order>(`/admin/orders/${id}/status`, req).then(r => r.data),
  generateInvoice: (id: string) => api.post<InvoiceResponse>(`/admin/orders/${id}/invoice`, {}).then(r => r.data),
  createReturnRequest: (req: ReturnRequest) => api.post<void>('/admin/returns', req).then(r => r.data),

  // Payment & Transactions
  listPayments: (filter?: PaymentFilter) => api.get<PageResponse<any>>('/admin/payments', { params: { ...filter } }).then(r => r.data),
  refundPayment: (req: RefundRequest) => api.post<void>('/admin/payments/refund', req).then(r => r.data),
  listGatewayLogs: (filter?: GatewayLogFilter) => api.get<PageResponse<any>>('/admin/gateway/logs', { params: { ...filter } }).then(r => r.data),

  // Analytics & Reports
  salesOverview: (req: SalesOverviewRequest) => api.get<SalesOverviewPoint[]>('/admin/analytics/sales', { params: req }).then(r => r.data),
  topProducts: () => api.get<TopProduct[]>('/admin/analytics/top-products').then(r => r.data),
  customerInsights: () => api.get<CustomerInsights>('/admin/analytics/customer-insights').then(r => r.data),
  exportReport: (req: ExportReportRequest) => api.post<ExportReportResponse>('/admin/reports/export', req).then(r => r.data),

  // Promotions & Coupons
  listCoupons: (params?: PageRequest) => api.get<PageResponse<any>>('/admin/coupons', { params: withPage(params) }).then(r => r.data),
  createCoupon: (req: CouponUpsertRequest) => api.post<any>('/admin/coupons', req).then(r => r.data),
  updateCoupon: (id: string, req: CouponUpsertRequest) => api.put<any>(`/admin/coupons/${id}`, req).then(r => r.data),
  deleteCoupon: (id: string) => api.delete<void>(`/admin/coupons/${id}`).then(r => r.data),
  couponUsage: (code: string) => api.get<CouponUsage>(`/admin/coupons/${code}/usage`).then(r => r.data),

  // Communication Tools
  sendEmailCampaign: (req: EmailCampaignRequest) => api.post<void>('/admin/communications/email', req).then(r => r.data),
  configurePush: (req: PushConfigRequest) => api.post<void>('/admin/communications/push/config', req).then(r => r.data),
  listTickets: (params?: PageRequest) => api.get<PageResponse<any>>('/admin/support/tickets', { params: withPage(params) }).then(r => r.data),
  replyTicket: (req: SupportReplyRequest) => api.post<void>(`/admin/support/tickets/${req.ticketId}/reply`, { message: req.message }).then(r => r.data),

  // Security & Settings
  listAuditLogs: (filter?: AuditLogFilter) => api.get<PageResponse<any>>('/admin/security/audit', { params: { ...filter } }).then(r => r.data),
  configureTwoFactor: (req: TwoFactorRequest) => api.post<void>('/admin/security/2fa', req).then(r => r.data),
  updateConfig: (req: ConfigUpdateRequest) => api.post<void>('/admin/security/config', req).then(r => r.data),

  // Developer Tools
  apiConsole: (req: ApiConsoleRequest) => {
    const method = req.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete';
    // @ts-expect-error indexed access on axios instance by method
    return api[method](req.path, ['post','put','delete'].includes(method) ? req.body : { params: req.body }).then((r:any) => r.data);
  },
  setFeatureToggle: (req: FeatureToggleRequest) => api.post<void>('/admin/dev/features', req).then(r => r.data),
  listErrorLogs: (filter?: ErrorLogFilter) => api.get<PageResponse<any>>('/admin/dev/errors', { params: { ...filter } }).then(r => r.data),
};

export default AdminAPI;


