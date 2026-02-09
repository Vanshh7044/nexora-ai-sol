import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MorphingBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="inline-flex items-center px-2 py-1 bg-black/60 border border-white/[0.08] rounded-full backdrop-blur-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* "New" Badge */}
      <motion.div
        className="px-3 py-1 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span
          className="text-sm font-bold text-white whitespace-nowrap tracking-tight"
          style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
        >
          New
        </span>
      </motion.div>

      {/* Gap */}
      <motion.div
        animate={{ width: isExpanded ? 8 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* "Relay : Coming Soon" Text */}
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            className="text-sm font-semibold text-white whitespace-nowrap pr-2 tracking-tight"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
          >
            Relay : Coming Soon
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MorphingBadge;