// pages/admin/agent-builder.jsx — WGW Agent Builder admin page
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import {
  getStoredToken, setStoredToken, clearStoredToken, validateToken,
  fetchAgents, proposeAgent, approveAgent, rejectAgent, secondApproveAgent,
  activateAgent, pauseAgent, retireAgent, fetchAuditLog, runDuplicateCheck,
  fetchOrchestratorStatus, triggerOrchestratorCycle,
  triggerTimezoneBackfill,
  fetchDialerStatus, triggerEnqueue, enableAutoDial, disableAutoDial,
} from "../../lib/agentBuilder";
import { SEED_AGENTS, RISK_COLORS, STATUS_COLORS } from "../../data/agentRegistry";

const TABS = ["active", "approved", "in_build", "proposed", "paused", "retired", "rejected"];
const TAB_LABELS = {
  active:   "Active",
  approved: "Approved",
  in_build: "In Build",
  proposed: "Proposed",
  paused:   "Paused",
  retired:  "Retired",
  rejected: "Rejected",
};

const BLANK_PROPOSAL = {
  agent_name: "", agent_role: "", description: "", purpose: "",
  risk_level: "medium", owner: "", notes: "",
  can_read: true, can_write: false, requires_approval: true, human_approval_required: true,
};

// ── Utility ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase",
      background: `${STATUS_COLORS[status] || "#475569"}22`,
      color: STATUS_COLORS[status] || "#94a3b8",
      border: `1px solid ${STATUS_COLORS[status] || "#475569"}44`,
    }}>
      {TAB_LABELS[status] || status}
    </span>
  );
}

function RiskBadge({ level }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase",
      background: `${RISK_COLORS[level] || "#94a3b8"}22`,
      color: RISK_COLORS[level] || "#94a3b8",
      border: `1px solid ${RISK_COLORS[level] || "#94a3b8"}44`,
    }}>
      {level || "unknown"}
    </span>
  );
}

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  const bg = type === "error" ? "#7f1d1d" : type === "warning" ? "#78350f" : "#14532d";
  const border = type === "error" ? "#ef4444" : type === "warning" ? "#f59e0b" : "#22c55e";

  return (
    <div onClick={onDismiss} style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 1000,
      background: bg, border: `1px solid ${border}`, borderRadius: 8,
      padding: "12px 18px", color: "#f8fafc", fontSize: 14, maxWidth: 380,
      cursor: "pointer", boxShadow: "0 4px 24px rgba(0,0,0,.5)",
    }}>
      {message}
    </div>
  );
}

// ── Agent Card ────────────────────────────────────────────────────────────────

function AgentCard({ agent, token, onRefresh, onShowDetail }) {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  async function act(fn, label) {
    if (!confirm(`${label} agent '${agent.agent_name}'?`)) return;
    setBusy(true);
    try {
      await fn(token, agent.id);
      setToast({ message: `${label} successful`, type: "success" });
      onRefresh();
    } catch (e) {
      setToast({ message: e.message, type: "error" });
    } finally {
      setBusy(false);
    }
  }

  const isSeeded = String(agent.id).startsWith("seed-");

  return (
    <div style={{
      background: "#0f172a", border: "1px solid rgba(255,255,255,.1)",
      borderRadius: 10, padding: "16px 20px",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f8fafc" }}>
            {agent.agent_name}
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
            {agent.agent_role || "—"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <StatusBadge status={agent.status} />
          <RiskBadge level={agent.risk_level} />
          {agent.can_write && (
            <span style={{
              fontSize: 11, padding: "2px 6px", borderRadius: 4,
              background: "#7f1d1d44", color: "#fca5a5", border: "1px solid #ef444444",
              fontWeight: 700, textTransform: "uppercase",
            }}>writes</span>
          )}
        </div>
      </div>

      {agent.description && (
        <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
          {agent.description}
        </div>
      )}

      {agent.notes && (
        <div style={{ fontSize: 12, color: "#64748b", fontStyle: "italic" }}>
          {agent.notes}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
        <button onClick={() => onShowDetail(agent)} style={btnStyle("#1e293b", "#94a3b8")}>
          Details
        </button>

        {!isSeeded && (
          <>
            {agent.status === "proposed" && (
              <button disabled={busy} onClick={() => act(approveAgent, "Approve")} style={btnStyle("#1e3a5f", "#3b82f6")}>
                Approve
              </button>
            )}
            {agent.status === "proposed" && (
              <button disabled={busy} onClick={() => act(rejectAgent, "Reject")} style={btnStyle("#3b0a0a", "#f87171")}>
                Reject
              </button>
            )}
            {agent.status === "approved" && agent.risk_level === "high" && !agent.second_approved_at && (
              <button disabled={busy} onClick={() => act(secondApproveAgent, "2nd Approve")} style={btnStyle("#3b1f00", "#fb923c")}>
                2nd Approve
              </button>
            )}
            {agent.status === "approved" && (agent.risk_level !== "high" || agent.second_approved_at) && (
              <button disabled={busy} onClick={() => act(activateAgent, "Activate")} style={btnStyle("#14532d", "#22c55e")}>
                Activate
              </button>
            )}
            {agent.status === "active" && (
              <button disabled={busy} onClick={() => act(pauseAgent, "Pause")} style={btnStyle("#292524", "#f59e0b")}>
                Pause
              </button>
            )}
            {["proposed","approved","paused"].includes(agent.status) && (
              <button disabled={busy} onClick={() => act(retireAgent, "Retire")} style={btnStyle("#1c1917", "#64748b")}>
                Retire
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    background: bg, color, border: `1px solid ${color}44`,
    borderRadius: 6, padding: "5px 12px", fontSize: 12,
    fontWeight: 600, cursor: "pointer", letterSpacing: ".02em",
  };
}

// ── Detail Modal ──────────────────────────────────────────────────────────────

function DetailModal({ agent, onClose }) {
  if (!agent) return null;
  const fields = [
    ["Provider", agent.provider],
    ["Owner", agent.owner],
    ["Can Read", agent.can_read ? "Yes" : "No"],
    ["Can Write", agent.can_write ? "Yes" : "No"],
    ["Requires Approval", agent.requires_approval ? "Yes" : "No"],
    ["Human Approval Required", agent.human_approval_required ? "Yes" : "No"],
    ["Proposed At", agent.proposed_at ? new Date(agent.proposed_at).toLocaleString() : "—"],
    ["Approved At", agent.approved_at ? new Date(agent.approved_at).toLocaleString() : "—"],
    ["Approved By", agent.approved_by || "—"],
    ["Activated At", agent.activated_at ? new Date(agent.activated_at).toLocaleString() : "—"],
    ["Retired At", agent.retired_at ? new Date(agent.retired_at).toLocaleString() : "—"],
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.15)",
        borderRadius: 12, padding: 28, width: "100%", maxWidth: 600,
        maxHeight: "85vh", overflowY: "auto", color: "#f8fafc",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{agent.agent_name}</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{agent.agent_role}</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <StatusBadge status={agent.status} />
            <RiskBadge level={agent.risk_level} />
          </div>
        </div>

        {agent.description && (
          <section style={detailSection}>
            <div style={detailLabel}>Description</div>
            <div style={detailText}>{agent.description}</div>
          </section>
        )}
        {agent.purpose && (
          <section style={detailSection}>
            <div style={detailLabel}>Purpose</div>
            <div style={detailText}>{agent.purpose}</div>
          </section>
        )}
        {agent.duplicate_check_notes && (
          <section style={detailSection}>
            <div style={detailLabel}>Duplicate Check Notes</div>
            <div style={detailText}>{agent.duplicate_check_notes}</div>
          </section>
        )}

        <section style={detailSection}>
          <div style={detailLabel}>Registry Fields</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {fields.map(([k, v]) => v && v !== "—" ? (
                <tr key={k}>
                  <td style={{ padding: "4px 0", color: "#94a3b8", width: "45%" }}>{k}</td>
                  <td style={{ padding: "4px 0", color: "#e2e8f0" }}>{v}</td>
                </tr>
              ) : null)}
            </tbody>
          </table>
        </section>

        {agent.inputs_json && (
          <section style={detailSection}>
            <div style={detailLabel}>Inputs</div>
            <pre style={preStyle}>{JSON.stringify(agent.inputs_json, null, 2)}</pre>
          </section>
        )}
        {agent.outputs_json && (
          <section style={detailSection}>
            <div style={detailLabel}>Outputs</div>
            <pre style={preStyle}>{JSON.stringify(agent.outputs_json, null, 2)}</pre>
          </section>
        )}
        {agent.success_metrics_json && (
          <section style={detailSection}>
            <div style={detailLabel}>Success Metrics</div>
            <pre style={preStyle}>{JSON.stringify(agent.success_metrics_json, null, 2)}</pre>
          </section>
        )}
        {agent.build_plan_json && (
          <section style={detailSection}>
            <div style={detailLabel}>Build Plan</div>
            <pre style={preStyle}>{JSON.stringify(agent.build_plan_json, null, 2)}</pre>
          </section>
        )}
        {agent.notes && (
          <section style={detailSection}>
            <div style={detailLabel}>Notes</div>
            <div style={detailText}>{agent.notes}</div>
          </section>
        )}

        <button onClick={onClose} style={{ ...btnStyle("#1e293b", "#94a3b8"), marginTop: 16 }}>
          Close
        </button>
      </div>
    </div>
  );
}

const detailSection = { marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,.08)" };
const detailLabel = { fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 };
const detailText = { fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 };
const preStyle = { background: "#020617", borderRadius: 6, padding: 12, fontSize: 12, color: "#94a3b8", overflowX: "auto", margin: 0 };

// ── Propose Modal ─────────────────────────────────────────────────────────────

function ProposeModal({ token, allAgents, onClose, onSuccess }) {
  const [form, setForm] = useState(BLANK_PROPOSAL);
  const [dupCheck, setDupCheck] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setDupCheck(null); }

  function checkDuplicates() {
    if (!form.agent_name && !form.purpose) return;
    const result = runDuplicateCheck(allAgents, form);
    setDupCheck(result);
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.agent_name.trim()) { setError("Agent name is required"); return; }

    const check = runDuplicateCheck(allAgents, form);
    setDupCheck(check);
    if (check.status === "BLOCKED") { setError("Submission blocked: duplicate agent detected."); return; }

    setBusy(true);
    setError("");
    try {
      await proposeAgent(token, form);
      onSuccess("Agent proposal submitted.");
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const dupColor = dupCheck?.status === "BLOCKED" ? "#ef4444"
    : dupCheck?.status === "WARNING" ? "#f59e0b" : "#22c55e";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }} onClick={onClose}>
      <form onSubmit={submit} onClick={e => e.stopPropagation()} style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.15)",
        borderRadius: 12, padding: 28, width: "100%", maxWidth: 560,
        maxHeight: "90vh", overflowY: "auto", color: "#f8fafc",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Propose New Agent</div>

        {[
          ["agent_name", "Agent Name *", "text", "e.g. territory"],
          ["agent_role", "Role / Title", "text", "e.g. Territory Manager"],
          ["owner", "Owner", "text", "Who is responsible for this agent?"],
        ].map(([k, label, type, placeholder]) => (
          <label key={k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={formLabel}>{label}</span>
            <input
              type={type} value={form[k]}
              onChange={e => set(k, e.target.value)}
              placeholder={placeholder}
              style={inputStyle}
            />
          </label>
        ))}

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={formLabel}>Description</span>
          <textarea rows={2} value={form.description}
            onChange={e => set("description", e.target.value)}
            placeholder="One sentence: what does this agent do?"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={formLabel}>Purpose</span>
          <textarea rows={3} value={form.purpose}
            onChange={e => set("purpose", e.target.value)}
            placeholder="Why does this agent need to exist? What business problem does it solve?"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={formLabel}>Risk Level</span>
          <select value={form.risk_level} onChange={e => set("risk_level", e.target.value)} style={inputStyle}>
            <option value="low">Low — read-only, no external calls</option>
            <option value="medium">Medium — writes to DB, no outreach</option>
            <option value="high">High — triggers calls, SMS, or emails</option>
          </select>
        </label>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["can_read", "Can read data"],
            ["can_write", "Can write/modify data"],
            ["requires_approval", "Requires approval before actions"],
            ["human_approval_required", "Requires human approval to activate"],
          ].map(([k, label]) => (
            <label key={k} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)} />
              <span style={{ fontSize: 13, color: "#cbd5e1" }}>{label}</span>
            </label>
          ))}
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={formLabel}>Notes</span>
          <textarea rows={2} value={form.notes}
            onChange={e => set("notes", e.target.value)}
            placeholder="Any additional context..."
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </label>

        <button type="button" onClick={checkDuplicates} style={btnStyle("#1e293b", "#94a3b8")}>
          Run Duplicate Check
        </button>

        {dupCheck && (
          <div style={{
            padding: "10px 14px", borderRadius: 6, fontSize: 13,
            background: `${dupColor}11`, border: `1px solid ${dupColor}44`, color: dupColor,
          }}>
            <strong>{dupCheck.status}</strong>
            {dupCheck.results.map((r, i) => (
              <div key={i} style={{ marginTop: 4, fontSize: 12, color: "#cbd5e1" }}>• {r.message}</div>
            ))}
            {dupCheck.status === "CLEAR" && <span> — No conflicts found.</span>}
          </div>
        )}

        {error && (
          <div style={{ color: "#ef4444", fontSize: 13, padding: "8px 12px", background: "#7f1d1d22", borderRadius: 6 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" disabled={busy || dupCheck?.status === "BLOCKED"} style={{
            ...btnStyle("#1e3a5f", "#3b82f6"),
            opacity: busy || dupCheck?.status === "BLOCKED" ? 0.5 : 1,
          }}>
            {busy ? "Submitting…" : "Submit Proposal"}
          </button>
          <button type="button" onClick={onClose} style={btnStyle("#1e293b", "#94a3b8")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const formLabel = { fontSize: 12, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" };
const inputStyle = {
  background: "#020617", border: "1px solid rgba(255,255,255,.15)", borderRadius: 6,
  color: "#f8fafc", padding: "8px 12px", fontSize: 14, width: "100%",
  outline: "none", fontFamily: "inherit",
};

// ── Audit Log Modal ───────────────────────────────────────────────────────────

function AuditModal({ token, onClose }) {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAuditLog(token)
      .then(d => setLog(d.log || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.75)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.15)",
        borderRadius: 12, padding: 28, width: "100%", maxWidth: 640,
        maxHeight: "85vh", overflowY: "auto", color: "#f8fafc",
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Audit Log</div>

        {loading && <div style={{ color: "#94a3b8", fontSize: 14 }}>Loading…</div>}
        {error && <div style={{ color: "#ef4444", fontSize: 14 }}>{error}</div>}

        {!loading && log.length === 0 && !error && (
          <div style={{ color: "#64748b", fontSize: 14 }}>No audit entries yet.</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {log.map(entry => (
            <div key={entry.id} style={{
              background: "#020617", borderRadius: 8, padding: "10px 14px",
              borderLeft: `3px solid ${STATUS_COLORS[entry.to_status] || "#475569"}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{entry.agent_name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {new Date(entry.changed_at).toLocaleString()}
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
                {entry.from_status ? `${entry.from_status} → ` : "created → "}
                <strong style={{ color: STATUS_COLORS[entry.to_status] || "#f8fafc" }}>{entry.to_status}</strong>
                {" "}<span style={{ color: "#64748b" }}>by {entry.changed_by}</span>
              </div>
              {entry.notes && <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{entry.notes}</div>}
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{ ...btnStyle("#1e293b", "#94a3b8"), marginTop: 16 }}>
          Close
        </button>
      </div>
    </div>
  );
}

// ── Queue Health Widget ───────────────────────────────────────────────────────

const HEALTH_COLORS = {
  healthy:  "#22c55e",
  low:      "#f59e0b",
  critical: "#ef4444",
  empty:    "#64748b",
};

function QueueHealthWidget({ metrics, agentsActive, loading }) {
  if (loading) {
    return (
      <div style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 10, padding: "14px 20px", marginBottom: 20,
        color: "#475569", fontSize: 13,
      }}>
        Loading queue health…
      </div>
    );
  }

  if (!metrics) {
    return (
      <div style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 10, padding: "14px 20px", marginBottom: 20,
        color: "#475569", fontSize: 13,
      }}>
        No queue metrics yet — run the orchestrator cycle to generate a snapshot.
      </div>
    );
  }

  const health = metrics.queue_health || "empty";
  const healthColor = HEALTH_COLORS[health] || "#94a3b8";
  const tzGaps = metrics.tz_gaps_json || [];
  const measuredAt = metrics.measured_at ? new Date(metrics.measured_at) : null;
  const minsAgo = measuredAt ? Math.round((Date.now() - measuredAt.getTime()) / 60000) : null;

  return (
    <div style={{
      background: "#0f172a", border: `1px solid ${healthColor}33`,
      borderRadius: 10, padding: "14px 20px", marginBottom: 20,
      display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start",
    }}>
      {/* Health status */}
      <div style={{ minWidth: 100 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
          Queue Health
        </div>
        <div style={{
          display: "inline-block", padding: "3px 10px", borderRadius: 5,
          background: `${healthColor}22`, color: healthColor,
          border: `1px solid ${healthColor}44`, fontSize: 13, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: ".06em",
        }}>
          {health}
        </div>
      </div>

      {/* Approved leads */}
      <div style={{ minWidth: 100 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
          Approved Leads
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#f8fafc", lineHeight: 1 }}>
          {(metrics.approved_leads_count || 0).toLocaleString()}
        </div>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
          need {(metrics.leads_needed_today || 1200).toLocaleString()} / day
        </div>
      </div>

      {/* Coverage hours */}
      <div style={{ minWidth: 100 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
          Sophia Coverage
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#f8fafc", lineHeight: 1 }}>
          {Number(metrics.sophia_coverage_hours || 0).toFixed(1)}h
        </div>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>of calling day</div>
      </div>

      {/* TZ Gaps */}
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
          TZ Gaps
        </div>
        {tzGaps.length === 0 ? (
          <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>All 4 major zones covered</div>
        ) : (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {tzGaps.map(tz => (
              <span key={tz} style={{
                fontSize: 11, padding: "2px 7px", borderRadius: 4,
                background: "#7f1d1d33", color: "#fca5a5", border: "1px solid #ef444433",
                fontWeight: 600,
              }}>
                {tz.replace("America/", "")}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Active agents + timestamp */}
      <div style={{ minWidth: 80, textAlign: "right" }}>
        {agentsActive > 0 && (
          <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 700, marginBottom: 4 }}>
            {agentsActive} agent{agentsActive !== 1 ? "s" : ""} active
          </div>
        )}
        {minsAgo !== null && (
          <div style={{ fontSize: 11, color: "#475569" }}>
            {minsAgo < 2 ? "just now" : `${minsAgo}m ago`}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sophia Dialer Widget ──────────────────────────────────────────────────────

function SophiaDialerWidget({ dialer, loading, onEnqueue, onEnable, onDisable, enqueueing, toggling }) {
  if (loading) {
    return (
      <div style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 10, padding: "14px 20px", marginBottom: 20,
        color: "#475569", fontSize: 13,
      }}>
        Loading Sophia dialer…
      </div>
    );
  }

  if (!dialer) {
    return (
      <div style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 10, padding: "14px 20px", marginBottom: 20,
        color: "#475569", fontSize: 13,
      }}>
        Sophia dialer not available — run migration 052 first.
      </div>
    );
  }

  const autoDial = dialer.sophia_auto_dial;
  const borderColor = autoDial ? "#22c55e" : "#475569";

  return (
    <div style={{
      background: "#0f172a", border: `1px solid ${borderColor}33`,
      borderRadius: 10, padding: "14px 20px", marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em" }}>
          Sophia Dialer — Main Queue
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onEnqueue}
            disabled={enqueueing}
            style={{ ...btnStyle("#1a1e2e", "#818cf8"), opacity: enqueueing ? 0.5 : 1, fontSize: 11 }}
          >
            {enqueueing ? "Enqueueing…" : "Enqueue Leads"}
          </button>
          {autoDial ? (
            <button
              onClick={onDisable}
              disabled={toggling}
              style={{ ...btnStyle("#1c1917", "#f59e0b"), opacity: toggling ? 0.5 : 1, fontSize: 11 }}
            >
              {toggling ? "…" : "⏸ Pause Auto-Dial"}
            </button>
          ) : (
            <button
              onClick={onEnable}
              disabled={toggling}
              style={{ ...btnStyle("#14532d", "#22c55e"), opacity: toggling ? 0.5 : 1, fontSize: 11 }}
            >
              {toggling ? "…" : "▶ Enable Auto-Dial"}
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Auto-dial status */}
        <div style={{ minWidth: 90 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
            Auto-Dial
          </div>
          <div style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 5,
            background: autoDial ? "#22c55e22" : "#47556922",
            color: autoDial ? "#22c55e" : "#475569",
            border: `1px solid ${autoDial ? "#22c55e" : "#475569"}44`,
            fontSize: 12, fontWeight: 700, textTransform: "uppercase",
          }}>
            {autoDial ? "ON" : "OFF"}
          </div>
        </div>

        {/* Queue counts */}
        {[
          ["Pending",   dialer.pending,   "#818cf8"],
          ["Active",    dialer.active,    "#22c55e"],
          ["Callback",  dialer.callback,  "#f59e0b"],
          ["Completed", dialer.completed, "#475569"],
          ["No Answer", dialer.no_answer, "#ef4444"],
        ].map(([label, count, color]) => (
          <div key={label} style={{ minWidth: 70 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
              {label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: count > 0 ? color : "#334155", lineHeight: 1 }}>
              {count}
            </div>
          </div>
        ))}

        {/* Max concurrent */}
        <div style={{ minWidth: 70 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>
            Max Concurrent
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#64748b", lineHeight: 1 }}>
            {dialer.max_concurrent}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    setError("");
    try {
      const valid = await validateToken(token.trim());
      if (!valid) { setError("Invalid token or insufficient permissions."); return; }
      setStoredToken(token.trim());
      onLogin(token.trim());
    } catch {
      setError("Could not reach the API. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#020617", display: "flex",
      alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <form onSubmit={submit} style={{
        background: "#0f172a", border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 12, padding: 32, width: "100%", maxWidth: 400,
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>
          WGW Agent Builder
        </div>
        <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>
          Paste your WGW admin Bearer token from the main platform to continue.
        </div>
        <input
          type="password"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Bearer token"
          style={{ ...inputStyle, fontSize: 14 }}
          autoFocus
        />
        {error && <div style={{ color: "#ef4444", fontSize: 13 }}>{error}</div>}
        <button type="submit" disabled={busy} style={{
          ...btnStyle("#1e3a5f", "#3b82f6"),
          padding: "10px 16px", fontSize: 14, opacity: busy ? 0.5 : 1,
        }}>
          {busy ? "Verifying…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AgentBuilder() {
  const [token, setToken] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [detail, setDetail] = useState(null);
  const [showPropose, setShowPropose] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [toast, setToast] = useState(null);
  const [orchStatus, setOrchStatus] = useState(null);
  const [orchLoading, setOrchLoading] = useState(false);
  const [runningCycle, setRunningCycle] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [dialerStatus, setDialerStatus] = useState(null);
  const [dialerLoading, setDialerLoading] = useState(false);
  const [enqueueing, setEnqueueing] = useState(false);
  const [dialerToggling, setDialerToggling] = useState(false);

  useEffect(() => {
    const stored = getStoredToken();
    if (stored) {
      validateToken(stored).then(valid => {
        if (valid) { setToken(stored); } else { clearStoredToken(); }
      });
    }
  }, []);

  const loadDialerStatus = useCallback(async (t) => {
    if (!t) return;
    setDialerLoading(true);
    try {
      const data = await fetchDialerStatus(t);
      setDialerStatus(data);
    } catch {
      // non-fatal — widget shows empty state
    } finally {
      setDialerLoading(false);
    }
  }, []);

  const loadOrchStatus = useCallback(async (t) => {
    if (!t) return;
    setOrchLoading(true);
    try {
      const data = await fetchOrchestratorStatus(t);
      setOrchStatus(data);
    } catch {
      // non-fatal — widget shows empty state
    } finally {
      setOrchLoading(false);
    }
  }, []);

  const load = useCallback(async (t) => {
    if (!t) return;
    setLoading(true);
    try {
      const { agents: data } = await fetchAgents(t);
      // Merge: API agents override seed agents by name
      const apiNames = new Set((data || []).map(a => a.agent_name));
      const seeded = SEED_AGENTS.filter(s => !apiNames.has(s.agent_name));
      setAgents([...(data || []), ...seeded]);
    } catch (e) {
      setToast({ message: `Failed to load agents: ${e.message}`, type: "error" });
      setAgents(SEED_AGENTS);
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleRunCycle() {
    if (!token || runningCycle) return;
    setRunningCycle(true);
    try {
      const { report } = await triggerOrchestratorCycle(token);
      const alertCount = (report?.alerts || []).length;
      setToast({
        message: `Cycle complete — health: ${report?.queue_health || "unknown"}, ${alertCount} alert${alertCount !== 1 ? "s" : ""}`,
        type: alertCount > 0 ? "warning" : "success",
      });
      await loadOrchStatus(token);
    } catch (e) {
      setToast({ message: `Cycle failed: ${e.message}`, type: "error" });
    } finally {
      setRunningCycle(false);
    }
  }

  async function handleBackfill() {
    if (!token || backfilling) return;
    setBackfilling(true);
    try {
      const { total, updated, skipped } = await triggerTimezoneBackfill(token);
      setToast({
        message: `TZ backfill done — ${updated} updated, ${skipped} skipped of ${total} leads`,
        type: updated > 0 ? "success" : "warning",
      });
      await loadOrchStatus(token);
    } catch (e) {
      setToast({ message: `Backfill failed: ${e.message}`, type: "error" });
    } finally {
      setBackfilling(false);
    }
  }

  async function handleEnqueue() {
    if (!token || enqueueing) return;
    setEnqueueing(true);
    try {
      const { enqueued, skipped } = await triggerEnqueue(token);
      setToast({ message: `Enqueued ${enqueued} leads (${skipped} already in queue)`, type: enqueued > 0 ? "success" : "warning" });
      await loadDialerStatus(token);
      await loadOrchStatus(token);
    } catch (e) {
      setToast({ message: `Enqueue failed: ${e.message}`, type: "error" });
    } finally {
      setEnqueueing(false);
    }
  }

  async function handleEnableAutoDial() {
    if (!token || dialerToggling) return;
    if (!confirm("Enable auto-dial? Sophia will begin calling leads automatically on the next cron tick.")) return;
    setDialerToggling(true);
    try {
      await enableAutoDial(token);
      setToast({ message: "Auto-dial enabled — Sophia will start calling on next cron tick", type: "success" });
      await loadDialerStatus(token);
    } catch (e) {
      setToast({ message: `Enable failed: ${e.message}`, type: "error" });
    } finally {
      setDialerToggling(false);
    }
  }

  async function handleDisableAutoDial() {
    if (!token || dialerToggling) return;
    setDialerToggling(true);
    try {
      await disableAutoDial(token);
      setToast({ message: "Auto-dial paused", type: "warning" });
      await loadDialerStatus(token);
    } catch (e) {
      setToast({ message: `Disable failed: ${e.message}`, type: "error" });
    } finally {
      setDialerToggling(false);
    }
  }

  useEffect(() => {
    if (token) {
      load(token);
      loadOrchStatus(token);
      loadDialerStatus(token);
    }
  }, [token, load, loadOrchStatus, loadDialerStatus]);

  const tabCounts = {};
  for (const tab of TABS) tabCounts[tab] = agents.filter(a => a.status === tab).length;
  const tabAgents = agents.filter(a => a.status === activeTab);

  if (!token) {
    return (
      <>
        <Head><title>Agent Builder — WGW</title></Head>
        <LoginScreen onLogin={t => { setToken(t); load(t); }} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Agent Builder — WGW Admin</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #020617; color: #f8fafc; font-family: 'Manrope', sans-serif; }
        button:disabled { cursor: not-allowed; }
        select option { background: #0f172a; }
        input[type=checkbox] { accent-color: #3b82f6; }
      `}</style>

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
      {detail && <DetailModal agent={detail} onClose={() => setDetail(null)} />}
      {showPropose && (
        <ProposeModal
          token={token}
          allAgents={agents}
          onClose={() => setShowPropose(false)}
          onSuccess={msg => { setToast({ message: msg, type: "success" }); load(token); }}
        />
      )}
      {showAudit && <AuditModal token={token} onClose={() => setShowAudit(false)} />}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em" }}>Agent Builder</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
              White Glove Wireless — AI Operating System
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => setShowAudit(true)} style={btnStyle("#1e293b", "#94a3b8")}>
              Audit Log
            </button>
            <button onClick={() => { load(token); loadOrchStatus(token); loadDialerStatus(token); }} disabled={loading} style={btnStyle("#1e293b", "#94a3b8")}>
              {loading ? "Loading…" : "Refresh"}
            </button>
            <button
              onClick={handleRunCycle}
              disabled={runningCycle}
              style={{ ...btnStyle("#1a2e1a", "#22c55e"), opacity: runningCycle ? 0.5 : 1 }}
            >
              {runningCycle ? "Running…" : "▶ Run Cycle"}
            </button>
            <button
              onClick={handleBackfill}
              disabled={backfilling}
              style={{ ...btnStyle("#1a1e2e", "#818cf8"), opacity: backfilling ? 0.5 : 1 }}
            >
              {backfilling ? "Backfilling…" : "⏱ Backfill TZs"}
            </button>
            <button onClick={() => setShowPropose(true)} style={btnStyle("#1e3a5f", "#3b82f6")}>
              + Propose New
            </button>
            <button onClick={() => { clearStoredToken(); setToken(null); }} style={btnStyle("#1c1917", "#64748b")}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Queue Health Widget */}
        <QueueHealthWidget
          metrics={orchStatus?.latest_metrics || null}
          agentsActive={(orchStatus?.agents || []).filter(a => a.status === "active").length}
          loading={orchLoading}
        />

        {/* Sophia Dialer Widget */}
        <SophiaDialerWidget
          dialer={dialerStatus}
          loading={dialerLoading}
          onEnqueue={handleEnqueue}
          onEnable={handleEnableAutoDial}
          onDisable={handleDisableAutoDial}
          enqueueing={enqueueing}
          toggling={dialerToggling}
        />

        {/* Tab Bar */}
        <div style={{
          display: "flex", gap: 2, background: "#0f172a",
          borderRadius: 10, padding: 4, marginBottom: 20, flexWrap: "wrap",
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, minWidth: 80, padding: "8px 4px", borderRadius: 7,
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                fontFamily: "inherit", transition: "all .15s",
                background: activeTab === tab ? "#1e293b" : "transparent",
                color: activeTab === tab ? "#f8fafc" : "#64748b",
              }}
            >
              {TAB_LABELS[tab]}
              {tabCounts[tab] > 0 && (
                <span style={{
                  marginLeft: 6, background: activeTab === tab ? STATUS_COLORS[tab] + "33" : "#1e293b",
                  color: STATUS_COLORS[tab] || "#64748b",
                  padding: "1px 6px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                }}>
                  {tabCounts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Agent Grid */}
        {tabAgents.length === 0 ? (
          <div style={{
            textAlign: "center", color: "#475569", padding: "48px 0", fontSize: 14,
          }}>
            No {TAB_LABELS[activeTab].toLowerCase()} agents.
            {activeTab === "proposed" && (
              <div style={{ marginTop: 8 }}>
                <button onClick={() => setShowPropose(true)} style={btnStyle("#1e3a5f", "#3b82f6")}>
                  + Propose New Agent
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tabAgents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                token={token}
                onRefresh={() => load(token)}
                onShowDetail={setDetail}
              />
            ))}
          </div>
        )}

        {/* Safety notice */}
        <div style={{
          marginTop: 32, padding: "12px 16px", borderRadius: 8,
          background: "#0f172a", border: "1px solid rgba(255,255,255,.07)",
          fontSize: 12, color: "#475569", lineHeight: 1.6,
        }}>
          Safety rules enforced: No agent activates without human approval · High-risk agents require explicit confirmation ·
          All status changes are audit-logged · No autonomous calling, scraping, or code deployment.
        </div>
      </div>
    </>
  );
}
