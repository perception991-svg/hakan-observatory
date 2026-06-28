const observations = [];

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
  predictionCards: document.querySelectorAll('#predictionGrid article')
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
