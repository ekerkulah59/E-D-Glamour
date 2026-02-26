import { motion } from 'framer-motion';

const GalleryImage = ({ image, index = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`image-zoom cursor-pointer rounded-lg overflow-hidden ${
        image.is_featured ? 'col-span-2 row-span-2' : ''
      }`}
      onClick={() => onClick?.(image)}
      data-testid={`gallery-image-${image.id}`}
    >
      <div className="relative aspect-square group">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
          <div className="p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <p className="font-body text-white text-sm font-medium">{image.title}</p>
            <p className="font-body text-white/70 text-xs">{image.event_type}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryImage;
