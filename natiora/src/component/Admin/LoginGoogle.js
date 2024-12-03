import React, { useEffect } from 'react';

const GoogleLogin = () => {
    useEffect(() => {
        if (window.google) {
            /* Initialiser Google Sign-In */
            window.google.accounts.id.initialize({
                client_id: '763714605-5limbcd1v6j96sge2j1oonggp9r33im4.apps.googleusercontent.com',
                callback: handleCredentialResponse,
            });

            /* Rendre le bouton Google */
            window.google.accounts.id.renderButton(
                document.getElementById('google-login-button'),
                { theme: 'outline', size: 'large' }
            );
        } else {
            console.error('Le script Google API n\'a pas été chargé.');
        }
    }, []);

    const handleCredentialResponse = async (response) => {
        console.log('Token JWT Google:', response.credential);

        try {
            const res = await fetch('http://localhost:8000/api/auth/google/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: response.credential, // Token JWT Google
                }),
            });

            const data = await res.json();

            if (data.success) {
                console.log(data.message);
                // Rediriger vers le tableau de bord admin
                window.location.href = data.redirect;
            } else {
                console.error('Erreur lors de la connexion:', data.message);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend:', error);
        }
    };

    return <div id="google-login-button"></div>;
};

export default GoogleLogin;
