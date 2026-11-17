
import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const jobs = [
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
    'Manager',
    'Marketing Specialist',
    'Graphic Designer',
    'Team Leader',
    'Product Designer',
    'Data Analyst',
    'Software Engineer',
    'Content Creator',
    'Project Manager'
  ]

  function generateTeam() {
    setLoading(true)

    axios.get('https://randomuser.me/api/?results=6')
      .then(response => {
        const newUsers = response.data.results.map(user => ({
          ...user,
          job: jobs[Math.floor(Math.random() * jobs.length)]
        }))

        setUsers(newUsers)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f0000] via-[#c52b0b] to-[#ff7800] text-white p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-2">
          Javani <span className="text-orange-200">Team</span>
        </h1>

        <p className="text-orange-100 text-center mb-8">
          Create your random team
        </p>

        <div className="flex justify-center mb-8">

          <button
            onClick={generateTeam}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 rounded-xl font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Team'}
          </button>

        </div>

        <p className="text-center text-white mb-6">
          Team Members: <span className="font-bold">{users.length}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {users.map(user => (

            <div
              key={user.login.uuid}
              className="bg-[#1b1111]/95 border border-orange-500/40 rounded-2xl p-6 text-center shadow-xl hover:border-orange-400 hover:-translate-y-1 transition"
            >

              <img
                src={user.picture.large}
                alt="User"
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500 mb-4"
              />

              <h2 className="text-xl font-bold">
                {user.name.first} {user.name.last}
              </h2>

              <p className="text-orange-400 mt-2">
                {user.job}
              </p>

              <div className="mt-5 bg-[#2b1b1b] rounded-xl p-4 text-left space-y-2 text-sm text-gray-300">

                <p>Age: {user.dob.age}</p>

                <p>Country: {user.location.country}</p>

                <p>Email: {user.email}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default App
