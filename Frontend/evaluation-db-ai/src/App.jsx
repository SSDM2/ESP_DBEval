import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {

  return (
   <>
   <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-cyan-800 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">DBEval AI Platform</h1>
          <p className="mt-2 text-lg">Automated Database Exercise Grading Platform</p>
        </div>
      </header>

      {/* Main Section */}
      <main>
        <section className="bg-light py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900">Welcome to DBEval AI</h2>
              <p className="mt-4 text-lg text-gray-600">
                A cutting-edge platform that helps professors assess database exercises with the power of AI. Students can submit their work and receive instant feedback and grading on their SQL queries and database-related tasks.
              </p>
              <div className="mt-8 flex justify-center gap-6">
                <a
                  href="#professors"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  For Professors
                </a>
                <a
                  href="#students"
                  className="bg-gray-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all duration-300"
                >
                  For Students
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; 2025 DBEval AI. All rights reserved.</p>
          <p className="text-sm mt-2">Made with ❤️ for educators and students.</p>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
