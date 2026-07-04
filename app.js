const goalActionStates = {
  "100": {
    percent: "76%",
    ring: "76%",
    text: "If you save $100 this week, your Montreal trip fund moves to 76% and stays on track for August 30.",
    title: "Save $100 this week"
  },
  dining: {
    percent: "74%",
    ring: "74%",
    text: "If you skip one dining expense and save $45, your goal buffer improves without changing rent, groceries, or transit.",
    title: "Skip one dining expense"
  },
  payday: {
    percent: "83%",
    ring: "83%",
    text: "If you auto-save $225 every second Friday, you could reach your Montreal trip goal 11 days early.",
    title: "Auto-save on payday"
  },
  weekend: {
    percent: "78%",
    ring: "78%",
    text: "If you cap weekend recreation at $140, FutureView projects you can add $120 more to your trip fund this month.",
    title: "Set a weekend cap"
  }
};

const goalDecisionDetails = {
  "100": {
    title: "Save $100 this week",
    summary: "FutureView recommends this because it gives the fastest lift to the Montreal trip fund while keeping rent, groceries, transit, and card payments protected.",
    points: [
      ["Why this was picked", "Rita has enough safe spending room this week to move $100 without creating cash-flow pressure."],
      ["Goal impact", "Progress moves from 72% to 76% complete immediately."],
      ["What happens next", "FutureView marks a one-time $100 transfer from chequing to Momentum Savings."],
      ["Confidence", "High confidence because the next paycheque and required bills are already included in the forecast."]
    ]
  },
  dining: {
    title: "Skip one dining expense",
    summary: "FutureView recommends this as a light adjustment because restaurant spending is the category trending furthest above Rita's normal student budget.",
    points: [
      ["Why this was picked", "Dining is running 18% above the three-month average, mostly from takeout and campus food."],
      ["Goal impact", "Moving $45 to savings raises the trip fund to 74% complete."],
      ["What happens next", "FutureView creates a small restaurant budget reminder for the next seven days."],
      ["Confidence", "Medium confidence because it depends on replacing one meal out with groceries or a meal plan option."]
    ]
  },
  payday: {
    title: "Auto-save on payday",
    summary: "FutureView recommends this because saving right after income arrives makes the trip goal less dependent on leftover money at the end of the month.",
    points: [
      ["Why this was picked", "Spending usually rises in the first few days after payday, which can shrink the goal buffer."],
      ["Goal impact", "A $225 transfer every second Friday could move progress to 83% and put the goal ahead of schedule."],
      ["What happens next", "FutureView sets up a recurring transfer draft for Rita to confirm."],
      ["Confidence", "High confidence because the amount matches Rita's recent income pattern and bill schedule."]
    ]
  },
  weekend: {
    title: "Set a weekend cap",
    summary: "FutureView recommends this because weekend recreation is flexible and can protect the goal without changing school, rent, or transit spending.",
    points: [
      ["Why this was picked", "Weekend entertainment and Uber spending have been the biggest source of month-to-month variation."],
      ["Goal impact", "Keeping recreation under $140 could raise the goal to 78% complete this month."],
      ["What happens next", "FutureView adds a spending cap and warns Rita before weekend spending gets too high."],
      ["Confidence", "Medium confidence because the forecast depends on actual weekend plans."]
    ]
  }
};

let selectedRole = "client";
let pendingGoalAction = "";

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
    title: "Welcome back, Isabel Pogue.",
    description: "Review client forecast signals, goal progress, and recommended outreach opportunities.",
    idLabel: "Advisor ID",
    loginId: "isabel.advisor",
    note: "Prototype mode: use the prefilled demo details to enter the advisor workspace.",
    greeting: "Advisor workspace for Isabel Pogue.",
    subtext: "FutureView highlights clients who may benefit from proactive planning support."
  }
};

document.body.classList.add("login-active");

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("is-hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.add("is-hidden");
  }, 2800);
}

function goToMessagesWithDraft(message) {
  closeAccountModal();
  const messagesLink = document.querySelector('[data-nav-target="messages"]');
  messagesLink?.click();
  const input = document.getElementById("messageInput");
  if (input) {
    input.value = message;
    input.focus();
  }
}

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
    ? "Isabel Pogue and Rita Wen"
    : "Rita Wen and Isabel Pogue";
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

const navLinks = Array.from(document.querySelectorAll("[data-nav-target]"));
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.navTarget === visible.target.id);
  });
}, {
  root: null,
  rootMargin: "-22% 0px -58% 0px",
  threshold: [0.15, 0.35, 0.6]
});

navLinks.forEach((link) => {
  const section = document.getElementById(link.dataset.navTarget);
  if (section) sectionObserver.observe(section);
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
  sender.textContent = selectedRole === "advisor" ? "Isabel Pogue" : "Rita Wen";

  const body = document.createElement("p");
  body.textContent = text;

  const timestamp = document.createElement("span");
  timestamp.textContent = "Just now";

  bubble.append(sender, body, timestamp);
  row.append(bubble);
  log.append(row);
  input.value = "";
  log.scrollTop = log.scrollHeight;
  showToast("Message added to the secure conversation.");
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
    showToast("Message draft created. Review it, then press Send.");
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

const accountDetails = {
  chequing: {
    eyebrow: "Chequing detail",
    title: "Chequing transactions",
    badge: "July",
    summary: "Recent student spending from this account. FutureView is watching food, Uber, entertainment, and school-related purchases.",
    transactions: [
      { date: "Jul 3, 2026", merchant: "Campus Tim Hortons", category: "Food and coffee", value: "- $8.45" },
      { date: "Jul 2, 2026", merchant: "Uber Trip", category: "Transportation", value: "- $23.18" },
      { date: "Jul 1, 2026", merchant: "Metro Grocery", category: "Groceries", value: "- $64.32" },
      { date: "Jun 29, 2026", merchant: "Cineplex", category: "Entertainment", value: "- $19.75" },
      { date: "Jun 28, 2026", merchant: "University Bookstore", category: "School supplies", value: "- $88.10" }
    ]
  },
  savings: {
    eyebrow: "Savings detail",
    title: "Savings activity",
    badge: "On track",
    summary: "Your trip fund is ahead of last month, but FutureView recommends one extra deposit before July 15 to protect the goal from weekend spending.",
    transactions: [
      { date: "Jul 1, 2026", merchant: "Automatic payday transfer", category: "Goal deposit", value: "+ $225.00" },
      { date: "Jun 24, 2026", merchant: "Manual trip transfer", category: "Goal deposit", value: "+ $100.00" },
      { date: "Jun 20, 2026", merchant: "Interest earned", category: "Savings interest", value: "+ $6.12" },
      { date: "Jun 14, 2026", merchant: "Emergency buffer transfer", category: "Savings", value: "+ $75.00" }
    ]
  },
  visa: {
    eyebrow: "Credit card detail",
    title: "Visa transactions",
    badge: "Watch",
    summary: "Dining, Uber, and entertainment are driving most card pressure. Paying $300 before July 12 keeps the card from affecting your savings goal.",
    transactions: [
      { date: "Jul 3, 2026", merchant: "DoorDash", category: "Restaurants", value: "- $32.48" },
      { date: "Jul 2, 2026", merchant: "Uber", category: "Transportation", value: "- $18.92" },
      { date: "Jul 2, 2026", merchant: "Spotify Student", category: "Subscription", value: "- $6.99" },
      { date: "Jun 30, 2026", merchant: "Concert Tickets", category: "Entertainment", value: "- $74.50" },
      { date: "Jun 29, 2026", merchant: "Amazon.ca", category: "School supplies", value: "- $41.22" }
    ]
  },
  tfsa: {
    eyebrow: "TFSA detail",
    title: "Current stock holdings",
    badge: "Balanced",
    summary: "Your TFSA is diversified across Canadian banks, technology, energy, and broad-market ETFs. FutureView flags the portfolio as aligned with your moderate risk profile.",
    stocks: [
      { name: "Royal Bank of Canada", symbol: "RY", value: "$1,420", change: "+1.8%" },
      { name: "Shopify", symbol: "SHOP", value: "$1,180", change: "+3.2%" },
      { name: "Enbridge", symbol: "ENB", value: "$960", change: "-0.6%", down: true },
      { name: "Vanguard S&P 500 ETF", symbol: "VFV", value: "$2,240", change: "+2.1%" },
      { name: "iShares Core Canadian Universe Bond ETF", symbol: "XBB", value: "$1,360", change: "+0.4%" },
      { name: "Cash", symbol: "CAD", value: "$1,760", change: "0.0%" }
    ],
    actions: true
  }
};

const actionDetails = {
  recreation: {
    title: "Lower recreation spending by $80 this month",
    summary: "FutureView ranked this first because recreation spending is flexible and reducing it protects the Montreal trip goal without touching essentials.",
    points: [
      ["Signal used", "Entertainment and weekend spending is trending 22% above Rita's three-month average."],
      ["Why it helps", "Reducing recreation by $80 keeps the trip fund on pace while preserving rent, groceries, transit, and phone payments."],
      ["Expected impact", "Goal date remains August 30 and monthly cash buffer improves by about 5 days."],
      ["Suggested action", "Set a weekend recreation cap and move any unused amount into Momentum Savings."]
    ]
  },
  payday: {
    title: "Move payday savings automatically",
    summary: "FutureView ranked this high because automatic transfers reduce the chance that savings depends on leftover money at the end of the month.",
    points: [
      ["Signal used", "Rita usually spends more in the first four days after payday, which lowers her goal buffer."],
      ["Why it helps", "Moving $225 every second Friday saves before discretionary spending happens."],
      ["Expected impact", "Trip fund could reach the target 11 days early if the transfer stays active."],
      ["Suggested action", "Turn on a recurring transfer from chequing to Momentum Savings on payday."]
    ]
  },
  subscription: {
    title: "Delay one subscription renewal",
    summary: "FutureView ranked this lower because it helps, but the dollar impact is smaller than the first two actions.",
    points: [
      ["Signal used", "Subscriptions are stable but not essential for the Montreal trip goal."],
      ["Why it helps", "Pausing one renewal adds a small buffer for unexpected food, transit, or school spending."],
      ["Expected impact", "Creates about $19 of extra room this month."],
      ["Suggested action", "Delay or pause the least-used subscription until after the next paycheque."]
    ]
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

function buildAccountDetailMarkup(detail) {
  if (detail.stocks) {
    const holdings = detail.stocks.map((stock) => `
      <div class="detail-line stock-line">
        <span>${stock.name}</span>
        <strong>${stock.value}</strong>
        <em class="stock-symbol">${stock.symbol}</em>
        <b class="stock-gain ${stock.down ? "down" : ""}">${stock.change}</b>
      </div>
    `).join("");

    const actions = detail.actions ? `
      <div class="stock-actions">
        <button type="button" data-stock-action="buy">Buy stock</button>
        <button type="button" class="secondary-action" data-stock-action="sell">Sell stock</button>
        <button type="button" class="advisor-action" data-stock-action="advisor">Book advisor for advice</button>
      </div>
    ` : "";

    return holdings + actions;
  }

  if (detail.transactions) {
    return detail.transactions.map((row) => `
      <div class="transaction-line">
        <div>
          <strong>${row.date}</strong>
          <span>${row.merchant}</span>
          <em>${row.category}</em>
        </div>
        <b>${row.value}</b>
      </div>
    `).join("");
  }

  return detail.rows.map((row) => `
    <div class="detail-line">
      <span>${row.label}</span>
      <strong>${row.value}</strong>
      <div class="detail-meter"><i style="width: ${row.width}"></i></div>
    </div>
  `).join("");
}

function openAccountModal(accountKey) {
  const detail = accountDetails[accountKey];
  const modal = document.getElementById("accountModal");

  if (!detail || !modal) return;

  document.getElementById("modalAccountEyebrow").textContent = detail.eyebrow;
  document.getElementById("modalAccountTitle").textContent = detail.title;
  document.getElementById("modalAccountSummary").textContent = detail.summary;
  document.getElementById("modalAccountList").innerHTML = buildAccountDetailMarkup(detail);
  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeAccountModal() {
  const modal = document.getElementById("accountModal");
  modal?.classList.add("is-hidden");
  modal?.setAttribute("aria-hidden", "true");
}

function openActionModal(actionKey) {
  const detail = actionDetails[actionKey];
  const modal = document.getElementById("actionModal");
  const list = document.getElementById("actionModalList");
  const lockButton = document.getElementById("lockDecisionButton");

  if (!detail || !modal || !list) return;

  pendingGoalAction = "";
  lockButton?.classList.add("is-hidden");
  if (lockButton) lockButton.dataset.goalAction = "";
  document.getElementById("actionModalTitle").textContent = detail.title;
  document.getElementById("actionModalSummary").textContent = detail.summary;
  list.innerHTML = detail.points.map(([label, value]) => `
    <div class="action-detail-item">
      <strong>${label}</strong>
      <span>${value}</span>
    </div>
  `).join("");
  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
}

function openGoalActionModal(actionKey) {
  const detail = goalDecisionDetails[actionKey];
  const modal = document.getElementById("actionModal");
  const list = document.getElementById("actionModalList");
  const lockButton = document.getElementById("lockDecisionButton");

  if (!detail || !modal || !list || !lockButton) return;

  pendingGoalAction = actionKey;
  lockButton.dataset.goalAction = actionKey;
  lockButton.textContent = `Apply / lock in decision`;
  lockButton.classList.remove("is-hidden");
  document.getElementById("actionModalTitle").textContent = detail.title;
  document.getElementById("actionModalSummary").textContent = detail.summary;
  list.innerHTML = detail.points.map(([label, value]) => `
    <div class="action-detail-item">
      <strong>${label}</strong>
      <span>${value}</span>
    </div>
  `).join("");
  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeActionModal() {
  const modal = document.getElementById("actionModal");
  const lockButton = document.getElementById("lockDecisionButton");

  pendingGoalAction = "";
  lockButton?.classList.add("is-hidden");
  if (lockButton) lockButton.dataset.goalAction = "";
  modal?.classList.add("is-hidden");
  modal?.setAttribute("aria-hidden", "true");
}

function applyGoalAction(actionKey) {
  const state = goalActionStates[actionKey];
  const activeButton = document.querySelector(`[data-goal-action="${actionKey}"]`);
  const percent = document.getElementById("goalPercent");
  const text = document.getElementById("goalText");
  const ring = document.querySelector(".goal-ring");

  if (!state) return;

  document.querySelectorAll("[data-goal-action]").forEach((item) => {
    item.classList.toggle("active", item === activeButton);
  });

  if (percent) percent.textContent = state.percent;
  if (text) text.textContent = state.text;
  if (ring) {
    ring.style.background = `radial-gradient(circle at center, white 0 55%, transparent 56%), conic-gradient(var(--cibc-red) 0 ${state.ring}, #eadde2 ${state.ring} 100%)`;
  }
  showToast(`${state.title} locked into the goal forecast.`);
}

document.querySelectorAll("[data-account]").forEach((row) => {
  row.addEventListener("click", () => {
    document.querySelectorAll("[data-account]").forEach((item) => item.classList.toggle("active", item === row));
    openAccountModal(row.dataset.account);
  });

  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      row.click();
    }
  });
});

document.querySelector(".account-table")?.addEventListener("click", (event) => {
  const row = event.target.closest("[data-account]");
  if (!row) return;

  document.querySelectorAll("[data-account]").forEach((item) => item.classList.toggle("active", item === row));
  openAccountModal(row.dataset.account);
});

document.getElementById("closeAccountModal")?.addEventListener("click", closeAccountModal);
document.getElementById("accountModal")?.addEventListener("click", (event) => {
  if (event.target.id === "accountModal") closeAccountModal();
});
document.getElementById("closeActionModal")?.addEventListener("click", closeActionModal);
document.getElementById("actionModal")?.addEventListener("click", (event) => {
  if (event.target.id === "actionModal") closeActionModal();
});

document.getElementById("modalAccountList")?.addEventListener("click", (event) => {
  const action = event.target.closest("[data-stock-action]")?.dataset.stockAction;
  if (!action) return;

  if (action === "buy") {
    showToast("Buy stock flow started. In a real app, CIBC would show suitability and order review next.");
    return;
  }

  if (action === "sell") {
    showToast("Sell stock flow started. In a real app, CIBC would confirm holdings and tax impact next.");
    return;
  }

  goToMessagesWithDraft("Hi Isabel, can we book a call to review whether I should buy or sell anything in my TFSA?");
  showToast("Advisor message draft created from TFSA holdings.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAccountModal();
    closeActionModal();
  }
});

document.querySelectorAll("[data-action-detail]").forEach((row) => {
  row.addEventListener("click", () => openActionModal(row.dataset.actionDetail));
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openActionModal(row.dataset.actionDetail);
    }
  });
});

document.querySelectorAll("[data-goal-action]").forEach((button) => {
  button.addEventListener("click", () => openGoalActionModal(button.dataset.goalAction));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGoalActionModal(button.dataset.goalAction);
    }
  });
});

document.getElementById("lockDecisionButton")?.addEventListener("click", (event) => {
  const actionKey = event.currentTarget.dataset.goalAction || pendingGoalAction;
  applyGoalAction(actionKey);
  closeActionModal();
});

document.querySelectorAll("[data-client-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.clientAction;

    if (action === "alert") {
      showToast("Spending alert set: FutureView will warn Rita if flexible spending goes above $62/day.");
      return;
    }

    if (action === "advisor") {
      goToMessagesWithDraft("Hi Isabel, can you review my spending forecast and tell me what I should adjust first?");
      showToast("Advisor message draft created.");
      return;
    }

    showToast("Monthly plan saved to Rita's FutureView dashboard.");
  });
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
