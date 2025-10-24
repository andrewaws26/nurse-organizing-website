'use strict';

/**
 * Front-end glue code for the Louisville nurse unionizing brief.
 * Keeps DOM selectors, data, and event wiring isolated for easier maintenance.
 */
const timelineEvents = {
    '1989': {
        year: '1989',
        tagline: 'Organizing takes root',
        title: 'Nurses Professional Organization launches',
        summary: 'Registered nurses file with the National Labor Relations Board after organizing on staffing, unsafe floating, and wage compression.',
        body: 'Humana\'s Audubon Hospital management floods the units with consultants and mandatory meetings, but nurses build super-majority support across critical care and med-surg. The election narrowly falls short, yet the organizing committee commits to keep fighting for a binding agreement.'
    },
    '1994': {
        year: '1994',
        tagline: 'Legal validation',
        title: 'Election overturned by the NLRB',
        summary: 'After Columbia/HCA acquires Audubon, management intensifies captive-audience meetings and intimidation. The NPO contests the election results.',
        body: 'The NLRB agrees that management broke labor law and throws out the election, issuing a rare bargaining order. Nurses win on paper, proving the hospital interfered, but securing a contract still requires public pressure and unity on the units.'
    },
    '1998': {
        year: '1998',
        tagline: 'Delay begins',
        title: 'Norton buys Audubon and refuses to bargain',
        summary: 'Norton Healthcare inherits the bargaining order but refuses to negotiate, launching a legal strategy to stall until the committee turns over.',
        body: 'For the next nine years, Norton appeals every ruling up to the Sixth Circuit Court of Appeals. During the delay, management hires union-busting consultants, reassigns pro-union charge nurses, and recruits new staff with anti-union messaging.'
    },
    '2004': {
        year: '2004',
        tagline: 'Courage under fire',
        title: 'Jane Gentry wins reinstatement',
        summary: 'Critical care nurse Jane Gentry is fired after speaking publicly for the union. The case becomes a symbol of management intimidation.',
        body: 'The NLRB orders Norton to reinstate Gentry with back pay, one of several unfair labor practice victories totaling over $570,000 in settlements. The win exposes management\'s tactics, but without a rapid offensive, the timeline continues to stretch.'
    },
    '2013': {
        year: '2010s',
        tagline: 'Momentum shifts',
        title: 'New networks organize across Louisville',
        summary: 'United Campus Workers of Kentucky and other coalitions organize public-sector nurses, residents, and allied health professionals.',
        body: 'These campaigns reintroduce union language into Louisville hospitals. They perfect rapid-response communications, majority petitions, and community alliances. Those tools are essential for private hospital drives ready to relaunch.'
    },
    '2023': {
        year: '2020s',
        tagline: 'A renewed mandate',
        title: 'Safe staffing drives the next wave',
        summary: 'Pandemic staffing crises, record profits, and rising agency costs have galvanized a new generation of nurse leaders.',
        body: 'Nurses are coordinating across hospital systems, documenting unsafe ratios, and building majority committees with digital tools. The focus: go public with overwhelming support, secure rapid elections, and bargain enforceable staffing ratios.'
    }
};

const analysisDetails = {
    'Delay & Decay Appeals': {
        title: 'Management\'s "delay & decay" appeals',
        body: 'Norton Healthcare appealed the NLRB\'s bargaining order for nine years. The drawn-out legal strategy relied on high nurse turnover to erode the union majority. Organizers must plan for this on day one: maintain majority sign-up campaigns and align public pressure with legal milestones.'
    },
    'Illegal Firings & Retaliation': {
        title: 'Illegal firings & retaliation',
        body: 'Firing high-profile leaders chilled support, even when nurses later won reinstatement. Use rapid legal response, public storytelling, and hardship funds so management\'s retaliation backfires and galvanizes solidarity.'
    },
    'Captive Audience Messaging': {
        title: 'Captive-audience propaganda',
        body: 'Mandatory anti-union meetings framed the union as an outside "third party." Counter with inoculation conversations, visible majority actions, and a public plan that keeps patients and community leaders on the nurses\' side.'
    },
    'Political Climate': {
        title: 'Right-to-work & political headwinds',
        body: 'Kentucky\'s right-to-work laws and anti-labor climate emboldened the hospital. Organizers must leverage city officials, faith leaders, and patient advocates to shift the narrative to safe staffing and retention issues that resonate across party lines.'
    }
};

const benefitColorPalette = {
    unionBg: 'rgba(94, 234, 212, 0.85)',
    unionBorder: 'rgba(94, 234, 212, 1)',
    nonUnionBg: 'rgba(251, 191, 36, 0.85)',
    nonUnionBorder: 'rgba(251, 191, 36, 1)'
};

const unionBenefitsCharts = [
    {
        key: 'retention',
        canvasId: 'retentionChart',
        datasetLabel: 'Retention rate (%)',
        values: [89, 62],
        suggestedMax: 100,
        tooltipSuffix: '%',
        tickStep: 10,
        formatter: (value) => `${Math.round(value)}%`
    },
    {
        key: 'safety',
        canvasId: 'safetyChart',
        datasetLabel: 'Patient safety score (1-5)',
        values: [4.7, 3.5],
        suggestedMax: 5,
        tickStep: 0.5,
        formatter: (value) => value.toFixed(1)
    },
    {
        key: 'pay',
        canvasId: 'payEquityChart',
        datasetLabel: 'Pay equity index (0-1)',
        values: [0.92, 0.68],
        suggestedMax: 1,
        tickStep: 0.1,
        formatter: (value) => value.toFixed(2)
    }
];

const outcomeMetrics = {
    retention: {
        title: 'Union hospitals keep nurses on the floor',
        description: 'Louisville hospitals without contracts see roughly 25% RN turnover each year, burning out whole units. Union facilities hold that closer to 11% by locking in fair pay, staffing committees, and due process.',
        unionValue: 'Retention: 89%',
        nonUnionValue: 'Retention: 62%',
        unionBar: 82,
        nonUnionBar: 55,
        footnote: 'Source: Louisville nurse organizer testimony, RegisteredNursing.org union vs non-union retention data.',
        takeaway: 'When fewer nurses leave, patients see familiar faces, orientation costs drop, and units build the muscle to speak up about safety.'
    },
    safety: {
        title: 'Safe staffing cuts preventable harm',
        description: 'Every extra Louisville patient assigned to a nurse increases mortality risk. Union contracts elsewhere enforce ratios like 1:4 on med-surg and 1:2 in ICU, and pair them with staffing committees that fix problems fast.',
        unionValue: 'Infection Index: 1.8',
        nonUnionValue: 'Infection Index: 3.1',
        unionBar: 65,
        nonUnionBar: 40,
        footnote: 'Source: ILR Review unionization study; JAMA nurse staffing research; local incident reports.',
        takeaway: 'Fewer infections, shorter ER boarding times, and better HCAHPS scores follow when ratios are enforceable.'
    },
    pay: {
        title: 'Union contracts deliver equitable pay scales',
        description: 'Union nurses nationwide earn about 12% more per week and are far more likely to have employer-paid health coverage and pensions. Transparent wage steps keep Louisville nurses from leaving for travelers or other markets.',
        unionValue: 'Weekly pay avg: $1,165',
        nonUnionValue: 'Weekly pay avg: $1,042',
        unionBar: 78,
        nonUnionBar: 60,
        footnote: 'Source: Economic Policy Institute (2024); AFL-CIO Department for Professional Employees.',
        takeaway: 'Fair pay and benefits retain experienced preceptors and reduce costly reliance on travel nurses.'
    },
    voice: {
        title: 'A union protects the voice behind every safety report',
        description: 'NLRB rulings show Norton disciplined and interrogated nurses for speaking up. Unionized hospitals negotiate whistleblower protections and grievance steps that shield staff when they escalate unsafe conditions.',
        unionValue: 'ULP settlements: $0',
        nonUnionValue: 'ULP settlements: $570K+',
        unionBar: 90,
        nonUnionBar: 30,
        footnote: 'Source: NLRB case files; PNHP “Silencing nurses endangers patients’ care.”',
        takeaway: 'A contract keeps management from silencing nurses, so patients hear the truth faster.'
    }
};

const voiceEntries = [
    {
        quote: 'When there’s no union, we stay quiet about unsafe ratios because we’re afraid of losing our jobs. That silence puts patients in danger.',
        name: 'Ann H., RN',
        role: 'Cardiovascular Nurse, Norton Audubon'
    },
    {
        quote: 'Every time a nurse leaves, the hospital spends thousands on recruiters instead of staffing. A union would make retention the priority Louisville families deserve.',
        name: 'Marcus L.',
        role: 'South Louisville parent & small business owner'
    },
    {
        quote: 'As clergy, I’ve sat with families who waited hours for a bed. Standing with nurses is standing up for the community’s moral obligation to safe care.',
        name: 'Rev. Carla R.',
        role: 'Clergy for Safe Staffing Louisville'
    },
    {
        quote: 'The legal delays showed me management will stretch the law to the breaking point. Only a contract gives nurses the teeth to enforce safe staffing.',
        name: 'Kay T.',
        role: 'Nurse Organizer & UCW-KY member'
    }
];

const staffingData = {
    medsurg: {
        recommended: '1 : 4',
        current: '1 : 6',
        gapLabel: '+2 patients over safe limit',
        gapPercent: 60,
        message: 'This unit needs 2 additional full-time RNs per shift to meet proven safe staffing standards.',
        action: 'Document every time assignments exceed 1:4 and escalate through the safe staffing committee.'
    },
    icu: {
        recommended: '1 : 2',
        current: '1 : 3',
        gapLabel: '+1 patient over safe limit',
        gapPercent: 70,
        message: 'Even one extra ICU patient doubles nurse workload and increases risk of missed alarms.',
        action: 'Secure written refusals for unsafe assignments and pair them with rapid-response alerts.'
    },
    er: {
        recommended: '1 : 4 (acuity-adjusted)',
        current: '1 : 7',
        gapLabel: '+3 patients over safe limit',
        gapPercent: 75,
        message: 'Boarding times balloon when each nurse juggles seven patients plus triage walk-ins.',
        action: 'Log wait times and call-ins to show how understaffing hits community emergency care.'
    },
    postpartum: {
        recommended: '1 : 3',
        current: '1 : 5',
        gapLabel: '+2 patients over safe limit',
        gapPercent: 65,
        message: 'Safe ratios ensure each new family gets education and monitoring in the first 24 hours.',
        action: 'Collect stories from new parents and channel them into public testimony for safe staffing.'
    }
};

let valueLabelPluginRegistered = false;

const unionValueLabelPlugin = {
    id: 'unionValueLabels',
    afterDatasetsDraw(chart) {
        const pluginOpts = chart.options.plugins?.valueLabels;
        if (!pluginOpts?.enabled) {
            return;
        }

        const meta = chart.getDatasetMeta(0);
        const dataset = chart.data.datasets[0];
        const formatter = dataset.valueFormatter || ((value) => value);
        const { ctx } = chart;

        meta.data.forEach((bar, index) => {
            const value = dataset.data[index];
            const display = formatter(value, index);
            const { x, y } = bar.tooltipPosition();

            ctx.save();
            ctx.fillStyle = pluginOpts.color || '#e2e8f0';
            ctx.font = pluginOpts.font || '600 12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(display, x, y - 6);
            ctx.restore();
        });
    }
};

const defaultBenefitFormatter = (value, suffix = '') => {
    if (suffix === '%') {
        return `${Math.round(value)}%`;
    }
    if (value < 10 && value !== Math.round(value)) {
        return value.toFixed(1);
    }
    return `${value}${suffix}`;
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    populateFooterYear();
    initTimeline();
    initAnalysis();
    initOutcomeExplorer();
    initVoicesCarousel();
    initWhyItMatters();
    initUnionBenefitsSection();
    initStaffingCalculator();
    initAccordion();
});

function initNavigation() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) {
        return;
    }

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.add('hidden');
        });
    });
}

function populateFooterYear() {
    const target = document.getElementById('year');
    if (target) {
        target.textContent = new Date().getFullYear();
    }
}

function initTimeline() {
    const buttons = document.querySelectorAll('[data-timeline]');
    if (!buttons.length) {
        return;
    }

    const fields = {
        year: document.getElementById('timeline-year'),
        tagline: document.getElementById('timeline-tagline'),
        title: document.getElementById('timeline-title'),
        summary: document.getElementById('timeline-summary'),
        body: document.getElementById('timeline-body')
    };

    if (!Object.values(fields).every(Boolean)) {
        return;
    }

    const setTimelineEvent = (key) => {
        const event = timelineEvents[key];
        if (!event) {
            return;
        }

        buttons.forEach(button => {
            const isActive = button.dataset.timeline === key;
            button.setAttribute('data-active', String(isActive));
        });

        fields.year.textContent = event.year;
        fields.tagline.textContent = event.tagline;
        fields.title.textContent = event.title;
        fields.summary.textContent = event.summary;
        fields.body.textContent = event.body;
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            setTimelineEvent(button.dataset.timeline);
        });
    });

    const defaultKey = buttons[0].dataset.timeline || Object.keys(timelineEvents)[0];
    setTimelineEvent(defaultKey);
}

function initAnalysis() {
    const canvas = document.getElementById('analysisChart');
    if (!canvas || typeof Chart === 'undefined') {
        return;
    }

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Delay & Decay Appeals', 'Illegal Firings & Retaliation', 'Captive Audience Messaging', 'Political Climate'],
            datasets: [{
                label: 'Impact',
                data: [10, 8, 7, 5],
                backgroundColor: [
                    'rgba(15, 118, 110, 0.75)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(234, 179, 8, 0.75)',
                    'rgba(148, 163, 184, 0.7)'
                ],
                borderRadius: 12,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    padding: 12,
                    backgroundColor: 'rgba(2, 6, 23, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#e2e8f0',
                    borderColor: 'rgba(148, 163, 184, 0.35)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    min: 0,
                    max: 10,
                    grid: { color: 'rgba(148, 163, 184, 0.15)' },
                    ticks: { color: '#cbd5f5' }
                },
                y: {
                    grid: { display: false },
                    ticks: {
                        color: '#e2e8f0',
                        font: { size: 12 }
                    }
                }
            },
            onClick: (_, elements) => {
                if (!elements.length) {
                    return;
                }

                const index = elements[0].index;
                const label = chart.data.labels[index];
                const detail = analysisDetails[label];
                if (detail) {
                    updateAnalysisDetail(detail);
                }
            },
            onHover: (event, elements) => {
                event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
            }
        }
    });

    updateAnalysisDetail(analysisDetails['Delay & Decay Appeals']);
}

function initOutcomeExplorer() {
    const tabs = document.querySelectorAll('.outcome-tab');
    const title = document.getElementById('outcome-title');
    const description = document.getElementById('outcome-description');
    const unionValue = document.getElementById('outcome-union-value');
    const nonUnionValue = document.getElementById('outcome-nonunion-value');
    const unionBar = document.getElementById('outcome-union-bar');
    const nonUnionBar = document.getElementById('outcome-nonunion-bar');
    const footnote = document.getElementById('outcome-footnote');
    const takeaway = document.getElementById('outcome-takeaway');

    if (!tabs.length || !title || !description || !unionValue || !nonUnionValue || !unionBar || !nonUnionBar || !footnote || !takeaway) {
        return;
    }

    const setOutcome = (key) => {
        const metric = outcomeMetrics[key];
        if (!metric) {
            return;
        }
        title.textContent = metric.title;
        description.textContent = metric.description;
        unionValue.textContent = metric.unionValue;
        nonUnionValue.textContent = metric.nonUnionValue;
        unionBar.style.width = `${metric.unionBar}%`;
        nonUnionBar.style.width = `${metric.nonUnionBar}%`;
        footnote.textContent = metric.footnote;
        takeaway.textContent = metric.takeaway;

        tabs.forEach(tab => {
            const selected = tab.dataset.outcome === key;
            tab.setAttribute('aria-selected', String(selected));
            tab.classList.toggle('border-brand/40', selected);
            tab.classList.toggle('text-brand-light', selected);
            tab.classList.toggle('border-white/20', !selected);
            tab.classList.toggle('text-slate-300', !selected);
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setOutcome(tab.dataset.outcome);
        });
    });

    setOutcome('retention');
}

function initVoicesCarousel() {
    const quote = document.getElementById('voice-quote');
    const name = document.getElementById('voice-name');
    const role = document.getElementById('voice-role');
    const navButtons = document.querySelectorAll('.voice-nav');
    const indicators = document.querySelectorAll('.voice-indicator');

    if (!quote || !name || !role || !navButtons.length || !indicators.length) {
        return;
    }

    let currentIndex = 0;
    let timerId;

    const render = (index) => {
        const entry = voiceEntries[index];
        if (!entry) {
            return;
        }
        quote.innerHTML = `&ldquo;${entry.quote}&rdquo;`;
        name.textContent = entry.name;
        role.textContent = entry.role;
        indicators.forEach(indicator => {
            const indicatorIndex = Number(indicator.dataset.index);
            indicator.classList.toggle('bg-brand-light', indicatorIndex === index);
            indicator.classList.toggle('bg-slate-600', indicatorIndex !== index);
        });
    };

    const startTimer = () => {
        timerId = window.setInterval(() => {
            currentIndex = (currentIndex + 1) % voiceEntries.length;
            render(currentIndex);
        }, 8000);
    };

    const resetTimer = () => {
        if (timerId) {
            window.clearInterval(timerId);
        }
        startTimer();
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.dataset.direction === 'prev' ? -1 : 1;
            currentIndex = (currentIndex + direction + voiceEntries.length) % voiceEntries.length;
            render(currentIndex);
            resetTimer();
        });
    });

    render(currentIndex);
    startTimer();
}

function initWhyItMatters() {
    const section = document.getElementById('why-it-matters');
    if (!section) {
        return;
    }

    const cards = section.querySelectorAll('[data-why-card]');
    if (cards.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        cards.forEach(card => {
            card.classList.add('fade-card');
            observer.observe(card);
        });
    }

    section.querySelectorAll('[data-why-trigger]').forEach(trigger => {
        const panelId = trigger.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        const icon = trigger.querySelector('[data-why-icon]');

        if (!panel) {
            return;
        }

        panel.setAttribute('aria-hidden', 'true');

        const toggle = () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!expanded));
            panel.classList.toggle('hidden', expanded);
            panel.setAttribute('aria-hidden', expanded ? 'true' : 'false');
            if (icon) {
                icon.classList.toggle('rotate-180', !expanded);
            }
        };

        trigger.addEventListener('click', toggle);
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });
}

function initStaffingCalculator() {
    const unitSelect = document.getElementById('calculator-unit');
    const recommended = document.getElementById('calc-recommended');
    const current = document.getElementById('calc-current');
    const gapLabel = document.getElementById('calc-gap-label');
    const gapBar = document.getElementById('calc-gap-bar');
    const message = document.getElementById('calc-message');
    const action = document.getElementById('calc-action');

    if (!unitSelect || !recommended || !current || !gapLabel || !gapBar || !message || !action) {
        return;
    }

    const renderCalculator = (unitKey) => {
        const data = staffingData[unitKey];
        if (!data) {
            return;
        }
        recommended.textContent = data.recommended;
        current.textContent = data.current;
        gapLabel.textContent = data.gapLabel;
        gapBar.style.width = `${Math.min(Math.max(data.gapPercent, 5), 100)}%`;
        message.textContent = data.message;
        action.textContent = data.action;
    };

    unitSelect.addEventListener('change', () => {
        renderCalculator(unitSelect.value);
    });

    renderCalculator(unitSelect.value);
}

function initUnionBenefitsSection() {
    const section = document.getElementById('union-benefits');
    if (!section || typeof Chart === 'undefined') {
        return;
    }

    if (!valueLabelPluginRegistered) {
        Chart.register(unionValueLabelPlugin);
        valueLabelPluginRegistered = true;
    }

    const cards = section.querySelectorAll('[data-benefit-card]');
    if (cards.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        cards.forEach(card => {
            card.classList.add('fade-card');
            observer.observe(card);
        });
    }

    unionBenefitsCharts.forEach(config => {
        const canvas = document.getElementById(config.canvasId);
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');
        const valueFormatter = config.formatter || ((value) => defaultBenefitFormatter(value, config.tooltipSuffix));
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Union', 'Non-Union'],
                datasets: [{
                    label: config.datasetLabel,
                    data: config.values,
                    backgroundColor: [benefitColorPalette.unionBg, benefitColorPalette.nonUnionBg],
                    borderColor: [benefitColorPalette.unionBorder, benefitColorPalette.nonUnionBorder],
                    borderWidth: 1,
                    borderRadius: 12,
                    borderSkipped: false,
                    valueFormatter
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 12
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#e2e8f0', font: { size: 11 } },
                        grid: { color: 'rgba(148, 163, 184, 0.15)', drawBorder: false }
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMax: config.suggestedMax,
                        ticks: {
                            color: '#cbd5f5',
                            stepSize: config.tickStep,
                            callback: (value) => valueFormatter(typeof value === 'number' ? value : Number(value))
                        },
                        grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
                        title: {
                            display: true,
                            text: config.datasetLabel,
                            color: '#e2e8f0',
                            font: { size: 12, weight: '600' }
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        padding: 10,
                        backgroundColor: 'rgba(2, 6, 23, 0.85)',
                        titleColor: '#fff',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(148, 163, 184, 0.35)',
                        borderWidth: 1,
                        callbacks: {
                            title: (context) => context[0]?.label || '',
                            label: (context) => `${context.label}: ${valueFormatter(context.parsed.y ?? context.parsed)}`
                        }
                    },
                    valueLabels: {
                        enabled: true,
                        color: '#e2e8f0'
                    }
                }
            }
        });

        const unionLabel = section.querySelector(`[data-union-benefit-label="${config.key}-union"]`);
        if (unionLabel) {
            unionLabel.textContent = valueFormatter(config.values[0]);
        }

        const nonLabel = section.querySelector(`[data-union-benefit-label="${config.key}-non"]`);
        if (nonLabel) {
            nonLabel.textContent = valueFormatter(config.values[1]);
        }
    });
}

function updateAnalysisDetail(detail) {
    const title = document.getElementById('analysis-title');
    const body = document.getElementById('analysis-body');
    if (!title || !body || !detail) {
        return;
    }

    title.textContent = detail.title;
    body.textContent = detail.body;
}

function initAccordion() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(button => {
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        const icon = button.querySelector('[data-accordion-icon]');

        if (!content) {
            return;
        }

        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!expanded));
            content.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });
}
