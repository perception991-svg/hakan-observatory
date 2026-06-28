const observations = [];

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
  tensionNode: document.querySelector('#tensionNode')
};

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

function calculatePrediction(records) {
  if (records.length === 0) {
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
  const prediction = calculatePrediction(observations);
  elements.dominantDirection.textContent = prediction.dominantDirection;
  elements.collapseRisk.textContent = prediction.collapseRisk;
  elements.growthPotential.textContent = prediction.growthPotential;
  elements.activeRelation.textContent = prediction.activeRelation;
  elements.tensionNode.textContent = prediction.tensionNode;
}

function setNotice() {
  if (observations.length === 0) {
    elements.dataNotice.textContent = 'No observations recorded. Variables and predictions are unavailable because the observatory does not invent data.';
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

renderDashboard();
