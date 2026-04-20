// =======================
// ORIENTAÇÃO E INSTALAÇÃO
// Utilitário compartilhado entre todas as páginas do jogo.
// =======================

let _installPrompt = null;

function lockLandscapeOrientation() {
    if (screen.orientation && typeof screen.orientation.lock === 'function') {
        screen.orientation.lock('landscape').catch((error) => {
            console.debug('Falha ao bloquear orientação em paisagem:', error);
        });
    }
}

function setupOrientationLock() {
    lockLandscapeOrientation();
    window.addEventListener('orientationchange', lockLandscapeOrientation);
    document.addEventListener('fullscreenchange', lockLandscapeOrientation);
    document.addEventListener('webkitfullscreenchange', lockLandscapeOrientation);
    window.addEventListener('click', lockLandscapeOrientation, { once: true });
    window.addEventListener('touchstart', lockLandscapeOrientation, { once: true, passive: true });
}

function setupInstallPrompt() {
    const installPromptEl = document.getElementById('installPrompt');
    const installBtn = document.getElementById('installBtn');
    const dismissBtn = document.getElementById('dismissBtn');
    const forcePromptDebug = new URLSearchParams(window.location.search).has('debug-install');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (!installPromptEl || !installBtn || !dismissBtn) {
        return;
    }

    if (isStandalone && !forcePromptDebug) {
        installPromptEl.classList.add('hidden');
    } else if (forcePromptDebug) {
        installPromptEl.classList.remove('hidden');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        _installPrompt = e;
        installPromptEl.classList.remove('hidden');
    });

    installBtn.addEventListener('click', () => {
        if (_installPrompt) {
            _installPrompt.prompt();
            _installPrompt.userChoice.then(() => {
                _installPrompt = null;
                installPromptEl.classList.add('hidden');
            });
        } else if (forcePromptDebug) {
            alert('O evento de instalação ainda não foi disparado neste navegador.');
        }
    });

    dismissBtn.addEventListener('click', () => {
        installPromptEl.classList.add('hidden');
    });

    window.addEventListener('appinstalled', () => {
        _installPrompt = null;
        installPromptEl.classList.add('hidden');
    });
}
