import { useMemo, useState } from "react";

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

const STEPS: Step[] = ["welcome", "connect", "dashboard"];

export default function App() {
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("Head of Operations");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState<Record<ToolId, boolean>>({
    slack: false,
    netsuite: false,
    cards: false,
    bank: false,
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
      <header className="topbar">
        <div className="brand">
          <svg className="star" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2.2 13.7 8l6.1.2-4.8 3.8 1.7 5.8L12 14.3 7.3 17.8 9 12 4.2 8.2 10.3 8z"
            />
          </svg>
          Northstar Ledger
        </div>
        <ol className="steps">
          {STEPS.map((id) => (
            <li key={id} className={step === id ? "is-active" : undefined}>
              {id === "welcome" && "1 Welcome"}
              {id === "connect" && "2 Connect tools"}
              {id === "dashboard" && "3 First dashboard"}
            </li>
          ))}
        </ol>
      </header>

      {step === "welcome" && (
        <section className="panel">
          <p className="lede">Onboarding redesign · 3 minutes</p>
          <h1>Set up a workspace your close team will actually open.</h1>
          <p className="lede">
            This path replaces the marketing site’s buried “write us” loop with a
            first-run that names an owner, connects the systems ops already
            uses, and lands on a real spend view.
          </p>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jordan Hale"
            />
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Harborline Goods"
            />
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option>Head of Operations</option>
              <option>Controller</option>
              <option>FP&A lead</option>
              <option>Office of the COO</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="actions">
            <button className="btn" type="button" onClick={goConnect}>
              Continue
            </button>
          </div>
        </section>
      )}

      {step === "connect" && (
        <section className="panel">
          <h1>Connect the tools {company || "your team"} already lives in.</h1>
          <p className="lede">
            Nothing syncs for real in this demo. Toggle a source so the first
            dashboard has something to show.
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
                  <div>
                    <div className={`status${on ? " is-on" : ""}`}>
                      {busy === tool.id ? "Working…" : on ? "Connected" : "Not connected"}
                    </div>
                    <button
                      className={on ? "btn btn-secondary" : "btn"}
                      type="button"
                      onClick={() => toggleTool(tool.id)}
                      disabled={busy === tool.id}
                    >
                      {on ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="actions">
            <button className="btn-secondary btn" type="button" onClick={() => setStep("welcome")}>
              Back
            </button>
            <button className="btn" type="button" onClick={() => setStep("dashboard")}>
              Open dashboard
            </button>
          </div>
        </section>
      )}

      {step === "dashboard" && (
        <section className="panel">
          <p className="lede">
            {name || "Workspace owner"} · {role} · {company || "Unnamed company"}
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
              <table className="table">
                <thead>
                  <tr>
                    <th>Merchant</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Midwest Air</td>
                    <td>{connected.cards ? "Corporate cards" : "Manual"}</td>
                    <td>Needs receipt</td>
                    <td>$842.10</td>
                  </tr>
                  <tr>
                    <td>Northwind Facilities</td>
                    <td>{connected.netsuite ? "NetSuite" : "Inbox"}</td>
                    <td>Duplicate risk</td>
                    <td>$4,200.00</td>
                  </tr>
                  <tr>
                    <td>Harborline payroll tax</td>
                    <td>{connected.bank ? "Bank feed" : "Uncoded"}</td>
                    <td>Posted</td>
                    <td>$18,440.00</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          <div className="actions">
            <button className="btn-secondary btn" type="button" onClick={() => setStep("connect")}>
              Adjust connections
            </button>
            <button className="btn" type="button" onClick={() => setStep("welcome")}>
              Restart setup
            </button>
          </div>
          <p className="demo-note">
            Tokens live in <code>src/design-tokens.css</code>. In Design Mode,
            restyle this shell, then promote the values into Figma as source of
            truth and drop the export back here.
          </p>
        </section>
      )}
    </div>
  );
}
