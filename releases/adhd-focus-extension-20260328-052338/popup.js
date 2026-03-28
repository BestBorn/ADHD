// Load the ADHD Focus app in the popup
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app-container');

    // Check if running in development (localhost)
    const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

    if (isDev) {
        // Development mode - load from localhost
        const appUrl = 'http://localhost:3000';

        const iframe = document.createElement('iframe');
        iframe.src = appUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        container.innerHTML = '';
        container.appendChild(iframe);
    } else {
        // Production mode - would need bundled app
        container.innerHTML = `
            <div class="loading" style="color: #ef4444; text-align: center; flex-direction: column; gap: 20px;">
                <span>⚠️ Production Mode</span>
                <p style="font-size: 14px; color: #6b7280;">
                    Please run: <code style="background: #fff; padding: 4px 8px; border-radius: 4px; display: inline-block;">npm run dev</code>
                </p>
            </div>
        `;
    }
});
