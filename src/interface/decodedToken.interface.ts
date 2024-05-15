export interface DecodedToken {
    username: string
    email: string
    role: string
    iat: number     // started time of jwt token
    exp: number     // expired time of jwt token
    
    // other properties if present in your token payload
}
