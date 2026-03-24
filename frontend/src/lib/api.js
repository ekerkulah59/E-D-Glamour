// Static data API — no backend required.
// All functions return data synchronously from local static files,
// matching the shape { data: ... } so components work without changes.

import {
  services,
  inventory,
  categories as rentalCategories,
  testimonials,
  gallery,
  faqs,
  blogPosts,
  timeSlots,
  packages,
  contact,
} from '../data';

// Normalize inventory item for components that expect short_description
const normalizeRental = (item) => ({
  ...item,
  short_description: item.short_description ?? item.shortDescription,
});

// ─── Services ────────────────────────────────────────────────────────────────

export const servicesApi = {
  getAll: (category) => {
    const filtered = category
      ? services.filter((s) => s.category === category)
      : services;
    return { data: filtered };
  },
  getById: (id) => {
    const service = services.find((s) => s.id === id);
    return { data: service || null };
  },
};

// ─── Rentals ─────────────────────────────────────────────────────────────────

export const rentalsApi = {
  getAll: (category) => {
    const filtered = category
      ? inventory.filter((r) => r.category === category)
      : inventory;
    return { data: filtered.map(normalizeRental) };
  },
  getById: (id) => {
    const rental = inventory.find((r) => r.id === id);
    return { data: rental ? normalizeRental(rental) : null };
  },
  getCategories: () => ({ data: rentalCategories }),
};

// ─── Packages ─────────────────────────────────────────────────────────────────

export const packagesApi = {
  getAll: () => ({ data: [...packages].sort((a, b) => a.order - b.order) }),
};

export { contact };

// ─── Testimonials ────────────────────────────────────────────────────────────

export const testimonialsApi = {
  getAll: (featuredOnly = false) => {
    const filtered = featuredOnly
      ? testimonials.filter((t) => t.is_featured)
      : testimonials;
    return { data: filtered };
  },
};

// ─── Gallery ─────────────────────────────────────────────────────────────────

export const galleryApi = {
  getAll: (category, featuredOnly = false) => {
    let filtered = gallery;
    if (category) filtered = filtered.filter((g) => g.category === category);
    if (featuredOnly) filtered = filtered.filter((g) => g.is_featured);
    return { data: filtered };
  },
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqApi = {
  getAll: (category) => {
    const filtered = category
      ? faqs.filter((f) => f.category === category)
      : faqs;
    return { data: [...filtered].sort((a, b) => a.order - b.order) };
  },
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export const blogApi = {
  getAll: (tag) => {
    const published = blogPosts.filter((p) => p.is_published);
    const filtered = tag
      ? published.filter((p) => p.tags.includes(tag))
      : published;
    return { data: filtered };
  },
  getBySlug: (slug) => {
    const post = blogPosts.find((p) => p.slug === slug && p.is_published);
    return { data: post || null };
  },
};

// ─── Contact / Quote ─────────────────────────────────────────────────────────

// Serverless function endpoint.
// Vercel: /api/send-quote  |  Netlify: /.netlify/functions/send-quote
// Override via REACT_APP_QUOTE_API env variable.
const QUOTE_API = process.env.REACT_APP_QUOTE_API || '/api/send-quote';

export const contactApi = {
  submitQuote: async (data) => {
    // In local dev (npm start), simulate success so the UI can be tested
    const isLocal = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isLocal) {
      await new Promise((r) => setTimeout(r, 800));
      console.log('[Dev mock] Quote submitted:', data);
      return { data: { message: 'Mock success — deploy to Vercel to send real emails.' } };
    }

    const url = QUOTE_API;
    let res;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (networkErr) {
      const msg = networkErr.message || 'Network error';
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      throw new Error(isLocal
        ? `${msg}. For local testing, run \`vercel dev\` instead of \`npm start\` so the API works.`
        : msg);
    }
    const text = await res.text();
    let json = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      if (!res.ok) {
        throw new Error(
          res.status === 404 && url.startsWith('/')
            ? 'Quote API not found. For local testing, run `vercel dev` instead of `npm start`.'
            : 'Server returned an invalid response. Please try again later.'
        );
      }
    }
    if (!res.ok) {
      throw new Error(json.error || `Request failed (${res.status})`);
    }
    return { data: json };
  },
};
