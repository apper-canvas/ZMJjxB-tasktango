import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, CheckCircle, Circle, Clock, AlertTriangle, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

const MainFeature = ({ tasks, onAddTask, onToggleStatus, onDeleteTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTask({
      ...newTask,
      [name]: value
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!newTask.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (newTask.dueDate && new Date(newTask.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Due date cannot be in the past'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      completed: false,
      completedAt: null
    }
    
    onAddTask(task)
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    })
    setIsFormOpen(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-blue-500'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      {/* Add Task Button */}
      {!isFormOpen && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFormOpen(true)}
          className="w-full py-3 px-4 mb-6 rounded-xl border-2 border-dashed border-primary/30 dark:border-primary/20 
                    text-primary dark:text-primary-light flex items-center justify-center 
                    hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </motion.button>
      )}
      
      {/* Task Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-5 shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Create New Task</h3>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="What needs to be done?"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="input-field"
                    placeholder="Add details about this task..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                      className={`input-field ${errors.dueDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.dueDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={newTask.priority}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 mb-4">
            <CheckCircle className="w-8 h-8 text-surface-400 dark:text-surface-500" />
          </div>
          <h3 className="text-lg font-medium mb-1">No tasks yet</h3>
          <p className="text-surface-500 dark:text-surface-400">
            Add a new task to get started
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className={`task-card ${task.status === 'completed' ? 'border-l-4 border-l-green-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleStatus(task.id)}
                    className="mt-1 flex-shrink-0"
                    aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-surface-400 hover:text-primary transition-colors" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-lg mb-1 ${task.status === 'completed' ? 'line-through text-surface-400 dark:text-surface-500' : ''}`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className={`text-sm mb-3 ${task.status === 'completed' ? 'text-surface-400 dark:text-surface-500' : 'text-surface-600 dark:text-surface-300'}`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center">
                        <span className={`priority-dot ${getPriorityColor(task.priority)}`}></span>
                        <span className="capitalize text-surface-500 dark:text-surface-400">
                          {task.priority} priority
                        </span>
                      </div>
                      
                      {task.dueDate && (
                        <div className="flex items-center text-surface-500 dark:text-surface-400">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                      
                      {task.status === 'completed' && task.completedAt && (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          <span>Completed {format(new Date(task.completedAt), 'MMM d')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 rounded-full text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}

export default MainFeature