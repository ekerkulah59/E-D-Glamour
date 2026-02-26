import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import { blogApi } from '../lib/api';
import { Button } from '../components/ui/button';

const BlogPage = () => {
  const [activeTag, setActiveTag] = useState('all');

  const allPosts = blogApi.getAll().data;
  const allTags = ['all', ...new Set(allPosts.flatMap(post => post.tags))];

  const filteredPosts = activeTag === 'all'
    ? allPosts
    : allPosts.filter(post => post.tags.includes(activeTag));

  return (
    <div className="min-h-screen pt-24" data-testid="blog-page">
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Blog & Inspiration</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Event Ideas & Tips</h1>
            <p className="font-body text-muted-foreground text-lg">
              Get inspired with our latest articles on event trends, planning tips,
              and décor ideas to make your celebration unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-10" data-testid="blog-filters">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full capitalize ${activeTag === tag ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10'}`}
                onClick={() => setActiveTag(tag)}
                data-testid={`blog-filter-${tag}`}
              >
                {tag === 'all' ? 'All Posts' : tag}
              </Button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-muted-foreground">No posts found with this tag.</p>
              <Button variant="link" onClick={() => setActiveTag('all')} className="mt-2 text-primary">View all posts</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} featured={index === 0 && activeTag === 'all'} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Stay Inspired</h2>
          <p className="font-body text-muted-foreground mb-6 max-w-xl mx-auto">Subscribe to our newsletter for the latest event trends and exclusive tips.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full border border-border focus:outline-none focus:border-primary" data-testid="newsletter-email" />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6" data-testid="newsletter-submit">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
