// === Replace with your local Flask API endpoint ===
const API_URL = "http://127.0.0.1:5000/scrape_post";

// Get all visible posts
const posts = document.querySelectorAll('div.feed-shared-update-v2'); // LinkedIn post container

posts.forEach(post => {
    const author = post.querySelector('span.feed-shared-actor__name')?.innerText.trim() || '';
    const content = post.querySelector('div.feed-shared-update-v2__description')?.innerText.trim() || '';
    const postLink = post.querySelector('a.feed-shared-control-link')?.href || '';
    const date = post.querySelector('span.feed-shared-actor__sub-description > span.visually-hidden')?.innerText.trim() || '';

    if (author && content) {
        // Send data to local API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, content, postLink, date })
        })
        .then(res => res.json())
        .then(data => console.log('Sent:', data))
        .catch(err => console.error('Error:', err));
    }
});

console.log(`✅ Sent ${posts.length} posts to API.`);
