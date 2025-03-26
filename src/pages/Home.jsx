import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ListTodo, Calendar, BarChart3 } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }
  
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === 'completed' ? 'pending' : 'completed',
            completedAt: task.status === 'completed' ? null : new Date().toISOString()
          } 
        : task
    ))
  }
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => 
        activeTab === 'completed' 
          ? task.status === 'completed' 
          : task.status !== 'completed'
      )
  
  const completedCount = tasks.filter(task => task.status === 'completed').length
  const pendingCount = tasks.length - completedCount
  const completionRate = tasks.length > 0 
    ? Math.round((completedCount / tasks.length) * 100) 
    : 0
  
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 -z-10"></div>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              <span className="text-primary">Task</span>
              <span className="text-secondary">Tango</span>
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
              Organize your tasks with rhythm and flow
            </p>
          </motion.div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card"
            >
              <div className="flex items-center">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg mr-4">
                  <ListTodo className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Pending Tasks</p>
                  <h3 className="text-2xl font-bold">{pendingCount}</h3>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card"
            >
              <div className="flex items-center">
                <div className="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-lg mr-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Completed Tasks</p>
                  <h3 className="text-2xl font-bold">{completedCount}</h3>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card"
            >
              <div className="flex items-center">
                <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-lg mr-4">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Completion Rate</p>
                  <h3 className="text-2xl font-bold">{completionRate}%</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-surface-200 dark:border-surface-700">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors relative
                ${activeTab === 'all' 
                  ? 'text-primary dark:text-primary-light' 
                  : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'}`}
            >
              All Tasks
              {activeTab === 'all' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors relative
                ${activeTab === 'active' 
                  ? 'text-primary dark:text-primary-light' 
                  : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'}`}
            >
              Active
              {activeTab === 'active' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-3 text-sm font-medium flex-1 text-center transition-colors relative
                ${activeTab === 'completed' 
                  ? 'text-primary dark:text-primary-light' 
                  : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'}`}
            >
              Completed
              {activeTab === 'completed' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                />
              )}
            </button>
          </div>
          
          {/* Task Management Feature */}
          <MainFeature 
            tasks={filteredTasks} 
            onAddTask={addTask} 
            onToggleStatus={toggleTaskStatus}
            onDeleteTask={deleteTask}
          />
        </div>
      </section>
    </div>
  )
}

export default Home