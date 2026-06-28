const foundationalObservations = [
  {
    type: 'language_readiness',
    status: 'unresolved',
    priority: 'foundational',
    confidence: 'high',
    statement: 'IELTS is not the immediate root task; English learning readiness comes first.',
    sourceFormulation: 'Asıl mesele IELTS değil. Önce İngilizce öğrenmem gerekiyor. Bu gerçek bütün başvuruları, değişkenleri ve tahminleri alt üst eder.',
    predictionEffect: 'Reorganizes applications, IELTS, mobility, timeline pressure, and growth potential.'
  },
  {
    type: 'post_confession_energy_settlement',
    status: 'active',
    priority: 'foundational',
    confidence: 'high',
    statement: 'After accepting the English readiness truth, a strong energy settlement appeared.',
    sourceFormulation: 'Bu itiraf sonrası bende müthiş bir enerji yerleşmesi oldu. Her şeye karşı hayranlıkla gözlemleme yeteneğim oluştu. Sadece görsel olarak, içerik olarak ya da psikolojiye karşı değil; varlıklara sırf varlık oldukları için. Bu bende tension 9 katsayısını tekrar 2-5-1 çözümlemesi gibi rahatlattı. Tekrar asana pratiklerine başlayacağım. Yenildiğim değerleri sıfırlamayacağım. Bence bu iyi bir gelişme.',
    predictionEffect: 'Recontextualizes the English readiness confession as a clearing event that lowers tension, increases observation capacity, and preserves defeated values as nonzero learning data.',
    modelEffects: {
      tension: 'decreases from 9 toward a 2-5-1 resolution pattern',
      growthPotential: 'increases',
      collapseRisk: 'decreases when paired with unresolved English readiness',
      observationCapacity: 'increases toward wonder-based attention to beings as beings',
      embodiedStability: 'increases',
      decisionClarity: 'increases',
      practiceReadiness: 'asana practice can restart as support',
      failureCharge: 'decreases',
      nonzeroDefeatValues: 'defeated values remain present as nonzero data'
    }
  }
];

const observations = [...foundationalObservations];

const elements = {
  applicationCount: document.querySelector('#applicationCount'),
  universityCount: document.querySelector('#universityCount'),
  countryCount: document.querySelector('#countryCount'),
  variableCount: document.querySelector('#variableCount'),
  foundationStatement: document.querySelector('#foundationStatement'),
  foundationEffect: document.querySelector('#foundationEffect'),
  foundationMeta: document.querySelector('#foundationMeta'),
  primaryMove: document.querySelector('#primaryMove'),
  predictionState: document.querySelector('#predictionState'),
  predictionGrid: document.querySelector('#predictionGrid'),
  observationTable: document.querySelector('#observationTable'),
  applicationsList: document.querySelector('#applicationsList'),
  universitiesList: document.querySelector('#universitiesList'),
  countriesList: document.querySelector('#countriesList'),
  timelineList: document.querySelector('#timelineList'),
  variablesGrid: document.querySelector('#variablesGrid'),
  containmentGrid: document.querySelector('#containmentGrid'),
  dataNotice: document.querySelector('#dataNotice'),
  form: document.querySelector('#observationForm'),
  clearData: document.querySelector('#clearData')
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

function getApplicationRecords(records) {
  return records.filter((record) => record.type === 'application');
}

function getFoundation(records) {
  return records.find((record) => record.type === 'language_readiness');
}

function getEnergySettlement(records) {
  return records.find((record) => record.type === 'post_confession_energy_settlement');
}

function isEnglishReadinessUnresolved(records) {
  const foundation = getFoundation(records);
  return foundation?.status === 'unresolved';
}

function calculateVariables(records) {
  if (records.length === 0) {
    return [];
  }

  const applicationRecords = getApplicationRecords(records);
  const acceptedCount = applicationRecords.filter((record) => record.status === 'Accepted').length;
  const reviewCount = applicationRecords.filter((record) => record.status === 'Review').length;
  const submittedCount = applicationRecords.filter((record) => record.status === 'Submitted').length;
  const uncontainedCount = applicationRecords.filter((record) => record.containment === 'Uncontained').length;
  const uncontainedHighRiskCount = applicationRecords.filter((record) => record.containment === 'Uncontained' && record.risk === 'High').length;
  const readinessUnresolved = isEnglishReadinessUnresolved(records);
  const energySettlementActive = Boolean(getEnergySettlement(records));

  return [
    {
      label: 'Observed acceptance rate',
      value: applicationRecords.length === 0 ? '0%' : `${Math.round((acceptedCount / applicationRecords.length) * 100)}%`,
      detail: `${acceptedCount} accepted of ${applicationRecords.length} observed applications`
    },
    {
      label: 'Countries represented',
      value: uniqueCount(applicationRecords, 'country'),
      detail: 'Calculated only from observed country fields'
    },
    {
      label: 'Active pipeline',
      value: reviewCount + submittedCount,
      detail: 'Submitted plus review statuses from observations'
    },
    {
      label: 'Uncontained high-risk share',
      value: uncontainedCount === 0 ? '0%' : `${Math.round((uncontainedHighRiskCount / uncontainedCount) * 100)}%`,
      detail: `${uncontainedHighRiskCount} high-risk of ${uncontainedCount} uncontained observations`
    },
    {
      label: 'English readiness gate',
      value: readinessUnresolved ? 'Unresolved' : 'Resolved',
      detail: readinessUnresolved && energySettlementActive ? 'Still unresolved, but no longer modeled as pure collapse.' : readinessUnresolved ? 'Applications, mobility, and IELTS remain conditional.' : 'IELTS and applications can become central again.'
    },
    {
      label: 'Tension',
      value: energySettlementActive ? '2-5-1 settling' : readinessUnresolved ? 'High' : 'Normal',
      detail: energySettlementActive ? 'Post-confession energy settlement relaxes tension from 9 into a resolution pattern.' : 'No settling observation is active.'
    },
    {
      label: 'Growth potential',
      value: energySettlementActive ? 'Increased' : readinessUnresolved ? 'Foundation work' : 'Open',
      detail: energySettlementActive ? 'Wonder observation and English foundation work now reinforce growth.' : 'Growth remains tied to unresolved readiness.'
    },
    {
      label: 'Collapse risk',
      value: energySettlementActive ? 'Reduced' : readinessUnresolved ? 'Elevated' : 'Normal',
      detail: energySettlementActive ? 'The confession is a clearing event, not a defeat state.' : 'Risk rises if applications are pushed before readiness improves.'
    },
    {
      label: 'Observation capacity',
      value: energySettlementActive ? 'Expanded' : 'Baseline',
      detail: energySettlementActive ? 'Attention opens toward beings simply as beings.' : 'No perceptual expansion observation is active.'
    },
    {
      label: 'Embodied stability',
      value: energySettlementActive ? 'Increasing' : 'Untracked',
      detail: energySettlementActive ? 'Asana practice can restart as a stabilizing support path.' : 'No embodied support path is active.'
    },
    {
      label: 'Decision clarity',
      value: energySettlementActive ? 'Improving' : readinessUnresolved ? 'Tense' : 'Normal',
      detail: energySettlementActive ? 'Lower tension makes sequencing decisions less overloaded.' : 'Readiness pressure still dominates.'
    },
    {
      label: 'Practice readiness',
      value: energySettlementActive ? 'Asana restart likely' : 'Inactive',
      detail: energySettlementActive ? 'Practice readiness increases through embodied settlement.' : 'No practice restart signal has been observed.'
    },
    {
      label: 'Failure charge',
      value: energySettlementActive ? 'Decreased' : 'Unchanged',
      detail: energySettlementActive ? 'Defeat is recontextualized rather than erased.' : 'Defeat values remain uninterpreted.'
    },
    {
      label: 'Nonzero defeat values',
      value: energySettlementActive ? 'Preserved' : 'Untracked',
      detail: 'Defeated values are not reset to zero; they remain as learning data.'
    }
  ];
}

function setNotice() {
  if (observations.length === 0) {
    elements.dataNotice.textContent = 'No observations recorded. Variables and predictions are unavailable because the observatory does not invent data.';
    elements.dataNotice.classList.add('is-visible');
    return;
  }

  elements.dataNotice.textContent = 'Foundational language readiness remains active, and the post-confession energy settlement lowers collapse while preserving defeated values as nonzero data.';
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
    elements.observationTable.innerHTML = '<tr><td colspan="10">No observations yet. Add an observation to activate calculated variables.</td></tr>';
    return;
  }

  elements.observationTable.innerHTML = observations.map((record) => `
    <tr>
      <td>${escapeHTML(record.type)}</td>
      <td>${escapeHTML(record.applicant || "—")}</td>
      <td>${escapeHTML(record.university || "—")}</td>
      <td>${escapeHTML(record.country || "—")}</td>
      <td>${escapeHTML(record.status)}</td>
      <td>${escapeHTML(record.mobilityDate || "—")}</td>
      <td>${escapeHTML(record.containment || "—")}</td>
      <td>${escapeHTML(record.risk || "—")}</td>
      <td>${escapeHTML(record.concern || "—")}</td>
      <td>${escapeHTML(record.statement || record.note)}</td>
    </tr>
  `).join('');
}

function renderApplications() {
  const applicationRecords = getApplicationRecords(observations);

  if (applicationRecords.length === 0) {
    renderEmpty(elements.applicationsList, 'Applications appear after observations are entered.');
    return;
  }

  elements.applicationsList.innerHTML = applicationRecords.map((record) => `
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
  const applicationRecords = getApplicationRecords(observations);

  if (applicationRecords.length === 0) {
    elements.timelineList.innerHTML = '<li class="empty-state">Mobility timeline requires observed mobility dates.</li>';
    return;
  }

  const sortedRecords = [...applicationRecords].sort((a, b) => a.mobilityDate.localeCompare(b.mobilityDate));
  elements.timelineList.innerHTML = sortedRecords.map((record) => `
    <li>
      <strong>${escapeHTML(record.mobilityDate)}: ${escapeHTML(record.applicant)}</strong>
      <p>${escapeHTML(record.university)}, ${escapeHTML(record.country)} — ${escapeHTML(record.status)}</p>
    </li>
  `).join('');
}

function renderContainmentReview() {
  const applicationRecords = getApplicationRecords(observations);

  if (applicationRecords.length === 0) {
    renderEmpty(elements.containmentGrid, 'Containment review requires observations that distinguish risk from observer concern.');
    return;
  }

  const uncontained = applicationRecords.filter((record) => record.containment === 'Uncontained');
  const concernOnly = applicationRecords.filter((record) => record.containment === 'Uncontained' && record.risk !== 'High' && record.concern === 'High');
  const evidenceThreats = applicationRecords.filter((record) => record.containment === 'Uncontained' && record.risk === 'High');

  elements.containmentGrid.innerHTML = [
    {
      label: 'Uncontained systems',
      value: uncontained.length,
      detail: 'Tracked separately from danger so absence of containment is not treated as proof of threat.'
    },
    {
      label: 'Concern-led containment pressure',
      value: concernOnly.length,
      detail: 'High observer concern with low or medium observed risk.'
    },
    {
      label: 'Evidence-led threat cases',
      value: evidenceThreats.length,
      detail: 'Uncontained systems with high observed risk.'
    }
  ].map((item) => `
    <article class="containment-card">
      <span>${escapeHTML(item.label)}</span>
      <strong>${escapeHTML(item.value)}</strong>
      <p>${escapeHTML(item.detail)}</p>
    </article>
  `).join('');
}

function renderFoundation() {
  const foundation = getFoundation(observations);
  const energySettlement = getEnergySettlement(observations);

  if (!foundation) {
    elements.foundationStatement.textContent = 'No foundational observation recorded.';
    elements.foundationEffect.textContent = 'Predictions wait for root-level system data.';
    elements.foundationMeta.innerHTML = '';
    return;
  }

  elements.foundationStatement.textContent = energySettlement
    ? `${foundation.statement} ${energySettlement.statement}`
    : foundation.statement;
  elements.foundationEffect.textContent = energySettlement
    ? energySettlement.predictionEffect
    : foundation.predictionEffect;
  elements.foundationMeta.innerHTML = [
    ['Type', foundation.type],
    ['Status', foundation.status],
    ['Priority', foundation.priority],
    ['Confidence', foundation.confidence],
    ['Settlement', energySettlement ? energySettlement.status : 'inactive']
  ].map(([label, value]) => `
    <div>
      <dt>${escapeHTML(label)}</dt>
      <dd>${escapeHTML(value)}</dd>
    </div>
  `).join('');
}

function renderPredictionPanel() {
  const readinessUnresolved = isEnglishReadinessUnresolved(observations);
  const energySettlementActive = Boolean(getEnergySettlement(observations));
  elements.predictionState.textContent = readinessUnresolved && energySettlementActive ? 'Conditional / settling' : readinessUnresolved ? 'Conditional / unstable' : 'Open';
  elements.primaryMove.textContent = readinessUnresolved && energySettlementActive
    ? 'The confession lowered tension and increased observational capacity. Continue English foundation work, but preserve prior defeated values as nonzero learning data. Resume asana practice as a stabilizing support path.'
    : readinessUnresolved
      ? 'English foundation before IELTS optimization.'
      : 'Proceed with application and IELTS sequencing.';

  const predictions = readinessUnresolved && energySettlementActive ? [
    ['Applications', 'Conditional but less collapsed', 'Applications still depend on English foundation work, but the confession is now modeled as clearing rather than defeat.'],
    ['Timeline Pressure', 'Settling from high', 'Pressure remains real, yet lower tension creates more usable time for foundation work.'],
    ['Decision Tension', 'Lowered', 'The tension 9 field relaxes into a 2-5-1 resolution pattern.'],
    ['Growth Potential', 'Increased', 'Wonder observation and renewed English foundation work increase growth potential.'],
    ['Observation Capacity', 'Expanded', 'The field can observe not only content or psychology, but beings simply as beings.'],
    ['Embodied Stability', 'Increasing', 'Asana practice can restart as a stabilizing support path.'],
    ['Collapse Risk', 'Reduced', 'English readiness is unresolved, but no longer behaves as pure collapse when paired with the settlement.'],
    ['Failure Charge', 'Decreased', 'Defeated values remain present without being reset to zero.'],
    ['Nonzero Defeat Values', 'Preserved', 'Prior defeated values remain as data and are recontextualized as learning signal.']
  ] : readinessUnresolved ? [
    ['Applications', 'Conditional / unstable', 'Application decisions depend on English foundation work before IELTS optimization.'],
    ['Timeline Pressure', 'Increased', 'Language learning must be scheduled before measurement deadlines compress the field.'],
    ['Decision Tension', 'Increased', 'Pushing applications now competes with the root task of learning English.'],
    ['Growth Potential', 'English foundation work', 'The highest-leverage growth path shifts toward English readiness.'],
    ['Mobility Forecast', 'Conditional', 'Mobility remains possible, but only after readiness improves enough to support IELTS and applications.'],
    ['Collapse Risk', 'Elevated if rushed', 'Risk rises when applications are pushed before English readiness improves.']
  ] : [
    ['Applications', 'Stable', 'Applications can be evaluated from observed application data.'],
    ['Timeline Pressure', 'Normal', 'Timeline pressure follows recorded mobility dates.'],
    ['Decision Tension', 'Normal', 'No unresolved foundational language gate is active.']
  ];

  elements.predictionGrid.innerHTML = predictions.map(([label, value, detail]) => `
    <article class="prediction-card">
      <span>${escapeHTML(label)}</span>
      <strong>${escapeHTML(value)}</strong>
      <p>${escapeHTML(detail)}</p>
    </article>
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
  const applicationRecords = getApplicationRecords(observations);
  elements.applicationCount.textContent = applicationRecords.length;
  elements.universityCount.textContent = uniqueCount(applicationRecords, 'university');
  elements.countryCount.textContent = uniqueCount(applicationRecords, 'country');

  setNotice();
  renderFoundation();
  renderPredictionPanel();
  renderObservationTable();
  renderApplications();
  renderCountList(elements.universitiesList, applicationRecords, 'university', 'Universities appear after observations are entered.');
  renderCountList(elements.countriesList, applicationRecords, 'country', 'Countries appear after observations are entered.');
  renderTimeline();
  renderContainmentReview();
  renderVariables();
}

function readObservation(formData) {
  const type = formData.get('type');
  const note = formData.get('note').trim();

  if (type === 'post_confession_energy_settlement') {
    return {
      type,
      status: 'active',
      priority: 'foundational',
      confidence: 'high',
      statement: note || 'After accepting the English readiness truth, a strong energy settlement appeared.',
      predictionEffect: 'Recontextualizes the confession as clearing that lowers tension and increases observation capacity.'
    };
  }

  if (type === 'language_readiness') {
    return {
      type,
      status: 'unresolved',
      priority: 'foundational',
      confidence: 'high',
      statement: note || 'English learning readiness comes before IELTS measurement.',
      predictionEffect: 'Reorganizes applications, IELTS, mobility, timeline pressure, and growth potential.'
    };
  }

  return {
    type,
    applicant: formData.get('applicant').trim(),
    university: formData.get('university').trim(),
    country: formData.get('country').trim(),
    status: formData.get('status'),
    mobilityDate: formData.get('mobilityDate'),
    containment: formData.get('containment'),
    risk: formData.get('risk'),
    concern: formData.get('concern'),
    note
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
  observations.splice(0, observations.length, ...foundationalObservations);
  renderDashboard();
});

renderDashboard();
