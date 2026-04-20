// =======================
// ORIENTAÇÃO
// Utilitário compartilhado entre todas as páginas do jogo.
// =======================

const MAX_MOBILE_DIMENSION = 1024;
let _resizeRafId = null;
let _orientationLockInitialized = false;

function syncLandscapeFallback() {
    if (!document.body) {
        document.addEventListener('DOMContentLoaded', syncLandscapeFallback, { once: true });
        return;
    }

    const isLikelyMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    const isSmallScreen = Math.max(window.innerWidth, window.innerHeight) <= MAX_MOBILE_DIMENSION;
    const shouldForceLandscape = isLikelyMobile && isPortrait && isSmallScreen;

    document.body.classList.toggle('force-landscape-fallback', shouldForceLandscape);
}

function lockLandscapeOrientation() {
    if (screen.orientation && typeof screen.orientation.lock === 'function') {
        screen.orientation.lock('landscape').catch((error) => {
            console.debug('Falha ao bloquear orientação em paisagem:', error);
        });
    }

    syncLandscapeFallback();
}

function setupOrientationLock() {
    if (_orientationLockInitialized) {
        lockLandscapeOrientation();
        return;
    }

    _orientationLockInitialized = true;
    syncLandscapeFallback();
    lockLandscapeOrientation();
    window.addEventListener('orientationchange', lockLandscapeOrientation);
    window.addEventListener('resize', () => {
        if (_resizeRafId !== null) {
            return;
        }

        _resizeRafId = window.requestAnimationFrame(() => {
            _resizeRafId = null;
            syncLandscapeFallback();
        });
    });
    document.addEventListener('fullscreenchange', lockLandscapeOrientation);
    document.addEventListener('webkitfullscreenchange', lockLandscapeOrientation);
    window.addEventListener('click', lockLandscapeOrientation, { once: true });
    window.addEventListener('touchstart', lockLandscapeOrientation, { once: true, passive: true });
}
