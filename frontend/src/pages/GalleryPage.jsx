import { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryImage from '../components/GalleryImage';
import { galleryApi } from '../lib/api';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent } from '../components/ui/dialog';
import SEO from '../components/SEO';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const allImages = galleryApi.getAll().data;
  const filteredImages = activeFilter === 'all'
    ? allImages
    : allImages.filter(img => img.category === activeFilter);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'wedding', label: 'Weddings' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'birthday', label: 'Birthdays' },
    { value: 'baby_shower', label: 'Baby Showers' },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="gallery-page">
      <SEO
        title="Event Décor Gallery — Weddings, Birthdays &amp; Corporate Events in Delaware"
        description="Browse our photo gallery of stunning event decorations in Dover, Delaware. Weddings, birthday parties, corporate events, baby showers, and 360 photo booth setups."
        canonical="/gallery"
      />
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Our Work</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Gallery & Portfolio</h1>
            <p className="font-body text-muted-foreground text-lg">
              Explore our collection of beautifully decorated events. Each project
              showcases our dedication to creating memorable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-10 justify-center" data-testid="gallery-filters">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeFilter === cat.value ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full ${activeFilter === cat.value ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10'}`}
                onClick={() => setActiveFilter(cat.value)}
                data-testid={`gallery-filter-${cat.value}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-muted-foreground">No images in this category yet.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <GalleryImage key={image.id} image={image} index={index} onClick={setSelectedItem} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedItem && (
            <div className="relative">
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.url}
                  muted
                  playsInline
                  loop
                  autoPlay
                  controls
                  className="w-full h-auto rounded-lg"
                  aria-label={selectedItem.title}
                />
              ) : (
                <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-auto rounded-lg" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                <p className="font-body text-white font-medium">{selectedItem.title}</p>
                <p className="font-body text-white/70 text-sm">{selectedItem.event_type}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Want your event to look this stunning?</h2>
          <p className="font-body text-muted-foreground mb-6">Let's create something beautiful together.</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8" data-testid="gallery-contact-btn" onClick={() => window.location.href = '/contact'}>Start Planning</Button>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
