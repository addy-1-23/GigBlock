import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessageBox({ isOpen, onClose }: MessageBoxProps) {
  // Close modal on pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="message-box-title"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <h2
                id="message-box-title"
                className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white"
              >
                Messages
              </h2>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300">
                Your messages will appear here.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
