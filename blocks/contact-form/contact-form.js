const DEFAULT_FIELDS = [
  ['First name', 'text'],
  ['Last name', 'text'],
  ['Mobile number', 'tel'],
  ['Email address', 'email'],
  ['Area of interest', 'select', 'General enquiry;Tickets and membership;Research;Education and learning;Press and media'],
];

const idOf = (label, i) => `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;

function buildField([label, type = 'text', options = ''], i) {
  const id = idOf(label, i);
  const wrap = document.createElement('div');
  wrap.className = `cf-field cf-${type}`;
  if (type === 'checkbox') {
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.id = id;
    box.name = id;
    box.required = true;
    const text = document.createElement('label');
    text.htmlFor = id;
    text.textContent = label;
    wrap.append(box, text);
    return wrap;
  }
  const lbl = document.createElement('label');
  lbl.htmlFor = id;
  lbl.textContent = `${label} *`;
  let input;
  if (type === 'select') {
    input = document.createElement('select');
    const first = document.createElement('option');
    first.value = '';
    first.textContent = 'Select';
    input.append(first);
    options.split(';').map((o) => o.trim()).filter(Boolean).forEach((o) => {
      const opt = document.createElement('option');
      opt.textContent = o;
      input.append(opt);
    });
  } else if (type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 4;
  } else {
    input = document.createElement('input');
    input.type = type;
  }
  input.id = id;
  input.name = id;
  input.required = true;
  wrap.append(lbl, input);
  return wrap;
}

/**
 * Fields are authored as rows: [label | type | options]. With no rows, a default
 * enquiry form is shown. Submission is a demo; wire it to a real endpoint when ready.
 */
export default function decorate(block) {
  const authored = [...block.children]
    .map((row) => [...row.children].map((c) => c.textContent.trim()))
    .filter((cells) => cells[0]);
  const fields = authored.length ? authored : DEFAULT_FIELDS;

  const form = document.createElement('form');
  fields.forEach((f, i) => form.append(buildField(f, i)));
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'button';
  button.textContent = block.classList.contains('newsletter') ? 'Sign up' : 'Send';
  const status = document.createElement('p');
  status.className = 'cf-status';
  status.setAttribute('role', 'status');
  form.append(button, status);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thank you. This is a demo form and nothing was sent.';
    form.reset();
  });
  block.replaceChildren(form);
}
