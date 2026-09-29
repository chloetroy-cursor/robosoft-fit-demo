import { useMemo, useState } from "react";
import {
  Button,
  ExceptionQueue,
  SelectInput,
  SpendSummaryCard,
  TextInput,
  Topbar,
} from "./kit";

type Step = "welcome" | "connect" | "dashboard";

type ToolId = "slack" | "netsuite" | "cards" | "bank" | "inbox";

type Tool = {
  id: ToolId;
  name: string;
  detail: string;
};

const TOOLS: Tool[] = [
  { id: "slack", name: "Slack", detail: "Approval nudges and exception threads" },
  { id: "netsuite", name: "NetSuite", detail: "Entities, vendors, and GL coding" },
  { id: "cards", name: "Corporate cards", detail: "Live card feed and merchant data" },
  { id: "bank", name: "Bank feed", detail: "ACH, wires, and vendor payouts" },
  { id: "inbox", name: "Receipt inbox", detail: "Forwarded receipts and invoice mail" },
];

export default function App() {
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("Jordan Hale");
  const [company, setCompany] = useState("Harborline Goods");
  const [role, setRole] = useState("Head of Operations");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState<Record<ToolId, boolean>>({
    slack: false,
    netsuite: false,
    cards: true,
    bank: true,
    inbox: false,
  });
  const [busy, setBusy] = useState<ToolId | null>(null);

  const connectedCount = useMemo(
    () => Object.values(connected).filter(Boolean).length,
    [connected],
  );

  function goConnect() {
    if (!name.trim() || !company.trim()) {
      setError("Add your name and company so the workspace has an owner.");
      return;
    }
    setError("");
    setStep("connect");
  }

  function toggleTool(id: ToolId) {
    if (busy) {
      return;
    }
    setBusy(id);
    window.setTimeout(() => {
      setConnected((current) => ({ ...current, [id]: !current[id] }));
      setBusy(null);
    }, 450);
  }

  return (
    <div className="app-shell">
      <Topbar current={step} />

      {step === "welcome" && (
        <section className="panel">
          <p className="lede">Onboarding redesign · 3 minutes</p>
          <h1>Set up your workspace.</h1>
          <p className="lede">
            This path replaces the marketing site’s buried write-us loop with a
            first-run that names an owner, connects the systems ops already
            uses, and lands on a real spend view.
          </p>
          <TextInput
            id="name"
            label="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jordan Hale"
          />
          <TextInput
            id="company"
            label="Company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Harborline Goods"
          />
          <SelectInput
            id="role"
            label="Role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option>Head of Operations</option>
            <option>Controller</option>
            <option>FP&A lead</option>
            <option>Office of the COO</option>
          </SelectInput>
          {error && <p className="error">{error}</p>}
          <div className="actions">
            <Button onClick={goConnect}>Continue</Button>
          </div>
        </section>
      )}

      {step === "connect" && (
        <section className="panel">
          <h1>Connect the tools {company.trim() || "your team"} already lives in.</h1>
          <p className="lede">
            Nothing syncs for real in this demo. Cards and bank are on so the
            first dashboard has a feed.
          </p>
          <div className="tool-list">
            {TOOLS.map((tool) => {
              const on = connected[tool.id];
              return (
                <article className="tool" key={tool.id}>
                  <div>
                    <h3>{tool.name}</h3>
                    <p>{tool.detail}</p>
                  </div>
                  <div className="tool-action">
                    <div className={`status${on ? " is-on" : ""}`}>
                      {busy === tool.id ? "Working…" : on ? "Connected" : "Not connected"}
                    </div>
                    <Button
                      variant={on ? "secondary" : "primary"}
                      onClick={() => toggleTool(tool.id)}
                      disabled={busy === tool.id}
                    >
                      {on ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="actions">
            <Button variant="secondary" onClick={() => setStep("welcome")}>
              Back
            </Button>
            <Button onClick={() => setStep("dashboard")}>Open dashboard</Button>
          </div>
        </section>
      )}

      {step === "dashboard" && (
        <section className="panel">
          <p className="lede">
            {name.trim() || "Workspace owner"} · {role} · {company.trim() || "Unnamed company"}
          </p>
          <h1>Here is what close looks like when spend is in one place.</h1>

          {connectedCount === 0 ? (
            <div className="empty">
              No systems connected yet, so there is no feed to reconcile. Go back
              and attach at least cards or a bank feed to populate this view.
            </div>
          ) : (
            <>
              <div className="kpi-grid">
                <div className="kpi">
                  <span>Month-to-date spend</span>
                  <strong>$214,680</strong>
                </div>
                <div className="kpi">
                  <span>Waiting on approval</span>
                  <strong>9</strong>
                </div>
                <div className="kpi">
                  <span>Sources connected</span>
                  <strong>{connectedCount}</strong>
                </div>
              </div>
              <div className="dashboard-grid">
                <SpendSummaryCard />
                <ExceptionQueue />
              </div>
            </>
          )}

          <div className="actions">
            <Button variant="secondary" onClick={() => setStep("connect")}>
              Adjust connections
            </Button>
            <Button onClick={() => setStep("welcome")}>Restart setup</Button>
          </div>
          <p className="demo-note">
            Fake mid-market spend only. Tokens live in{" "}
            <code>src/design-tokens.css</code> and the Figma kit.
          </p>
        </section>
      )}
    </div>
  );
}
