// Mortgage vs Rent Calculator Module
import { t, currentLang, formatCurrency } from '../i18n.js';

let homePriceSlider, downPaymentSlider, loanTermSlider, interestSlider, rentSlider, rentIncreaseSlider;
let valHomePrice, valDownPayment, valLoanTerm, valInterest, valRent, valRentIncrease;
let mortWinner, mortSavingsDiff, mortMonthlyPayment, mortTotalInterest;
let amortizationTbody, btnMortgageCsv;
let chartInstance = null;
let changeCallback = null;
let amortizationSchedule = []; // Caches amortization data for CSV export

// Initialize Elements and Event Listeners
export function initMortgage(onChanged) {
    changeCallback = onChanged;

    homePriceSlider = document.getElementById('mort-home-price');
    downPaymentSlider = document.getElementById('mort-down-payment');
    loanTermSlider = document.getElementById('mort-loan-term');
    interestSlider = document.getElementById('mort-interest');
    rentSlider = document.getElementById('mort-rent');
    rentIncreaseSlider = document.getElementById('mort-rent-increase');

    valHomePrice = document.getElementById('val-mort-home-price');
    valDownPayment = document.getElementById('val-mort-down-payment');
    valLoanTerm = document.getElementById('val-mort-loan-term');
    valInterest = document.getElementById('val-mort-interest');
    valRent = document.getElementById('val-mort-rent');
    valRentIncrease = document.getElementById('val-mort-rent-increase');

    mortWinner = document.getElementById('mort-winner');
    mortSavingsDiff = document.getElementById('mort-savings-diff');
    mortMonthlyPayment = document.getElementById('mort-monthly-payment');
    mortTotalInterest = document.getElementById('mort-total-interest');
    amortizationTbody = document.getElementById('mortgage-amortization-tbody');
    btnMortgageCsv = document.getElementById('btn-mortgage-csv');

    const inputs = [homePriceSlider, downPaymentSlider, loanTermSlider, interestSlider, rentSlider, rentIncreaseSlider];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateLabels();
            if (changeCallback) changeCallback();
        });
    });

    btnMortgageCsv.addEventListener('click', downloadAmortizationCSV);

    updateLabels();
}

function downloadAmortizationCSV() {
    if (amortizationSchedule.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    const header = currentLang === 'tr' 
        ? "Yıl,Başlangıç Borcu,Anapara Ödemesi,Faiz Ödemesi,Kalan Borç\n"
        : "Year,Starting Balance,Principal Paid,Interest Paid,Ending Balance\n";
    csvContent += header;
    
    amortizationSchedule.forEach(row => {
        csvContent += `${row.year},${row.startBalance.toFixed(2)},${row.principalPaid.toFixed(2)},${row.interestPaid.toFixed(2)},${row.endBalance.toFixed(2)}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const filename = currentLang === 'tr' ? "mortgage_amortisman_tablosu.csv" : "mortgage_amortization_schedule.csv";
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateLabels() {
    valHomePrice.textContent = formatCurrency(homePriceSlider.value);
    valDownPayment.textContent = formatCurrency(downPaymentSlider.value);
    valLoanTerm.textContent = loanTermSlider.value + (currentLang === 'tr' ? ' Yıl' : ' Years');
    valInterest.textContent = interestSlider.value + '%';
    valRent.textContent = formatCurrency(rentSlider.value);
    valRentIncrease.textContent = rentIncreaseSlider.value + '%';
    
    // Ensure down payment doesn't exceed home price
    const homePrice = parseInt(homePriceSlider.value);
    const downPayment = parseInt(downPaymentSlider.value);
    if (downPayment > homePrice) {
        downPaymentSlider.value = homePrice;
        valDownPayment.textContent = formatCurrency(homePrice);
    }
}

export function getMortgageState() {
    return {
        hp: homePriceSlider.value,
        dp: downPaymentSlider.value,
        lt: loanTermSlider.value,
        intr: interestSlider.value,
        rt: rentSlider.value,
        ri: rentIncreaseSlider.value
    };
}

export function setMortgageState(state) {
    if (state.hp) homePriceSlider.value = state.hp;
    if (state.dp) downPaymentSlider.value = state.dp;
    if (state.lt) loanTermSlider.value = state.lt;
    if (state.intr) interestSlider.value = state.intr;
    if (state.rt) rentSlider.value = state.rt;
    if (state.ri) rentIncreaseSlider.value = state.ri;
    updateLabels();
}


export function updateMortgage() {
    const homePrice = parseFloat(homePriceSlider.value);
    const downPayment = parseFloat(downPaymentSlider.value);
    const loanTermYears = parseInt(loanTermSlider.value);
    const annualInterest = parseFloat(interestSlider.value) / 100;
    let initialRent = parseFloat(rentSlider.value);
    const rentIncrease = parseFloat(rentIncreaseSlider.value) / 100;

    const loanAmount = homePrice - downPayment;
    const totalPayments = loanTermYears * 12;
    const monthlyInterest = annualInterest / 12;

    // Monthly Mortgage Payment (P & I)
    let monthlyMortgage = 0;
    if (loanAmount > 0 && monthlyInterest > 0) {
        monthlyMortgage = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments)) / (Math.pow(1 + monthlyInterest, totalPayments) - 1);
    } else if (loanAmount > 0) {
        monthlyMortgage = loanAmount / totalPayments;
    }
    
    mortMonthlyPayment.textContent = formatCurrency(monthlyMortgage);

    const totalInterest = (monthlyMortgage * totalPayments) - loanAmount;
    mortTotalInterest.textContent = formatCurrency(Math.max(0, totalInterest));

    // Simulation parameters
    const investmentReturnReal = 0.07; // 7% average stock market return
    const homeAppreciationRate = 0.035; // 3.5% property appreciation

    let rentInvestment = downPayment; // Renter starts with downpayment in investments
    let rent = initialRent;
    let mortgageBalance = loanAmount;
    let currentHomeValue = homePrice;
    let buyInvestment = 0;

    const years = [0];
    const rentNetWorthData = [rentInvestment];
    const buyNetWorthData = [downPayment];

    amortizationSchedule = [];
    let currentBalance = loanAmount;

    // Simulate year-by-year
    for (let year = 1; year <= loanTermYears; year++) {
        // Rent increases each year
        if (year > 1) {
            rent = rent * (1 + rentIncrease);
        }

        const yearStartBalance = currentBalance;
        let yearPrincipalPaid = 0;
        let yearInterestPaid = 0;

        // Simulate 12 months for this year
        for (let m = 1; m <= 12; m++) {
            // Renter Compounds investment
            rentInvestment = rentInvestment * (1 + investmentReturnReal / 12);
            // Buyer Compounds investment (if renting is more expensive than buying)
            buyInvestment = buyInvestment * (1 + investmentReturnReal / 12);

            // Calculate monthly cash flows
            const buyerMonthlyCost = monthlyMortgage + (currentHomeValue * 0.01 / 12); // Mortgage + maintenance/tax
            const renterMonthlyCost = rent;

            if (buyerMonthlyCost > renterMonthlyCost) {
                // Buyer spends more, so Renter invests the difference
                rentInvestment += (buyerMonthlyCost - renterMonthlyCost);
            } else {
                // Renter spends more, so Buyer invests the difference
                buyInvestment += (renterMonthlyCost - buyerMonthlyCost);
            }

            // Loan Amortization (Buyer)
            if (currentBalance > 0) {
                const interestExpense = currentBalance * monthlyInterest;
                const principalPaid = Math.min(currentBalance, monthlyMortgage - interestExpense);
                yearInterestPaid += interestExpense;
                yearPrincipalPaid += principalPaid;
                currentBalance = Math.max(0, currentBalance - principalPaid);
            }

            // Home Appreciation
            currentHomeValue = currentHomeValue * (1 + homeAppreciationRate / 12);
        }

        // Cache yearly amortization row
        amortizationSchedule.push({
            year: year,
            startBalance: yearStartBalance,
            principalPaid: yearPrincipalPaid,
            interestPaid: yearInterestPaid,
            endBalance: currentBalance
        });

        // Net Worth calculations
        const buyerNetWorth = currentHomeValue - currentBalance + buyInvestment;
        const renterNetWorth = rentInvestment;

        years.push(year);
        buyNetWorthData.push(buyerNetWorth);
        rentNetWorthData.push(renterNetWorth);
    }

    // Populate Amortization Table HTML
    amortizationTbody.innerHTML = '';
    amortizationSchedule.forEach(row => {
        const tr = document.createElement('tr');
        const yearLabel = currentLang === 'tr' ? `${row.year}. Yıl` : `Year ${row.year}`;
        tr.innerHTML = `
            <td>${yearLabel}</td>
            <td>${formatCurrency(row.startBalance)}</td>
            <td style="color: var(--accent-primary); font-weight:500;">+${formatCurrency(row.principalPaid)}</td>
            <td style="color: #EF4444;">-${formatCurrency(row.interestPaid)}</td>
            <td>${formatCurrency(row.endBalance)}</td>
        `;
        amortizationTbody.appendChild(tr);
    });

    // Determine winner
    const finalRentNW = rentNetWorthData[rentNetWorthData.length - 1];
    const finalBuyNW = buyNetWorthData[buyNetWorthData.length - 1];

    if (finalBuyNW > finalRentNW) {
        mortWinner.textContent = t('mort_buy_winner');
        mortWinner.className = 'metric-value highlight-green';
        mortSavingsDiff.textContent = t('mort_savings_diff', {diff: formatCurrency(finalBuyNW - finalRentNW)});
    } else {
        mortWinner.textContent = t('mort_rent_winner');
        mortWinner.className = 'metric-value highlight-blue';
        mortSavingsDiff.textContent = t('mort_savings_diff', {diff: formatCurrency(finalRentNW - finalBuyNW)});
    }

    renderChart(years, buyNetWorthData, rentNetWorthData);
}

function renderChart(labels, buyData, rentData) {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Skipping chart rendering.');
        return;
    }
    const ctx = document.getElementById('mortgageChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(y => currentLang === 'tr' ? `${y}. Yıl` : `Year ${y}`),
            datasets: [
                {
                    label: t('mort_chart_buy'),
                    data: buyData,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#10B981',
                },
                {
                    label: t('mort_chart_rent'),
                    data: rentData,
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#3B82F6',
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
                                label = label.split(' ')[0] + ': ';
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
