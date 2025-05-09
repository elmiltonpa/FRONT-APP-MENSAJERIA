export const getUserIdFromToken = () => {
    try {
        const session = JSON.parse(localStorage.getItem('session'))
        if (!session || !session.token) return null
        
        // El token JWT tiene 3 partes separadas por puntos
        const payload = session.token.split('.')[1]
        // Decodificar la parte del payload (que está en base64)
        const decodedPayload = JSON.parse(atob(payload))
        return decodedPayload.userId
    } catch (error) {
        console.error('Error al decodificar el token:', error)
        return null
    }
}

export const getSession = () => {
    try {
        const session = JSON.parse(localStorage.getItem('session'))
        if (!session || !session.token) return null
        
        const userId = getUserIdFromToken()
        return {
            ...session,
            userId
        }
    } catch (error) {
        console.error('Error al obtener la sesión:', error)
        return null
    }
} 