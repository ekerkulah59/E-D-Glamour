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

// ─── Contact / Quote (client-side only) ──────────────────────────────────────

export const contactApi = {
  submitQuote: (_data) => {
    // In a static site there is no backend to send to.
    // Simulate a successful submission.
    return { data: { message: 'Quote request received' } };
  },
};
