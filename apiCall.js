// === Replace with your local Flask API endpoint ===
const API_URL = "http://127.0.0.1:5000/scrape_job";

// Get all visible job cards
const jobCards = document.querySelectorAll('.base-card');

jobCards.forEach(card => {
    const title = card.querySelector('.base-search-card__title')?.innerText.trim() || '';
    const company = card.querySelector('.base-search-card__subtitle')?.innerText.trim() || '';
    const location = card.querySelector('.job-search-card__location')?.innerText.trim() || '';
    const link = card.querySelector('a.base-card__full-link')?.href || '';

    if (title && company && link) {
        // Send data to local API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, company, location, link })
        })
        .then(res => res.json())
        .then(data => console.log('Sent:', data))
        .catch(err => console.error('Error:', err));
    }
});

console.log(`✅ Sent ${jobCards.length} job cards to API.`);
