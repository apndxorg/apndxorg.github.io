
const filter = document.querySelector('#filter');
filter.addEventListener('input', () => {
  const q = filter.value.toLowerCase();
  document.querySelectorAll('nav details').forEach(group => {
    let visible = false;
    group.querySelectorAll('li').forEach(row => {
      row.hidden = !row.dataset.path.includes(q);
      visible ||= !row.hidden;
    });
    group.hidden = !visible;
    if (q) group.open = true;
  });
});
function selectLines() {
  document.querySelectorAll('.selected').forEach(row => row.classList.remove('selected'));
  const match = /^#L(\d+)(?:-L?(\d+))?$/.exec(location.hash);
  if (!match) return;
  const start = Number(match[1]), end = Number(match[2] || match[1]);
  const first = document.getElementById('L' + start);
  if (!first) return;
  for (let n = start; n <= Math.min(end, document.querySelectorAll('.line').length); n++)
    document.getElementById('L' + n)?.classList.add('selected');
  first.scrollIntoView({block:'center'});
}
let anchor = null;
document.querySelectorAll('.number').forEach(link => link.addEventListener('click', event => {
  const n = Number(link.dataset.line);
  if (event.shiftKey && anchor !== null) {
    event.preventDefault();
    location.hash = 'L' + Math.min(anchor,n) + '-L' + Math.max(anchor,n);
  } else anchor = n;
}));
window.addEventListener('hashchange', selectLines);
selectLines();
