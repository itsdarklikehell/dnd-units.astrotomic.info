import './app.css';
import "@fontsource/calistoga";
import Alpine from 'alpinejs';
import mapValues from 'lodash/mapValues';
import definition from './definition';

Alpine.data('converter', () => ({
    type: null,
    value: null,
    unit: null,

    definition,

    init() {
        this.$watch('type', value => {
            this.unit = Object.keys(this.definition[value].units)[0];
        });
        this.type = Object.keys(this.definition)[0];
    },

    types() {
        return mapValues(this.definition, d => d.label);
    },
    units(type = null) {
        return mapValues(this.definition[type || this.type].units, u => u.label);
    },
    convert(from, value, to) {
        return (value || 0)
            * (this.definition[this.type]?.units[from]?.multiplier || 0)
            / (this.definition[this.type]?.units[to]?.multiplier || 0);
    }
}));

Alpine.start();


// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) searchInput.focus();
  }
  
  // Ctrl/Cmd + D to toggle dark mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
  }
  
  // Escape to clear input
  if (e.key === 'Escape') {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.value = '');
  }
});
