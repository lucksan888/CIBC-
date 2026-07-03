const goalStates = [
  {
    percent: "72%",
    ring: "72%",
    text: "You are on track to reach $2,000 by August 30 if you save $112 per week."
  },
  {
    percent: "83%",
    ring: "83%",
    text: "If you save $150 per week, you could reach your Montreal trip goal 11 days early."
  },
  {
    percent: "65%",
    ring: "65%",
    text: "If you lower your weekly savings to $90, your goal may move 13 days past August 30."
  }
];

let goalIndex = 0;
let selectedRole = "client";

const roleContent = {
  client: {
    eyebrow: "Client login",
    title: "Welcome back, Rita Wen.",
    description: "Access your personalized spending forecast, savings goals, and account guidance.",
    idLabel: "Card number or username",
    loginId: "rita.wen",
    note: "Prototype mode: use the prefilled demo details to enter the client dashboard.",
    greeting: "Good evening, Rita Wen.",
    subtext: "FutureView is watching your cash flow, savings goals, card spending, and market-sensitive risks."
  },
  advisor: {
    eyebrow: "Advisor login",
    title: "Welcome back, Isabel.",
    description: "Review client forecast signals, goal progress, and recommended outreach opportunities.",
    idLabel: "Advisor ID",
    loginId: "isabel.advisor",
    note: "Prototype mode: use the prefilled demo details to enter the advisor workspace.",
    greeting: "Advisor workspace for Isabel.",
    subtext: "FutureView highlights clients who may benefit from proactive planning support."
  }
};

document.body.classList.add("login-active");

function updateLoginRole(role) {
  selectedRole = role;
  const content = roleContent[role];

  document.querySelectorAll(".role-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.role === role);
  });

  document.getElementById("loginEyebrow").textContent = content.eyebrow;
  document.getElementById("loginTitle").textContent = content.title;
  document.getElementById("loginDescription").textContent = content.description;
  document.getElementById("idLabel").textContent = content.idLabel;
  document.getElementById("loginId").value = content.loginId;
  document.getElementById("loginNote").textContent = content.note;
}

document.querySelectorAll(".role-tab").forEach((tab) => {
  tab.addEventListener("click", () => updateLoginRole(tab.dataset.role));
});

document.getElementById("loginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const content = roleContent[selectedRole];

  document.getElementById("loginScreen")?.classList.add("is-hidden");
  document.getElementById("appShell")?.classList.remove("is-hidden");
  document.body.classList.remove("login-active");
  document.getElementById("dashboardGreeting").textContent = content.greeting;
  document.getElementById("dashboardSubtext").textContent = content.subtext;
  document.getElementById("advisorModeBanner")?.classList.toggle("is-hidden", selectedRole !== "advisor");
  document.querySelectorAll(".advisor-only").forEach((element) => {
    element.classList.toggle("is-hidden", selectedRole !== "advisor");
  });
  document.getElementById("conversationTitle").textContent = selectedRole === "advisor"
    ? "Isabel Martin and Rita Wen"
    : "Rita Wen and Isabel Martin";
  document.getElementById("messageInput").placeholder = selectedRole === "advisor"
    ? "Write a message to Rita Wen..."
    : "Write a message to your advisor...";
  document.querySelector(".advisor-thread-list")?.classList.toggle("is-hidden", selectedRole !== "advisor");
  document.querySelector(".client-action-list")?.classList.toggle("is-hidden", selectedRole === "advisor");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("signOut")?.addEventListener("click", () => {
  document.getElementById("appShell")?.classList.add("is-hidden");
  document.getElementById("loginScreen")?.classList.remove("is-hidden");
  document.querySelectorAll(".advisor-only").forEach((element) => element.classList.add("is-hidden"));
  document.body.classList.add("login-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll("[data-nav-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.getElementById(link.dataset.navTarget);

    document.querySelectorAll("[data-nav-target]").forEach((item) => {
      item.classList.toggle("active", item === link);
    });

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${link.dataset.navTarget}`);
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scrollTarget);
    const card = target?.querySelector(".advisor-card");

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    card?.classList.add("highlight");
    window.setTimeout(() => card?.classList.remove("highlight"), 1400);
  });
});

document.getElementById("messageForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("messageInput");
  const log = document.getElementById("conversationLog");
  const text = input.value.trim();

  if (!text || !log) return;

  const row = document.createElement("div");
  row.className = selectedRole === "advisor" ? "message-row advisor-message" : "message-row client-message";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  const sender = document.createElement("strong");
  sender.textContent = selectedRole === "advisor" ? "Isabel Martin" : "Rita Wen";

  const body = document.createElement("p");
  body.textContent = text;

  const timestamp = document.createElement("span");
  timestamp.textContent = "Just now";

  bubble.append(sender, body, timestamp);
  row.append(bubble);
  log.append(row);
  input.value = "";
  log.scrollTop = log.scrollHeight;
});

document.querySelectorAll("[data-message-template]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-message-template]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    const input = document.getElementById("messageInput");
    if (input) {
      input.value = button.dataset.messageTemplate;
      input.focus();
    }
  });
});

const advisorFilterLabels = {
  total: {
    key: "total",
    note: "Total spending compares each client's expected monthly spending across connected CIBC accounts.",
    prefix: "$"
  },
  essential: {
    key: "essential",
    note: "Essential spending zooms in on housing, groceries, transportation, utilities, and required payments.",
    prefix: "$"
  },
  nonessential: {
    key: "nonessential",
    note: "Non-essential spending highlights flexible categories like dining, subscriptions, recreation, and travel.",
    prefix: "$"
  },
  risk: {
    key: "risk",
    note: "Risk level compares detected overspending, goal pressure, and upcoming payment stress across clients.",
    prefix: ""
  }
};

function updateAdvisorChart() {
  const filter = document.getElementById("advisorFilter")?.value || "total";
  const compare = document.getElementById("compareClients")?.checked ?? true;
  const chart = document.getElementById("advisorChart");
  const note = document.getElementById("advisorChartNote");
  const config = advisorFilterLabels[filter];
  const bars = Array.from(document.querySelectorAll(".advisor-client-bar"));

  if (!chart || !config) return;

  const values = bars.map((bar) => Number(bar.dataset[config.key]));
  const max = Math.max(...values, 1);

  bars.forEach((bar) => {
    const value = Number(bar.dataset[config.key]);
    const fill = bar.querySelector(".advisor-bar-fill");
    const label = bar.querySelector(".bar-value");
    const height = Math.max(18, Math.round((value / max) * 88));

    fill.style.height = `${height}%`;
    label.textContent = filter === "risk" ? `${value}/100` : `$${value.toLocaleString()}`;
    bar.classList.toggle("focus-client", bar.dataset.client === "Aidan Huynh");
  });

  chart.classList.toggle("single-client", !compare);
  if (note) {
    note.textContent = compare ? config.note : `${config.note} Compare is off, so Isabel is zoomed in on Aidan Huynh because FutureView detected the highest current risk.`;
  }
}

document.getElementById("advisorFilter")?.addEventListener("change", updateAdvisorChart);
document.getElementById("compareClients")?.addEventListener("change", updateAdvisorChart);
updateAdvisorChart();

document.getElementById("adjustGoal")?.addEventListener("click", () => {
  goalIndex = (goalIndex + 1) % goalStates.length;
  const state = goalStates[goalIndex];
  const percent = document.getElementById("goalPercent");
  const text = document.getElementById("goalText");
  const ring = document.querySelector(".goal-ring");

  if (percent) percent.textContent = state.percent;
  if (text) text.textContent = state.text;
  if (ring) {
    ring.style.background = `radial-gradient(circle at center, white 0 55%, transparent 56%), conic-gradient(var(--cibc-red) 0 ${state.ring}, #eadde2 ${state.ring} 100%)`;
  }
});

document.querySelector("select")?.addEventListener("change", (event) => {
  const horizon = event.target.value;
  const insight = document.querySelector(".rec-item.warning span");

  if (!insight) return;

  if (horizon.includes("60")) {
    insight.textContent = "Move $140 from restaurants and entertainment to savings over the next two months to stay on pace.";
  } else if (horizon.includes("90")) {
    insight.textContent = "Set a $410 monthly non-essential limit for the next three months to protect your travel goal.";
  } else {
    insight.textContent = "Move $95 from restaurants to your emergency fund to stay on pace.";
  }
});
