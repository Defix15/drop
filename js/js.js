document.addEventListener('DOMContentLoaded', () => {
    const cardNumberInput = document.getElementById('card-number-input');
    const cardHolderInput = document.getElementById('card-holder-input');
    const cardExpiryMonth = document.getElementById('card-expiry-month');
    const cardExpiryYear = document.getElementById('card-expiry-year');
    const cardCvvInput = document.getElementById('card-cvv-input');
    const cardForm = document.getElementById('card-form');

    const cardNumber = document.getElementById('card-number');
    const cardHolder = document.getElementById('card-holder');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    const card = document.getElementById('card');

    cardNumberInput.addEventListener('input', () => {
        let value = cardNumberInput.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
        if (value.length > 16) {
            value = value.substring(0, 16);
        }
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        cardNumber.textContent = formattedValue ? formattedValue : '1234 **** **** 2355';
    });

    cardHolderInput.addEventListener('input', () => {
        cardHolder.textContent = cardHolderInput.value.trim() || 'Имя Фамилия';
    });

    cardExpiryMonth.addEventListener('change', updateExpiryDate);
    cardExpiryYear.addEventListener('change', updateExpiryDate);

    function updateExpiryDate() {
        const month = cardExpiryMonth.value;
        const year = cardExpiryYear.value.substring(2, 4);
        cardExpiry.textContent = (month && year) ? `${month}/${year}` : 'MM/YY';
    }

    cardCvvInput.addEventListener('input', () => {
        cardCvv.textContent = cardCvvInput.value.replace(/[^0-9]/g, '').substring(0, 3) || 'CVV';
    });

    cardCvvInput.addEventListener('focus', () => {
        card.classList.add('flip');
    });

    cardCvvInput.addEventListener('blur', () => {
        card.classList.remove('flip');
    });

    cardForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;

        // Validate card number
        const cardNumberValue = cardNumberInput.value.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cardNumberValue)) {
            showError('card-number-error', 'Invalid card number');
            isValid = false;
        } else {
            hideError('card-number-error');
        }

        // Validate card holder name
        if (cardHolderInput.value.trim() === '') {
            showError('card-holder-error', 'Card holder name is required');
            isValid = false;
        } else {
            hideError('card-holder-error');
        }

        // Validate expiration date
        if (cardExpiryMonth.value === '' || cardExpiryYear.value === '') {
            showError('card-expiry-error', 'Expiration date is required');
            isValid = false;
        } else {
            hideError('card-expiry-error');
        }

        // Validate CVV
        if (!/^\d{3}$/.test(cardCvvInput.value)) {
            showError('card-cvv-error', 'Invalid CVV');
            isValid = false;
        } else {
            hideError('card-cvv-error');
        }

        if (isValid) {
            alert('Form submitted successfully!');
            cardForm.reset();
            cardNumber.textContent = '1234 **** **** 2355';
            cardHolder.textContent = 'Имя Фамилия';
            cardExpiry.textContent = 'MM/YY';
            cardCvv.textContent = 'CVV';
        }
    });

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
});
