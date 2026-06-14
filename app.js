document.addEventListener('DOMContentLoaded', () => {
    // ── Search Index ──────────────────────────────────────────────
    const searchIndex = [
        // Additional Materials
        { terms: ['dibond', 'acm', 'aluminum composite'],           url: 'Services/additional-materials.html#dibond',          label: 'Dibond ACM' },
        { terms: ['sintra', 'pvc', 'sintra pvc'],                   url: 'Services/additional-materials.html#sintra',          label: 'Sintra PVC' },
        { terms: ['lamination', 'clear lamination', 'laminate'],    url: 'Services/additional-materials.html#lamination',      label: 'Clear Lamination' },
        { terms: ['led', 'led strip', 'led lighting', 'led lights'], url: 'Services/additional-materials.html#led-lighting',    label: 'LED Strip Lighting' },

        // Metal Sign Frames
        { terms: ['slide in', 'slide-in', 'slide in frames'],       url: 'Services/metal-frames.html#slide-in-frames',         label: 'Slide-In Frames' },
        { terms: ['folding', 'folding frames'],                     url: 'Services/metal-frames.html#folding-frames',          label: 'Folding Frames' },
        { terms: ['t bar', 't-bar', 'stake', 't bar stake'],        url: 'Services/metal-frames.html#t-bar-stake',            label: 'T-Bar Stake' },
        { terms: ['top bottom rider', 'top and bottom rider'],      url: 'Services/metal-frames.html#top-bottom-rider',       label: 'Top & Bottom Rider' },
        { terms: ['top rider'],                                     url: 'Services/metal-frames.html#top-rider',              label: 'Top Rider' },
        { terms: ['bottom rider'],                                  url: 'Services/metal-frames.html#bottom-rider',           label: 'Bottom Rider' },
        { terms: ['wire stake', 'wire stakes'],                     url: 'Services/metal-frames.html#wire-stakes',            label: 'Wire Stakes' },

        // Full service pages
        { terms: ['banner', 'full color banner', 'vinyl banner'],   url: 'Services/full-color-banners.html',                   label: 'Full Color Banners' },
        { terms: ['mesh banner', 'polyester banner'],               url: 'Services/mesh-banners.html',                         label: 'Mesh Banners' },
        { terms: ['coroplast', 'corrugated plastic', 'yard sign'],  url: 'Services/coroplast.html',                            label: 'Coroplast Signs' },
        { terms: ['aluminum sign', 'aluminum'],                     url: 'Services/aluminum-signs.html',                       label: 'Aluminum Signs' },
        { terms: ['perforated vinyl', 'window graphic'],            url: 'Services/perforated-vinyl.html',                     label: 'Perforated Vinyl Window Graphics' },
        { terms: ['magnetic sign', 'car magnet', 'vehicle magnet'], url: 'Services/magnetic-signs.html',                       label: 'Magnetic Signs' },
        { terms: ['vinyl lettering', 'window lettering'],           url: 'Services/vinyl-lettering.html',                      label: 'Vinyl Lettering' },
        { terms: ['metal frame', 'sign frame'],                     url: 'Services/metal-frames.html',                         label: 'Metal Sign Frames' },
        { terms: ['additional materials', 'dibond', 'sintra', 'lamination', 'led'], url: 'Services/additional-materials.html', label: 'Additional Materials' },
        { terms: ['about', 'about us'],                             url: 'Services/about.html',                                label: 'About Us' },

        // Help & Care — index.html anchors
        { terms: ['artwork', 'file types', 'file format'],          url: '#artwork-files',    label: 'Artwork & File Types' },
        { terms: ['artwork tips', 'art tips'],                      url: '#artwork-tips',     label: 'Artwork Tips' },
        { terms: ['vector', 'bitmap', 'vector vs bitmap'],          url: '#vector-vs-bitmap', label: 'Vector vs Bitmap' },
        { terms: ['art charges', 'setup fee', 'setup fees', 'fonts'], url: '#art-charges',   label: 'Art Charges / Setup Fees' },
        { terms: ['design service', 'design'],                      url: '#design-service',   label: 'Design Service' },
        { terms: ['science of signs', 'text size', 'readability'],  url: '#science-of-signs', label: 'Science of Signs / Text Size Guide' },
        { terms: ['banner care', 'banner installation'],            url: '#banner-care',      label: 'Banner Installation & Care' },
        { terms: ['magnetic care', 'magnet care'],                  url: '#magnetic-care',    label: 'Magnetic Sign Care' },
        { terms: ['vinyl application', 'vinyl guide'],              url: '#vinyl-application', label: 'Vinyl Application Guide' },
        { terms: ['surface prep', 'surface preparation'],           url: '#surface-prep',     label: 'Surface Prep Guide' },
        { terms: ['application materials', 'vinyl materials'],      url: '#application-materials', label: 'Vinyl Application Materials' },
        { terms: ['readability guide', 'sign readability', 'text size guide'], url: '#readability-guide', label: 'Sign Readability Guide' },
    ];

    // ── URL Resolver ──────────────────────────────────────────────
    // Converts a root-relative URL to one that works from the current page
    function resolveUrl(url) {
        // Hash-only URLs work everywhere (handled by smooth scroll)
        if (url.startsWith('#')) return url;
        const isInSubdir = window.location.pathname.includes('/Services/');
        if (isInSubdir) {
            // We're in /Services/ — strip "Services/" prefix or prepend "../"
            if (url.startsWith('Services/')) return url.replace('Services/', '');
            // Must be index page — go up one level
            return '../' + url;
        }
        return url; // At root level, works as-is
    }

    // ── Search UI Setup ───────────────────────────────────────────
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    // Prevent form submission if search input is inside a form
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
    });

    let searchTimeout = null;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        const results = [];
        const queryWords = query.split(/\s+/).filter(w => w.length > 0);

        for (const item of searchIndex) {
            let score = 0;
            // Check each search term phrase
            for (const term of item.terms) {
                if (term === query) {
                    score += 100; // exact match
                } else if (term.startsWith(query)) {
                    score += 50; // prefix match
                } else if (term.includes(query)) {
                    score += 30; // substring match
                } else {
                    // Multi-word: check if all query words appear in any term
                    const allWordsFound = queryWords.every(w =>
                        item.terms.some(t => t.includes(w))
                    );
                    if (allWordsFound) score += 20;
                }
            }
            if (score > 0) {
                results.push({ item, score });
            }
        }

        // Sort by score descending
        results.sort((a, b) => b.score - a.score);
        // Limit to top 10
        const topResults = results.slice(0, 10);

        if (topResults.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item search-no-results">No results found</div>';
            searchResults.classList.add('active');
            return;
        }

        searchResults.innerHTML = topResults.map(r => {
            const resolvedUrl = resolveUrl(r.item.url);
            return `<a href="${resolvedUrl}" class="search-result-item" data-url="${resolvedUrl}">${r.item.label}</a>`;
        }).join('');
        searchResults.classList.add('active');
        }, 150); // Debounce search
    });

    // Close results on click outside
    document.addEventListener('click', (e) => {
        const wrapper = searchInput.closest('.search-bar') || searchInput.closest('.search-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Close results on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
            searchInput.blur();
        }
    });

    // ── Hamburger Menu ────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }

    // ── Smooth Scrolling (debounced) ────────────────────────────
    let scrollTimeout = null;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (scrollTimeout) return; // Ignore rapid clicks
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollTimeout = setTimeout(() => { scrollTimeout = null; }, 400);
                try {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } catch (err) {
                    window.scrollTo(0, target.offsetTop - 80);
                }
            }
        });
    });

    // ── Scroll Effect for Header ──────────────────────────────────
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }
});
