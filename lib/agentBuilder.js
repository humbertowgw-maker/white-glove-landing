// lib/agentBuilder.js — API helpers for the Agent Builder admin page

const API = process.env.NEXT_PUBLIC_API_URL || "https://white-glove-backend-production-5a7d.up.railway.app";

function headers(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse(res) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    return json;
  } catch (e) {
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    throw e;
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("wgw_admin_token") || null;
}

export function setStoredToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("wgw_admin_token", token);
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("wgw_admin_token");
}

export async function validateToken(token) {
  const res = await fetch(`${API}/api/agents-registry`, {
    headers: headers(token),
  });
  if (res.status === 401 || res.status === 403) return false;
  return res.ok;
}

// ── Registry ──────────────────────────────────────────────────────────────────

export async function fetchAgents(token, status = null) {
  const url = new URL(`${API}/api/agents-registry`);
  if (status) url.searchParams.set("status", status);
  const res = await fetch(url.toString(), { headers: headers(token) });
  return parseResponse(res);
}

export async function fetchAgent(token, id) {
  const res = await fetch(`${API}/api/agents-registry/${id}`, { headers: headers(token) });
  return parseResponse(res);
}

export async function proposeAgent(token, payload) {
  const res = await fetch(`${API}/api/agents-registry`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

export async function updateAgent(token, id, payload) {
  const res = await fetch(`${API}/api/agents-registry/${id}`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

export async function approveAgent(token, id, notes = "") {
  const res = await fetch(`${API}/api/agents-registry/${id}/approve`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ notes }),
  });
  return parseResponse(res);
}

export async function activateAgent(token, id) {
  const res = await fetch(`${API}/api/agents-registry/${id}/activate`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({}),
  });
  return parseResponse(res);
}

export async function pauseAgent(token, id, notes = "") {
  const res = await fetch(`${API}/api/agents-registry/${id}/pause`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ notes }),
  });
  return parseResponse(res);
}

export async function rejectAgent(token, id, notes = "") {
  const res = await fetch(`${API}/api/agents-registry/${id}/reject`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ notes }),
  });
  return parseResponse(res);
}

export async function secondApproveAgent(token, id, notes = "") {
  const res = await fetch(`${API}/api/agents-registry/${id}/second-approve`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ notes }),
  });
  return parseResponse(res);
}

export async function retireAgent(token, id, notes = "") {
  const res = await fetch(`${API}/api/agents-registry/${id}/retire`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ notes }),
  });
  return parseResponse(res);
}

export async function fetchAuditLog(token, limit = 100) {
  const res = await fetch(`${API}/api/agents-registry/audit-log?limit=${limit}`, {
    headers: headers(token),
  });
  return parseResponse(res);
}

// ── Orchestrator ──────────────────────────────────────────────────────────────

export async function fetchOrchestratorStatus(token) {
  const res = await fetch(`${API}/api/orchestrator/status`, { headers: headers(token) });
  return parseResponse(res);
}

export async function triggerOrchestratorCycle(token) {
  const res = await fetch(`${API}/api/orchestrator/run-cycle`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({}),
  });
  return parseResponse(res);
}

// ── Sophia Dialer ─────────────────────────────────────────────────────────────

export async function fetchDialerStatus(token) {
  const res = await fetch(`${API}/api/sophia-dialer/status`, { headers: headers(token) });
  return parseResponse(res);
}

export async function triggerEnqueue(token, limit = 200) {
  const res = await fetch(`${API}/api/sophia-dialer/enqueue`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ limit }),
  });
  return parseResponse(res);
}

export async function enableAutoDial(token) {
  const res = await fetch(`${API}/api/sophia-dialer/enable`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({}),
  });
  return parseResponse(res);
}

export async function disableAutoDial(token) {
  const res = await fetch(`${API}/api/sophia-dialer/disable`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({}),
  });
  return parseResponse(res);
}

// ── Territory ─────────────────────────────────────────────────────────────────

export async function triggerTimezoneBackfill(token, limit = 200) {
  const res = await fetch(`${API}/api/territory/enrich-batch`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ limit }),
  });
  return parseResponse(res);
}

// ── Duplicate Check ───────────────────────────────────────────────────────────

export function runDuplicateCheck(allAgents, proposal) {
  const results = [];
  const name = (proposal.agent_name || "").toLowerCase().trim();
  const purpose = (proposal.purpose || "").toLowerCase();
  const description = (proposal.description || "").toLowerCase();

  for (const agent of allAgents) {
    if (agent.status === "retired") continue;

    // Exact name match
    if (agent.agent_name?.toLowerCase() === name) {
      results.push({
        level: "BLOCKED",
        message: `Agent name '${agent.agent_name}' already exists (status: ${agent.status})`,
        conflict_agent: agent.agent_name,
      });
      continue;
    }

    // Purpose/description keyword overlap (top 5 words from proposal)
    const proposalWords = [...new Set(
      `${purpose} ${description}`.split(/\s+/).filter(w => w.length > 4)
    )].slice(0, 10);

    const agentText = `${agent.description || ""} ${agent.purpose || ""}`.toLowerCase();
    const hits = proposalWords.filter(w => agentText.includes(w));
    if (hits.length >= 3) {
      results.push({
        level: "WARNING",
        message: `Possible overlap with '${agent.agent_name}' (${agent.agent_role}). Shared keywords: ${hits.slice(0,5).join(", ")}`,
        conflict_agent: agent.agent_name,
      });
    }
  }

  if (results.some(r => r.level === "BLOCKED")) return { status: "BLOCKED", results };
  if (results.some(r => r.level === "WARNING")) return { status: "WARNING", results };
  return { status: "CLEAR", results: [] };
}
