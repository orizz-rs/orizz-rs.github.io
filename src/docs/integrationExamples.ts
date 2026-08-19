const examples: Readonly<Record<string, string>> = {
  Button: `import { useState } from 'react'
import { Button } from '@orizz-rs/ui'

export function SaveOrderButton(): JSX.Element {
  const [saving, setSaving] = useState(false)

  async function saveOrder(): Promise<void> {
    setSaving(true)
    try {
      const response = await fetch('/api/orders', { method: 'POST' })
      if (!response.ok) throw new Error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  return <Button onClick={saveOrder} isLoading={saving}>Save order</Button>
}`,
  TextField: `import { useState, type FormEvent } from 'react'
import { Button, TextField } from '@orizz-rs/ui'

export function InviteMemberForm(): JSX.Element {
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setSaving(true)
    await fetch('/api/members', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSaving(false)
  }

  return <form onSubmit={submit}>
    <TextField label="Work email" value={email} onChange={(event) => setEmail(event.target.value)} />
    <Button type="submit" isLoading={saving}>Send invitation</Button>
  </form>
}`,
  Textarea: `import { useState, type FormEvent } from 'react'
import { Button, Textarea } from '@orizz-rs/ui'

export function OrderNoteForm(): JSX.Element {
  const [note, setNote] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    await fetch('/api/orders/po-1004/note', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    })
  }

  return <form onSubmit={submit}>
    <Textarea label="Order note" value={note} onChange={(event) => setNote(event.target.value)} />
    <Button type="submit">Save note</Button>
  </form>
}`,
  Select: `import { useState } from 'react'
import { Select } from '@orizz-rs/ui'

export function RoleSelect(): JSX.Element {
  const [role, setRole] = useState('member')

  async function updateRole(nextRole: string): Promise<void> {
    setRole(nextRole)
    await fetch('/api/members/usr-01/role', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: nextRole }),
    })
  }

  return <Select label="Team role" value={role} onChange={(event) => void updateRole(event.target.value)}>
    <option value="member">Member</option><option value="admin">Admin</option>
  </Select>
}`,
  Checkbox: `import { useState } from 'react'
import { Checkbox } from '@orizz-rs/ui'

export function NotificationSetting(): JSX.Element {
  const [enabled, setEnabled] = useState(false)
  async function change(enabled: boolean): Promise<void> {
    setEnabled(enabled)
    await fetch('/api/settings/notifications', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weeklySummary: enabled }),
    })
  }
  return <Checkbox label="Weekly summary" checked={enabled} onChange={(event) => void change(event.target.checked)} />
}`,
  Radio: `import { useState } from 'react'
import { Radio } from '@orizz-rs/ui'

export function PlanSelector(): JSX.Element {
  const [plan, setPlan] = useState('starter')
  async function choose(nextPlan: string): Promise<void> {
    setPlan(nextPlan)
    await fetch('/api/subscription', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: nextPlan }),
    })
  }
  return <div>
    <Radio name="plan" value="starter" label="Starter" checked={plan === 'starter'} onChange={() => void choose('starter')} />
    <Radio name="plan" value="pro" label="Professional" checked={plan === 'pro'} onChange={() => void choose('pro')} />
  </div>
}`,
  Switch: `import { useState } from 'react'
import { Switch } from '@orizz-rs/ui'

export function AnalyticsSwitch(): JSX.Element {
  const [enabled, setEnabled] = useState(true)
  async function change(enabled: boolean): Promise<void> {
    setEnabled(enabled)
    await fetch('/api/settings/analytics', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    })
  }
  return <Switch label="Product analytics" checked={enabled} onChange={(event) => void change(event.target.checked)} />
}`,
  FormField: `import { useState, type FormEvent } from 'react'
import { Button, FormField } from '@orizz-rs/ui'

export function ProjectCodeForm(): JSX.Element {
  const [code, setCode] = useState('')
  const error = code.length > 0 && code.length < 3 ? 'Use at least 3 characters.' : undefined
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!error && code) void fetch('/api/projects', { method: 'POST', body: JSON.stringify({ code }) })
  }
  return <form onSubmit={submit}>
    <FormField label="Project code" htmlFor="project-code" required error={error}>
      <input id="project-code" value={code} onChange={(event) => setCode(event.target.value)} />
    </FormField>
    <Button type="submit" disabled={Boolean(error)}>Create project</Button>
  </form>
}`,
  NumberInput: `import { useState } from 'react'
import { NumberInput } from '@orizz-rs/ui'

export function QuantityInput(): JSX.Element {
  const [quantity, setQuantity] = useState<number | null>(1)
  async function persist(value: number | null): Promise<void> {
    setQuantity(value)
    await fetch('/api/cart/quantity', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quantity: value }) })
  }
  return <NumberInput label="Quantity" value={quantity ?? ''} min={1} onValueChange={(value) => void persist(value)} />
}`,
  CurrencyInput: `import { useState } from 'react'
import { CurrencyInput } from '@orizz-rs/ui'

export function PriceInput(): JSX.Element {
  const [price, setPrice] = useState<number | null>(1250)
  async function persist(value: number | null): Promise<void> {
    setPrice(value)
    await fetch('/api/products/p-01/price', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ price: value }) })
  }
  return <CurrencyInput label="Unit price" currency="THB" value={price ?? ''} onValueChange={(value) => void persist(value)} />
}`,
  Combobox: `import { useEffect, useState } from 'react'
import { Combobox, type ComboboxOption } from '@orizz-rs/ui'

export function WarehouseCombobox(): JSX.Element {
  const [options, setOptions] = useState<readonly ComboboxOption[]>([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/warehouses').then((response) => response.json()).then((data: ComboboxOption[]) => setOptions(data)).finally(() => setLoading(false))
  }, [])
  return <Combobox label="Warehouse" options={options} value={value} onValueChange={setValue} loading={loading} />
}`,
  Alert: `import { useState } from 'react'
import { Alert, Button } from '@orizz-rs/ui'

export function RefreshAlert(): JSX.Element {
  const [error, setError] = useState<string>()
  async function refresh(): Promise<void> {
    const response = await fetch('/api/orders')
    setError(response.ok ? undefined : 'Orders could not be refreshed.')
  }
  return <>{error && <Alert tone="danger" title="Refresh failed" action={<Button onClick={() => void refresh()}>Retry</Button>}>{error}</Alert>}</>
}`,
  Badge: `import { Badge } from '@orizz-rs/ui'

interface OrderProps { readonly status: 'approved' | 'pending' | 'rejected' }
export function OrderStatus({ status }: OrderProps): JSX.Element {
  const tone = status === 'approved' ? 'success' : status === 'pending' ? 'warning' : 'danger'
  return <Badge tone={tone}>{status}</Badge>
}`,
  Spinner: `import { useEffect, useState } from 'react'
import { Spinner } from '@orizz-rs/ui'

export function AccountBalance(): JSX.Element {
  const [balance, setBalance] = useState<number>()
  useEffect(() => { fetch('/api/balance').then((response) => response.json()).then((data: { balance: number }) => setBalance(data.balance)) }, [])
  if (balance === undefined) return <Spinner label="Loading account balance" />
  return <strong>฿{balance.toLocaleString()}</strong>
}`,
  Toast: `import { useState } from 'react'
import { Button, Toast } from '@orizz-rs/ui'

export function SaveWithToast(): JSX.Element {
  const [open, setOpen] = useState(false)
  async function save(): Promise<void> {
    const response = await fetch('/api/settings', { method: 'PUT' })
    if (response.ok) setOpen(true)
  }
  return <><Button onClick={() => void save()}>Save</Button><Toast open={open} tone="success" title="Settings saved" onDismiss={() => setOpen(false)} /></>
}`,
  Skeleton: `import { useEffect, useState } from 'react'
import { Card, CardContent, Skeleton } from '@orizz-rs/ui'

export function ProjectSummary(): JSX.Element {
  const [summary, setSummary] = useState<string>()
  useEffect(() => { fetch('/api/projects/p-01/summary').then((response) => response.text()).then(setSummary) }, [])
  return <Card><CardContent>{summary ?? <><Skeleton size="lg" label="Loading title" /><Skeleton variant="rect" label="Loading summary" /></>}</CardContent></Card>
}`,
  EmptyState: `import { EmptyState, Button } from '@orizz-rs/ui'

interface ProjectListProps { readonly projects: readonly { id: string; name: string }[] }
export function ProjectList({ projects }: ProjectListProps): JSX.Element {
  if (projects.length === 0) return <EmptyState title="No projects" description="Create your first project." action={<Button>Create project</Button>} />
  return <ul>{projects.map((project) => <li key={project.id}>{project.name}</li>)}</ul>
}`,
  ResultState: `import { ResultState, Button } from '@orizz-rs/ui'

interface ApprovalResultProps { readonly orderId: string }
export function ApprovalResult({ orderId }: ApprovalResultProps): JSX.Element {
  return <ResultState tone="success" title="Order approved" description={orderId + ' is ready for the supplier.'} action={<Button onClick={() => location.assign('/orders/' + orderId)}>Open order</Button>} />
}`,
  Progress: `import { useEffect, useState } from 'react'
import { Progress } from '@orizz-rs/ui'

export function ImportProgress({ jobId }: { readonly jobId: string }): JSX.Element {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => { fetch('/api/jobs/' + jobId).then((response) => response.json()).then((data: { progress: number }) => setValue(data.progress)) }, 1000)
    return () => window.clearInterval(timer)
  }, [jobId])
  return <Progress label="Importing records" value={value} showValue />
}`,
  LoadingOverlay: `import { useState } from 'react'
import { Button, LoadingOverlay } from '@orizz-rs/ui'

export function RefreshableOrders(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  async function refresh(): Promise<void> {
    setLoading(true)
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) throw new Error('Refresh failed')
      const data: { id: string }[] = await response.json()
      setCount(data.length)
    } finally {
      setLoading(false)
    }
  }
  return <LoadingOverlay open={loading} label="Refreshing orders">
    <section><strong>{count} purchase orders</strong><Button onClick={() => void refresh()}>Refresh</Button></section>
  </LoadingOverlay>
}`,
  Card: `import { Card, CardContent, CardHeader } from '@orizz-rs/ui'

interface Project { readonly id: string; readonly name: string; readonly description: string }
export function ProjectCard({ project }: { readonly project: Project }): JSX.Element {
  return <Card variant="elevated"><CardHeader><h3>{project.name}</h3></CardHeader><CardContent>{project.description}</CardContent></Card>
}`,
  Avatar: `import { Avatar } from '@orizz-rs/ui'

interface User { readonly name: string; readonly avatarUrl?: string; readonly online: boolean }
export function UserIdentity({ user }: { readonly user: User }): JSX.Element {
  const fallback = user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)
  return <Avatar src={user.avatarUrl} alt={user.name} fallback={fallback} status={user.online ? 'online' : 'offline'} />
}`,
  Divider: `import { Divider } from '@orizz-rs/ui'

export function AccountSettings(): JSX.Element {
  return <section><h2>Profile</h2><p>Manage your public identity.</p><Divider decorative /><h2>Security</h2><p>Manage sessions and passwords.</p></section>
}`,
  Breadcrumb: `import { Breadcrumb } from '@orizz-rs/ui'

export function OrderBreadcrumb({ orderId }: { readonly orderId: string }): JSX.Element {
  return <Breadcrumb items={[{ id: 'home', label: 'Home', href: '/' }, { id: 'orders', label: 'Orders', href: '/orders' }, { id: orderId, label: orderId, current: true }]} />
}`,
  Tabs: `import { useState } from 'react'
import { Tabs, type TabItem } from '@orizz-rs/ui'

const items: readonly TabItem[] = [{ id: 'details', label: 'Details', content: <OrderDetails /> }, { id: 'audit', label: 'Audit', content: <AuditLog /> }]
export function OrderTabs(): JSX.Element {
  const [tab, setTab] = useState('details')
  return <Tabs items={items} value={tab} onValueChange={setTab} />
}`,
  Pagination: `import { useEffect, useState } from 'react'
import { Pagination } from '@orizz-rs/ui'

export function OrdersPagination(): JSX.Element {
  const [page, setPage] = useState(1)
  useEffect(() => { void fetch('/api/orders?page=' + page) }, [page])
  return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
}`,
  Sidebar: `import { useState } from 'react'
import { Sidebar, type SidebarItem } from '@orizz-rs/ui'

export function AppSidebar(): JSX.Element {
  const [active, setActive] = useState('overview')
  const groups = [{ id: 'main', items: [{ id: 'overview', label: 'Overview', active: active === 'overview' }, { id: 'orders', label: 'Orders', active: active === 'orders' }] }]
  function select(item: SidebarItem): void { setActive(item.id); history.pushState({}, '', '/' + item.id) }
  return <Sidebar groups={groups} onItemSelect={select} />
}`,
  NavigationMenu: `import { useState } from 'react'
import { NavigationMenu, type NavigationMenuItem } from '@orizz-rs/ui'

export function ReportsMenu(): JSX.Element {
  const [active, setActive] = useState('sales')
  const items = [{ id: 'sales', label: 'Sales', active: active === 'sales' }, { id: 'inventory', label: 'Inventory', active: active === 'inventory' }]
  function select(item: NavigationMenuItem): void { setActive(item.id); void fetch('/api/analytics/navigation', { method: 'POST', body: JSON.stringify({ id: item.id }) }) }
  return <NavigationMenu items={items} onItemSelect={select} />
}`,
  PageHeader: `import { Button, PageHeader } from '@orizz-rs/ui'

export function OrdersHeader(): JSX.Element {
  function createOrder(): void { history.pushState({}, '', '/orders/new') }
  return <PageHeader eyebrow="Procurement" title="Purchase orders" description="Manage supplier orders." actions={<Button onClick={createOrder}>New order</Button>} />
}`,
  Toolbar: `import { Button, TextField, Toolbar } from '@orizz-rs/ui'

export function OrdersToolbar({ onSearch }: { readonly onSearch: (query: string) => void }): JSX.Element {
  async function exportOrders(): Promise<void> { const response = await fetch('/api/orders/export'); const blob = await response.blob(); window.open(URL.createObjectURL(blob)) }
  return <Toolbar start={<TextField label="Search" onChange={(event) => onSearch(event.target.value)} />} end={<Button onClick={() => void exportOrders()}>Export</Button>} />
}`,
  SplitPane: `import { useState } from 'react'
import { Button, SplitPane } from '@orizz-rs/ui'

export function OrderWorkspace(): JSX.Element {
  const [selectedId, setSelectedId] = useState('po-1001')
  const list = <div><Button onClick={() => setSelectedId('po-1001')}>PO-1001</Button><Button onClick={() => setSelectedId('po-1002')}>PO-1002</Button></div>
  const detail = <OrderDetail orderId={selectedId} />
  return <SplitPane first={list} second={detail} firstSize="18rem" />
}`,
  Stepper: `import { useState } from 'react'
import { Stepper } from '@orizz-rs/ui'

export function ApprovalStepper(): JSX.Element {
  const [current, setCurrent] = useState('review')
  const items = [{ id: 'draft', label: 'Draft', status: 'complete' as const }, { id: 'review', label: 'Review' }, { id: 'approve', label: 'Approval' }]
  async function change(id: string): Promise<void> { await fetch('/api/orders/po-1004/step', { method: 'PATCH', body: JSON.stringify({ id }) }); setCurrent(id) }
  return <Stepper items={items} current={current} onStepChange={(id) => void change(id)} />
}`,
  Timeline: `import { useEffect, useState } from 'react'
import { Timeline, type TimelineItem } from '@orizz-rs/ui'

export function AuditTimeline(): JSX.Element {
  const [items, setItems] = useState<readonly TimelineItem[]>([])
  useEffect(() => { fetch('/api/orders/po-1004/audit').then((response) => response.json()).then((data: TimelineItem[]) => setItems(data)) }, [])
  return <Timeline items={items} ariaLabel="Order audit history" />
}`,
  Dialog: `import { useState } from 'react'
import { Button, Dialog } from '@orizz-rs/ui'

export function DeleteOrderDialog(): JSX.Element {
  const [open, setOpen] = useState(false)
  async function remove(): Promise<void> { const response = await fetch('/api/orders/po-1004', { method: 'DELETE' }); if (response.ok) setOpen(false) }
  return <><Button variant="danger" onClick={() => setOpen(true)}>Delete order</Button><Dialog open={open} onOpenChange={setOpen} title="Delete order?" description="This action cannot be undone."><Button variant="danger" onClick={() => void remove()}>Confirm delete</Button></Dialog></>
}`,
  Popover: `import { useState } from 'react'
import { Button, Checkbox, Popover } from '@orizz-rs/ui'

export function StatusFilter(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(true)
  return <Popover open={open} onOpenChange={setOpen} trigger={<Button variant="secondary">Filters</Button>} title="Order status"><Checkbox label="Pending" checked={pending} onChange={(event) => setPending(event.target.checked)} /></Popover>
}`,
  Accordion: `import { Accordion } from '@orizz-rs/ui'

export function FaqAccordion(): JSX.Element {
  const items = [{ id: 'approval', title: 'How does approval work?', content: 'Orders route to the assigned approver.' }, { id: 'audit', title: 'Where is audit history?', content: 'Open the Audit tab on an order.' }]
  return <Accordion items={items} onValueChange={(id) => { if (id) void fetch('/api/analytics/faq', { method: 'POST', body: JSON.stringify({ id }) }) }} />
}`,
  DataTable: `import { useEffect, useState } from 'react'
import { Button, DataTable } from '@orizz-rs/ui'

interface Order { readonly id: string; readonly supplier: string; readonly amount: number }
export function OrdersTable(): JSX.Element {
  const [orders, setOrders] = useState<readonly Order[]>([])
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { fetch('/api/orders').then((response) => response.json()).then((data: Order[]) => setOrders(data)).finally(() => setLoading(false)) }, [])
  async function archive(): Promise<void> { await fetch('/api/orders/archive', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: selectedIds }) }); setSelectedIds([]) }
  return <DataTable data={orders} loading={loading} getRowId={(row) => row.id} selectable selectedRowIds={selectedIds} onSelectionChange={setSelectedIds} selectionActions={<Button onClick={() => void archive()}>Archive</Button>} />
}`,
};

export function getIntegrationExample(name: string): string {
  return examples[name] ?? `import { ${name} } from '@orizz-rs/ui'\n\nexport function Example(): JSX.Element {\n  return <${name} />\n}`;
}
