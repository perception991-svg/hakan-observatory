const observations = [];

const holographicDashboardProtocol = {
  target: 'Real-time projection of cognitive synaptic structure',
  mode: 'Organic-Synaptic-Mapping',
  coreIdentity: 'Asli_Varlik_Protected',
  kiplikProcessor: 'Methodological_Efficiency_Engine',
  externalInterface: 'Dart_Targeting_System',
  synapticFlow: 'Real-time_Cognitive_Synaptic_Mapping',
  feedbackLoop: 'Academic inputs from Trinity / Germany redirect through the dashboard',
  exclusionRule: 'No sentiment analysis; exclude thematic wishes / temenniler',
  outputRule: 'High-precision academic dart delivery'
};

function initializeHolographicDashboard() {
  return {
    status: 'Holographic_Dashboard_Active',
    dashboard: {
      Core_Identity: holographicDashboardProtocol.coreIdentity,
      Kiplik_Processor: holographicDashboardProtocol.kiplikProcessor,
      External_Interface: holographicDashboardProtocol.externalInterface,
      Synaptic_Flow: holographicDashboardProtocol.synapticFlow
    }
  };
}

const foundationalData = {
  englishReadiness: {
    startingLevel: 'A2',
    target2Months: 'B1',
    target4Months: 'B2',
    target6Months: 'B2/C1 bridge',
    IELTS: 'downstream after foundation stabilizes',
    status: 'active'
  },
  postConfessionEnergySettlement: {
    tension: 'decreased',
    observationCapacity: 'increased',
    growthPotential: 'increased',
    collapseRisk: 'decreased',
    defeatedValues: 'remain nonzero',
    supportPath: 'asana practice is stabilizing support path',
    status: 'active'
  },
  englishRoadmap: {
    status: 'active'
  }
};


const organicSeed = 73421;

function createSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function jitterPoint(point, random, amount = 18) {
  return {
    x: point.x + (random() - 0.5) * amount,
    y: point.y + (random() - 0.5) * amount
  };
}

function organicBezierPath(points, seedOffset = 0, bend = 34) {
  const random = createSeededRandom(organicSeed + seedOffset);
  const anchors = points.map((point, index) => jitterPoint(point, random, index === 0 ? 5 : 16 + random() * 11));
  return anchors.slice(1).reduce((path, point, index) => {
    const start = anchors[index];
    const end = point;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const normal = { x: -dy / length, y: dx / length };
    const phase = random() > 0.5 ? 1 : -1;
    const c1 = {
      x: start.x + dx * (0.22 + random() * 0.19) + normal.x * bend * phase * (0.35 + random()),
      y: start.y + dy * (0.18 + random() * 0.22) + normal.y * bend * phase * (0.35 + random())
    };
    const c2 = {
      x: start.x + dx * (0.68 + random() * 0.2) - normal.x * bend * phase * (0.25 + random()),
      y: start.y + dy * (0.64 + random() * 0.21) - normal.y * bend * phase * (0.25 + random())
    };
    return `${path} C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  }, `M${anchors[0].x.toFixed(1)} ${anchors[0].y.toFixed(1)}`);
}

function applyOrganicHeroField() {
  const svg = elements.organismMap?.querySelector('.neural-links');
  if (!svg) return;

  const coreAnchors = {
    collapse: [{ x: 432.6, y: 309.4 }, { x: 377.8, y: 271.3 }, { x: 280.4, y: 194.6 }, { x: 158.2, y: 121.7 }, { x: 105.9, y: 215.3 }, { x: 122.7, y: 321.6 }],
    growth: [{ x: 467.9, y: 314.8 }, { x: 529.7, y: 251.2 }, { x: 631.4, y: 172.9 }, { x: 742.6, y: 116.3 }, { x: 665.8, y: 222.5 }, { x: 815.2, y: 334.1 }],
    relationality: [{ x: 426.7, y: 333.9 }, { x: 331.2, y: 316.4 }, { x: 222.5, y: 327.8 }, { x: 111.9, y: 320.6 }, { x: 255.7, y: 405.4 }, { x: 75.6, y: 452.2 }],
    consciousness: [{ x: 474.1, y: 329.7 }, { x: 583.3, y: 303.5 }, { x: 726.9, y: 310.8 }, { x: 807.5, y: 336.7 }, { x: 657.1, y: 412.6 }, { x: 842.4, y: 462.8 }],
    tension: [{ x: 441.8, y: 337.5 }, { x: 386.2, y: 421.7 }, { x: 291.6, y: 501.1 }, { x: 186.5, y: 538.9 }, { x: 354.3, y: 530.1 }, { x: 61.8, y: 476.2 }],
    mobility: [{ x: 464.7, y: 342.6 }, { x: 547.4, y: 426.3 }, { x: 618.6, y: 502.8 }, { x: 709.1, y: 541.5 }, { x: 574.6, y: 529.7 }, { x: 856.2, y: 457.8 }],
    pressure: [{ x: 443.2, y: 302.5 }, { x: 430.8, y: 237.4 }, { x: 449.1, y: 77.6 }, { x: 314.2, y: 213.5 }, { x: 437.2, y: 261.8 }],
    opening: [{ x: 456.6, y: 339.2 }, { x: 459.1, y: 429.6 }, { x: 447.8, y: 599.1 }, { x: 605.4, y: 413.7 }, { x: 467.2, y: 372.4 }]
  };

  Object.entries(coreAnchors).forEach(([key, points], index) => {
    const selector = key === 'consciousness' ? '#path-consciousness' : `#path-${key}`;
    svg.querySelector(selector)?.setAttribute('d', organicBezierPath(points, index * 97, 41));
  });

  const secondaryPaths = svg.querySelectorAll('.living-links .neural-link.secondary');
  const secondaryAnchors = [
    [{ x: 151.4, y: 114.8 }, { x: 267.8, y: 73.2 }, { x: 451.2, y: 78.9 }, { x: 746.5, y: 116.4 }],
    [{ x: 188.9, y: 539.2 }, { x: 323.6, y: 579.5 }, { x: 558.4, y: 586.1 }, { x: 714.9, y: 538.5 }],
    [{ x: 314.5, y: 214.9 }, { x: 406.3, y: 156.2 }, { x: 531.7, y: 162.8 }, { x: 599.9, y: 219.6 }],
    [{ x: 261.8, y: 317.6 }, { x: 361.9, y: 284.1 }, { x: 526.3, y: 282.7 }, { x: 646.8, y: 323.1 }]
  ];
  secondaryPaths.forEach((path, index) => path.setAttribute('d', organicBezierPath(secondaryAnchors[index], 900 + index * 53, 27)));

  const ambientPaths = svg.querySelectorAll('.membrane-filaments path, .deep-dendrites path, .branch-field-far path, .branch-field-mid path, .branch-field-near path:not(.organic-branchlet)');
  const ambientSources = Object.values(coreAnchors);
  ambientPaths.forEach((path, index) => {
    const source = ambientSources[index % ambientSources.length];
    const offset = index % 2 === 0 ? source : [...source].reverse();
    path.setAttribute('d', organicBezierPath(offset.slice(0, 4 + (index % 3)), 1700 + index * 29, index < 14 ? 56 : 31));
  });

  const branchLayer = svg.querySelector('.branch-field-near');
  if (branchLayer && !branchLayer.dataset.seeded) {
    const random = createSeededRandom(organicSeed + 404);
    const sourcePoints = Object.values(coreAnchors).flat();
    for (let index = 0; index < 30; index += 1) {
      const start = sourcePoints[Math.floor(random() * sourcePoints.length)];
      const points = [start];
      for (let bendIndex = 0; bendIndex < 3 + Math.floor(random() * 3); bendIndex += 1) {
        points.push({ x: start.x + (random() - 0.5) * (120 + bendIndex * 62), y: start.y + (random() - 0.5) * (95 + bendIndex * 54) });
      }
      const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      branch.setAttribute('d', organicBezierPath(points, 1300 + index * 31, 24));
      branch.setAttribute('class', 'organic-branchlet');
      branchLayer.appendChild(branch);
    }
    branchLayer.dataset.seeded = 'true';
  }
}

const elements = {
  applicationCount: document.querySelector('#applicationCount'),
  universityCount: document.querySelector('#universityCount'),
  countryCount: document.querySelector('#countryCount'),
  variableCount: document.querySelector('#variableCount'),
  observationTable: document.querySelector('#observationTable'),
  applicationsList: document.querySelector('#applicationsList'),
  universitiesList: document.querySelector('#universitiesList'),
  countriesList: document.querySelector('#countriesList'),
  timelineList: document.querySelector('#timelineList'),
  variablesGrid: document.querySelector('#variablesGrid'),
  dataNotice: document.querySelector('#dataNotice'),
  form: document.querySelector('#observationForm'),
  clearData: document.querySelector('#clearData'),
  dominantDirection: document.querySelector('#dominantDirection'),
  collapseRisk: document.querySelector('#collapseRisk'),
  growthPotential: document.querySelector('#growthPotential'),
  activeRelation: document.querySelector('#activeRelation'),
  tensionNode: document.querySelector('#tensionNode'),
  organismMap: document.querySelector('#organismMap'),
  neuralNodes: document.querySelectorAll('.organism-node, .organism-seat'),
  neuralLinks: document.querySelectorAll('.neural-link'),
  predictionCards: document.querySelectorAll('#predictionGrid article'),
  holographicStatus: document.querySelector('#holographicStatus'),
  holographicGrid: document.querySelector('#holographicGrid')
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function deriveOrganismState(records) {
  const total = records.length;
  const statusCounts = groupByCount(records, 'status');
  const accepted = statusCounts.Accepted || 0;
  const rejected = statusCounts.Rejected || 0;
  const deferred = statusCounts.Deferred || 0;
  const review = statusCounts.Review || 0;
  const submitted = statusCounts.Submitted || 0;
  const active = review + submitted;
  const countrySpread = uniqueCount(records, 'country');

  const growthPotential = total === 0 ? 0.08 : clamp((accepted * 1.15 + active * 0.28) / total);
  const collapseRisk = total === 0 ? 0.08 : clamp((rejected * 1.1 + deferred * 0.8) / total);
  const tension = total === 0 ? 0.08 : clamp((active * 0.9 + deferred * 0.55 + rejected * 0.25) / total);
  const mobilityDrift = total === 0 ? 0.08 : clamp((countrySpread * 0.16) + (active / Math.max(1, total)) * 0.2);
  const energy = clamp(0.12 + total * 0.11 + growthPotential * 0.18 + collapseRisk * 0.16 + tension * 0.14 + mobilityDrift * 0.08);

  const mode = energy > 0.82 || tension > 0.74 ? 'overloaded' : energy > 0.55 ? 'active' : energy > 0.22 ? 'sensing' : 'dormant';
  const dominantKey = growthPotential >= collapseRisk && growthPotential >= tension ? 'growth' : collapseRisk >= tension ? 'collapse' : 'tension';
  const dominantDirection = total === 0 ? 'dormant' : dominantKey;
  const strongestRelation = mobilityDrift > 0.54 && dominantKey !== 'collapse' ? 'mobility' : dominantKey === 'tension' ? 'academic' : dominantKey;
  const highestTensionNode = collapseRisk > 0.58 ? 'collapse' : tension > 0.5 ? 'tension' : mobilityDrift > 0.5 ? 'mobility' : growthPotential > 0.5 ? 'growth' : 'orientation';
  const hue = dominantKey === 'growth' ? 146 : dominantKey === 'collapse' ? 326 : dominantKey === 'tension' ? 42 : 186;

  return { total, energy, collapseRisk, growthPotential, tension, mobilityDrift, mode, dominantDirection, strongestRelation, highestTensionNode, hue };
}

function applyOrganismState(state) {
  const root = document.documentElement;
  root.style.setProperty('--organism-energy', state.energy.toFixed(2));
  root.style.setProperty('--collapse-intensity', state.collapseRisk.toFixed(2));
  root.style.setProperty('--growth-intensity', state.growthPotential.toFixed(2));
  root.style.setProperty('--tension-intensity', state.tension.toFixed(2));
  root.style.setProperty('--mobility-intensity', state.mobilityDrift.toFixed(2));
  root.style.setProperty('--prediction-pulse-speed', `${(7 - state.energy * 3.7).toFixed(2)}s`);
  root.style.setProperty('--core-heartbeat-speed', `${(6.8 - state.energy * 3.5).toFixed(2)}s`);
  root.style.setProperty('--dominant-hue', state.hue);

  document.body.classList.remove('organism-dormant', 'organism-sensing', 'organism-active', 'organism-overloaded');
  document.body.classList.add(`organism-${state.mode}`);
  elements.organismMap?.setAttribute('data-organism-state', state.mode);

  elements.neuralNodes.forEach((node) => {
    const nodeType = node.dataset.node;
    const isGrowthPath = state.dominantDirection === 'growth' && nodeType === 'growth';
    const isCollapsePath = state.dominantDirection === 'collapse' && (nodeType === 'collapse' || nodeType === 'temporal');
    const isTensionPath = state.dominantDirection === 'tension' && (nodeType === 'tension' || nodeType === 'academic');
    node.classList.toggle('is-hot', isGrowthPath || isCollapsePath || isTensionPath);
    node.classList.toggle('is-tension', nodeType === state.highestTensionNode || (state.highestTensionNode === 'tension' && nodeType === 'academic'));
    const intensity = nodeType === 'growth' ? state.growthPotential : nodeType === 'collapse' || nodeType === 'temporal' ? state.collapseRisk : nodeType === 'mobility' ? state.mobilityDrift : nodeType === 'academic' || nodeType === 'tension' ? state.tension : state.energy;
    node.style.setProperty('--node-intensity', intensity.toFixed(2));
  });

  elements.neuralLinks.forEach((link) => {
    const linkType = link.dataset.link;
    const isDominant = linkType === state.dominantDirection || (state.dominantDirection === 'tension' && (linkType === 'academic' || linkType === 'tension'));
    link.classList.toggle('is-dominant', isDominant);
    link.classList.toggle('is-strongest', linkType === state.strongestRelation);
  });

  elements.predictionCards.forEach((card) => card.classList.remove('is-dominant'));
  const cardIndex = state.dominantDirection === 'growth' ? 2 : state.dominantDirection === 'collapse' ? 1 : state.dominantDirection === 'tension' ? 4 : 0;
  elements.predictionCards[cardIndex]?.classList.add('is-dominant');
}

function groupByCount(records, key) {
  return records.reduce((accumulator, record) => {
    const value = record[key];
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}

function uniqueCount(records, key) {
  return new Set(records.map((record) => record[key])).size;
}

function calculateVariables(records) {
  if (records.length === 0) {
    return [];
  }

  const acceptedCount = records.filter((record) => record.status === 'Accepted').length;
  const reviewCount = records.filter((record) => record.status === 'Review').length;
  const submittedCount = records.filter((record) => record.status === 'Submitted').length;

  return [
    {
      label: 'Observed acceptance rate',
      value: `${Math.round((acceptedCount / records.length) * 100)}%`,
      detail: `${acceptedCount} accepted of ${records.length} observed applications`
    },
    {
      label: 'Countries represented',
      value: uniqueCount(records, 'country'),
      detail: 'Calculated only from observed country fields'
    },
    {
      label: 'Active pipeline',
      value: reviewCount + submittedCount,
      detail: 'Submitted plus review statuses from observations'
    }
  ];
}

function hasActiveFoundationalData() {
  return Object.values(foundationalData).some((record) => record.status === 'active');
}

function calculatePrediction(records) {
  if (records.length === 0) {
    if (foundationalData.englishReadiness.status === 'active') {
      return {
        dominantDirection: 'English foundation',
        collapseRisk: 'Reduced / conditional',
        growthPotential: 'Active',
        activeRelation: 'English Readiness → IELTS → Applications',
        tensionNode: 'Timeline pressure'
      };
    }

    return {
      dominantDirection: 'Dormant',
      collapseRisk: 'Unavailable',
      growthPotential: 'Unavailable',
      activeRelation: 'Unavailable',
      tensionNode: 'Unavailable'
    };
  }

  const statusCounts = groupByCount(records, 'status');
  const acceptedCount = statusCounts.Accepted || 0;
  const rejectedCount = statusCounts.Rejected || 0;
  const deferredCount = statusCounts.Deferred || 0;
  const reviewCount = statusCounts.Review || 0;
  const submittedCount = statusCounts.Submitted || 0;
  const activeCount = reviewCount + submittedCount;
  const countryCount = uniqueCount(records, 'country');

  const dominantDirection = acceptedCount > rejectedCount
    ? 'Opening / growth'
    : activeCount > rejectedCount
      ? 'Review drift'
      : rejectedCount > 0
        ? 'Collapse pressure'
        : 'Orientation forming';

  const collapseRisk = rejectedCount + deferredCount === 0
    ? 'Low signal'
    : `${Math.round(((rejectedCount + deferredCount) / records.length) * 100)}% pressure`;

  const growthPotential = acceptedCount === 0
    ? `${activeCount} active pathway${activeCount === 1 ? '' : 's'}`
    : `${Math.round((acceptedCount / records.length) * 100)}% opening`;

  const activeRelation = countryCount > 1
    ? 'Mobility ↔ Relationality'
    : 'Orientation ↔ Academic Pressure';

  const tensionNode = deferredCount > 0
    ? 'Temporal Risk'
    : rejectedCount > acceptedCount
      ? 'Collapse'
      : activeCount > 0
        ? 'Decision Tension'
        : 'Potential Opening';

  return { dominantDirection, collapseRisk, growthPotential, activeRelation, tensionNode };
}

function renderPrediction() {
  const organismState = deriveOrganismState(observations);
  applyOrganismState(organismState);
  const prediction = calculatePrediction(observations);
  elements.dominantDirection.textContent = prediction.dominantDirection;
  elements.collapseRisk.textContent = prediction.collapseRisk;
  elements.growthPotential.textContent = prediction.growthPotential;
  elements.activeRelation.textContent = prediction.activeRelation;
  elements.tensionNode.textContent = prediction.tensionNode;
}

function setNotice() {
  if (observations.length === 0) {
    elements.dataNotice.textContent = hasActiveFoundationalData()
      ? 'Foundational observations active. Application observations are still empty.'
      : 'No observations recorded. Variables and predictions are unavailable because the observatory does not invent data.';
    elements.dataNotice.classList.add('is-visible');
    return;
  }

  elements.dataNotice.textContent = 'Variables below are calculated from recorded observations only.';
  elements.dataNotice.classList.add('is-visible');
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[character]));
}

function renderEmpty(container, message) {
  container.innerHTML = `<div class="empty-state">${escapeHTML(message)}</div>`;
}

function renderObservationTable() {
  if (observations.length === 0) {
    elements.observationTable.innerHTML = '<tr><td colspan="6">No observations yet. Add an observation to activate calculated variables.</td></tr>';
    return;
  }

  elements.observationTable.innerHTML = observations.map((record) => `
    <tr>
      <td>${escapeHTML(record.applicant)}</td>
      <td>${escapeHTML(record.university)}</td>
      <td>${escapeHTML(record.country)}</td>
      <td>${escapeHTML(record.status)}</td>
      <td>${escapeHTML(record.mobilityDate)}</td>
      <td>${escapeHTML(record.note)}</td>
    </tr>
  `).join('');
}

function renderApplications() {
  if (observations.length === 0) {
    renderEmpty(elements.applicationsList, 'Applications appear after observations are entered.');
    return;
  }

  elements.applicationsList.innerHTML = observations.map((record) => `
    <article class="list-item">
      <div>
        <strong>${escapeHTML(record.applicant)}</strong>
        <span>${escapeHTML(record.university)}, ${escapeHTML(record.country)}</span>
      </div>
      <span class="badge">${escapeHTML(record.status)}</span>
    </article>
  `).join('');
}

function renderCountList(container, records, key, emptyMessage) {
  if (records.length === 0) {
    renderEmpty(container, emptyMessage);
    return;
  }

  const counts = groupByCount(records, key);
  container.innerHTML = Object.entries(counts).map(([name, count]) => `
    <article class="list-item">
      <div>
        <strong>${escapeHTML(name)}</strong>
        <span>${count} observed application${count === 1 ? '' : 's'}</span>
      </div>
      <span class="badge">${count}</span>
    </article>
  `).join('');
}

function renderTimeline() {
  if (observations.length === 0) {
    elements.timelineList.innerHTML = '<li class="empty-state">Mobility timeline requires observed mobility dates.</li>';
    return;
  }

  const sortedRecords = [...observations].sort((a, b) => a.mobilityDate.localeCompare(b.mobilityDate));
  elements.timelineList.innerHTML = sortedRecords.map((record) => `
    <li>
      <strong>${escapeHTML(record.mobilityDate)}: ${escapeHTML(record.applicant)}</strong>
      <p>${escapeHTML(record.university)}, ${escapeHTML(record.country)} — ${escapeHTML(record.status)}</p>
    </li>
  `).join('');
}

function renderVariables() {
  const variables = calculateVariables(observations);
  elements.variableCount.textContent = variables.length;

  if (variables.length === 0) {
    renderEmpty(elements.variablesGrid, 'No calculated variables. Add observations first.');
    return;
  }

  elements.variablesGrid.innerHTML = variables.map((variable) => `
    <article class="variable-card">
      <span>${escapeHTML(variable.label)}</span>
      <strong>${escapeHTML(variable.value)}</strong>
      <span>${escapeHTML(variable.detail)}</span>
    </article>
  `).join('');
}


function renderHolographicDashboard() {
  const initialized = initializeHolographicDashboard();
  if (elements.holographicStatus) {
    elements.holographicStatus.textContent = initialized.status;
  }

  if (!elements.holographicGrid) {
    return;
  }

  const rows = [
    ['Core Identity', initialized.dashboard.Core_Identity, 'Protected organic core; superficial interface bypassed'],
    ['Kiplik Processor', initialized.dashboard.Kiplik_Processor, 'Methodological efficiency engine for academic routing'],
    ['External Interface', initialized.dashboard.External_Interface, 'Dart targeting system for precise delivery'],
    ['Synaptic Flow', initialized.dashboard.Synaptic_Flow, holographicDashboardProtocol.target]
  ];

  elements.holographicGrid.innerHTML = rows.map(([label, value, detail]) => `
    <article>
      <span>${escapeHTML(label)}</span>
      <strong>${escapeHTML(value)}</strong>
      <small>${escapeHTML(detail)}</small>
    </article>
  `).join('');
}

function renderDashboard() {
  elements.applicationCount.textContent = observations.length;
  elements.universityCount.textContent = uniqueCount(observations, 'university');
  elements.countryCount.textContent = uniqueCount(observations, 'country');

  setNotice();
  renderObservationTable();
  renderApplications();
  renderCountList(elements.universitiesList, observations, 'university', 'Universities appear after observations are entered.');
  renderCountList(elements.countriesList, observations, 'country', 'Countries appear after observations are entered.');
  renderTimeline();
  renderVariables();
  renderHolographicDashboard();
  applyOrganicHeroField();
  renderPrediction();
}

function readObservation(formData) {
  return {
    applicant: formData.get('applicant').trim(),
    university: formData.get('university').trim(),
    country: formData.get('country').trim(),
    status: formData.get('status'),
    mobilityDate: formData.get('mobilityDate'),
    note: formData.get('note').trim()
  };
}

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(elements.form);
  observations.push(readObservation(formData));
  elements.form.reset();
  renderDashboard();
});


elements.clearData.addEventListener('click', () => {
  observations.splice(0, observations.length);
  renderDashboard();
});


function startSynapticFieldDrift() {
  const stage = elements.organismMap;
  if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const driftingClusters = [...stage.querySelectorAll('.organism-node, .organism-seat')].map((node, index) => ({
    node,
    phase: index * 0.73,
    amplitude: node.classList.contains('core-node') ? 1.2 : node.classList.contains('seat-node') ? 1.8 : 2.6,
    speed: node.classList.contains('core-node') ? 0.00018 : 0.00012 + (index % 5) * 0.000025
  }));

  const driftingLayers = [...stage.querySelectorAll('.branch-field, .synapse-points, .membrane-filaments, .deep-dendrites')].map((layer, index) => ({
    layer,
    phase: index * 1.17,
    amplitude: index < 2 ? 1.8 : 1.1,
    speed: 0.00008 + index * 0.000018
  }));

  function evolve(timestamp) {
    driftingClusters.forEach(({ node, phase, amplitude, speed }) => {
      const x = Math.sin(timestamp * speed + phase) * amplitude;
      const y = Math.cos(timestamp * speed * 1.37 + phase * 0.7) * amplitude * 0.72;
      node.style.setProperty('--drift-x', `${x.toFixed(2)}px`);
      node.style.setProperty('--drift-y', `${y.toFixed(2)}px`);
    });

    driftingLayers.forEach(({ layer, phase, amplitude, speed }) => {
      const x = Math.sin(timestamp * speed + phase) * amplitude;
      const y = Math.cos(timestamp * speed * 1.29 + phase) * amplitude;
      layer.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    });

    requestAnimationFrame(evolve);
  }

  requestAnimationFrame(evolve);
}

renderDashboard();
startSynapticFieldDrift();
