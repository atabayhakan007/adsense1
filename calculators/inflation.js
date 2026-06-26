// Inflation Erosion Calculator Module
import { t, currentLang } from '../i18n.js';

let startingAmountSlider, inflationRateSlider, yearsSlider;
let valStartingAmount, valInflationRate, valYears;
let infFuturePower, infPowerLostPct, infPowerLostVal, infTargetAmount;
let chartInstance = null;
let changeCallback = null;

// Initialize Elements and Event Listeners
export function initInflation(onChanged) {
    changeCallback = onChanged;

    startingAmountSlider = document.getElementById('inf-starting-amount');
    inflationRateSlider = document.getElementById('inf-inflation-rate');
    yearsSlider = document.getElementById('inf-years');

    valStartingAmount = document.getElementById('val-inf-starting-amount');
    valInflationRate = document.getElementById('val-inf-inflation-rate');
    valYears = document.getElementById('val-inf-years');

    infFuturePower = document.getElementById('inf-future-power');
    infPowerLostPct = document.getElementById('inf-power-lost-pct');
    infPowerLostVal = document.getElementById('inf-power-lost-val');
    infTargetAmount = document.getElementById('inf-target-amount');

    const inputs = [startingAmountSlider, inflationRateSlider, yearsSlider];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateLabels();
            if (changeCallback) changeCallback();
        });
    });

    updateLabels();
}

function updateLabels() {
    valStartingAmount.textContent = formatCurrency(startingAmountSlider.value);
    valInflationRate.textContent = inflationRateSlider.value + '%';
    valYears.textContent = yearsSlider.value + (currentLang === 'tr' ? ' Yıl' : ' Years');
}

export function getInflationState() {
    return {
        sa: startingAmountSlider.value,
        ir: inflationRateSlider.value,
        yr: yearsSlider.value
    };
}

export function setInflationState(state) {
    if (state.sa) startingAmountSlider.value = state.sa;
    if (state.ir) inflationRateSlider.value = state.ir;
    if (state.yr) yearsSlider.value = state.yr;
    updateLabels();
}

function formatCurrency(val) {
    if (currentLang === 'tr') {
        return Math.round(val).toLocaleString('tr-TR') + ' ₺';
    }
    return '$' + Math.round(val).toLocaleString('en-US');
}

export function updateInflation() {
    const startingAmount = parseFloat(startingAmountSlider.value);
    const inflationRate = parseFloat(inflationRateSlider.value) / 100;
    const simYears = parseInt(yearsSlider.value);

    // Calculate final metrics
    const futurePower = startingAmount / Math.pow(1 + inflationRate, simYears);
    const lostValue = startingAmount - futurePower;
    const lostPct = (lostValue / startingAmount) * 100;
    const targetAmount = startingAmount * Math.pow(1 + inflationRate, simYears);

    // Display Main Metrics
    infFuturePower.textContent = formatCurrency(futurePower);
    infPowerLostPct.textContent = t('inf_sub_lost', {pct: lostPct.toFixed(1)});
    infPowerLostVal.textContent = formatCurrency(lostValue);
    infTargetAmount.textContent = formatCurrency(targetAmount);

    // Simulation Data for Chart
    const years = [0];
    const powerData = [startingAmount];
    const nominalTargetData = [startingAmount];

    for (let y = 1; y <= simYears; y++) {
        years.push(y);
        powerData.push(startingAmount / Math.pow(1 + inflationRate, y));
        nominalTargetData.push(startingAmount * Math.pow(1 + inflationRate, y));
    }

    renderChart(years, powerData, nominalTargetData);
}

function renderChart(labels, powerData, targetData) {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Skipping chart rendering.');
        return;
    }
    const ctx = document.getElementById('inflationChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(y => currentLang === 'tr' ? `${y}. Yıl` : `Year ${y}`),
            datasets: [
                {
                    label: t('inf_chart_power'),
                    data: powerData,
                    borderColor: '#3B82F6', // Blue
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#3B82F6',
                },
                {
                    label: t('inf_chart_target'),
                    data: targetData,
                    borderColor: '#10B981', // Green
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    fill: false,
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#10B981',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#9CA3AF',
                        font: { family: 'Outfit', size: 12 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#0F1420',
                    titleColor: '#F3F4F6',
                    bodyColor: '#9CA3AF',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    titleFont: { family: 'Outfit', weight: 'bold' },
                    bodyFont: { family: 'Outfit' },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label = (currentLang === 'tr' ? label.split(' ')[0] : label.split(' ')[0]) + ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatCurrency(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: { color: '#6B7280', font: { family: 'Outfit' } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: {
                        color: '#6B7280',
                        font: { family: 'Outfit' },
                        callback: function(value) {
                            const currencySymbol = currentLang === 'tr' ? ' ₺' : '$';
                            if (value >= 1e6) {
                                const valStr = (value / 1e6).toFixed(1) + 'M';
                                return currentLang === 'tr' ? valStr + currencySymbol : currencySymbol + valStr;
                            }
                            if (value >= 1e3) {
                                const valStr = (value / 1e3).toFixed(0) + 'k';
                                return currentLang === 'tr' ? valStr + currencySymbol : currencySymbol + valStr;
                            }
                            return currentLang === 'tr' ? value + currencySymbol : currencySymbol + value;
                        }
                    }
                }
            }
        }
    });
}
