import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * Error Page
 */
function Error404() {
  useEffect(() => {
    document.title = 'Erreur 404'
  })

  return (
    <div className="Error404">
      <h1>404</h1>
      <h2>Oups! La page que vous demandez n'existe pas.</h2>
      <Link to="/">Retourner sur la page d’accueil</Link>
    </div>
  )
}

export default Error404
