/**
 * Noshi v2.0 - Phase 7: Noshi.store()
 * A lightweight reactive state manager.
 * No dependencies. Subscribe, compute, persist — all built in.
 */

const store = (function() {

    const _state     = {};
    const _listeners = {};
    const _computed  = {};

    // ── Internal: notify all listeners for a key
    function _notify(key) {
        const val = _state[key];
        (_listeners[key] || []).forEach(fn => {
            try { fn(val, key); } catch(e) { console.error('Noshi.store listener error:', e); }
        });
        // recompute any computed values that depend on this key
        Object.keys(_computed).forEach(cKey => {
            if (_computed[cKey].deps.includes(key)) {
                _state[cKey] = _computed[cKey].fn(_state);
                _notify(cKey);
            }
        });
    }

    return {

        /**
         * Set a value in the store.
         * store.set('count', 5)
         * store.set('user', { name: 'Anas' })
         */
        set(key, value) {
            _state[key] = value;
            _notify(key);
            return this;
        },

        /**
         * Get a value from the store.
         * store.get('count') // 5
         */
        get(key) {
            return _state[key];
        },

        /**
         * Get all state as a snapshot object.
         */
        getAll() {
            return Object.assign({}, _state);
        },

        /**
         * Subscribe to changes on a key.
         * Returns an unsubscribe function.
         *
         * const unsub = store.on('count', (val) => console.log(val));
         * unsub(); // stop listening
         */
        on(key, fn) {
            if (!_listeners[key]) _listeners[key] = [];
            _listeners[key].push(fn);
            // call immediately with current value if it exists
            if (_state[key] !== undefined) fn(_state[key], key);
            return () => this.off(key, fn);
        },

        /**
         * Unsubscribe a specific listener from a key.
         */
        off(key, fn) {
            if (_listeners[key]) {
                _listeners[key] = _listeners[key].filter(f => f !== fn);
            }
            return this;
        },

        /**
         * Remove all listeners for a key.
         */
        clear(key) {
            if (key) {
                delete _listeners[key];
                delete _state[key];
            } else {
                Object.keys(_listeners).forEach(k => delete _listeners[k]);
                Object.keys(_state).forEach(k => delete _state[k]);
            }
            return this;
        },

        /**
         * Update a key using a function (like React's setState updater).
         * store.update('count', n => n + 1)
         */
        update(key, fn) {
            const current = _state[key];
            this.set(key, fn(current));
            return this;
        },

        /**
         * Define a computed value that auto-updates when dependencies change.
         *
         * store.compute('fullName', ['first', 'last'], (state) =>
         *     `${state.first} ${state.last}`
         * );
         */
        compute(key, deps, fn) {
            _computed[key] = { deps, fn };
            _state[key] = fn(_state);
            _notify(key);
            return this;
        },

        /**
         * Persist a key to localStorage. Restores on init.
         * store.persist('theme', 'light')
         */
        persist(key, defaultValue) {
            const saved = localStorage.getItem('noshi_store_' + key);
            const initial = saved !== null ? JSON.parse(saved) : defaultValue;
            this.set(key, initial);
            this.on(key, val => {
                localStorage.setItem('noshi_store_' + key, JSON.stringify(val));
            });
            return this;
        },

        /**
         * Bind a store key directly to an element's property.
         * Automatically updates the element when state changes.
         *
         * store.bind('username', Noshi._('#welcome'), 'textContent')
         * store.bind('isDark', toggleBtn, 'checked')
         */
        bind(key, element, prop) {
            if (!element) return this;
            this.on(key, val => { element[prop] = val; });
            return this;
        },

        /**
         * Batch multiple set() calls into one notification cycle.
         * store.batch({ count: 0, user: null, loading: false })
         */
        batch(obj) {
            Object.keys(obj).forEach(key => { _state[key] = obj[key]; });
            Object.keys(obj).forEach(key => _notify(key));
            return this;
        }

    };
})();
