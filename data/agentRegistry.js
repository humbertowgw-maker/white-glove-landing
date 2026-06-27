// Static seed data for the 6 existing active agents.
// Used as fallback when the API is unavailable or for initial render.
// Keep in sync with agent_registry table in Supabase.

export const SEED_AGENTS = [
  {
    id: "seed-director",
    agent_name: "director",
    agent_role: "Executive Coordinator",
    description: "Summarizes every AI workforce cycle and names the owner's highest-value next decision.",
    purpose: "Provide a 2-sentence daily executive summary after each workforce cycle completes.",
    status: "active",
    risk_level: "low",
    provider: "anthropic",
    can_read: true,
    can_write: false,
    requires_approval: false,
    human_approval_required: false,
    inputs_json: [
      { name: "calls_made", type: "number", source: "hq_stats" },
      { name: "appointments_booked", type: "number", source: "hq_stats" },
      { name: "warm_leads_pending", type: "number", source: "hq_stats" },
      { name: "approvals_pending", type: "number", source: "hq_stats" },
      { name: "agent_memories", type: "object", source: "wgw_ai_memory" },
    ],
    outputs_json: [
      { name: "summary", type: "string", destination: "activity_events" },
    ],
    success_metrics_json: [
      { metric: "Summary generated per cycle", target: "100%", measurement_method: "activity_events count" },
    ],
    notes: "Runs at the end of every runAiWorkforceForOrg cycle via runAiWorkforce.js",
  },
  {
    id: "seed-sophia",
    agent_name: "sophia",
    agent_role: "VP of Sales Development",
    description: "Reviews territory and provider coverage data, researches leads, and manages the AI calling queue.",
    purpose: "Research coverage gaps and build the outreach pipeline. Will eventually place AI calls to approved leads.",
    status: "active",
    risk_level: "high",
    provider: "anthropic",
    can_read: true,
    can_write: true,
    requires_approval: true,
    human_approval_required: true,
    inputs_json: [
      { name: "active_leads", type: "array", source: "leads table" },
      { name: "agent_memory", type: "object", source: "wgw_ai_memory" },
    ],
    outputs_json: [
      { name: "coverage_research_plan", type: "string", destination: "activity_events" },
      { name: "call_queue_entries", type: "array", destination: "call_queue (future)" },
    ],
    success_metrics_json: [
      { metric: "Coverage gaps identified per cycle", target: ">0 actionable gaps", measurement_method: "activity_events" },
      { metric: "Max concurrent calls", target: "≤5", measurement_method: "call_queue active count" },
    ],
    notes: "Calling capability is partially built (sophiaDialer.js) but not yet activated. maxConcurrentCalls = 5 is a hard ceiling.",
  },
  {
    id: "seed-scout",
    agent_name: "scout",
    agent_role: "Director of Market Intelligence",
    description: "Researches community events and business leads in target markets. Runs on-demand and nightly.",
    purpose: "Keep the lead pipeline full by finding and enriching business opportunities before Sophia needs them.",
    status: "active",
    risk_level: "medium",
    provider: "anthropic",
    can_read: true,
    can_write: true,
    requires_approval: false,
    human_approval_required: false,
    inputs_json: [
      { name: "city", type: "string", source: "leads or org config" },
      { name: "state", type: "string", source: "leads or org config" },
      { name: "agent_memory", type: "object", source: "wgw_ai_memory" },
    ],
    outputs_json: [
      { name: "event_research", type: "array", destination: "scouted_events" },
      { name: "web_leads", type: "array", destination: "activity_events" },
      { name: "nightly_summary", type: "string", destination: "activity_events" },
    ],
    success_metrics_json: [
      { metric: "Events found per nightly run", target: ">0", measurement_method: "activity_events payload.event_count" },
      { metric: "Markets covered per nightly run", target: "≥3", measurement_method: "activity_events payload.market_count" },
    ],
    notes: "Runs on cron at 2 AM Pacific via runNightlyScoutAllOrgs. Also runs on-demand in workforce cycle.",
  },
  {
    id: "seed-atlas",
    agent_name: "atlas",
    agent_role: "Chief Operating Officer",
    description: "Reviews operations stats each cycle and recommends one practical action.",
    purpose: "Keep daily operations moving by surfacing the highest-priority operational item per cycle.",
    status: "active",
    risk_level: "low",
    provider: "anthropic",
    can_read: true,
    can_write: false,
    requires_approval: false,
    human_approval_required: false,
    inputs_json: [
      { name: "approvals_pending", type: "number", source: "hq_stats" },
      { name: "tasks_completed", type: "number", source: "hq_stats" },
      { name: "appointments_today", type: "number", source: "hq_stats" },
      { name: "agent_memory", type: "object", source: "wgw_ai_memory" },
    ],
    outputs_json: [
      { name: "operations_recommendation", type: "string", destination: "activity_events" },
    ],
    success_metrics_json: [
      { metric: "Recommendation generated per cycle", target: "100%", measurement_method: "activity_events count" },
    ],
    notes: "Read-only. Does not trigger any actions.",
  },
  {
    id: "seed-pulse",
    agent_name: "pulse",
    agent_role: "Business Health Officer",
    description: "Interprets KPI snapshots, identifies the main risk or positive signal, and recommends the next measurement.",
    purpose: "Give the owner a clear health signal after every workforce cycle so no metric trend goes unnoticed.",
    status: "active",
    risk_level: "low",
    provider: "anthropic",
    can_read: true,
    can_write: false,
    requires_approval: false,
    human_approval_required: false,
    inputs_json: [
      { name: "calls_made", type: "number", source: "hq_stats" },
      { name: "appointments_booked", type: "number", source: "hq_stats" },
      { name: "leads_qualified", type: "number", source: "hq_stats" },
      { name: "warm_leads_pending", type: "number", source: "hq_stats" },
      { name: "agent_memory", type: "object", source: "wgw_ai_memory" },
    ],
    outputs_json: [
      { name: "health_signal", type: "string", destination: "activity_events" },
      { name: "booking_rate", type: "number", destination: "activity_events payload" },
    ],
    success_metrics_json: [
      { metric: "Health signal generated per cycle", target: "100%", measurement_method: "activity_events count" },
    ],
    notes: "Read-only. Booking rate is computed as appointments_booked / calls_made × 100.",
  },
  {
    id: "seed-executor",
    agent_name: "executor",
    agent_role: "Autonomous Task Runner",
    description: "Executes queued tasks by dispatching allowed actions (trigger_call, send_sms, send_email, update_lead, create_appointment).",
    purpose: "Process the executor_tasks queue and run approved actions on behalf of the AI workforce.",
    status: "active",
    risk_level: "high",
    provider: "anthropic",
    can_read: true,
    can_write: true,
    requires_approval: true,
    human_approval_required: true,
    inputs_json: [
      { name: "executor_tasks", type: "array", source: "executor_tasks table" },
      { name: "org_id", type: "uuid", source: "request context" },
    ],
    outputs_json: [
      { name: "task_results", type: "object", destination: "executor_tasks (status update)" },
      { name: "action_log", type: "object", destination: "executor_logs" },
    ],
    success_metrics_json: [
      { metric: "Tasks completed without error", target: ">95%", measurement_method: "executor_logs status=completed" },
    ],
    notes: "ALLOWED_TOOLS: trigger_call, send_sms, send_email, update_lead, create_appointment. No other actions permitted.",
  },
];

export const STATUS_ORDER = ["active", "approved", "in_build", "proposed", "paused", "retired"];

export const RISK_COLORS = {
  low:    "#22c55e",
  medium: "#f59e0b",
  high:   "#ef4444",
};

export const STATUS_COLORS = {
  active:    "#22c55e",
  approved:  "#3b82f6",
  in_build:  "#8b5cf6",
  proposed:  "#f59e0b",
  paused:    "#94a3b8",
  retired:   "#475569",
};
