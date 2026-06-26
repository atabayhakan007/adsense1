// Freelance Hourly Rate Calculator Module
import { t, currentLang } from '../i18n.js';

let targetIncomeSlider, expensesSlider, taxSlider, weeklyHoursSlider, vacationSlider;
let valTargetIncome, valExpenses, valTax, valWeeklyHours, valVacation;
let freeHourlyRate, freeAnnualGross, freeAnnualTax, freeAnnualHours;
let tableNetMonthly, tableNetYearly, tableExpMonthly, tableExpYearly;
let tableTaxMonthly, tableTaxYearly, tableGrossMonthly, tableGrossYearly;
let btnFreelanceCsv;
let changeCallback = null;

// Initialize Elements and Event Listeners
export function initFreelance(onChanged) {
    changeCallback = onChanged;

    targetIncomeSlider = document.getElementById('free-target-income');
    expensesSlider = document.getElementById('free-expenses');
    taxSlider = document.getElementById('free-tax');
    weeklyHoursSlider = document.getElementById('free-weekly-hours');
    vacationSlider = document.getElementById('free-vacation');

    valTargetIncome = document.getElementById('val-free-target-income');
    valExpenses = document.getElementById('val-free-expenses');
    valTax = document.getElementById('val-free-tax');
    valWeeklyHours = document.getElementById('val-free-weekly-hours');
    valVacation = document.getElementById('val-free-vacation');

    freeHourlyRate = document.getElementById('free-hourly-rate');
    freeAnnualGross = document.getElementById('free-annual-gross');
    freeAnnualTax = document.getElementById('free-annual-tax');
    freeAnnualHours = document.getElementById('free-annual-hours');

    tableNetMonthly = document.getElementById('table-net-monthly');
    tableNetYearly = document.getElementById('table-net-yearly');
    tableExpMonthly = document.getElementById('table-exp-monthly');
    tableExpYearly = document.getElementById('table-exp-yearly');
    tableTaxMonthly = document.getElementById('table-tax-monthly');
    tableTaxYearly = document.getElementById('table-tax-yearly');
    tableGrossMonthly = document.getElementById('table-gross-monthly');
    tableGrossYearly = document.getElementById('table-gross-yearly');
    btnFreelanceCsv = document.getElementById('btn-freelance-csv');

    const inputs = [targetIncomeSlider, expensesSlider, taxSlider, weeklyHoursSlider, vacationSlider];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateLabels();
            if (changeCallback) changeCallback();
        });
    });

    btnFreelanceCsv.addEventListener('click', downloadFreelanceCSV);

    updateLabels();
}

function downloadFreelanceCSV() {
    const netIncome = parseFloat(targetIncomeSlider.value);
    const expenses = parseFloat(expensesSlider.value);
    const taxRate = parseFloat(taxSlider.value);
    const weeklyHours = parseFloat(weeklyHoursSlider.value);
    const vacation = parseFloat(vacationSlider.value);
    
    // Recalculate variables for report
    const annualExpenses = expenses * 12;
    let grossRequired = netIncome + annualExpenses;
    if (taxRate < 100) {
        grossRequired = (netIncome + annualExpenses) / (1 - (taxRate / 100));
    }
    const annualTax = grossRequired * (taxRate / 100);
    const workingWeeks = 52 - vacation;
    const annualHours = workingWeeks * weeklyHours;
    const hourlyRate = annualHours > 0 ? (grossRequired / annualHours) : 0;

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += currentLang === 'tr' ? "Metrik,Değer\n" : "Metric,Value\n";
    csvContent += `${t('free_target_income')},${netIncome.toFixed(2)}\n`;
    csvContent += `${t('free_expenses')} (${t('free_th_monthly')}),${expenses.toFixed(2)}\n`;
    csvContent += `${t('free_tax')},${taxRate}%\n`;
    csvContent += `${t('free_weekly_hours')},${weeklyHours} ${currentLang === 'tr' ? 'saat' : 'hours'}\n`;
    csvContent += `${t('free_vacation')},${vacation} ${currentLang === 'tr' ? 'hafta' : 'weeks'}\n`;
    csvContent += `${t('free_row_gross')},${grossRequired.toFixed(2)}\n`;
    csvContent += `${t('free_metric_tax')},${annualTax.toFixed(2)}\n`;
    csvContent += `${t('free_metric_hours')},${annualHours} ${currentLang === 'tr' ? 'saat' : 'hours'}\n`;
    csvContent += `${t('free_metric_rate')},${hourlyRate.toFixed(2)} / ${currentLang === 'tr' ? 'saat' : 'hour'}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const filename = currentLang === 'tr' ? "freelance_gelir_gider_raporu.csv" : "freelance_income_expense_report.csv";
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateLabels() {
    valTargetIncome.textContent = formatCurrency(targetIncomeSlider.value);
    valExpenses.textContent = formatCurrency(expensesSlider.value);
    valTax.textContent = taxSlider.value + '%';
    valWeeklyHours.textContent = weeklyHoursSlider.value + (currentLang === 'tr' ? ' Saat' : ' Hours');
    valVacation.textContent = vacationSlider.value + (currentLang === 'tr' ? ' Hafta' : ' Weeks');
}

export function getFreelanceState() {
    return {
        ti: targetIncomeSlider.value,
        ex: expensesSlider.value,
        tx: taxSlider.value,
        wh: weeklyHoursSlider.value,
        vc: vacationSlider.value
    };
}

export function setFreelanceState(state) {
    if (state.ti) targetIncomeSlider.value = state.ti;
    if (state.ex) expensesSlider.value = state.ex;
    if (state.tx) taxSlider.value = state.tx;
    if (state.wh) weeklyHoursSlider.value = state.wh;
    if (state.vc) vacationSlider.value = state.vc;
    updateLabels();
}

function formatCurrency(val) {
    if (currentLang === 'tr') {
        return Math.round(val).toLocaleString('tr-TR') + ' ₺';
    }
    return '$' + Math.round(val).toLocaleString('en-US');
}

export function updateFreelance() {
    const netIncomeTarget = parseFloat(targetIncomeSlider.value);
    const monthlyExpenses = parseFloat(expensesSlider.value);
    const taxRate = parseFloat(taxSlider.value) / 100;
    const weeklyHours = parseFloat(weeklyHoursSlider.value);
    const vacationWeeks = parseFloat(vacationSlider.value);

    const annualExpenses = monthlyExpenses * 12;

    // Formulas:
    // GrossIncome = (NetIncome + Expenses) / (1 - TaxRate)
    let grossIncomeRequired = (netIncomeTarget + annualExpenses);
    if (taxRate < 1) {
        grossIncomeRequired = (netIncomeTarget + annualExpenses) / (1 - taxRate);
    }
    
    const annualTax = grossIncomeRequired * taxRate;
    
    // Working hours
    const workingWeeks = 52 - vacationWeeks;
    const totalAnnualHours = workingWeeks * weeklyHours;

    // Hourly rate
    let hourlyRate = 0;
    if (totalAnnualHours > 0) {
        hourlyRate = grossIncomeRequired / totalAnnualHours;
    }

    // Display Main Metrics
    freeHourlyRate.textContent = formatCurrency(hourlyRate) + (currentLang === 'tr' ? ' / saat' : ' / hour');
    freeAnnualGross.textContent = t('free_sub_gross', {gross: formatCurrency(grossIncomeRequired)});
    freeAnnualTax.textContent = formatCurrency(annualTax);
    freeAnnualHours.textContent = `${totalAnnualHours} ` + (currentLang === 'tr' ? 'Saat / yıl' : 'Hours / year');

    // Populate Table Data
    tableNetMonthly.textContent = formatCurrency(netIncomeTarget / 12);
    tableNetYearly.textContent = formatCurrency(netIncomeTarget);
    
    tableExpMonthly.textContent = formatCurrency(monthlyExpenses);
    tableExpYearly.textContent = formatCurrency(annualExpenses);

    tableTaxMonthly.textContent = formatCurrency(annualTax / 12);
    tableTaxYearly.textContent = formatCurrency(annualTax);

    tableGrossMonthly.textContent = formatCurrency(grossIncomeRequired / 12);
    tableGrossYearly.textContent = formatCurrency(grossIncomeRequired);
}
