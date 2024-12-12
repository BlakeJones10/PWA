import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the default mini-infobar from appearing
            e.preventDefault();
            // Save the event for later use
            setDeferredPrompt(e);
            // Make the install button visible
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (!deferredPrompt) return;
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user's response
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Clear the deferred prompt so it can only be used once
            setDeferredPrompt(null);
            setIsInstallable(false);
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello, World!</h1>
                <p>Welcome to your first React PWA!</p>
                {isInstallable && (
                    <button onClick={handleInstallClick} className="install-button">
                        Install App
                    </button>
                )}
            </header>
        </div>
    );
}

export default App;