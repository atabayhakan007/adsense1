// FIRE Calculator Module
import { t, currentLang, formatCurrency } from '../i18n.js';

let currentAgeSlider, netWorthSlider, monthlySavingsSlider, monthlyExpensesSlider, roiSlider, inflationSlider;
let valCurrentAge, valNetWorth, valMonthlySavings, valMonthlyExpenses, valRoi, valInflation;
let fireAgeResult, fireYearsLeft, fireTargetResult, fireTotalWealth, fireRealValue;
let chartInstance = null;
let changeCallback = null;

// Initialize Elements and Event Listeners
export function initFire(onChanged) {
    changeCallback = onChanged;

    // Get input elements
    currentAgeSlider = document.getElementById('fire-current-age');
    netWorthSlider = document.getElementById('fire-net-worth');
    monthlySavingsSlider = document.getElementById('fire-monthly-savings');
    monthlyExpensesSlider = document.getElementById('fire-monthly-expenses');
    roiSlider = document.getElementById('fire-roi');
    inflationSlider = document.getElementById('fire-inflation');

    // Get value badges
    valCurrentAge = document.getElementById('val-fire-current-age');
    valNetWorth = document.getElementById('val-fire-net-worth');
    valMonthlySavings = document.getElementById('val-fire-monthly-savings');
    valMonthlyExpenses = document.getElementById('val-fire-monthly-expenses');
    valRoi = document.getElementById('val-fire-roi');
    valInflation = document.getElementById('val-fire-inflation');

    // Get result elements
    fireAgeResult = document.getElementById('fire-age-result');
    fireYearsLeft = document.getElementById('fire-years-left');
    fireTargetResult = document.getElementById('fire-target-result');
    fireTotalWealth = document.getElementById('fire-total-wealth');
    fireRealValue = document.getElementById('fire-real-value');

    // Setup input listeners
    const inputs = [currentAgeSlider, netWorthSlider, monthlySavingsSlider, monthlyExpensesSlider, roiSlider, inflationSlider];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateLabels();
            if (changeCallback) changeCallback();
        });
    });

    updateLabels();
}

// Update value badges
function updateLabels() {
    valCurrentAge.textContent = currentAgeSlider.value;
    valNetWorth.textContent = formatCurrency(netWorthSlider.value);
    valMonthlySavings.textContent = formatCurrency(monthlySavingsSlider.value);
    valMonthlyExpenses.textContent = formatCurrency(monthlyExpensesSlider.value);
    valRoi.textContent = roiSlider.value + '%';
    valInflation.textContent = inflationSlider.value + '%';
}

// Get state for URL sync
export function getFireState() {
    return {
        age: currentAgeSlider.value,
        nw: netWorthSlider.value,
        save: monthlySavingsSlider.value,
        exp: monthlyExpensesSlider.value,
        roi: roiSlider.value,
        inf: inflationSlider.value
    };
}

// Set state from URL parameters
export function setFireState(state) {
    if (state.age) currentAgeSlider.value = state.age;
    if (state.nw) netWorthSlider.value = state.nw;
    if (state.save) monthlySavingsSlider.value = state.save;
    if (state.exp) monthlyExpensesSlider.value = state.exp;
    if (state.roi) roiSlider.value = state.roi;
    if (state.inf) inflationSlider.value = state.inf;
    updateLabels();
}


// Calculation and chart rendering logic
export function updateFire() {
    const startAge = parseInt(currentAgeSlider.value);
    const startNW = parseFloat(netWorthSlider.value);
    const monthlySavings = parseFloat(monthlySavingsSlider.value);
    const monthlyExpenses = parseFloat(monthlyExpensesSlider.value);
    const nominalRoi = parseFloat(roiSlider.value) / 100;
    const inflation = parseFloat(inflationSlider.value) / 100;

    // Formulas:
    // Real Return Rate = Nominal ROI - Inflation
    const realRateOfReturn = nominalRoi - inflation; 
    
    // FIRE target based on 4% SWR (Safe Withdrawal Rate) rule
    // Target = Annual Expenses * 25
    const annualExpenses = monthlyExpenses * 12;
    const fireTarget = annualExpenses * 25;
    fireTargetResult.textContent = formatCurrency(fireTarget);

    let age = startAge;
    let wealth = startNW;
    let fireAge = -1;

    // Simulation Data arrays for charts
    const ages = [age];
    const wealthTrend = [wealth];
    const targetTrend = [fireTarget];

    // Simulate month-by-month for up to 50 years (or age 100)
    const maxYears = Math.min(60, 100 - startAge);
    
    for (let year = 1; year <= maxYears; year++) {
        // Compound monthly
        for (let month = 1; month <= 12; month++) {
            // Apply monthly interest rate (compounded) and add savings
            // Wealth is adjusted for inflation (using real rate of return)
            wealth = wealth * (1 + realRateOfReturn / 12) + monthlySavings;
        }

        age += 1;
        ages.push(age);
        wealthTrend.push(wealth);
        targetTrend.push(fireTarget);

        if (wealth >= fireTarget && fireAge === -1) {
            fireAge = age;
        }
    }

    // Display Results
    if (fireAge !== -1) {
        fireAgeResult.textContent = t('fire_age_val', {age: fireAge});
        const yearsLeft = fireAge - startAge;
        fireYearsLeft.textContent = t('fire_calc_years_left', {years: yearsLeft});
    } else {
        fireAgeResult.textContent = t('fire_calc_never');
        fireYearsLeft.textContent = t('fire_calc_insufficient');
    }

    // Calculate details at age 65 or FIRE age
    const displayAge = fireAge !== -1 ? fireAge : startAge + 20;
    const displayWealth = wealthTrend[ages.indexOf(displayAge)] || wealthTrend[wealthTrend.length - 1];
    
    fireTotalWealth.textContent = formatCurrency(displayWealth);
    fireRealValue.textContent = t('fire_calc_display_wealth', {age: displayAge});

    // Render/Update Chart.js
    renderChart(ages, wealthTrend, targetTrend, fireAge);
}

function renderChart(labels, wealthData, targetData, fireAge) {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Skipping chart rendering.');
        return;
    }
    const ctx = document.getElementById('fireChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    // Chart Configuration
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: t('fire_chart_wealth'),
                    data: wealthData,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#10B981',
                },
                {
                    label: t('fire_chart_target'),
                    data: targetData,
                    borderColor: '#3B82F6',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 0,
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
                        font: {
                            family: 'Outfit',
                            size: 12
                        }
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
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatCurrency(context.parsed.y);
                            }
                            return label;
                        },
                        title: function(context) {
                            return (currentLang === 'tr' ? 'Yaş: ' : 'Age: ') + context[0].label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.03)'
                    },
                    ticks: {
                        color: '#6B7280',
                        font: { family: 'Outfit' }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.03)'
                    },
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
