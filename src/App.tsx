import { useEffect, useRef, useState, type JSX } from "react";
import { getIntegrationExample } from "./docs/integrationExamples";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Combobox,
  CurrencyInput,
  DataTable,
  Dialog,
  Divider,
  EmptyState,
  FormField,
  LoadingOverlay,
  NavigationMenu,
  NumberInput,
  Pagination,
  PageHeader,
  Popover,
  Progress,
  Radio,
  ResultState,
  Select,
  Sidebar,
  Skeleton,
  Spinner,
  SplitPane,
  Stepper,
  Switch,
  Tabs,
  TextField,
  Textarea,
  Toast,
  Timeline,
  Toolbar,
  type TabItem,
} from "@orizz-rs/ui";
type DocId =
  | "home"
  | "getting-started"
  | "integration"
  | "foundations"
  | "components"
  | "data-table"
  | "guides"
  | "orizz-rs";

interface DocItem {
  readonly id: DocId;
  readonly label: string;
  readonly description: string;
}

interface Member {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly status: string;
}

const docs: readonly DocItem[] = [
  {
    id: "getting-started",
    label: "Getting started",
    description: "Installation and setup",
  },
  { id: "foundations", label: "Foundations", description: "Tokens and themes" },
  { id: "integration", label: "Data & events", description: "Backend integration" },
  { id: "components", label: "Components", description: "Browse all components" },
];

const members: readonly Member[] = [
  { id: "usr-01", name: "Narin Chaiyaporn", role: "Product", status: "Active" },
  { id: "usr-02", name: "Mali Suthida", role: "Engineering", status: "Active" },
  { id: "usr-03", name: "Krit Panya", role: "Operations", status: "Invited" },
];

const componentGroups = [
  ["Actions", "Button"],
  [
    "Forms",
    "TextField · Textarea · Select · Checkbox · Radio · Switch · FormField · NumberInput · CurrencyInput · Combobox",
  ],
  [
    "Feedback",
    "Alert · Badge · Spinner · Toast · Skeleton · EmptyState · ResultState · Progress · LoadingOverlay",
  ],
  ["Content", "Card · Avatar · Divider"],
  [
    "Navigation",
    "Breadcrumb · Tabs · Pagination · Sidebar · NavigationMenu · PageHeader · Toolbar · SplitPane · Stepper · Timeline",
  ],
  ["Overlays", "Dialog · Popover · Accordion"],
  ["Data display", "DataTable"],
] as const;

interface ComponentReference {
  readonly name: string;
  readonly use: string;
  readonly example: string;
}

interface ComponentCategory {
  readonly name: string;
  readonly description: string;
  readonly components: readonly ComponentReference[];
}

const componentReferenceGroups: readonly ComponentCategory[] = [
  {
    name: "Actions",
    description: "การกระทำหลักของผู้ใช้และ destructive actions",
    components: [
      {
        name: "Button",
        use: "action หลัก, รอง, ghost และ destructive พร้อม loading state",
        example: '<Button variant="primary">Save</Button>',
      },
    ],
  },
  {
    name: "Forms",
    description: "รับข้อมูลโดยยึด native HTML semantics",
    components: [
      {
        name: "TextField",
        use: "input ข้อความบรรทัดเดียว",
        example: '<TextField label="Email" />',
      },
      {
        name: "Textarea",
        use: "ข้อความหลายบรรทัด",
        example: '<Textarea label="Notes" />',
      },
      {
        name: "Select",
        use: "เลือกค่าจากรายการแบบ native select",
        example: '<Select label="Role"><option>Admin</option></Select>',
      },
      {
        name: "Checkbox",
        use: "เลือกหลายรายการหรือค่า boolean",
        example: '<Checkbox label="Weekly summary" />',
      },
      {
        name: "Radio",
        use: "เลือกค่าเดียวจากกลุ่ม",
        example: '<Radio name="plan" label="Starter" />',
      },
      {
        name: "Switch",
        use: "เปิด/ปิด setting",
        example: '<Switch label="Analytics" />',
      },
      {
        name: "FormField",
        use: "รวม label, hint, required และ error",
        example: '<FormField label="Name">...</FormField>',
      },
      {
        name: "NumberInput",
        use: "รับตัวเลขพร้อม onValueChange",
        example: '<NumberInput label="Quantity" onValueChange={setQuantity} />',
      },
      {
        name: "CurrencyInput",
        use: "รับจำนวนเงินพร้อม currency adornment",
        example: '<CurrencyInput label="Price" currency="THB" />',
      },
      {
        name: "Combobox",
        use: "ค้นหาและเลือก option พร้อม keyboard navigation",
        example: '<Combobox label="Warehouse" options={warehouses} />',
      },
    ],
  },
  {
    name: "Feedback",
    description: "สื่อสารสถานะ การโหลด และทางแก้ไขให้ผู้ใช้",
    components: [
      {
        name: "Alert",
        use: "ข้อความสถานะหรือคำเตือนใน context เดิม",
        example: '<Alert tone="warning" title="Review access">...</Alert>',
      },
      {
        name: "Badge",
        use: "label สั้น ๆ และ status",
        example: '<Badge tone="success">Active</Badge>',
      },
      {
        name: "Spinner",
        use: "loading ระยะสั้นของ action หรือพื้นที่เล็ก",
        example: '<Spinner label="Loading" />',
      },
      {
        name: "Toast",
        use: "feedback ชั่วคราวหลัง action สำเร็จ",
        example: '<Toast open={open} title="Saved" />',
      },
      {
        name: "Skeleton",
        use: "placeholder ระหว่างโหลดข้อมูล",
        example: '<Skeleton variant="rect" label="Loading card" />',
      },
      {
        name: "EmptyState",
        use: "ไม่มีข้อมูลหรือยังไม่มี resource",
        example: '<EmptyState title="No projects" />',
      },
      {
        name: "ResultState",
        use: "success, error หรือ result ที่ต้องทำ action ต่อ",
        example: '<ResultState tone="success" title="Approved" />',
      },
      {
        name: "Progress",
        use: "แสดงความคืบหน้าของ workflow",
        example: '<Progress value={65} label="Approval" />',
      },
      {
        name: "LoadingOverlay",
        use: "ล็อกและแสดง loading บนพื้นที่ content",
        example: "<LoadingOverlay open={loading}>...</LoadingOverlay>",
      },
    ],
  },
  {
    name: "Content",
    description: "จัดกลุ่ม content และแสดง identity",
    components: [
      {
        name: "Card",
        use: "grouping ของ content ที่เกี่ยวข้องกัน",
        example: "<Card><CardContent>...</CardContent></Card>",
      },
      {
        name: "Avatar",
        use: "identity ของ user หรือ entity",
        example: '<Avatar alt="Kong" fallback="KS" />',
      },
      {
        name: "Divider",
        use: "แบ่งกลุ่ม content",
        example: "<Divider decorative />",
      },
    ],
  },
  {
    name: "Navigation",
    description: "โครงสร้าง wayfinding และ application shell",
    components: [
      {
        name: "Breadcrumb",
        use: "แสดงตำแหน่งปัจจุบันใน hierarchy",
        example: "<Breadcrumb items={items} />",
      },
      {
        name: "Tabs",
        use: "สลับมุมมองใน context เดียวกัน",
        example: "<Tabs items={tabs} />",
      },
      {
        name: "Pagination",
        use: "เปลี่ยนหน้าของ collection",
        example:
          "<Pagination currentPage={1} totalPages={5} onPageChange={setPage} />",
      },
      {
        name: "Sidebar",
        use: "navigation หลักของ application shell",
        example: "<Sidebar groups={groups} />",
      },
      {
        name: "NavigationMenu",
        use: "เมนู navigation แบบขยายหรือยุบได้",
        example: "<NavigationMenu items={items} />",
      },
      {
        name: "PageHeader",
        use: "title, description และ actions ของหน้า",
        example: '<PageHeader title="Orders" />',
      },
      {
        name: "Toolbar",
        use: "รวม filter และ actions ที่เกี่ยวข้อง",
        example:
          "<Toolbar start={<span>6 rows</span>} end={<Button>Filter</Button>} />",
      },
      {
        name: "SplitPane",
        use: "แบ่งพื้นที่หลักและรายละเอียด",
        example: "<SplitPane first={<List />} second={<Detail />} />",
      },
      {
        name: "Stepper",
        use: "แสดงขั้นตอนของ workflow",
        example: '<Stepper items={steps} current="review" />',
      },
      {
        name: "Timeline",
        use: "แสดงลำดับเหตุการณ์และ audit history",
        example: "<Timeline items={events} />",
      },
    ],
  },
  {
    name: "Overlays & disclosure",
    description: "interaction ชั่วคราวและ content ที่เปิด/ปิดได้",
    components: [
      {
        name: "Dialog",
        use: "modal interaction ที่ต้องตัดสินใจหรือกรอกข้อมูล",
        example: '<Dialog open={open} title="Confirm">...</Dialog>',
      },
      {
        name: "Popover",
        use: "content ชั่วคราวที่ผูกกับ trigger",
        example:
          "<Popover open={open} trigger={<Button>Filter</Button>}>...</Popover>",
      },
      {
        name: "Accordion",
        use: "เปิด/ปิด content หลาย section",
        example: "<Accordion items={sections} />",
      },
    ],
  },
  {
    name: "Data display",
    description: "แสดงข้อมูล typed พร้อม interaction สำหรับ collection",
    components: [
      {
        name: "DataTable",
        use: "ตาราง typed พร้อม sorting, filtering, pagination และ selection",
        example: '<DataTable data={members} caption="Members" selectable />',
      },
    ],
  },
];

function App(): JSX.Element {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = (): void => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openPath = (nextPath: string): void => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (path === "/docs/orizz-rs-ui")
    return <DocsSite onHome={() => openPath("/")} />;
  return <LandingPage onDocs={() => openPath("/docs/orizz-rs-ui")} />;
}

interface LandingPageProps {
  readonly onDocs: () => void;
}
function LandingPage({ onDocs }: LandingPageProps): JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const principlesRef = useRef<HTMLElement>(null);
  return (
    <div className="docs-app landing-page" data-theme={theme}>
      <header className="docs-header">
        <button
          className="wordmark"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="wordmark-mark">O</span>
          <span>
            orizz-rs <small>/ home</small>
          </span>
        </button>
        <span className="header-caption">
          Clear systems for work that matters
        </span>
        <div className="header-actions">
          <a
            href="https://github.com/orizz-rs/orizz-ui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setTheme((value) => (value === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? "☾ Dark" : "☀ Light"}
          </Button>
        </div>
      </header>
      <main className="landing-main">
        <section className="landing-hero">
          <Badge tone="brand">Orizz RS</Badge>
          <h1>
            สร้างระบบงานที่ชัดเจนขึ้น
            <br />
            <em>ด้วยโครงสร้างที่ทีมไว้ใจได้</em>
          </h1>
          <p>
            Orizz RS
            สร้างเครื่องมือและพื้นฐานซอฟต์แวร์สำหรับผลิตภัณฑ์ที่ต้องทำงานจริงในทุกวัน
            ตั้งแต่ design system, reusable components ไปจนถึง workflow
            สำหรับระบบธุรกิจ
          </p>
          <div className="hero-actions">
            <Button size="lg" onClick={onDocs}>
              สำรวจ component library →
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => principlesRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
              อ่านแนวทางของ Orizz
            </Button>
          </div>
        </section>
        <section className="landing-values" id="principles" ref={principlesRef}>
          <Card variant="elevated">
            <CardHeader>
              <span className="eyebrow">01 / Product foundations</span>
              <h2>สร้างได้เร็วขึ้น</h2>
            </CardHeader>
            <CardContent>
              <p>
                พื้นฐานที่ช่วยให้ทีมสร้าง application ได้เร็วขึ้น
                โดยยังคงความสม่ำเสมอของ UI, accessibility และการดูแลระยะยาว
              </p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader>
              <span className="eyebrow">02 / ERP-ready experiences</span>
              <h2>พร้อมสำหรับงานจริง</h2>
            </CardHeader>
            <CardContent>
              <p>
                เครื่องมือสำหรับหน้าข้อมูลจำนวนมาก, แบบฟอร์มธุรกรรม, approval
                workflow และ application shell ที่ขยายต่อได้
              </p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader>
              <span className="eyebrow">03 / Calm, clear interfaces</span>
              <h2>ลดความสับสน</h2>
            </CardHeader>
            <CardContent>
              <p>
                เราเชื่อว่า software ที่ดีควรลดความสับสน ไม่เพิ่มภาระทางความคิด
                และทำให้ action ถัดไปชัดเจน
              </p>
            </CardContent>
          </Card>
        </section>
        <section className="landing-cta">
          <span className="eyebrow">@orizz-rs/ui</span>
          <h2>One shared foundation for every Orizz product.</h2>
          <p>
            37 typed components, shared semantic tokens, and light/dark themes.
          </p>
          <Button onClick={onDocs}>เปิดเอกสาร UI library →</Button>
        </section>
      </main>
      <footer className="docs-footer">
        <span>Orizz RS — clear systems for work that matters.</span>
        <span>MIT · React · TypeScript</span>
      </footer>
    </div>
  );
}

interface DocsSiteProps {
  readonly onHome: () => void;
}
function DocsSite({ onHome }: DocsSiteProps): JSX.Element {
  const [active, setActive] = useState<DocId>("getting-started");
  const [selectedComponent, setSelectedComponent] = useState<ComponentReference | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = (id: DocId): void => {
    setSelectedComponent(null);
    setActive(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigateToComponent = (component: ComponentReference): void => {
    setActive("components");
    setSelectedComponent(component);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="docs-app" data-theme={theme}>
      <header className="docs-header">
        <button className="wordmark" type="button" onClick={onHome}>
          <span className="wordmark-mark">O</span>
          <span>
            orizz-rs <small>/ ui</small>
          </span>
        </button>
        <span className="header-caption">Design system documentation</span>
        <div className="header-actions">
          <Badge tone="success">v0.2.1</Badge>
          <a
            href="https://github.com/orizz-rs/orizz-ui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setTheme((value) => (value === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? "☾ Dark" : "☀ Light"}
          </Button>
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <p className="sidebar-kicker">Orizz UI Docs</p>
          <nav aria-label="Documentation">
            {docs.map((item) => (
              <button
                className={`docs-link ${active === item.id ? "is-active" : ""}`}
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
              >
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </nav>
          <div className="docs-component-nav">
            {componentReferenceGroups.map((group) => (
              <section className="docs-component-group" key={group.name}>
                <p>{group.name}</p>
                {group.components.map((component) => (
                  <button
                    className={`docs-component-link ${selectedComponent?.name === component.name ? "is-active" : ""}`}
                    type="button"
                    key={component.name}
                    onClick={() => navigateToComponent(component)}
                  >
                    {component.name}
                  </button>
                ))}
              </section>
            ))}
          </div>
        </aside>

        <main className="docs-main">
          <div className="docs-breadcrumb">
            Docs <span>/</span> {selectedComponent?.name ?? docs.find((item) => item.id === active)?.label}
          </div>
          {active === "home" && <Home navigate={navigate} />}
          {active === "getting-started" && <GettingStarted />}
          {active === "foundations" && <Foundations />}
          {active === "integration" && <IntegrationGuide />}
          {active === "components" && (selectedComponent
            ? <ComponentDetail component={selectedComponent} />
            : <Components onSelectComponent={navigateToComponent} />)}
          {active === "data-table" && <DataTablePage />}
          {active === "guides" && <Guides />}
          {active === "orizz-rs" && <OrizzRs />}
        </main>
      </div>
      <footer className="docs-footer">
        <span>orizz-rs/ui</span>
        <span>Built in public for Orizz products</span>
      </footer>
    </div>
  );
}

interface HomeProps {
  readonly navigate: (id: DocId) => void;
}
function Home({ navigate }: HomeProps): JSX.Element {
  return (
    <>
      <section className="home-hero">
        <Badge tone="brand">Orizz RS / clear systems</Badge>
        <h1>
          Build clearer systems
          <br />
          <em>for work that matters.</em>
        </h1>
        <p className="hero-lead">
          Orizz RS creates tools and software foundations for products that need
          to work every day — from design systems and reusable components to
          business workflows.
        </p>
        <div className="hero-actions">
          <Button size="lg" onClick={() => navigate("components")}>
            Explore components →
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate("foundations")}
          >
            Read the foundations
          </Button>
        </div>
      </section>
      <Alert tone="info" title="One system. Two themes.">
        Every component consumes the same semantic tokens and supports explicit
        light and dark themes.
      </Alert>
      <section className="home-grid">
        <Card variant="elevated">
          <CardHeader>
            <span className="eyebrow">01 / Product foundations</span>
            <h2>Build with trust</h2>
          </CardHeader>
          <CardContent>
            <p>
              Reusable foundations help teams move quickly while keeping UI
              consistent, accessible, and maintainable.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("components")}
            >
              Explore UI →
            </Button>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader>
            <span className="eyebrow">02 / ERP-ready experiences</span>
            <h2>Make work visible</h2>
          </CardHeader>
          <CardContent>
            <p>
              Tables, transaction forms, approval workflows, and application
              shells that grow with each domain.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("data-table")}
            >
              See DataTable →
            </Button>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader>
            <span className="eyebrow">03 / Calm, clear interfaces</span>
            <h2>Reduce the noise</h2>
          </CardHeader>
          <CardContent>
            <p>
              Good software reduces confusion and makes the next action clear
              from the first screen.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("guides")}
            >
              Read principles →
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function GettingStarted(): JSX.Element {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Ship your first screen."
      description="Install @orizz-rs/ui, choose a theme, and compose typed components in a React application."
    >
      <CodeBlock
        code={`bun add @orizz-rs/ui\n\nimport { Button, DataTable } from '@orizz-rs/ui'`}
      />
      <section className="section-grid">
        <Card>
          <CardHeader>
            <span className="eyebrow">01 / Install</span>
            <h2>Use the public package</h2>
          </CardHeader>
          <CardContent>
            <p>
              The package entry includes component styles, design tokens,
              themes, and Bai Jamjuree for CSS-aware bundlers.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">02 / Theme</span>
            <h2>Set the context</h2>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={
                '<div data-theme="dark">\n  <Button>Continue</Button>\n</div>'
              }
            />
          </CardContent>
        </Card>
      </section>
      <Alert tone="success" title="Ready for local development.">
        Use Vite for the playground, Storybook for isolated component docs, and
        run lint, tests, typecheck, and build before release.
      </Alert>
    </DocPage>
  );
}

function IntegrationGuide(): JSX.Element {
  return (
    <DocPage
      eyebrow="Data & events"
      title="Connect UI to real data."
      description="Patterns for loading data, submitting forms, handling events, and keeping backend state visible to users."
    >
      <Alert tone="info" title="Keep server state explicit.">
        แยก loading, error และ success state ให้ชัด และตรวจ response.ok ก่อนนำข้อมูลจาก API ไปแสดงเสมอ
      </Alert>
      <section className="component-doc-section">
        <span className="eyebrow">Fetch data</span>
        <h2>Load typed rows into DataTable</h2>
        <CodeBlock code={`import { useEffect, useState } from 'react'
import { DataTable } from '@orizz-rs/ui'

interface Member {
  readonly id: string
  readonly name: string
  readonly status: 'active' | 'invited'
}

export function MembersTable(): JSX.Element {
  const [members, setMembers] = useState<readonly Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function loadMembers(): Promise<void> {
      try {
        const response = await fetch('/api/members')
        if (!response.ok) throw new Error('Unable to load members')
        const data: Member[] = await response.json()
        setMembers(data)
      } catch (cause: unknown) {
        setError(cause instanceof Error ? cause.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    void loadMembers()
  }, [])

  return <DataTable data={members} loading={loading} error={error} getRowId={(row) => row.id} />
}`} />
      </section>
      <section className="component-doc-section">
        <span className="eyebrow">Submit data</span>
        <h2>Post a form to the backend</h2>
        <CodeBlock code={`import { useState, type FormEvent } from 'react'
import { Button, TextField, Toast } from '@orizz-rs/ui'

export function CreateMemberForm(): JSX.Element {
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setSaving(true)
    const response = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSaving(false)
    if (response.ok) setSaved(true)
  }

  return <form onSubmit={handleSubmit}>
    <TextField label="Work email" value={email} onChange={(event) => setEmail(event.target.value)} />
    <Button type="submit" isLoading={saving}>Invite member</Button>
    <Toast open={saved} title="Invitation sent" onDismiss={() => setSaved(false)} />
  </form>
}`} />
      </section>
      <section className="component-doc-section">
        <span className="eyebrow">Component events</span>
        <h2>Use value callbacks without parsing DOM values</h2>
        <CodeBlock code={`const [quantity, setQuantity] = useState<number | null>(1)
const [warehouse, setWarehouse] = useState('bkk')

<NumberInput
  label="Quantity"
  value={quantity ?? ''}
  onValueChange={(value) => setQuantity(value)}
/>

<Combobox
  label="Warehouse"
  options={warehouses}
  value={warehouse}
  onValueChange={setWarehouse}
/>`} />
      </section>
      <section className="component-doc-section">
        <span className="eyebrow">Selection events</span>
        <h2>Send selected rows to an API</h2>
        <CodeBlock code={`const [selectedIds, setSelectedIds] = useState<readonly string[]>([])

async function archiveSelected(): Promise<void> {
  await fetch('/api/orders/archive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: selectedIds }),
  })
}

<DataTable
  data={orders}
  selectable
  selectedRowIds={selectedIds}
  onSelectionChange={setSelectedIds}
  selectionActions={<Button onClick={archiveSelected}>Archive</Button>}
/>`} />
      </section>
    </DocPage>
  );
}

function Foundations(): JSX.Element {
  return (
    <DocPage
      eyebrow="Foundations"
      title="Start with the system."
      description="Shared semantic tokens keep every Orizz screen coherent across light and dark themes."
    >
      <section className="section-grid">
        <Card>
          <CardHeader>
            <span className="eyebrow">Color ratio</span>
            <h2>60 / 30 / 10 balance</h2>
          </CardHeader>
          <CardContent>
            <div className="ratio-bar">
              <span>60%</span>
              <span>30%</span>
              <span>10%</span>
            </div>
            <p>
              Background establishes calm, surfaces build hierarchy, and brand
              draws attention to actions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Theme</span>
            <h2>Semantic, never arbitrary</h2>
          </CardHeader>
          <CardContent>
            <code>--orizz-color-background</code>
            <code>--orizz-color-surface</code>
            <code>--orizz-color-brand</code>
            <code>--orizz-color-text-muted</code>
          </CardContent>
        </Card>
      </section>
      <CodeBlock
        code={`<div data-theme="dark">\n  <Button>Continue</Button>\n</div>`}
      />
    </DocPage>
  );
}

interface ComponentsProps {
  readonly onSelectComponent: (component: ComponentReference) => void;
}

function Components({ onSelectComponent }: ComponentsProps): JSX.Element {
  return (
    <DocPage
      eyebrow="Components"
      title="A catalog for product work."
      description="Every component is a typed public export from @orizz-rs/ui and is designed to compose with native HTML semantics."
    >
      <Card className="live-card">
        <CardHeader>
          <span className="eyebrow">Live playground</span>
          <h2>Actions, status, and progress</h2>
        </CardHeader>
        <CardContent>
          <div className="component-row">
            <Button>Save changes</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Delete</Button>
            <Button isLoading>Saving</Button>
          </div>
          <div className="component-row">
            <Badge tone="brand">New release</Badge>
            <Badge tone="success">Healthy</Badge>
            <Badge tone="warning">Needs review</Badge>
            <Badge tone="danger">Blocked</Badge>
          </div>
          <Progress value={65} max={100} label="Approval workflow" showValue />
        </CardContent>
      </Card>
      <div className="component-catalog">
        {componentGroups.map(([title, contents]) => (
          <Card key={title}>
            <CardHeader>
              <h3>{title}</h3>
            </CardHeader>
            <CardContent>
              <p>{contents}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <CodeBlock
        code={`import { Button, Badge } from '@orizz-rs/ui'\n\n<Button variant="primary">Save changes</Button>\n<Badge tone="success">Healthy</Badge>`}
      />
      <ComponentReferenceDocs onSelectComponent={onSelectComponent} />
      <PlaygroundGallery />
    </DocPage>
  );
}

function ComponentReferenceDocs({ onSelectComponent }: ComponentsProps): JSX.Element {
  return (
    <section
      className="component-reference"
      aria-labelledby="component-reference-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">API reference</span>
          <h2 id="component-reference-title">Components by category</h2>
        </div>
        <p>เริ่มจากคำอธิบายการใช้งาน แล้วดู usage ที่เหมาะกับแต่ละ component</p>
      </div>
      <div className="reference-groups">
        {componentReferenceGroups.map((group) => (
          <Card key={group.name}>
            <CardHeader>
              <span className="eyebrow">{group.name}</span>
              <h3>{group.description}</h3>
            </CardHeader>
            <CardContent>
              <div className="reference-list">
                {group.components.map((component) => (
                  <article className="reference-item" key={component.name}>
                    <div>
                      <button className="reference-link" type="button" onClick={() => onSelectComponent(component)}>{component.name} →</button>
                      <p>{component.use}</p>
                    </div>
                    <CodeBlock code={component.example} />
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

interface ComponentDetailProps {
  readonly component: ComponentReference;
}

function ComponentDetail({ component }: ComponentDetailProps): JSX.Element {
  const category = componentReferenceGroups.find((group) =>
    group.components.some((item) => item.name === component.name),
  );
  const integrationExample = getIntegrationExample(component.name);
  const needsExpandedPreview = component.name === "Combobox" || component.name === "Popover";
  return (
    <DocPage eyebrow={category?.name ?? "Component"} title={component.name} description={component.use}>
      <Card className={`live-card ${needsExpandedPreview ? "live-card--expanded" : ""}`}>
        <CardHeader><span className="eyebrow">Live example</span><h2>Preview</h2></CardHeader>
        <CardContent><div className="component-preview"><ComponentPreview name={component.name} /></div></CardContent>
      </Card>
      <section className="component-doc-section">
        <span className="eyebrow">Import</span>
        <h2>Use the public export</h2>
        <CodeBlock code={`import { ${component.name} } from '@orizz-rs/ui'`} />
      </section>
      <section className="component-doc-section">
        <span className="eyebrow">Usage</span>
        <h2>Basic example</h2>
        <CodeBlock code={component.example} />
      </section>
      <section className="component-doc-section">
        <span className="eyebrow">Real-world integration</span>
        <h2>Connect data and events</h2>
        <CodeBlock code={integrationExample} />
      </section>
      <section className="section-grid">
        <Card><CardHeader><span className="eyebrow">States</span><h2>What to document</h2></CardHeader><CardContent><p>ตรวจสอบ default, hover, focus-visible และ disabled เสมอ รวม loading, error หรือ empty state เมื่อ component รองรับ</p></CardContent></Card>
        <Card><CardHeader><span className="eyebrow">Accessibility</span><h2>Native semantics first</h2></CardHeader><CardContent><p>กำหนด accessible name ให้ชัด ใช้งานด้วย keyboard ได้ และอย่าใช้สีเพียงอย่างเดียวในการสื่อความหมาย</p></CardContent></Card>
      </section>
      <section className="do-dont">
        <Card><CardHeader><Badge tone="success">Do</Badge><h2>Use semantic intent</h2></CardHeader><CardContent><p>เลือก component จากหน้าที่และบริบทของงาน พร้อม label และข้อความช่วยที่บอกสิ่งที่จะเกิดขึ้น</p></CardContent></Card>
        <Card><CardHeader><Badge tone="danger">Don't</Badge><h2>Rebuild the primitive</h2></CardHeader><CardContent><p>อย่าสร้าง interaction เดิมด้วย div หรือ hard-code สี เพราะจะเสีย keyboard behavior, theme และ accessibility contract</p></CardContent></Card>
      </section>
    </DocPage>
  );
}

interface ComponentPreviewProps {
  readonly name: string;
}

function ComponentPreview({ name }: ComponentPreviewProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [step, setStep] = useState("review");
  const tabs: readonly TabItem[] = [
    { id: "profile", label: "Profile", content: "Manage profile details." },
    { id: "security", label: "Security", content: "Configure active sessions." },
  ];
  const warehouses = [
    { value: "bkk", label: "Bangkok warehouse", description: "WH-BKK · 1,240 items" },
    { value: "cnx", label: "Chiang Mai warehouse", description: "WH-CNX · 680 items" },
  ];
  const steps = [
    { id: "draft", label: "Draft", status: "complete" as const },
    { id: "review", label: "Review" },
    { id: "approve", label: "Approval" },
  ];

  switch (name) {
    case "Button": return <div className="component-row"><Button>Save changes</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Delete</Button><Button isLoading>Saving</Button></div>;
    case "TextField": return <TextField label="Work email" placeholder="you@company.com" hint="Use your organization email." fullWidth />;
    case "Textarea": return <Textarea label="Project notes" placeholder="Add context for your team" hint="Maximum 500 characters." fullWidth />;
    case "Select": return <Select label="Team role" defaultValue="member" fullWidth><option value="member">Member</option><option value="admin">Admin</option></Select>;
    case "Checkbox": return <Checkbox label="Weekly summary" description="Receive progress every Monday." defaultChecked />;
    case "Radio": return <div className="playground-stack"><Radio name="preview-plan" value="starter" label="Starter plan" defaultChecked /><Radio name="preview-plan" value="pro" label="Professional plan" /></div>;
    case "Switch": return <Switch label="Product analytics" description="Share anonymous usage data." defaultChecked />;
    case "FormField": return <FormField label="Purchase order note" htmlFor="component-note" required hint="Add context for approvers."><input id="component-note" placeholder="Add a note" /></FormField>;
    case "NumberInput": return <NumberInput label="Quantity" defaultValue={12} min={0} step={1} />;
    case "CurrencyInput": return <CurrencyInput label="Unit price" currency="THB" defaultValue={1250} min={0} />;
    case "Combobox": return <Combobox label="Warehouse" options={warehouses} placeholder="Search warehouse…" fullWidth />;
    case "Alert": return <Alert tone="warning" title="Review access">Two invitations expire tomorrow.</Alert>;
    case "Badge": return <div className="component-row"><Badge tone="brand">New</Badge><Badge tone="success">Healthy</Badge><Badge tone="warning">Review</Badge><Badge tone="danger">Blocked</Badge></div>;
    case "Spinner": return <div className="inline-items"><Spinner size="sm" label="Small loading" /><Spinner size="md" label="Medium loading" /><Spinner size="lg" label="Large loading" /></div>;
    case "Toast": return <><Button onClick={() => setOpen(true)}>Show toast</Button><Toast open={open} tone="success" title="Changes saved" onDismiss={() => setOpen(false)}>Workspace settings are up to date.</Toast></>;
    case "Skeleton": return <div className="playground-stack"><Skeleton size="lg" label="Loading title" /><Skeleton label="Loading description" /><Skeleton variant="rect" label="Loading card" /></div>;
    case "EmptyState": return <EmptyState title="No draft orders" description="Create an order to start the workflow." action={<Button size="sm">Create order</Button>} />;
    case "ResultState": return <ResultState tone="success" title="Purchase order approved" description="PO-1004 is ready for supplier confirmation." action={<Button size="sm">Open order</Button>} />;
    case "Progress": return <Progress value={65} label="Approval workflow" showValue />;
    case "LoadingOverlay": return <LoadingOverlay open={open} label="Refreshing orders"><div className="loading-surface"><strong>6 purchase orders</strong><Button size="sm" onClick={() => setOpen((value) => !value)}>{open ? "Stop" : "Refresh"}</Button></div></LoadingOverlay>;
    case "Card": return <Card variant="elevated"><CardHeader><h3>Workspace</h3></CardHeader><CardContent>Related content grouped in one surface.</CardContent></Card>;
    case "Avatar": return <div className="inline-items"><Avatar alt="Kong Suwan" fallback="KS" status="online" /><Avatar alt="Design team" fallback="DS" size="lg" status="busy" /></div>;
    case "Divider": return <div className="playground-stack"><span>Account settings</span><Divider decorative /><span>Security settings</span></div>;
    case "Breadcrumb": return <Breadcrumb items={[{ id: "home", label: "Home", href: "#" }, { id: "orders", label: "Purchase orders", current: true }]} separator="›" />;
    case "Tabs": return <Tabs items={tabs} ariaLabel="Workspace settings" />;
    case "Pagination": return <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />;
    case "Sidebar": return <Sidebar groups={[{ id: "workspace", label: "Workspace", items: [{ id: "overview", label: "Overview", active: true }, { id: "orders", label: "Purchase orders" }] }]} />;
    case "NavigationMenu": return <NavigationMenu items={[{ id: "overview", label: "Overview", active: true }, { id: "orders", label: "Purchase orders" }, { id: "reports", label: "Reports" }]} />;
    case "PageHeader": return <PageHeader eyebrow="Procurement" title="Purchase orders" description="Keep operational work action-ready." actions={<Button size="sm">New order</Button>} />;
    case "Toolbar": return <Toolbar start={<span>6 purchase orders</span>} end={<div className="component-row"><Button size="sm" variant="ghost">Filter</Button><Button size="sm">Export</Button></div>} />;
    case "SplitPane": return <SplitPane first={<div className="workflow-pane">Purchase orders</div>} second={<div className="workflow-pane">Order details</div>} />;
    case "Stepper": return <Stepper items={steps} current={step} onStepChange={setStep} />;
    case "Timeline": return <Timeline items={[{ id: "created", title: "Order created", timestamp: "09:30" }, { id: "approved", title: "Approved by finance", timestamp: "10:15", tone: "success" }]} />;
    case "Dialog": return <><Button onClick={() => setOpen(true)}>Open dialog</Button><Dialog open={open} onOpenChange={setOpen} title="Submit purchase order?" description="The order will move to approval."><div className="component-row"><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Submit</Button></div></Dialog></>;
    case "Popover": return <Popover open={open} onOpenChange={setOpen} trigger={<Button variant="secondary">Open filters</Button>} title="Filter status"><Select label="Status" defaultValue="all"><option value="all">All statuses</option><option value="pending">Pending</option></Select></Popover>;
    case "Accordion": return <Accordion items={[{ id: "approval", title: "Approval workflow", content: "Pending orders route to the assigned approver." }, { id: "audit", title: "Audit information", content: "Changes are recorded with actor and timestamp." }]} />;
    case "DataTable": return <DataTable<Member> data={members} caption="Members" getRowId={(row) => row.id} selectable pageSize={3} />;
    default: return <Alert tone="info" title="Example unavailable">See the usage snippet below.</Alert>;
  }
}

function PlaygroundGallery(): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [step, setStep] = useState("review");
  const tabs: readonly TabItem[] = [
    {
      id: "profile",
      label: "Profile",
      content: "Manage your public profile and organization details.",
    },
    {
      id: "security",
      label: "Security",
      content: "Configure authentication and active sessions.",
    },
    {
      id: "billing",
      label: "Billing",
      content: "Owner-only settings.",
      disabled: true,
    },
  ];
  const steps = [
    {
      id: "draft",
      label: "Draft",
      description: "Prepare request",
      status: "complete" as const,
    },
    { id: "review", label: "Review", description: "Check details" },
    { id: "approve", label: "Approval", description: "Assign approver" },
  ];
  return (
    <section className="playground-gallery" aria-labelledby="playground-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">From src/playground</span>
          <h2 id="playground-title">Live component workflows</h2>
        </div>
        <p>
          Examples from the package playground, organized by the way teams use
          them in real product screens.
        </p>
      </div>
      <div className="playground-grid">
        <Card>
          <CardHeader>
            <span className="eyebrow">Forms</span>
            <h3>Native input primitives</h3>
          </CardHeader>
          <CardContent>
            <div className="playground-stack">
              <Select label="Team role" defaultValue="member" fullWidth>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Select>
              <Textarea
                label="Project notes"
                placeholder="Add context for your team"
                hint="Maximum 500 characters."
                fullWidth
              />
              <div className="choice-stack">
                <Checkbox
                  label="Weekly summary"
                  description="Receive progress every Monday."
                  defaultChecked
                />
                <Radio
                  name="playground-plan"
                  value="starter"
                  label="Starter plan"
                  defaultChecked
                />
                <Switch
                  label="Product analytics"
                  description="Share anonymous usage data."
                  defaultChecked
                />
              </div>
              <Divider decorative />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">ERP forms</span>
            <h3>Typed business inputs</h3>
          </CardHeader>
          <CardContent>
            <div className="playground-stack">
              <NumberInput
                label="Quantity"
                defaultValue={12}
                min={0}
                step={1}
                hint="Parsed value callback."
              />
              <CurrencyInput
                label="Unit price"
                currency="THB"
                defaultValue={1250}
                min={0}
                step={0.01}
              />
              <Combobox
                label="Warehouse"
                options={[
                  {
                    value: "bkk",
                    label: "Bangkok warehouse",
                    description: "WH-BKK · 1,240 items",
                  },
                  {
                    value: "cnx",
                    label: "Chiang Mai warehouse",
                    description: "WH-CNX · 680 items",
                  },
                ]}
                placeholder="Search warehouse…"
                fullWidth
              />
              <FormField
                label="Purchase order note"
                htmlFor="playground-note"
                required
                hint="Shared label, hint and error layout."
              >
                <input
                  id="playground-note"
                  placeholder="Add a note for approvers"
                />
              </FormField>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Feedback</span>
            <h3>System messages and identity</h3>
          </CardHeader>
          <CardContent>
            <div className="playground-stack">
              <Alert tone="success" title="Changes saved">
                Your workspace settings are up to date.
              </Alert>
              <Alert tone="warning" title="Review access">
                Two invitations expire tomorrow.
              </Alert>
              <div className="inline-items">
                <Spinner size="sm" label="Loading small" />
                <Spinner size="md" label="Loading medium" />
                <Avatar alt="Kong Suwan" fallback="KS" status="online" />
                <Badge tone="neutral">+8 members</Badge>
              </div>
              <ResultState
                tone="warning"
                title="No matching orders"
                description="Try adjusting your filters."
                action={
                  <Button size="sm" variant="secondary">
                    Clear filters
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Loading and empty</span>
            <h3>Recoverable states</h3>
          </CardHeader>
          <CardContent>
            <div className="playground-stack">
              <Skeleton size="lg" label="Loading title" />
              <Skeleton label="Loading description" />
              <Skeleton variant="rect" label="Loading summary" />
              <EmptyState
                title="No draft orders"
                description="Create an order to start the workflow."
                action={<Button size="sm">Create order</Button>}
              />
              <LoadingOverlay open={false} label="Refreshing orders">
                <div className="loading-surface">6 purchase orders</div>
              </LoadingOverlay>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Navigation</span>
            <h3>Wayfinding and disclosure</h3>
          </CardHeader>
          <CardContent>
            <div className="playground-stack">
              <Breadcrumb
                items={[
                  { id: "home", label: "Home", href: "#" },
                  { id: "purchasing", label: "Purchasing", href: "#" },
                  { id: "orders", label: "Purchase orders", current: true },
                ]}
                separator="›"
              />
              <Pagination
                currentPage={page}
                totalPages={5}
                onPageChange={setPage}
              />
              <Tabs items={tabs} ariaLabel="Workspace settings" />
              <NavigationMenu
                items={["Overview", "Purchase orders", "Reports"].map(
                  (label) => ({
                    id: label.toLowerCase().replaceAll(" ", "-"),
                    label,
                    active: label === "Overview",
                  }),
                )}
              />
              <Accordion
                items={[
                  {
                    id: "approval",
                    title: "Approval workflow",
                    content: "Pending orders route to the assigned approver.",
                  },
                  {
                    id: "audit",
                    title: "Audit information",
                    content: "Changes are recorded with actor and timestamp.",
                  },
                ]}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Overlays</span>
            <h3>Context-preserving interactions</h3>
          </CardHeader>
          <CardContent>
            <div className="component-row">
              <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
              <Popover
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
                trigger={<Button variant="secondary">Open popover</Button>}
                title="Filter status"
              >
                <Select label="Status" defaultValue="all">
                  <option value="all">All statuses</option>
                  <option value="pending">Pending approval</option>
                </Select>
              </Popover>
              <Button variant="ghost" onClick={() => setToastOpen(true)}>
                Show toast
              </Button>
            </div>
            <Dialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              title="Submit purchase order?"
              description="The order will move to the approval workflow."
            >
              <div className="component-row">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  Submit order
                </Button>
              </div>
            </Dialog>
            <Toast
              open={toastOpen}
              tone="success"
              title="Purchase order saved"
              onDismiss={() => setToastOpen(false)}
            >
              The order is waiting for approval.
            </Toast>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Workflow layout</span>
            <h3>Progress and context</h3>
          </CardHeader>
          <CardContent>
            <div className="playground-stack">
              <Stepper items={steps} current={step} onStepChange={setStep} />
              <SplitPane
                first={
                  <div className="workflow-pane">
                    <span className="eyebrow">Purchase orders</span>
                    <strong>PO-1004</strong>
                    <span>Siam Industrial · ฿219,000</span>
                  </div>
                }
                second={
                  <div className="workflow-pane">
                    <span className="eyebrow">Current step</span>
                    <strong>
                      {steps.find((item) => item.id === step)?.label}
                    </strong>
                    <Button size="sm">Continue</Button>
                  </div>
                }
              />
              <Timeline
                items={[
                  { id: "created", title: "Order created", timestamp: "09:30" },
                  {
                    id: "approved",
                    title: "Approved by finance",
                    timestamp: "10:15",
                    tone: "success",
                  },
                ]}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="eyebrow">Application shell</span>
            <h3>PageHeader, Toolbar, Sidebar</h3>
          </CardHeader>
          <CardContent>
            <Sidebar
              groups={[
                {
                  id: "workspace",
                  label: "Workspace",
                  items: [
                    { id: "overview", label: "Overview", active: true },
                    { id: "orders", label: "Purchase orders" },
                  ],
                },
              ]}
            />
            <PageHeader
              eyebrow="Procurement"
              title="Purchase orders"
              description="Keep operational work discoverable and action-ready."
              actions={<Button size="sm">New order</Button>}
            />
            <Toolbar
              start={<span>6 purchase orders</span>}
              end={
                <Button size="sm" variant="ghost">
                  Filter
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function DataTablePage(): JSX.Element {
  return (
    <DocPage
      eyebrow="Data display"
      title="DataTable<T>"
      description="Typed data display with stable row identity, custom columns, sorting, filters, pagination, selection, loading, and retryable errors."
    >
      <Card className="live-card">
        <CardHeader>
          <span className="eyebrow">Live example</span>
          <h2>Members</h2>
        </CardHeader>
        <CardContent>
          <DataTable<Member>
            data={members}
            caption="Members"
            getRowId={(row) => row.id}
            selectable
            showFilters
            pageSize={3}
          />
        </CardContent>
      </Card>
      <CodeBlock
        code={`<DataTable\n  data={members}\n  caption="Members"\n  selectable\n  onSelectionChange={(rowIds) => saveSelection(rowIds)}\n/>`}
      />
      <Alert tone="info" title="Custom columns stay explicit.">
        When inference is not enough, provide each column's id, header, and
        accessor or cell renderer. Keep row IDs stable across refreshes.
      </Alert>
    </DocPage>
  );
}

function Guides(): JSX.Element {
  return (
    <DocPage
      eyebrow="Guides"
      title="Compose with confidence."
      description="A small set of rules keeps docs examples and production screens predictable."
    >
      <section className="do-dont">
        <Card>
          <CardHeader>
            <Badge tone="success">Do</Badge>
            <h2>Use intent and context</h2>
          </CardHeader>
          <CardContent>
            <p>
              Use FormField for labels and errors, ResultState for recoverable
              outcomes, and LoadingOverlay only when interaction must pause.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Badge tone="danger">Don't</Badge>
            <h2>Hide important meaning</h2>
          </CardHeader>
          <CardContent>
            <p>
              Don't use color alone for status, replace native semantics with
              divs, or make destructive actions ambiguous.
            </p>
          </CardContent>
        </Card>
      </section>
      <Card>
        <CardHeader>
          <span className="eyebrow">Accessibility checklist</span>
          <h2>States are part of the API</h2>
        </CardHeader>
        <CardContent>
          <ul className="checklist">
            <li>
              Keyboard focus is visible and the interaction order is logical.
            </li>
            <li>
              Labels, descriptions, errors, and loading states are announced by
              semantics.
            </li>
            <li>
              Disabled, empty, error, and retry paths explain what happens next.
            </li>
          </ul>
        </CardContent>
      </Card>
    </DocPage>
  );
}

function OrizzRs(): JSX.Element {
  return (
    <DocPage
      eyebrow="Orizz RS"
      title="Clear systems for work that matters."
      description="Orizz RS builds product foundations and business-ready software for teams doing real work every day."
    >
      <section className="section-grid">
        <Card>
          <CardHeader>
            <h2>Engineering principles</h2>
          </CardHeader>
          <CardContent>
            <ul className="checklist">
              <li>Typed APIs and contracts that can be verified.</li>
              <li>Semantic tokens for multiple themes.</li>
              <li>Native semantics and accessibility by default.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2>About Orizz UI</h2>
          </CardHeader>
          <CardContent>
            <p>
              <code>@orizz-rs/ui</code> is the shared React component library
              for Orizz products, published under the MIT license and supporting
              React 18–19.
            </p>
          </CardContent>
        </Card>
      </section>
    </DocPage>
  );
}

interface DocPageProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children: JSX.Element | JSX.Element[];
}
function DocPage({
  eyebrow,
  title,
  description,
  children,
}: DocPageProps): JSX.Element {
  return (
    <>
      <header className="page-intro">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <div className="page-content">{children}</div>
    </>
  );
}
function CodeBlock({ code }: { readonly code: string }): JSX.Element {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

export default App;
