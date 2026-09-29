import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function StarMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="star-mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2.2 13.7 8l6.1.2-4.8 3.8 1.7 5.8L12 14.3 7.3 17.8 9 12 4.2 8.2 10.3 8z"
      />
    </svg>
  );
}

export function LogoLockup() {
  return (
    <div className="logo-lockup">
      <StarMark />
      <span>Northstar Ledger</span>
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = ["btn", variant === "secondary" ? "btn-secondary" : null, className]
    .filter(Boolean)
    .join(" ");
  return <button className={classes} type={props.type ?? "button"} {...props} />;
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export function TextInput({ label, id, ...props }: TextInputProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  children: ReactNode;
};

export function SelectInput({ label, id, children, ...props }: SelectInputProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {children}
      </select>
    </div>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function SpendRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="spend-row">
      <span>{label}</span>
      <span>{amount}</span>
    </div>
  );
}

export function SpendSummaryCard() {
  return (
    <article className="spend-card" aria-label="Operating spend this week">
      <p className="eyebrow">This week</p>
      <h3>Operating spend</h3>
      <SpendRow label="Field travel · Midwest" amount="$18,440" />
      <SpendRow label="Software renewals" amount="$9,210" />
      <SpendRow label="Facilities & vendors" amount="$6,080" />
      <div className="spend-row spend-row-exception">
        <span className="muted">Uncoded receipts</span>
        <StatusBadge>12 waiting</StatusBadge>
      </div>
    </article>
  );
}

export function ExceptionQueue() {
  return (
    <article className="spend-card" aria-label="Exception queue">
      <p className="eyebrow">Exception queue</p>
      <h3>What is blocking close</h3>
      <div className="spend-row">
        <span>Missing receipt · AMEX *4412</span>
        <StatusBadge>4 days</StatusBadge>
      </div>
      <div className="spend-row">
        <span>Over-policy lodging · Denver</span>
        <StatusBadge>Needs VP</StatusBadge>
      </div>
      <div className="spend-row spend-row-exception">
        <span>Vendor duplicate · Northwind</span>
        <StatusBadge>Review</StatusBadge>
      </div>
    </article>
  );
}

const STEPS = [
  { id: "welcome", label: "1 Welcome" },
  { id: "connect", label: "2 Connect tools" },
  { id: "dashboard", label: "3 First dashboard" },
] as const;

export function Topbar({ current }: { current: (typeof STEPS)[number]["id"] }) {
  return (
    <header className="topbar">
      <LogoLockup />
      <ol className="steps">
        {STEPS.map((step) => (
          <li key={step.id} className={step.id === current ? "is-active" : undefined}>
            {step.label}
          </li>
        ))}
      </ol>
    </header>
  );
}
