// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initBackgroundAnimations();
    initSurpriseButton();
    initScrollAnimations();
    initMusicPlayer();
    
    // Music player state
    let musicPlaying = false;
    let audioLoaded = false;
    let currentVolume = 0.7;
    
    // Create background animation elements
    function initBackgroundAnimations() {
        createHearts();
        createConfetti();
        createCakes();
    }
    
    // Create falling hearts
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        const heartEmojis = ['💖', '💕', '💗', '💝', '❤️', '💜', '🧡', '💛'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }
        
        // Create hearts at intervals
        setInterval(createHeart, 800);
        
        // Create initial hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 200);
        }
    }
    
    // Create falling confetti
    function createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#FFB3BA', '#FF677D', '#D4A5A5', '#FFD700', '#FFA07A', '#98FB98', '#87CEEB', '#DDA0DD'];
        
        function createConfettiPiece() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 4) + 's';
            
            // Random shape
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
                confetti.style.width = (Math.random() * 6 + 4) + 'px';
                confetti.style.height = confetti.style.width;
            } else {
                confetti.style.width = (Math.random() * 8 + 4) + 'px';
                confetti.style.height = (Math.random() * 8 + 4) + 'px';
                confetti.style.borderRadius = '2px';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 6000);
        }
        
        // Create confetti at intervals
        setInterval(createConfettiPiece, 300);
        
        // Create initial confetti
        for (let i = 0; i < 10; i++) {
            setTimeout(createConfettiPiece, i * 100);
        }
    }
    
    // Create floating cakes
    function createCakes() {
        const cakesContainer = document.querySelector('.cakes-container');
        const cakeEmojis = ['🎂', '🧁', '🍰', '🎂', '🧁'];
        
        function createCake() {
            const cake = document.createElement('div');
            cake.className = 'cake';
            cake.textContent = cakeEmojis[Math.floor(Math.random() * cakeEmojis.length)];
            cake.style.left = Math.random() * 100 + '%';
            cake.style.animationDelay = Math.random() * 3 + 's';
            cake.style.animationDuration = (Math.random() * 4 + 8) + 's';
            cake.style.fontSize = (Math.random() * 10 + 20) + 'px';
            cakesContainer.appendChild(cake);
            
            // Remove cake after animation completes
            setTimeout(() => {
                if (cake.parentNode) {
                    cake.parentNode.removeChild(cake);
                }
            }, 12000);
        }
        
        // Create cakes at intervals
        setInterval(createCake, 2000);
        
        // Create initial cake
        setTimeout(createCake, 1000);
    }
    
    // Create floating music notes
    function createMusicNotes() {
        const musicNotesContainer = document.querySelector('.music-notes-container');
        const musicNotes = ['♪', '♫', '♬', '🎵', '🎶', '♩', '♭', '♯'];
        
        function createMusicNote() {
            if (!musicPlaying) return;
            
            const note = document.createElement('div');
            note.className = 'music-note';
            note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)];
            note.style.left = Math.random() * 100 + '%';
            note.style.animationDelay = Math.random() * 1 + 's';
            note.style.animationDuration = (Math.random() * 2 + 4) + 's';
            note.style.fontSize = (Math.random() * 8 + 16) + 'px';
            musicNotesContainer.appendChild(note);
            
            // Remove note after animation completes
            setTimeout(() => {
                if (note.parentNode) {
                    note.parentNode.removeChild(note);
                }
            }, 6000);
        }
        
        // Create music notes at intervals when playing
        setInterval(createMusicNote, 800);
        
        // Create initial notes if music is playing
        for (let i = 0; i < 3; i++) {
            setTimeout(createMusicNote, i * 300);
        }
    }
    
    // Initialize music player functionality
    function initMusicPlayer() {
        const audio = document.getElementById('birthdayAudio');
        const musicToggle = document.getElementById('musicToggle');
        const heroMusicBtn = document.getElementById('heroMusicBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeBtn = document.getElementById('volumeBtn');
        const musicStatus = document.getElementById('musicStatus');
        const floatingIndicator = document.getElementById('floatingIndicator');
        const audioError = document.getElementById('audioError');
        const musicNotesContainer = document.querySelector('.music-notes-container');
        
        // Set initial volume
        if (audio) {
            audio.volume = currentVolume;
            volumeSlider.value = currentVolume * 100;
        }
        
        // Check if audio can be loaded
        if (audio) {
            audio.addEventListener('canplaythrough', () => {
                audioLoaded = true;
                hideAudioError();
            });
            
            audio.addEventListener('error', () => {
                showAudioError();
                audioLoaded = false;
            });
            
            // Try to load the audio
            audio.load();
        }
        
        // Music toggle functionality
        function toggleMusic() {
            if (!audio || !audioLoaded) {
                showAudioError();
                return;
            }
            
            if (musicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        }
        
        function playMusic() {
            if (!audio || !audioLoaded) return;
            
            // Fade in audio
            audio.volume = 0;
            audio.play().then(() => {
                musicPlaying = true;
                fadeInAudio();
                updateMusicUI();
                startMusicNotes();
                updateMusicStatus('🎵 Playing Happy Birthday Song! 🎵');
                
                // Show floating indicator
                setTimeout(() => {
                    floatingIndicator.classList.add('show');
                }, 500);
                
            }).catch(error => {
                console.log('Audio play failed:', error);
                showAudioError();
            });
        }
        
        function pauseMusic() {
            if (!audio) return;
            
            fadeOutAudio(() => {
                audio.pause();
                musicPlaying = false;
                updateMusicUI();
                stopMusicNotes();
                updateMusicStatus('🎧 Turn on sound for full experience!');
                floatingIndicator.classList.remove('show');
            });
        }
        
        function fadeInAudio() {
            const fadeInterval = setInterval(() => {
                if (audio.volume < currentVolume) {
                    audio.volume = Math.min(audio.volume + 0.1, currentVolume);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 100);
        }
        
        function fadeOutAudio(callback) {
            const fadeInterval = setInterval(() => {
                if (audio.volume > 0.1) {
                    audio.volume = Math.max(audio.volume - 0.1, 0);
                } else {
                    audio.volume = 0;
                    clearInterval(fadeInterval);
                    if (callback) callback();
                }
            }, 100);
        }
        
        function updateMusicUI() {
            const playingClass = 'playing';
            const playText = '▶️ Play Birthday Song';
            const pauseText = '⏸️ Pause Song';
            
            if (musicPlaying) {
                musicToggle.classList.add(playingClass);
                musicToggle.querySelector('.music-text').textContent = 'Now Playing';
                heroMusicBtn.classList.add(playingClass);
                heroMusicBtn.querySelector('.hero-music-text').textContent = 'Music Playing';
            } else {
                musicToggle.classList.remove(playingClass);
                musicToggle.querySelector('.music-text').textContent = 'Play Song';
                heroMusicBtn.classList.remove(playingClass);
                heroMusicBtn.querySelector('.hero-music-text').textContent = 'Play Birthday Song';
            }
        }
        
        function startMusicNotes() {
            musicNotesContainer.classList.add('playing');
            createMusicNotes();
        }
        
        function stopMusicNotes() {
            musicNotesContainer.classList.remove('playing');
        }
        
        function updateMusicStatus(text) {
            const statusText = musicStatus.querySelector('.status-text');
            statusText.textContent = text;
            
            if (musicPlaying) {
                musicStatus.classList.add('playing');
            } else {
                musicStatus.classList.remove('playing');
            }
            
            // Hide status after 3 seconds if music is playing
            if (musicPlaying) {
                setTimeout(() => {
                    musicStatus.classList.add('hidden');
                }, 3000);
            } else {
                musicStatus.classList.remove('hidden');
            }
        }
        
        function showAudioError() {
            audioError.classList.remove('hidden');
            setTimeout(() => {
                audioError.classList.add('hidden');
            }, 4000);
        }
        
        function hideAudioError() {
            audioError.classList.add('hidden');
        }
        
        // Volume control
        function updateVolume(value) {
            currentVolume = value / 100;
            if (audio) {
                audio.volume = currentVolume;
            }
            
            // Update volume button icon
            if (currentVolume === 0) {
                volumeBtn.textContent = '🔇';
            } else if (currentVolume < 0.5) {
                volumeBtn.textContent = '🔉';
            } else {
                volumeBtn.textContent = '🔊';
            }
        }
        
        function toggleMute() {
            if (currentVolume > 0) {
                // Mute
                volumeSlider.dataset.previousValue = currentVolume * 100;
                volumeSlider.value = 0;
                updateVolume(0);
            } else {
                // Unmute
                const previousValue = volumeSlider.dataset.previousValue || 70;
                volumeSlider.value = previousValue;
                updateVolume(previousValue);
            }
        }
        
        // Event listeners
        if (musicToggle) {
            musicToggle.addEventListener('click', toggleMusic);
        }
        
        if (heroMusicBtn) {
            heroMusicBtn.addEventListener('click', toggleMusic);
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                updateVolume(e.target.value);
            });
        }
        
        if (volumeBtn) {
            volumeBtn.addEventListener('click', toggleMute);
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case ' ': // Spacebar
                    e.preventDefault();
                    toggleMusic();
                    break;
                case 'm':
                case 'M':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const currentVol = parseInt(volumeSlider.value);
                    const newVol = Math.min(currentVol + 10, 100);
                    volumeSlider.value = newVol;
                    updateVolume(newVol);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const currentVolDown = parseInt(volumeSlider.value);
                    const newVolDown = Math.max(currentVolDown - 10, 0);
                    volumeSlider.value = newVolDown;
                    updateVolume(newVolDown);
                    break;
            }
        });
        
        // Audio ended event (though it loops)
        if (audio) {
            audio.addEventListener('ended', () => {
                if (musicPlaying) {
                    audio.currentTime = 0;
                    audio.play();
                }
            });
        }
        
        // Initialize music notes creation
        createMusicNotes();
        
        // Initial status
        updateMusicStatus('🎧 Turn on sound for full experience!');
    }
    
    // Handle surprise button functionality
    function initSurpriseButton() {
        const surpriseBtn = document.getElementById('surpriseBtn');
        const surpriseMessage = document.getElementById('surpriseMessage');
        
        if (surpriseBtn && surpriseMessage) {
            // Add transition property to button for smooth hiding
            surpriseBtn.style.transition = 'all 0.3s ease';
            
            surpriseBtn.addEventListener('click', function() {
                // Prevent multiple clicks
                if (surpriseBtn.classList.contains('clicked')) {
                    return;
                }
                surpriseBtn.classList.add('clicked');
                
                // Add click effect
                surpriseBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    surpriseBtn.style.transform = '';
                }, 150);
                
                // Show surprise message with animation
                surpriseMessage.classList.remove('hidden');
                setTimeout(() => {
                    surpriseMessage.classList.add('show');
                }, 100);
                
                // Create celebration effect
                createCelebrationEffect();
                
                // Hide button after showing message
                setTimeout(() => {
                    surpriseBtn.style.opacity = '0';
                    surpriseBtn.style.transform = 'scale(0.8)';
                    surpriseBtn.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        surpriseBtn.style.display = 'none';
                    }, 300);
                }, 1200);
                
                // Scroll to message smoothly
                setTimeout(() => {
                    surpriseMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 1500);
            });
        }
    }
    
    // Create celebration effect when surprise is revealed
    function createCelebrationEffect() {
        const celebrationContainer = document.createElement('div');
        celebrationContainer.style.position = 'fixed';
        celebrationContainer.style.top = '0';
        celebrationContainer.style.left = '0';
        celebrationContainer.style.width = '100%';
        celebrationContainer.style.height = '100%';
        celebrationContainer.style.pointerEvents = 'none';
        celebrationContainer.style.zIndex = '9999';
        document.body.appendChild(celebrationContainer);
        
        // Create burst of hearts and sparkles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createCelebrationHeart(celebrationContainer);
                createCelebrationSparkle(celebrationContainer);
            }, i * 50);
        }
        
        // Remove celebration container after animation
        setTimeout(() => {
            if (document.body.contains(celebrationContainer)) {
                document.body.removeChild(celebrationContainer);
            }
        }, 3000);
    }
    
    function createCelebrationHeart(container) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `celebration-burst 2s ease-out forwards`;
        
        const randomAngle = Math.random() * 360;
        const randomDistance = Math.random() * 200 + 100;
        heart.style.setProperty('--angle', randomAngle + 'deg');
        heart.style.setProperty('--distance', randomDistance + 'px');
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
    
    function createCelebrationSparkle(container) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `celebration-burst 2.5s ease-out forwards`;
        
        const randomAngle = Math.random() * 360;
        const randomDistance = Math.random() * 150 + 80;
        sparkle.style.setProperty('--angle', randomAngle + 'deg');
        sparkle.style.setProperty('--distance', randomDistance + 'px');
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2500);
    }
    
    // Add celebration burst animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebration-burst {
            0% {
                transform: translate(-50%, -50%) rotate(0deg) scale(0);
                opacity: 1;
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) 
                          translateX(var(--distance)) 
                          rotate(var(--angle)) 
                          scale(1.2);
            }
            100% {
                transform: translate(-50%, -50%) 
                          translateX(calc(var(--distance) * 1.5)) 
                          rotate(calc(var(--angle) + 180deg)) 
                          scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize scroll animations
    function initScrollAnimations() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const animatedElements = document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '50px'
            });
            
            // Initially hide elements
            animatedElements.forEach(element => {
                element.style.opacity = '0';
                if (element.classList.contains('animate-slide-in-left')) {
                    element.style.transform = 'translateX(-50px)';
                } else {
                    element.style.transform = 'translateX(50px)';
                }
                element.style.transition = 'all 0.8s ease-out';
                observer.observe(element);
            });
        }
    }
    
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add entrance animations to hero elements
    function addEntranceAnimations() {
        const heroElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-fade-in-delayed, .animate-bounce');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Initialize entrance animations
    setTimeout(addEntranceAnimations, 500);
    
    // Add sparkle effect to surprise button
    function addSparkleEffect() {
        const surpriseBtn = document.getElementById('surpriseBtn');
        if (surpriseBtn) {
            surpriseBtn.addEventListener('mouseenter', function() {
                if (!this.classList.contains('clicked')) {
                    createButtonSparkles(this);
                }
            });
        }
    }
    
    function createButtonSparkles(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                sparkle.style.fontSize = '12px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '10000';
                sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }, i * 200);
        }
    }
    
    // Add sparkle fade animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle-fade {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Initialize sparkle effect
    addSparkleEffect();
    
    // Add performance optimization for animations
    let ticking = false;
    
    function optimizeAnimations() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Pause animations when not visible
                if (document.hidden) {
                    document.querySelectorAll('.heart, .confetti, .cake, .music-note').forEach(element => {
                        element.style.animationPlayState = 'paused';
                    });
                } else {
                    document.querySelectorAll('.heart, .confetti, .cake, .music-note').forEach(element => {
                        element.style.animationPlayState = 'running';
                    });
                }
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Listen for visibility change
    document.addEventListener('visibilitychange', optimizeAnimations);
    
    // Console message for the sister
    console.log('🎂 Happy Birthday to the most amazing sister! 💕');
    console.log('This website was made with lots of love by your brother! ❤️');
    console.log('🎵 Press SPACEBAR to play/pause music, M to mute/unmute, Arrow keys to adjust volume');
});

// Handle any errors gracefully
window.addEventListener('error', function(e) {
    console.log('An error occurred, but the birthday celebration continues! 🎉');
});

// Prevent context menu on mobile for better experience
document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('heart') || 
        e.target.classList.contains('confetti') || 
        e.target.classList.contains('cake') ||
        e.target.classList.contains('music-note')) {
        e.preventDefault();
    }
});
// Get elements
const birthdayAudio = document.getElementById("birthdayAudio");
const heroMusicBtn = document.getElementById("heroMusicBtn");
const musicToggle = document.getElementById("musicToggle");
const volumeSlider = document.getElementById("volumeSlider");

// Play/Pause when clicking hero button
heroMusicBtn.addEventListener("click", () => {
  birthdayAudio.play();
});

// Play/Pause when clicking small toggle button
musicToggle.addEventListener("click", () => {
  if (birthdayAudio.paused) {
    birthdayAudio.play();
    musicToggle.querySelector(".music-text").textContent = "Pause Birthday Song";
  } else {
    birthdayAudio.pause();
    musicToggle.querySelector(".music-text").textContent = "Play Birthday Song";
  }
});

// Volume control
volumeSlider.addEventListener("input", (e) => {
  birthdayAudio.volume = e.target.value / 100;
});
