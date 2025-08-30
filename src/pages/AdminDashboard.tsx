import React, { useMemo, useState } from 'react';
import { 
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  CreditCard,
  BarChart3,
  TicketPercent,
  Megaphone,
  ShieldCheck,
  TerminalSquare,
  Upload,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Mail,
  Bell,
  LifeBuoy,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type SectionKey =
  | 'overview'
  | 'products'
  | 'users'
  | 'orders'
  | 'payments'
  | 'analytics'
  | 'coupons'
  | 'communications'
  | 'security'
  | 'devtools';

const sections: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'orders', label: 'Orders', icon: ClipboardList },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'coupons', label: 'Coupons', icon: TicketPercent },
  { key: 'communications', label: 'Communication', icon: Megaphone },
  { key: 'security', label: 'Security', icon: ShieldCheck },
  { key: 'devtools', label: 'Dev Tools', icon: TerminalSquare },
];

const AdminDashboard: React.FC = () => {
  const [active, setActive] = useState<SectionKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActiveIcon = useMemo(() => sections.find(s => s.key === active)?.icon ?? LayoutDashboard, [active]);

  return (
    <div className="container mx-auto px-4 pt-28 pb-10">{/* account for fixed navbar */}
      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn-liquid"
        >
          {sidebarOpen ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
          {sidebarOpen ? 'Close Menu' : 'Open Menu'}
        </Button>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'fixed left-4 top-28 z-50' : 'hidden'} lg:relative lg:block w-64 flex-shrink-0 lg:flex-shrink-0`}>
          <Card className="glass-card-strong border-glass-border lg:sticky lg:top-28">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5" /> Admin Dashboard
              </CardTitle>
              <CardDescription>Control panel for managing your store</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-200px)] pr-2">
                <div className="space-y-1">
                  {sections.map(({ key, label, icon: Icon }) => (
                    <Button
                      key={key}
                      variant={active === key ? 'default' : 'ghost'}
                      className={`w-full justify-start ${active === key ? 'btn-ethereal' : ''}`}
                      onClick={() => {
                        setActive(key);
                        setSidebarOpen(false); // Close mobile menu when section is selected
                      }}
                    >
                      <Icon className="w-4 h-4 mr-2" /> {label}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-4 min-w-0">
          <Header active={active} Icon={ActiveIcon} />

          {active === 'overview' && <OverviewSection />}
          {active === 'products' && <ProductsSection />}
          {active === 'users' && <UsersSection />}
          {active === 'orders' && <OrdersSection />}
          {active === 'payments' && <PaymentsSection />}
          {active === 'analytics' && <AnalyticsSection />}
          {active === 'coupons' && <CouponsSection />}
          {active === 'communications' && <CommunicationsSection />}
          {active === 'security' && <SecuritySection />}
          {active === 'devtools' && <DevToolsSection />}
        </main>
      </div>
    </div>
  );
};

const Header: React.FC<{ active: SectionKey; Icon: React.ElementType }> = ({ active, Icon }) => (
  <Card className="glass-card-strong border-glass-border">
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <CardTitle className="text-xl">{sections.find(s => s.key === active)?.label}</CardTitle>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="btn-liquid"><RefreshCw className="w-4 h-4 mr-2" /> Refresh</Button>
        <Button size="sm" className="btn-ethereal"><Download className="w-4 h-4 mr-2" /> Export</Button>
      </div>
    </CardHeader>
  </Card>
);

// Overview: quick stats
const OverviewSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Today’s Sales</CardTitle>
        <CardDescription>Revenue in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">$4,820</div>
        <p className="text-sm text-muted-foreground mt-2">+12% vs yesterday</p>
      </CardContent>
    </Card>
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Open Orders</CardTitle>
        <CardDescription>Pending and processing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">127</div>
        <div className="mt-3 flex gap-2"><Badge>Pending: 68</Badge><Badge variant="secondary">Processing: 59</Badge></div>
      </CardContent>
    </Card>
  </div>
);

// Products wireframe
const ProductsSection: React.FC = () => (
  <div className="space-y-4">
    <Card className="glass-card border-glass-border">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Add, edit, delete products. Bulk upload supported.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost"><Upload className="w-4 h-4 mr-2" /> Bulk Upload (CSV/XLSX)</Button>
          <Button><Plus className="w-4 h-4 mr-2" /> New Product</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input placeholder="Search products" />
          <Select>
            <SelectTrigger><SelectValue placeholder="Filter by category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="justify-start"><Filter className="w-4 h-4 mr-2" /> More Filters</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle>Product Form</CardTitle>
              <CardDescription>Fields only UI (not wired)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Product title" />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category"><SelectValue placeholder="Choose category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" placeholder="100" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="images">Images</Label>
                  <Input id="images" type="file" multiple />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Short description" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline">Reset</Button>
                <Button className="btn-ethereal">Save</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle>Inventory & Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Low Stock Alerts</p>
                  <p className="text-xs text-muted-foreground">Notify when below threshold</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div>
                <Label>Tags</Label>
                <Input placeholder="Comma separated tags" />
              </div>
              <div>
                <Label>New Category</Label>
                <div className="flex gap-2">
                  <Input placeholder="e.g. Accessories" />
                  <Button>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Users wireframe
const UsersSection: React.FC = () => (
  <Card className="glass-card border-glass-border">
    <CardHeader>
      <CardTitle>User Management</CardTitle>
      <CardDescription>Profiles, roles, and moderation</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <Input placeholder="Search users by name or email" />
        <Select>
          <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {[1,2,3,4].map(i => (
          <Card key={i} className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="text-base">Jane Doe #{i} <Badge className="ml-2">Customer</Badge></CardTitle>
              <CardDescription>jane{i}@example.com • 12 orders</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button size="sm" variant="outline">View Profile</Button>
              <Button size="sm" variant="outline">Orders</Button>
              <Button size="sm" variant="destructive">Ban</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Orders wireframe
const OrdersSection: React.FC = () => (
  <Card className="glass-card border-glass-border">
    <CardHeader className="flex items-center justify-between">
      <div>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>Filter orders and update status</CardDescription>
      </div>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Apply</Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[1012,1013,1014,1015].map(id => (
          <div key={id} className="glass-card rounded-lg p-3 border border-glass-border flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Order #{id}</p>
              <p className="text-xs text-muted-foreground">Jane Doe • $129.00</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>Pending</Badge>
              <Select>
                <SelectTrigger className="w-32"><SelectValue placeholder="Update" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">Invoice</Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Payments wireframe
const PaymentsSection: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
        <CardDescription>Recent transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {[{s:'Success',c:'primary'},{s:'Failed',c:'destructive'},{s:'Pending',c:'secondary'}].map((t,i)=> (
          <div key={i} className="flex items-center justify-between">
            <p>TX-2024-{1000+i}</p>
            {/* @ts-ignore - Badge variants typed to defaults */}
            <Badge variant={t.c as any}>{t.s}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Gateway Logs</CardTitle>
        <CardDescription>Stripe / Razorpay / PayPal</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea className="h-40" placeholder="Webhook and gateway logs appear here" />
      </CardContent>
    </Card>
  </div>
);

// Analytics wireframe
const AnalyticsSection: React.FC = () => (
  <Card className="glass-card border-glass-border">
    <CardHeader>
      <CardTitle>Analytics & Reports</CardTitle>
      <CardDescription>Sales overview and insights</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <div className="h-36 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-glass-border flex items-center justify-center text-sm text-muted-foreground">
            Chart Placeholder
          </div>
        </TabsContent>
        <TabsContent value="weekly">
          <div className="h-36 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-glass-border flex items-center justify-center text-sm text-muted-foreground">
            Chart Placeholder
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          <div className="h-36 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-glass-border flex items-center justify-center text-sm text-muted-foreground">
            Chart Placeholder
          </div>
        </TabsContent>
      </Tabs>
      <div className="grid md:grid-cols-3 gap-3">
        <Card className="glass-card border-glass-border"><CardHeader><CardTitle className="text-base">Top Products</CardTitle><CardDescription>By purchases</CardDescription></CardHeader><CardContent><ul className="text-sm space-y-1"><li>#1 Vintage Tee</li><li>#2 Wireless Earbuds</li><li>#3 Ceramic Mug</li></ul></CardContent></Card>
        <Card className="glass-card border-glass-border"><CardHeader><CardTitle className="text-base">Customer Insights</CardTitle><CardDescription>Repeat buyers</CardDescription></CardHeader><CardContent><p className="text-2xl font-bold">32%</p></CardContent></Card>
        <Card className="glass-card border-glass-border"><CardHeader><CardTitle className="text-base">Cart Abandonment</CardTitle><CardDescription>Last 30 days</CardDescription></CardHeader><CardContent><p className="text-2xl font-bold">68%</p></CardContent></Card>
      </div>
    </CardContent>
  </Card>
);

// Coupons wireframe
const CouponsSection: React.FC = () => (
  <Card className="glass-card border-glass-border">
    <CardHeader>
      <CardTitle>Promotions & Coupons</CardTitle>
      <CardDescription>Create and track coupon usage</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <Label>Code</Label>
          <Input placeholder="SAVE10" />
        </div>
        <div>
          <Label>Discount Type</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="percent">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Value</Label>
          <Input type="number" placeholder="10" />
        </div>
        <div>
          <Label>Expiry</Label>
          <Input type="date" />
        </div>
        <div>
          <Label>Usage Limit</Label>
          <Input type="number" placeholder="100" />
        </div>
        <div className="flex items-end"><Button className="w-full">Create</Button></div>
      </div>
      <Separator />
      <p className="text-sm text-muted-foreground">Recent coupons</p>
      <div className="grid md:grid-cols-2 gap-3">
        {[{c:'SAVE10',u:48},{c:'WELCOME',u:22}].map(({c,u}) => (
          <div key={c} className="glass-card rounded-lg p-3 border border-glass-border flex items-center justify-between">
            <span className="font-medium">{c}</span>
            <span className="text-sm text-muted-foreground">Used {u} times</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Communications wireframe
const CommunicationsSection: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Email Campaigns</CardTitle>
        <CardDescription>Newsletters and offers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label>Subject</Label>
            <Input placeholder="Announcing our fall sale" />
          </div>
          <div>
            <Label>Audience</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Segment" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All customers</SelectItem>
                <SelectItem value="repeat">Repeat buyers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Textarea className="h-40" placeholder="Write your email content..." />
        <div className="flex gap-2 justify-end">
          <Button variant="outline"><Mail className="w-4 h-4 mr-2" /> Send Test</Button>
          <Button className="btn-ethereal"><Mail className="w-4 h-4 mr-2" /> Send Campaign</Button>
        </div>
      </CardContent>
    </Card>
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Notifications & Support</CardTitle>
        <CardDescription>Push and ticket center</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Enable Push Notifications</p>
            <p className="text-xs text-muted-foreground">Send updates to app users</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="space-y-2">
          {[1,2,3].map(i => (
            <div key={i} className="glass-card rounded-lg p-3 border border-glass-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4 h-4" />
                <span className="text-sm">Ticket #{1200+i} • Refund request</span>
              </div>
              <Button size="sm" variant="outline">Respond</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Security wireframe
const SecuritySection: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>Track admin actions</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea className="h-48" placeholder="Action logs will appear here" />
      </CardContent>
    </Card>
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Authentication & Config</CardTitle>
        <CardDescription>2FA and environment settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Two-Factor Authentication</p>
            <p className="text-xs text-muted-foreground">Require 2FA for admin login</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label>Payment API Key</Label>
            <Input placeholder="sk_live_..." />
          </div>
          <div>
            <Label>SMTP</Label>
            <Input placeholder="smtp.mail.com" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Discard</Button>
          <Button>Save</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Dev Tools wireframe
const DevToolsSection: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>API Console</CardTitle>
        <CardDescription>Test backend endpoints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid md:grid-cols-3 gap-2">
          <Select>
            <SelectTrigger><SelectValue placeholder="GET" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="get">GET</SelectItem>
              <SelectItem value="post">POST</SelectItem>
              <SelectItem value="put">PUT</SelectItem>
              <SelectItem value="delete">DELETE</SelectItem>
            </SelectContent>
          </Select>
          <div className="md:col-span-2"><Input placeholder="/api/v1/products" /></div>
        </div>
        <Textarea className="h-28" placeholder="Request body (JSON)" />
        <div className="flex justify-end"><Button>Send</Button></div>
        <Textarea className="h-28" placeholder="Response output" />
      </CardContent>
    </Card>
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle>Feature Toggles & Errors</CardTitle>
        <CardDescription>Enable features and view logs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Enable Experimental Checkout</span>
          <Switch />
        </div>
        <Separator />
        <Textarea className="h-40" placeholder="Error logs and traces..." />
      </CardContent>
    </Card>
  </div>
);

export default AdminDashboard;


