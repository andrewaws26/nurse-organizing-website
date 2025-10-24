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

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    populateFooterYear();
    initTimeline();
    initAnalysis();
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
