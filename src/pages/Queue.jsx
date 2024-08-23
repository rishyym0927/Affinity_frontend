import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const Queue = () => {
  const { user } = useContext(AuthContext)
  const [acceptedReq, setAcceptedReq] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAcceptedBoys = async () => {
      setIsLoading(true)
      try {
        const response = await axios.post("http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/getacceptedboys", {
          email: user.email
        })
        setAcceptedReq(response.data)
      } catch (err) {
        console.error("Error fetching accepted boys:", err)
        setError("Failed to fetch accepted boys. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAcceptedBoys()
  }, [user.email])

  console.log(acceptedReq, "acc")

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2>Queue</h2>
      {acceptedReq && acceptedReq.length > 0 ? (
        <ul>
          {acceptedReq.map((boy, index) => (
            <li key={index}>{boy.name || 'Unknown'}</li> // Adjust according to your data structure
          ))}
        </ul>
      ) : (
        <p>No accepted requests found.</p>
      )}
    </div>
  )
}

export default Queue