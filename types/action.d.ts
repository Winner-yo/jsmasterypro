interface signInWithOauthParams { 
    provider: 'google' | 'github',
    providerAccountId: string,
    user: {
        email: string,
        name : string,
        image?: string
    }
}