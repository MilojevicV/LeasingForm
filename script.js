document.addEventListener('DOMContentLoaded', () => {
    const carType = document.getElementById('carType');
    const carValue = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');
    const leasePeriod = document.getElementById('leasePeriod');
    const downPayment = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');

    //Event listeners
    leasePeriod.addEventListener('change', calculateLeasing);
    carType.addEventListener('change', calculateLeasing);
    carValue.addEventListener('input', validateCarValue);
    downPayment.addEventListener('input', validateDownPayment);
    downPaymentRange.addEventListener('input', syncDownPayment);
    carValueRange.addEventListener('input', syncCarValue);


    //Validation functions
    function validateCarValue() {
        const value = parseFloat(carValue.value);
        if (value < 10000) carValue.value = 10000;
        if (value > 200000) carValue.value = 200000;
        carValueRange.value = carValue.value;
        calculateLeasing();
    }

    function validateDownPayment() {
        const value = parseFloat(downPayment.value);
        if (value < 10) downPayment.value = 10;
        if (value > 50) downPayment.value = 50;
        downPaymentRange.value = downPayment.value;
        calculateLeasing();
    }
    
    //Functions that synchronize range and number fields
    function syncCarValue() {
        carValue.value = carValueRange.value;
        calculateLeasing();
    }

    function syncDownPayment() {
        downPayment.value = downPaymentRange.value;
        calculateLeasing();
    }


   //Main functions that calculate leasing details

    function calculateLeasing() {
        const carValue = parseFloat(document.getElementById('carValue').value);
        const leasePeriod = parseInt(document.getElementById('leasePeriod').value);
        const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
        const carType = document.getElementById('carType').value;

        if (isNaN(carValue) || isNaN(leasePeriod) || isNaN(downPaymentPercent)) {
            displayError("Please fill in all fields correctly.");
            return;
        }

        const interestRate = carType === 'brandNew' ? 0.0299 : 0.037;
        const downPayment = carValue * (downPaymentPercent / 100);
        const loanAmount = carValue - downPayment;
        const monthlyInterestRate = interestRate / 12;
        const monthlyInstallment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));
        const totalLeasingCost = (monthlyInstallment * leasePeriod) + downPayment;

        document.getElementById('totalCost').innerText = `Total Leasing Cost: €${totalLeasingCost.toFixed(2)}`;
        document.getElementById('downPaymentAmount').innerText = `Down Payment: €${downPayment.toFixed(2)} (${downPaymentPercent}%)`;
        document.getElementById('monthlyInstallment').innerText = `Monthly Installment: €${monthlyInstallment.toFixed(2)}`;
        document.getElementById('interestRateDisplay').innerText = `Interest Rate: ${(interestRate * 100).toFixed(2)}%`;
        displayError(""); 
    }

    //Displays error if inputs are not populated
    function displayError(message) {
        let errorElement = document.getElementById('error');
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.id = 'error';
            errorElement.style.color = 'red';
            document.querySelector('.container').insertBefore(errorElement, document.querySelector('.results'));
        }
        errorElement.innerText = message;
    }

    calculateLeasing(); 
});
