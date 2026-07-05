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
let currentClientGoalKey = "montreal";

const clientGoals = {
  montreal: {
    title: "Montreal trip fund",
    percent: "72%",
    ring: "72%",
    text: "You are on track to reach $2,000 by August 30 if you save $112 per week."
  },
  emergency: {
    title: "Emergency fund",
    percent: "54%",
    ring: "54%",
    text: "You are 54% of the way to a $3,000 emergency fund. FutureView recommends saving $95 per week."
  },
  laptop: {
    title: "New laptop fund",
    percent: "38%",
    ring: "38%",
    text: "You are saving toward a $1,400 laptop by September 20. FutureView recommends setting aside $120 every payday."
  }
};

const roleContent = {
  client: {
    eyebrow: "Client login",
    title: "Welcome back, Rita Wen.",
    description: "Access your personalized spending forecast, savings goals, and account guidance.",
    idLabel: "Card number or username",
    loginId: "rita.wen",
    note: "Prototype mode: use the prefilled demo details to enter the client dashboard.",
    greeting: "Good evening, Rita Wen.",
    subtext: "FutureView is watching your cash flow, savings goals, card spending, and market-sensitive risks.",
    pillLabel: "July forecast",
    pillValue: "On track"
  },
  advisor: {
    eyebrow: "Advisor login",
    title: "Welcome back, Isabel Pogue.",
    description: "Review client forecast signals, goal progress, and recommended outreach opportunities.",
    idLabel: "Advisor ID",
    loginId: "isabel.advisor",
    note: "Prototype mode: use the prefilled demo details to enter the advisor workspace.",
    greeting: "Advisor workspace for Isabel Pogue.",
    subtext: "FutureView highlights clients who may benefit from proactive planning support.",
    pillLabel: "Advisor queue",
    pillValue: "3 clients"
  }
};

const overviewContent = {
  client: {
    icon: "↗",
    eyebrow: "This month",
    title: "You can safely spend $1,240 more.",
    copy: "Based on your expected income, essential bills, credit card balance, and savings target, FutureView recommends keeping everyday spending below $62 per day for the rest of July.",
    meter: "64%",
    stats: [
      ["Income expected", "$4,850"],
      ["Bills forecast", "$2,940"],
      ["Goal deposit", "$450"]
    ],
    actions: ["Set spending alert", "Ask advisor", "Save monthly plan"],
    insightEyebrow: "Forecast insight",
    insightTitle: "Rate-sensitive spending may feel tighter next month.",
    insightCopy: "External forecast signals suggest borrowing costs may remain elevated. FutureView does not show prediction-market trading, but it uses those signals to prepare your budget for higher card interest and mortgage renewal pressure.",
    insightButton: "View preparation plan"
  },
  advisor: {
    icon: "!",
    eyebrow: "Rita Wen review",
    title: "Rita can safely spend $1,240 more.",
    copy: "Based on Rita's expected income, essential bills, card balance, and Montreal savings goal, FutureView recommends Isabel set a $62 daily guardrail for everyday spending through the rest of July.",
    meter: "64%",
    stats: [
      ["Client income expected", "$4,850"],
      ["Required bills forecast", "$2,940"],
      ["Goal transfer target", "$450"]
    ],
    actions: ["Set client limit", "Send Rita guidance", "Save advisor plan"],
    insightEyebrow: "Advisor signal",
    insightTitle: "Rita is on track, but her flexible spending buffer is narrowing.",
    insightCopy: "Dining, Uber, and entertainment are trending above her usual student pattern. The logical advisor action is to set a temporary spending guardrail, message Rita with the reason, and revisit the plan after her next paycheque.",
    insightButton: "Review advisor plan"
  }
};

const advisorOverviewProfiles = {
  "Rita Wen": {
    icon: "!",
    eyebrow: "Rita Wen review",
    title: "Rita can safely spend $1,240 more.",
    copy: "Based on Rita's expected income, essential bills, card balance, and Montreal savings goal, FutureView recommends Isabel set a $62 daily guardrail for everyday spending through the rest of July.",
    meter: "64%",
    stats: [
      ["Client income expected", "$4,850"],
      ["Required bills forecast", "$2,940"],
      ["Goal transfer target", "$450"]
    ],
    actions: ["Set client limit", "Send Rita guidance", "Save advisor plan"],
    insightEyebrow: "Advisor signal",
    insightTitle: "Rita is on track, but her flexible spending buffer is narrowing.",
    insightCopy: "Dining, Uber, and entertainment are trending above her usual student pattern. The logical advisor action is to set a temporary spending guardrail, message Rita with the reason, and revisit the plan after her next paycheque.",
    insightButton: "Review advisor plan"
  },
  "Aidan Huynh": {
    icon: "!",
    eyebrow: "Aidan Huynh review",
    title: "Aidan needs a spending intervention.",
    copy: "FutureView flags Aidan as the highest-risk client because flexible spending is 31% above normal and his card balance could pressure next month's cash flow. Isabel should set a short-term limit and book a budget call.",
    meter: "86%",
    stats: [
      ["Monthly spend forecast", "$3,910"],
      ["Card balance", "$2,380"],
      ["Risk level", "86/100"]
    ],
    actions: ["Set $45 limit", "Message Aidan", "Book budget call"],
    insightEyebrow: "Advisor signal",
    insightTitle: "Aidan's non-essential spending is moving faster than income.",
    insightCopy: "The strongest signal is credit card pressure. FutureView recommends separating essentials from flexible spending, lowering the daily cap, and asking Aidan to review upcoming payments with Isabel.",
    insightButton: "Review Aidan plan"
  },
  "Tiana Lee": {
    icon: "✓",
    eyebrow: "Tiana Lee review",
    title: "Tiana is stable and on track.",
    copy: "FutureView shows Tiana's savings deposits are consistent, card pressure is low, and her emergency fund is close to the next milestone. Isabel can send a positive check-in instead of urgent intervention.",
    meter: "86%",
    stats: [
      ["Monthly spend forecast", "$2,860"],
      ["Emergency fund", "86%"],
      ["Card balance", "$420"]
    ],
    actions: ["Send check-in", "Save progress note", "Review later"],
    insightEyebrow: "Advisor signal",
    insightTitle: "Tiana's account activity is healthy and predictable.",
    insightCopy: "The best advisor action is reinforcement. FutureView recommends keeping automatic deposits active and delaying investment changes until the emergency fund milestone is reached.",
    insightButton: "Review Tiana plan"
  }
};

const defaultClientGoalActions = `
  <div class="action-row" data-action-detail="recreation" role="button" tabindex="0">
    <span class="rank">1</span>
    <div>
      <strong>Lower recreation spending by $80 this month.</strong>
      <p>This keeps your trip goal on schedule without affecting rent, groceries, or transit.</p>
    </div>
    <span class="impact">High</span>
  </div>
  <div class="action-row" data-action-detail="payday" role="button" tabindex="0">
    <span class="rank">2</span>
    <div>
      <strong>Move payday savings automatically.</strong>
      <p>FutureView recommends transferring $225 every second Friday.</p>
    </div>
    <span class="impact">High</span>
  </div>
  <div class="action-row" data-action-detail="subscription" role="button" tabindex="0">
    <span class="rank">3</span>
    <div>
      <strong>Delay one subscription renewal.</strong>
      <p>This creates an extra $19 buffer for unexpected spending.</p>
    </div>
    <span class="impact">Low</span>
  </div>
`;

const defaultClientGoalSuggestions = `
  <button type="button" class="goal-suggestion active" data-goal-action="100">
    <strong>Save $100 this week</strong>
    <span>Moves your goal to 76% complete.</span>
  </button>
  <button type="button" class="goal-suggestion" data-goal-action="dining">
    <strong>Skip one dining expense</strong>
    <span>Add $45 from restaurants to the trip fund.</span>
  </button>
  <button type="button" class="goal-suggestion" data-goal-action="payday">
    <strong>Auto-save on payday</strong>
    <span>Transfer $225 every second Friday.</span>
  </button>
  <button type="button" class="goal-suggestion" data-goal-action="weekend">
    <strong>Set a weekend cap</strong>
    <span>Keep recreation spending under $140.</span>
  </button>
`;

const advisorGoalProfiles = {
  "Rita Wen": {
    title: "Rita Wen: Montreal trip fund",
    percent: "72%",
    ring: "72%",
    text: "Rita is on track for her $2,000 Montreal trip goal, but dining and weekend spending are reducing her cushion.",
    draft: "Hi Rita, FutureView shows you are still on track for your Montreal trip. I recommend keeping everyday spending below $62 per day and moving $100 into savings this week.",
    noteCategories: [
      ["Risk signal", "Low goal pressure. Dining and weekend spending are the main items to monitor."],
      ["Follow-up", "Check back next Friday after Rita's next dining and Uber transactions post."],
      ["Goal note", "Montreal trip fund remains on schedule if the $62 daily guardrail is followed."],
      ["Message idea", "Reassure Rita that the goal is still on track, then suggest one small spending cap."]
    ],
    suggestions: [
      ["Set a $62 daily spending limit", "Protects the trip goal without changing rent, groceries, or transit.", "High"],
      ["Move $100 this week", "Raises the goal from 72% to 76% complete.", "High"],
      ["Check dining spend next Friday", "Lets Isabel follow up if restaurant spend keeps rising.", "Medium"]
    ]
  },
  "Aidan Huynh": {
    title: "Aidan Huynh: credit card pressure",
    percent: "48%",
    ring: "48%",
    text: "Aidan has the highest risk signal. Non-essential spending is 31% above normal and his card balance could affect next month's cash flow.",
    draft: "Hi Aidan, FutureView is showing pressure from credit card and non-essential spending. I recommend setting a $45 daily flexible spending limit and making a $250 card payment before the next statement closes.",
    noteCategories: [
      ["Risk signal", "High card pressure. Non-essential spending is 31% above normal and needs advisor follow-up."],
      ["Follow-up", "Book a 15-minute call before the next credit card statement closes."],
      ["Budget note", "Separate essentials from flexible spending and set a temporary $45 daily cap."],
      ["Message idea", "Keep the message direct: lower card pressure now to protect next month's cash flow."]
    ],
    suggestions: [
      ["Set a $45 daily flexible limit", "Reduces overspending risk before the next credit card cycle closes.", "High"],
      ["Recommend a $250 card payment", "Lowers interest pressure and protects next month's cash flow.", "High"],
      ["Book a 15-minute budget call", "Aidan may need help separating essentials from flexible spending.", "Medium"]
    ]
  },
  "Tiana Lee": {
    title: "Tiana Lee: emergency fund",
    percent: "86%",
    ring: "86%",
    text: "Tiana is on track. Her deposits are consistent and essential spending is stable, so Isabel can recommend maintaining the current plan.",
    draft: "Hi Tiana, FutureView shows your savings goal is on track. I recommend keeping your automatic deposits active and reviewing investment options only after your emergency fund reaches the next milestone.",
    noteCategories: [
      ["Risk signal", "Low risk. Savings deposits are consistent and account activity is stable."],
      ["Follow-up", "Send a progress check-in this month, then revisit investments after the next milestone."],
      ["Savings note", "Emergency fund is 86% complete and should stay prioritized before extra investing."],
      ["Message idea", "Use a positive tone and reinforce the current automatic savings habit."]
    ],
    suggestions: [
      ["Keep automatic savings active", "Maintains Tiana's strongest habit and keeps her goal ahead of schedule.", "High"],
      ["Review investment options later", "Avoids moving money away from the emergency fund too early.", "Medium"],
      ["Send positive progress note", "Reinforces that Tiana is on track and does not need a major change.", "Low"]
    ]
  }
};

const marketQuestions = {
  rates: {
    label: "Bank of Canada interest rates",
    question: "Do you think the Bank of Canada will raise interest rates at its next press conference?",
    summary: "Client response split: 42% expect rates up, 40% expect rates to hold, and 18% are unsure.",
    options: ["Yes, rates go up", "No, rates hold", "I don't know"],
    results: [
      ["Rates up", 42],
      ["Rates hold", 40],
      ["I don't know", 18]
    ],
    trend: [35, 38, 44, 42],
    picks: ["Rita: rates up", "Aidan: rates hold", "Tiana: I don't know"],
    advisorAnswers: ["Rates increase", "Rates hold", "I don't know"]
  },
  groceries: {
    label: "Grocery prices next month",
    question: "Do you think grocery prices will feel higher next month?",
    summary: "Most clients expect food costs to keep rising, which could affect student budgets.",
    options: ["Yes, higher", "No, stable", "I don't know"],
    results: [
      ["Higher groceries", 66],
      ["Stable prices", 24],
      ["I don't know", 10]
    ],
    trend: [54, 57, 61, 66],
    picks: ["Rita: higher", "Aidan: higher", "Tiana: stable"],
    advisorAnswers: ["Higher", "Stable", "I don't know"]
  },
  housing: {
    label: "Rent and housing costs",
    question: "Do you think rent and housing costs will rise in the next 90 days?",
    summary: "Housing expectations are high, so FutureView can test whether rent buffers need to increase.",
    options: ["Likely higher", "Likely stable", "I don't know"],
    results: [
      ["Higher housing costs", 71],
      ["Stable costs", 17],
      ["I don't know", 12]
    ],
    trend: [62, 65, 69, 71],
    picks: ["Rita: higher", "Aidan: I don't know", "Tiana: higher"],
    advisorAnswers: ["Higher", "Stable", "I don't know"]
  },
  transport: {
    label: "Student transportation costs",
    question: "Do you expect student transportation costs to rise next month?",
    summary: "Transportation answers help Isabel understand whether Uber, transit, and commuting costs may pressure budgets.",
    options: ["Yes, higher", "No, stable", "I don't know"],
    results: [
      ["Higher transportation", 49],
      ["Stable transportation", 33],
      ["I don't know", 18]
    ],
    trend: [41, 43, 46, 49],
    picks: ["Rita: stable", "Aidan: higher", "Tiana: I don't know"],
    advisorAnswers: ["Higher", "Stable", "I don't know"]
  },
  jobs: {
    label: "Student job market",
    question: "Do you think it will be harder for students to find part-time work this month?",
    summary: "Job-market expectations help FutureView decide whether income forecasts should become more conservative.",
    options: ["Yes, harder", "No, about the same", "I don't know"],
    results: [
      ["Harder to find work", 52],
      ["About the same", 29],
      ["I don't know", 19]
    ],
    trend: [44, 47, 50, 52],
    picks: ["Rita: about the same", "Aidan: harder", "Tiana: I don't know"],
    advisorAnswers: ["Harder", "About the same", "I don't know"]
  },
  gas: {
    label: "Gas prices",
    question: "Do you think gas prices will rise over the next 30 days?",
    summary: "Gas expectations can affect transportation budgets, Uber prices, and commuting costs.",
    options: ["Yes, higher", "No, stable", "I don't know"],
    results: [
      ["Higher gas prices", 61],
      ["Stable gas prices", 26],
      ["I don't know", 13]
    ],
    trend: [48, 55, 58, 61],
    picks: ["Rita: higher", "Aidan: higher", "Tiana: stable"],
    advisorAnswers: ["Higher", "Stable", "I don't know"]
  },
  tuition: {
    label: "Tuition and school fees",
    question: "Do you think tuition or school fees will increase next term?",
    summary: "School-cost expectations help clients plan savings buffers before large education payments arrive.",
    options: ["Likely increase", "Likely stable", "I don't know"],
    results: [
      ["Fees increase", 46],
      ["Fees stable", 31],
      ["I don't know", 23]
    ],
    trend: [39, 40, 44, 46],
    picks: ["Rita: I don't know", "Aidan: increase", "Tiana: stable"],
    advisorAnswers: ["Increase", "Stable", "I don't know"]
  },
  cad: {
    label: "Canadian dollar",
    question: "Do you think the Canadian dollar will weaken against the U.S. dollar this month?",
    summary: "Currency expectations can affect travel, online shopping, and imported goods in client budgets.",
    options: ["Yes, weaker", "No, stable", "I don't know"],
    results: [
      ["Weaker dollar", 38],
      ["Stable dollar", 35],
      ["I don't know", 27]
    ],
    trend: [31, 34, 36, 38],
    picks: ["Rita: stable", "Aidan: weaker", "Tiana: I don't know"],
    advisorAnswers: ["Weaker", "Stable", "I don't know"]
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

function renderOverviewContent(content) {
  const statIds = [
    ["statOneLabel", "statOneValue"],
    ["statTwoLabel", "statTwoValue"],
    ["statThreeLabel", "statThreeValue"]
  ];
  const actionIds = ["quickActionOne", "quickActionTwo", "quickActionThree"];

  if (!content) return;

  document.getElementById("overviewIcon").textContent = content.icon;
  document.getElementById("overviewEyebrow").textContent = content.eyebrow;
  document.getElementById("overviewTitle").textContent = content.title;
  document.getElementById("overviewCopy").textContent = content.copy;
  document.getElementById("overviewMeter").style.width = content.meter;
  document.getElementById("insightEyebrow").textContent = content.insightEyebrow;
  document.getElementById("insightTitle").textContent = content.insightTitle;
  document.getElementById("insightCopy").textContent = content.insightCopy;
  document.getElementById("insightButton").textContent = content.insightButton;

  statIds.forEach(([labelId, valueId], index) => {
    document.getElementById(labelId).textContent = content.stats[index][0];
    document.getElementById(valueId).textContent = content.stats[index][1];
  });

  actionIds.forEach((id, index) => {
    document.getElementById(id).textContent = content.actions[index];
  });
}

function renderAdvisorOverviewProfile(clientName) {
  const content = advisorOverviewProfiles[clientName] || advisorOverviewProfiles["Rita Wen"];

  renderOverviewContent(content);
  document.querySelectorAll("[data-overview-client]").forEach((button) => {
    button.classList.toggle("active", button.dataset.overviewClient === clientName);
  });
}

function updateOverviewForRole(role) {
  document.getElementById("advisorOverviewTabs")?.classList.toggle("is-hidden", role !== "advisor");

  if (role === "advisor") {
    renderAdvisorOverviewProfile("Rita Wen");
    return;
  }

  renderOverviewContent(overviewContent.client);
}

function setGoalRing(percentValue) {
  const ring = document.querySelector(".goal-ring");
  if (!ring) return;

  ring.style.background = `radial-gradient(circle at center, white 0 55%, transparent 56%), conic-gradient(var(--cibc-red) 0 ${percentValue}, #eadde2 ${percentValue} 100%)`;
}

function populateClientGoalSelect() {
  const select = document.getElementById("clientGoalSelect");
  if (!select) return;

  select.innerHTML = Object.entries(clientGoals).map(([key, goal]) => `
    <option value="${key}">${goal.title}</option>
  `).join("");
  select.value = currentClientGoalKey;
}

function renderClientGoal(goalKey = currentClientGoalKey) {
  const goal = clientGoals[goalKey] || clientGoals.montreal;

  currentClientGoalKey = goalKey;
  document.getElementById("goalTitle").textContent = goal.title;
  document.getElementById("goalPercent").textContent = goal.percent;
  document.getElementById("goalText").textContent = goal.text;
  setGoalRing(goal.ring);
  populateClientGoalSelect();
}

function renderAdvisorSuggestions(profile) {
  return profile.suggestions.map(([title, description, impact], index) => `
    <button type="button" class="goal-suggestion advisor-goal-suggestion" data-advisor-suggestion="${index}">
      <strong>${title}</strong>
      <span>${description}</span>
      <em>${impact}</em>
    </button>
  `).join("");
}

function renderAdvisorActionRows(profile) {
  return profile.suggestions.map(([title, description, impact], index) => `
    <div class="action-row advisor-action-row" data-advisor-suggestion="${index}" role="button" tabindex="0">
      <span class="rank">${index + 1}</span>
      <div>
        <strong>${title}</strong>
        <p>${description}</p>
      </div>
      <span class="impact ${impact === "Medium" ? "medium" : impact === "Low" ? "low" : ""}">${impact}</span>
    </div>
  `).join("");
}

function renderAdvisorNoteCategories(profile) {
  return profile.noteCategories.map(([label, text], index) => `
    <button type="button" data-note-category="${index}">
      <strong>${label}</strong>
      <span>${text}</span>
    </button>
  `).join("");
}

function updateAdvisorDraft(clientName, suggestionIndex = 0) {
  const profile = advisorGoalProfiles[clientName];
  const textarea = document.getElementById("advisorSuggestionText");
  if (!profile || !textarea) return;

  const [title, description] = profile.suggestions[suggestionIndex] || profile.suggestions[0];
  textarea.value = `${profile.draft}\n\nSuggested action: ${title}. ${description}`;

  document.querySelectorAll("[data-advisor-suggestion]").forEach((item) => {
    item.classList.toggle("active", item.dataset.advisorSuggestion === String(suggestionIndex));
  });
}

function renderAdvisorGoalProfile(clientName) {
  const profile = advisorGoalProfiles[clientName] || advisorGoalProfiles["Rita Wen"];
  const suggestions = document.querySelector(".goal-suggestions");
  const actionList = document.querySelector(".action-list");
  const noteCategories = document.getElementById("advisorNoteCategories");

  document.getElementById("goalTitle").textContent = profile.title;
  document.getElementById("goalPercent").textContent = profile.percent;
  document.getElementById("goalText").textContent = profile.text;
  setGoalRing(profile.ring);

  if (suggestions) suggestions.innerHTML = renderAdvisorSuggestions(profile);
  if (actionList) actionList.innerHTML = renderAdvisorActionRows(profile);
  if (noteCategories) noteCategories.innerHTML = renderAdvisorNoteCategories(profile);

  document.querySelectorAll("[data-goal-client]").forEach((button) => {
    button.classList.toggle("active", button.dataset.goalClient === clientName);
  });

  updateAdvisorDraft(clientName);
}

function updateGoalsForRole(role) {
  const suggestions = document.querySelector(".goal-suggestions");
  const actionList = document.querySelector(".action-list");
  const advisorTabs = document.getElementById("advisorGoalTabs");
  const advisorBox = document.getElementById("advisorSuggestionBox");

  advisorTabs?.classList.toggle("is-hidden", role !== "advisor");
  advisorBox?.classList.toggle("is-hidden", role !== "advisor");

  if (role === "advisor") {
    document.getElementById("goalEyebrow").textContent = "Client goal review";
    document.getElementById("goalPlanEyebrow").textContent = "Advisor recommendations";
    document.getElementById("goalPlanTitle").textContent = "FutureView ranks the best next action for each client.";
    renderAdvisorGoalProfile("Rita Wen");
    return;
  }

  document.getElementById("goalEyebrow").textContent = "Savings goal";
  document.getElementById("goalPlanEyebrow").textContent = "Goal plan";
  document.getElementById("goalPlanTitle").textContent = "Your next best actions are ranked by impact.";
  renderClientGoal(currentClientGoalKey);
  if (suggestions) suggestions.innerHTML = defaultClientGoalSuggestions;
  if (actionList) actionList.innerHTML = defaultClientGoalActions;
}

function renderMarketBars(question) {
  return question.results.map(([label, value]) => `
    <span><b style="width: ${value}%"></b><em>${value}% ${label}</em></span>
  `).join("");
}

function renderMarketTrend(question) {
  const firstSeries = question.trend;
  const secondLatest = question.results[1][1];
  const unsureLatest = question.results[2][1];
  const smoothSeries = (values, phase = 0) => {
    const expanded = [];
    const totalPoints = 28;
    for (let index = 0; index < totalPoints; index += 1) {
      const position = (index / (totalPoints - 1)) * (values.length - 1);
      const leftIndex = Math.floor(position);
      const rightIndex = Math.min(values.length - 1, leftIndex + 1);
      const ratio = position - leftIndex;
      const base = values[leftIndex] + (values[rightIndex] - values[leftIndex]) * ratio;
      const wiggle = Math.sin(index * 1.3 + phase) * 1.9 + Math.cos(index * 0.54 + phase) * 1.1;
      expanded.push(Math.max(2, Math.min(98, Math.round(base + wiggle))));
    }
    return expanded;
  };
  const series = [
    {
      label: question.results[0][0],
      color: "#ff7a1a",
      values: smoothSeries(firstSeries, 0)
    },
    {
      label: question.results[1][0],
      color: "#2f6df6",
      values: smoothSeries(firstSeries.map((value, index) => {
        const drift = secondLatest - firstSeries[firstSeries.length - 1];
        return Math.max(4, Math.min(92, value + drift + (index - 1.5) * 2));
      }), 2)
    },
    {
      label: question.results[2][0],
      color: "#9aa6b2",
      values: smoothSeries(firstSeries.map((value, index) => {
        const drift = unsureLatest - firstSeries[firstSeries.length - 1];
        return Math.max(4, Math.min(92, value + drift - index));
      }), 4)
    }
  ];
  const xForIndex = (index, values) => 12 + (index * 386) / (values.length - 1);
  const yForValue = (value) => 104 - value * 0.88;
  const areaForSeries = (values) => {
    const topLine = values.map((value, index) => `${xForIndex(index, values)},${yForValue(value)}`).join(" ");
    return `12,106 ${topLine} 398,106`;
  };
  const latest = firstSeries[firstSeries.length - 1];
  const first = firstSeries[0];
  const change = latest - first;

  return `
    <div class="market-trend-card">
      <div class="market-trend-head">
        <div>
          <strong>Response trend</strong>
          <span>Client expectations by answer choice</span>
        </div>
        <b>${change >= 0 ? "+" : ""}${change} pts</b>
      </div>
      <div class="market-trend-legend">
        ${series.map((item) => `<span><i style="background:${item.color}"></i>${item.label} ${item.values[item.values.length - 1]}%</span>`).join("")}
      </div>
      <div class="market-line-shell">
        <svg viewBox="0 0 430 136" role="img" aria-label="Response trend chart">
          <defs>
            <linearGradient id="marketTrendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#c8102e" stop-opacity="0.14"></stop>
              <stop offset="100%" stop-color="#c8102e" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="392" height="98" rx="5" class="trend-plot"></rect>
          <line x1="12" y1="18" x2="398" y2="18" class="trend-grid"></line>
          <line x1="12" y1="61" x2="398" y2="61" class="trend-grid"></line>
          <line x1="12" y1="104" x2="398" y2="104" class="trend-grid"></line>
          <line x1="86" y1="8" x2="86" y2="106" class="trend-grid trend-vertical"></line>
          <line x1="168" y1="8" x2="168" y2="106" class="trend-grid trend-vertical"></line>
          <line x1="250" y1="8" x2="250" y2="106" class="trend-grid trend-vertical"></line>
          <line x1="332" y1="8" x2="332" y2="106" class="trend-grid trend-vertical"></line>
          <polygon points="${areaForSeries(series[0].values)}" fill="url(#marketTrendFill)"></polygon>
          ${series.map((item) => {
            const points = item.values.map((value, index) => `${xForIndex(index, item.values)},${yForValue(value)}`).join(" ");
            const lastX = xForIndex(item.values.length - 1, item.values);
            const lastY = yForValue(item.values[item.values.length - 1]);
            return `
              <polyline points="${points}" fill="none" stroke="${item.color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"></polyline>
              <circle cx="${lastX}" cy="${lastY}" r="3.2" fill="#fff" stroke="${item.color}" stroke-width="2.2"></circle>
            `;
          }).join("")}
          <circle cx="72" cy="112" r="1.5" class="trend-event-dot"></circle>
          <circle cx="126" cy="112" r="1.5" class="trend-event-dot"></circle>
          <circle cx="205" cy="112" r="1.5" class="trend-event-dot"></circle>
          <circle cx="286" cy="112" r="1.5" class="trend-event-dot"></circle>
          <circle cx="352" cy="112" r="1.5" class="trend-event-dot"></circle>
          <text x="406" y="20" class="trend-axis">100%</text>
          <text x="406" y="63" class="trend-axis">50%</text>
          <text x="406" y="106" class="trend-axis">0%</text>
          <text x="12" y="128" class="trend-month">May</text>
          <text x="96" y="128" class="trend-month">Jun</text>
          <text x="180" y="128" class="trend-month">Jul</text>
          <text x="264" y="128" class="trend-month">Aug</text>
          <text x="356" y="128" class="trend-month">Now</text>
        </svg>
      </div>
      <div class="market-trend-labels">
        <span>Historical client responses</span>
        <strong>${latest}% leading answer</strong>
      </div>
    </div>
  `;
}

function renderMarketQuestionList(activeKey) {
  const list = document.getElementById("clientMarketQuestionList");
  if (!list) return;

  list.innerHTML = Object.entries(marketQuestions).map(([key, question]) => `
    <button type="button" class="${key === activeKey ? "active" : ""}" data-market-question="${key}">
      <strong>${question.label}</strong>
      <span>${question.summary}</span>
    </button>
  `).join("");
}

function refreshMarketQuestionSelects(activeKey) {
  ["clientMarketQuestionSelect", "advisorMarketQuestionSelect"].forEach((selectId) => {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = Object.entries(marketQuestions).map(([key, question]) => `
      <option value="${key}">${question.label}</option>
    `).join("");

    if (activeKey && marketQuestions[activeKey]) {
      select.value = activeKey;
    }
  });
}

function renderClientMarketQuestion(questionKey = "rates") {
  const question = marketQuestions[questionKey] || marketQuestions.rates;
  const card = document.getElementById("clientMarketQuestionCard");
  const select = document.getElementById("clientMarketQuestionSelect");

  if (!card) return;
  if (select) select.value = questionKey;

  card.innerHTML = `
    <strong>${question.question}</strong>
    <div class="market-options">
      ${question.options.map((option, index) => `
        <button type="button" data-market-vote="${questionKey}-${index}">${option}</button>
      `).join("")}
    </div>
    <div class="market-result">${renderMarketBars(question)}</div>
    ${renderMarketTrend(question)}
  `;
  renderMarketQuestionList(questionKey);
}

function renderAdvisorMarketQuestion(questionKey = "rates") {
  const question = marketQuestions[questionKey] || marketQuestions.rates;
  const select = document.getElementById("advisorMarketQuestionSelect");
  const answerSelect = document.getElementById("advisorRateAnswer");

  if (select) select.value = questionKey;
  document.getElementById("advisorMarketTitle").textContent = question.label;
  document.getElementById("advisorMarketSummary").textContent = question.summary;
  document.getElementById("advisorMarketBars").innerHTML = renderMarketBars(question);
  document.getElementById("advisorMarketPicks").innerHTML = question.picks.map((pick) => `<span>${pick}</span>`).join("");

  if (answerSelect) {
    answerSelect.innerHTML = question.advisorAnswers.map((answer) => `<option>${answer}</option>`).join("");
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
  document.getElementById("profilePillLabel").textContent = content.pillLabel;
  document.getElementById("profilePillValue").textContent = content.pillValue;
  document.getElementById("advisorModeBanner")?.classList.toggle("is-hidden", selectedRole !== "advisor");
  document.querySelectorAll(".advisor-only").forEach((element) => {
    element.classList.toggle("is-hidden", selectedRole !== "advisor");
  });
  document.querySelectorAll(".client-only").forEach((element) => {
    element.classList.toggle("is-hidden", selectedRole === "advisor");
  });
  document.getElementById("conversationTitle").textContent = selectedRole === "advisor"
    ? "Isabel Pogue and Rita Wen"
    : "Rita Wen and Isabel Pogue";
  document.getElementById("messageInput").placeholder = selectedRole === "advisor"
    ? "Write a message to Rita Wen..."
    : "Write a message to your advisor...";
  updateOverviewForRole(selectedRole);
  updateGoalsForRole(selectedRole);
  document.querySelector(".advisor-thread-list")?.classList.toggle("is-hidden", selectedRole !== "advisor");
  document.querySelector(".client-action-list")?.classList.toggle("is-hidden", selectedRole === "advisor");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("signOut")?.addEventListener("click", () => {
  document.getElementById("appShell")?.classList.add("is-hidden");
  document.getElementById("loginScreen")?.classList.remove("is-hidden");
  document.querySelectorAll(".advisor-only").forEach((element) => element.classList.add("is-hidden"));
  document.querySelectorAll(".client-only").forEach((element) => element.classList.remove("is-hidden"));
  document.body.classList.add("login-active");
  document.getElementById("profilePillLabel").textContent = roleContent.client.pillLabel;
  document.getElementById("profilePillValue").textContent = roleContent.client.pillValue;
  updateOverviewForRole("client");
  updateGoalsForRole("client");
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

document.querySelector(".action-list")?.addEventListener("click", (event) => {
  const advisorRow = event.target.closest("[data-advisor-suggestion]");
  if (advisorRow && selectedRole === "advisor") {
    const clientName = document.querySelector("[data-goal-client].active")?.dataset.goalClient || "Rita Wen";
    updateAdvisorDraft(clientName, Number(advisorRow.dataset.advisorSuggestion));
    showToast("Advisor suggestion loaded into Isabel's note box.");
    return;
  }

  const row = event.target.closest("[data-action-detail]");
  if (row) openActionModal(row.dataset.actionDetail);
});

document.querySelector(".action-list")?.addEventListener("keydown", (event) => {
  const advisorRow = event.target.closest("[data-advisor-suggestion]");
  if (advisorRow && selectedRole === "advisor") {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      advisorRow.click();
    }
    return;
  }

  const row = event.target.closest("[data-action-detail]");
  if (row && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openActionModal(row.dataset.actionDetail);
  }
});

document.querySelector(".goal-suggestions")?.addEventListener("click", (event) => {
  const advisorButton = event.target.closest("[data-advisor-suggestion]");
  if (advisorButton && selectedRole === "advisor") {
    const clientName = document.querySelector("[data-goal-client].active")?.dataset.goalClient || "Rita Wen";
    updateAdvisorDraft(clientName, Number(advisorButton.dataset.advisorSuggestion));
    showToast("Suggestion added to Isabel's draft.");
    return;
  }

  const button = event.target.closest("[data-goal-action]");
  if (button) openGoalActionModal(button.dataset.goalAction);
});

document.querySelector(".goal-suggestions")?.addEventListener("keydown", (event) => {
  const target = event.target.closest("[data-advisor-suggestion], [data-goal-action]");
  if (target && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    target.click();
  }
});

document.querySelectorAll("[data-goal-client]").forEach((button) => {
  button.addEventListener("click", () => renderAdvisorGoalProfile(button.dataset.goalClient));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      renderAdvisorGoalProfile(button.dataset.goalClient);
    }
  });
});

document.getElementById("clientGoalSelect")?.addEventListener("change", (event) => {
  renderClientGoal(event.target.value);
  showToast("Savings goal view updated.");
});

document.getElementById("showGoalForm")?.addEventListener("click", () => {
  document.getElementById("addGoalForm")?.classList.toggle("is-hidden");
});

document.getElementById("addGoalForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("newGoalName")?.value.trim() || "New savings goal";
  const target = Number(document.getElementById("newGoalTarget")?.value || 1000);
  const date = document.getElementById("newGoalDate")?.value.trim() || "target date";
  const key = `goal-${Date.now()}`;

  clientGoals[key] = {
    title: name,
    percent: "0%",
    ring: "0%",
    text: `New goal added. You are saving toward $${target.toLocaleString()} by ${date}. FutureView will start recommending weekly savings once spending history updates.`
  };
  renderClientGoal(key);
  event.currentTarget.classList.add("is-hidden");
  showToast(`${name} added to saved goals.`);
});

document.querySelectorAll("[data-overview-client]").forEach((button) => {
  button.addEventListener("click", () => renderAdvisorOverviewProfile(button.dataset.overviewClient));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      renderAdvisorOverviewProfile(button.dataset.overviewClient);
    }
  });
});

document.getElementById("lockDecisionButton")?.addEventListener("click", (event) => {
  const actionKey = event.currentTarget.dataset.goalAction || pendingGoalAction;
  applyGoalAction(actionKey);
  closeActionModal();
});

document.getElementById("sendAdvisorSuggestion")?.addEventListener("click", () => {
  const clientName = document.querySelector("[data-goal-client].active")?.dataset.goalClient || "Rita Wen";
  const draft = document.getElementById("advisorSuggestionText")?.value.trim();

  if (!draft) return;
  goToMessagesWithDraft(draft);
  document.getElementById("conversationTitle").textContent = `Isabel Pogue and ${clientName}`;
  document.getElementById("messageInput").placeholder = `Write a message to ${clientName}...`;
  document.querySelectorAll(".thread-card").forEach((card) => {
    card.classList.toggle("active", card.textContent.includes(clientName));
  });
  showToast(`Suggestion draft ready to send to ${clientName}.`);
});

document.getElementById("saveAdvisorNote")?.addEventListener("click", () => {
  const clientName = document.querySelector("[data-goal-client].active")?.dataset.goalClient || "Rita Wen";
  showToast(`Advisor note saved for ${clientName}.`);
});

document.getElementById("advisorNoteCategories")?.addEventListener("click", (event) => {
  const category = event.target.closest("[data-note-category]");
  if (!category) return;

  const clientName = document.querySelector("[data-goal-client].active")?.dataset.goalClient || "Rita Wen";
  const profile = advisorGoalProfiles[clientName];
  const textarea = document.getElementById("advisorQuickNote");
  const note = profile?.noteCategories[Number(category.dataset.noteCategory)];

  if (!note || !textarea) return;

  textarea.value = `${note[0]}: ${note[1]}`;
  textarea.focus();
  document.querySelectorAll("[data-note-category]").forEach((button) => {
    button.classList.toggle("active", button === category);
  });
  showToast(`${note[0]} note loaded for ${clientName}.`);
});

document.querySelectorAll("[data-advisor-decision]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.advisorDecision;
    const clientName = document.querySelector("[data-goal-client].active")?.dataset.goalClient || "Rita Wen";
    const draft = document.getElementById("advisorSuggestionText")?.value.trim();
    const quickNote = document.getElementById("advisorQuickNote")?.value.trim();

    if (action === "schedule") {
      goToMessagesWithDraft(`Hi ${clientName.split(" ")[0]}, can we book a quick 15-minute call to review the FutureView recommendation and decide what action makes sense for this month?`);
      document.getElementById("conversationTitle").textContent = `Isabel Pogue and ${clientName}`;
      showToast(`Call draft created for ${clientName}.`);
      return;
    }

    if (action === "send") {
      const message = quickNote || draft;
      if (message) {
        goToMessagesWithDraft(message);
        document.getElementById("conversationTitle").textContent = `Isabel Pogue and ${clientName}`;
      }
      showToast(`Client message draft ready for ${clientName}.`);
      return;
    }

    if (action === "note") {
      showToast(quickNote ? `Private note saved for ${clientName}.` : `Blank note saved for ${clientName}.`);
      return;
    }

    showToast(`Review summary saved for ${clientName}.`);
  });
});

document.querySelectorAll("[data-client-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.clientAction;
    const overviewClient = document.querySelector("[data-overview-client].active")?.dataset.overviewClient || "Rita Wen";

    if (action === "alert") {
      if (selectedRole === "advisor") {
        showToast(`Client guardrail set for ${overviewClient}.`);
        return;
      }

      showToast("Spending alert set: FutureView will warn Rita if flexible spending goes above $62/day.");
      return;
    }

    if (action === "advisor") {
      if (selectedRole === "advisor") {
        const firstName = overviewClient.split(" ")[0];
        const message = overviewClient === "Aidan Huynh"
          ? "FutureView is flagging higher card pressure. I recommend setting a $45 flexible spending limit and booking a short budget call."
          : overviewClient === "Tiana Lee"
            ? "FutureView shows your savings are on track. Keep automatic deposits active and we can review investment options after your emergency fund milestone."
            : "FutureView recommends keeping everyday spending below $62 per day for the rest of July so your Montreal trip goal stays on track.";

        goToMessagesWithDraft(`Hi ${firstName}, ${message}`);
        document.getElementById("conversationTitle").textContent = `Isabel Pogue and ${overviewClient}`;
        showToast(`Advisor guidance draft created for ${overviewClient}.`);
        return;
      }

      goToMessagesWithDraft("Hi Isabel, can you review my spending forecast and tell me what I should adjust first?");
      showToast("Advisor message draft created.");
      return;
    }

    if (selectedRole === "advisor") {
      showToast(`Advisor plan saved for ${overviewClient}.`);
      return;
    }

    showToast("Monthly plan saved to Rita's FutureView dashboard.");
  });
});

document.querySelectorAll("[data-advisor-account-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.advisorAccountAction;
    const card = button.closest(".advisor-account-card");
    const noteField = card?.querySelector(".advisor-card-note");
    const note = noteField?.value.trim();

    if (action === "rita-limit") {
      goToMessagesWithDraft("Hi Rita, FutureView recommends a $62 daily spending guardrail for the rest of July. This should keep your Montreal trip fund on track while leaving room for essentials.");
      document.getElementById("conversationTitle").textContent = "Isabel Pogue and Rita Wen";
      showToast("Rita guardrail message drafted.");
      return;
    }

    if (action === "rita-review") {
      showToast("Rita account details marked for advisor review.");
      return;
    }

    if (action === "rita-save") {
      showToast(note ? "Rita account note saved." : "Blank Rita note saved.");
      return;
    }

    if (action === "aidan-call") {
      goToMessagesWithDraft("Hi Aidan, FutureView is flagging higher card pressure and non-essential spending. Can we book a 15-minute budget call before your next statement closes?");
      document.getElementById("conversationTitle").textContent = "Isabel Pogue and Aidan Huynh";
      showToast("Aidan budget call draft created.");
      return;
    }

    if (action === "aidan-limit") {
      showToast("Aidan spending cap prepared: $45 flexible spend per day.");
      return;
    }

    if (action === "aidan-save") {
      showToast(note ? "Aidan account note saved." : "Blank Aidan note saved.");
      return;
    }

    if (action === "tiana-review") {
      showToast("Tiana investment review added for later follow-up.");
      return;
    }

    if (action === "tiana-save") {
      showToast(note ? "Tiana account note saved." : "Blank Tiana note saved.");
      return;
    }

    goToMessagesWithDraft("Hi Tiana, FutureView shows your savings and account activity are stable. Keep your automatic deposits active and we can review investment options after your emergency fund milestone.");
    document.getElementById("conversationTitle").textContent = "Isabel Pogue and Tiana Lee";
    showToast("Tiana progress check-in drafted.");
  });
});

refreshMarketQuestionSelects("rates");
renderClientMarketQuestion("rates");
renderAdvisorMarketQuestion("rates");

document.getElementById("clientMarketQuestionSelect")?.addEventListener("change", (event) => {
  renderClientMarketQuestion(event.target.value);
});

document.getElementById("clientMarketQuestionList")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-market-question]");
  if (button) renderClientMarketQuestion(button.dataset.marketQuestion);
});

document.getElementById("advisorMarketQuestionSelect")?.addEventListener("change", (event) => {
  renderAdvisorMarketQuestion(event.target.value);
});

document.getElementById("clientMarketQuestionCard")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-market-vote]");
  if (!button) return;

  const card = button.closest(".market-question-card");
  card?.querySelectorAll("[data-market-vote]").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  showToast("Forecast answer saved. FutureView will use it as a planning signal only.");
});

document.querySelectorAll("[data-market-advisor-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.marketAdvisorAction;

    if (action === "lock") {
      const answer = document.getElementById("advisorRateAnswer")?.value || "Rates hold";
      showToast(`Isabel's market view locked: ${answer}.`);
      return;
    }

    if (action === "export") {
      showToast("Market signal summary saved for advisor review.");
      return;
    }

    const question = document.getElementById("newMarketQuestion")?.value.trim();
    const category = document.getElementById("newMarketCategory")?.value || "Planning";
    if (!question) {
      showToast("Add a question before pushing to clients.");
      return;
    }

    const key = `custom-${Date.now()}`;
    marketQuestions[key] = {
      label: category,
      question,
      summary: `New ${category.toLowerCase()} question created by Isabel for client planning.`,
      options: ["Yes, likely", "No, unlikely", "I don't know"],
      results: [
        ["Yes, likely", 34],
        ["No, unlikely", 22],
        ["I don't know", 44]
      ],
      trend: [22, 25, 30, 34],
      picks: ["Rita: not answered", "Aidan: not answered", "Tiana: not answered"],
      advisorAnswers: ["Yes, likely", "No, unlikely", "I don't know"]
    };
    refreshMarketQuestionSelects(key);
    renderAdvisorMarketQuestion(key);
    renderClientMarketQuestion(key);
    showToast(`New ${category} question pushed to clients.`);
  });
});

document.getElementById("forecastPeriod")?.addEventListener("change", (event) => {
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
