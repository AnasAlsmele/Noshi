(function(global) {
    "use strict";
    
    /* [INJECT_MODULES] */
    
    // Auto-initialize
    global.Noshi.start([
        () => window.NoshiRegistry.init(),
        () => {
            document.querySelectorAll('[data-noshi-menu]').forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const target = document.getElementById(trigger.getAttribute('data-noshi-menu'));
                    if (target) target.classList.toggle('open');
                });
            });
        },
        () => { if (localStorage.getItem('noshi-dark') === 'true') window.Noshi.toggleDarkMode(true); }
    ]);

})(typeof window !== 'undefined' ? window : this);
