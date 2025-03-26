import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="h-2 w-24 bg-secondary mx-auto my-6 rounded-full"></div>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary inline-flex items-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound