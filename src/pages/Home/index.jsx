import { useEffect } from 'react'

/**
 * Root element of the app
 */
function Home() {
  useEffect(() => {
    document.title = 'HRnet'
  }, [])

  return <main className="home"></main>
}

export default Home
