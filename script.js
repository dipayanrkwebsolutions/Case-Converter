const input = document.getElementById('input');
const statsEl = document.getElementById('stats');

input.addEventListener('input', updateStats);

function updateStats() {
  const v = input.value;
  const chars = v.length;
  const words = v.trim() === '' ? 0 : v.trim().split(/\s+/).length;
  const lines = v === '' ? 1 : v.split('\n').length;
  statsEl.textContent = `Character Count: ${chars} | Word Count: ${words} | Line Count: ${lines}`;
}

function convert(type) {
  let t = input.value;
  if (!t.trim()) return;

  switch (type) {
    case 'sentence':
      t = t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
      break;
    case 'upper':
      t = t.toUpperCase();
      break;
    case 'capitalized':
      t = t.replace(/\b\w/g, c => c.toUpperCase());
      break;
    case 'slug':
      t = t.toLowerCase().trim()
           .replace(/[^\w\s-]/g, '')
           .replace(/[\s_]+/g, '-')
           .replace(/-+/g, '-');
      break;
    case 'snake':
      t = t.trim()
           .replace(/[^\w\s]/g, '')
           .replace(/\s+/g, '_')
           .toLowerCase();
      break;
  }

  input.value = t;
  updateStats();
  showToast('Converted!');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
