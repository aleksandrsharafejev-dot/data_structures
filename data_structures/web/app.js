const state = {
  stack: [4, 8, 12],
  queue: [2, 5, 9],
  deque: [1, 3, 6, 7],
  linked: [5, 11, 14],
  circular: [1, 2, 3, 4, 5],
  bst: null,
  heap: [30, 22, 18, 14, 10, 7],
  hash: Array.from({ length: 6 }, () => []),
  pqueue: [
    { item: 'task', priority: 3 },
    { item: 'email', priority: 2 },
    { item: 'report', priority: 5 },
  ],
  bstHighlight: null,
};

const stackViz = document.getElementById('stack-viz');
const queueViz = document.getElementById('queue-viz');
const dequeViz = document.getElementById('deque-viz');
const linkedViz = document.getElementById('linked-viz');
const circularViz = document.getElementById('circular-viz');
const bstCanvas = document.getElementById('bst-viz');
const heapCanvas = document.getElementById('heap-viz');
const hashViz = document.getElementById('hash-viz');
const pqueueViz = document.getElementById('pqueue-viz');

function createNode(value, highlight = false) {
  const node = document.createElement('div');
  node.className = 'node';
  if (highlight) node.classList.add('highlight');
  node.textContent = value;
  return node;
}

function renderStack() {
  stackViz.innerHTML = '';
  state.stack.forEach((value) => {
    stackViz.appendChild(createNode(value));
  });
}

function renderQueue() {
  queueViz.innerHTML = '';
  state.queue.forEach((value) => {
    queueViz.appendChild(createNode(value));
  });
}

function renderDeque() {
  dequeViz.innerHTML = '';
  state.deque.forEach((value) => {
    dequeViz.appendChild(createNode(value));
  });
}

function renderLinked() {
  linkedViz.innerHTML = '';
  state.linked.forEach((value, index) => {
    linkedViz.appendChild(createNode(value));
    if (index < state.linked.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.textContent = '→';
      linkedViz.appendChild(arrow);
    }
  });
}

function renderCircular() {
  circularViz.innerHTML = '';
  const radius = 60;
  const centerX = circularViz.clientWidth / 2;
  const centerY = circularViz.clientHeight / 2;
  const count = state.circular.length || 1;

  state.circular.forEach((value, index) => {
    const angle = (index / count) * Math.PI * 2;
    const node = document.createElement('div');
    node.className = 'circle-node';
    node.textContent = value;
    node.style.left = `${centerX + radius * Math.cos(angle) - 20}px`;
    node.style.top = `${centerY + radius * Math.sin(angle) - 20}px`;
    circularViz.appendChild(node);
  });
}

function bstInsert(node, value) {
  if (!node) return { value, left: null, right: null };
  if (value < node.value) node.left = bstInsert(node.left, value);
  else if (value > node.value) node.right = bstInsert(node.right, value);
  return node;
}

function bstSearch(node, value) {
  if (!node) return false;
  if (node.value === value) return true;
  if (value < node.value) return bstSearch(node.left, value);
  return bstSearch(node.right, value);
}

function inorderLayout(node, depth, positions) {
  if (!node) return;
  inorderLayout(node.left, depth + 1, positions);
  node._x = positions.index++;
  node._depth = depth;
  inorderLayout(node.right, depth + 1, positions);
}

function collectNodes(node, list) {
  if (!node) return;
  list.push(node);
  collectNodes(node.left, list);
  collectNodes(node.right, list);
}

function drawTree(canvas, root, highlight) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!root) return;

  const positions = { index: 0 };
  inorderLayout(root, 0, positions);
  const nodes = [];
  collectNodes(root, nodes);
  const maxDepth = Math.max(...nodes.map((n) => n._depth));
  const xGap = canvas.width / (nodes.length + 1);
  const yGap = canvas.height / (maxDepth + 2);

  nodes.forEach((node) => {
    node._px = (node._x + 1) * xGap;
    node._py = (node._depth + 1) * yGap;
  });

  ctx.strokeStyle = '#b69074';
  ctx.lineWidth = 2;
  nodes.forEach((node) => {
    if (node.left) {
      ctx.beginPath();
      ctx.moveTo(node._px, node._py);
      ctx.lineTo(node.left._px, node.left._py);
      ctx.stroke();
    }
    if (node.right) {
      ctx.beginPath();
      ctx.moveTo(node._px, node._py);
      ctx.lineTo(node.right._px, node.right._py);
      ctx.stroke();
    }
  });

  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.fillStyle = node.value === highlight ? '#c05f35' : '#ffffff';
    ctx.strokeStyle = '#e1c3a8';
    ctx.lineWidth = 2;
    ctx.arc(node._px, node._py, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = node.value === highlight ? '#ffffff' : '#1c1b1a';
    ctx.font = '12px Work Sans';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.value, node._px, node._py);
  });
}

function drawHeap(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const data = state.heap;
  if (data.length === 0) return;

  ctx.strokeStyle = '#b69074';
  ctx.lineWidth = 2;
  data.forEach((value, index) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelStart = 2 ** level - 1;
    const pos = index - levelStart;
    const nodesInLevel = 2 ** level;
    const xGap = canvas.width / (nodesInLevel + 1);
    const yGap = canvas.height / (Math.floor(Math.log2(data.length)) + 2);
    const x = (pos + 1) * xGap;
    const y = (level + 1) * yGap;

    const parentIndex = Math.floor((index - 1) / 2);
    if (index > 0) {
      const parentLevel = Math.floor(Math.log2(parentIndex + 1));
      const parentStart = 2 ** parentLevel - 1;
      const parentPos = parentIndex - parentStart;
      const parentGap = canvas.width / (2 ** parentLevel + 1);
      const px = (parentPos + 1) * parentGap;
      const py = (parentLevel + 1) * yGap;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e1c3a8';
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#1c1b1a';
    ctx.font = '12px Work Sans';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value, x, y);
  });
}

function hashKey(key) {
  let sum = 0;
  for (let i = 0; i < key.length; i++) sum += key.charCodeAt(i);
  return sum % state.hash.length;
}

function renderHash() {
  hashViz.innerHTML = '';
  state.hash.forEach((bucket, index) => {
    const row = document.createElement('div');
    row.className = 'bucket';
    const label = document.createElement('span');
    label.textContent = index;
    row.appendChild(label);
    bucket.forEach(([key, value]) => {
      const item = document.createElement('div');
      item.className = 'node';
      item.textContent = `${key}:${value}`;
      row.appendChild(item);
    });
    hashViz.appendChild(row);
  });
}

function renderPQueue() {
  pqueueViz.innerHTML = '';
  state.pqueue
    .slice()
    .sort((a, b) => b.priority - a.priority)
    .forEach((entry) => {
      const node = createNode(`${entry.item} (p${entry.priority})`);
      pqueueViz.appendChild(node);
    });
}

function renderAll() {
  renderStack();
  renderQueue();
  renderDeque();
  renderLinked();
  renderCircular();
  drawTree(bstCanvas, state.bst, state.bstHighlight);
  drawHeap(heapCanvas);
  renderHash();
  renderPQueue();
}

function heapInsert(value) {
  state.heap.push(value);
  let i = state.heap.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (state.heap[p] >= state.heap[i]) break;
    [state.heap[p], state.heap[i]] = [state.heap[i], state.heap[p]];
    i = p;
  }
}

function heapExtract() {
  if (state.heap.length === 0) return;
  const last = state.heap.pop();
  if (state.heap.length === 0) return;
  state.heap[0] = last;
  let i = 0;
  while (true) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let largest = i;
    if (left < state.heap.length && state.heap[left] > state.heap[largest]) largest = left;
    if (right < state.heap.length && state.heap[right] > state.heap[largest]) largest = right;
    if (largest === i) break;
    [state.heap[i], state.heap[largest]] = [state.heap[largest], state.heap[i]];
    i = largest;
  }
}

document.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  if (!action) return;

  switch (action) {
    case 'stack-push': {
      const value = Number(document.getElementById('stack-input').value);
      if (!Number.isNaN(value)) state.stack.push(value);
      break;
    }
    case 'stack-pop':
      state.stack.pop();
      break;
    case 'stack-clear':
      state.stack = [];
      break;
    case 'queue-enqueue': {
      const value = Number(document.getElementById('queue-input').value);
      if (!Number.isNaN(value)) state.queue.push(value);
      break;
    }
    case 'queue-dequeue':
      state.queue.shift();
      break;
    case 'queue-clear':
      state.queue = [];
      break;
    case 'deque-front': {
      const value = Number(document.getElementById('deque-input').value);
      if (!Number.isNaN(value)) state.deque.unshift(value);
      break;
    }
    case 'deque-back': {
      const value = Number(document.getElementById('deque-input').value);
      if (!Number.isNaN(value)) state.deque.push(value);
      break;
    }
    case 'deque-pop-front':
      state.deque.shift();
      break;
    case 'deque-pop-back':
      state.deque.pop();
      break;
    case 'linked-append': {
      const value = Number(document.getElementById('linked-input').value);
      if (!Number.isNaN(value)) state.linked.push(value);
      break;
    }
    case 'linked-remove': {
      const value = Number(document.getElementById('linked-input').value);
      state.linked = state.linked.filter((v) => v !== value);
      break;
    }
    case 'linked-clear':
      state.linked = [];
      break;
    case 'circular-append': {
      const value = Number(document.getElementById('circular-input').value);
      if (!Number.isNaN(value)) state.circular.push(value);
      break;
    }
    case 'circular-rotate':
      if (state.circular.length > 0) state.circular.push(state.circular.shift());
      break;
    case 'circular-clear':
      state.circular = [];
      break;
    case 'bst-insert': {
      const value = Number(document.getElementById('bst-input').value);
      if (!Number.isNaN(value)) state.bst = bstInsert(state.bst, value);
      state.bstHighlight = null;
      break;
    }
    case 'bst-search': {
      const value = Number(document.getElementById('bst-input').value);
      state.bstHighlight = bstSearch(state.bst, value) ? value : null;
      break;
    }
    case 'bst-clear':
      state.bst = null;
      state.bstHighlight = null;
      break;
    case 'heap-insert': {
      const value = Number(document.getElementById('heap-input').value);
      if (!Number.isNaN(value)) heapInsert(value);
      break;
    }
    case 'heap-extract':
      heapExtract();
      break;
    case 'heap-clear':
      state.heap = [];
      break;
    case 'hash-insert': {
      const key = document.getElementById('hash-key').value.trim();
      const value = Number(document.getElementById('hash-value').value);
      if (!key || Number.isNaN(value)) break;
      const index = hashKey(key);
      const bucket = state.hash[index];
      const existing = bucket.find((pair) => pair[0] === key);
      if (existing) existing[1] = value;
      else bucket.push([key, value]);
      break;
    }
    case 'hash-remove': {
      const key = document.getElementById('hash-key').value.trim();
      const index = hashKey(key);
      state.hash[index] = state.hash[index].filter((pair) => pair[0] !== key);
      break;
    }
    case 'hash-clear':
      state.hash = Array.from({ length: 6 }, () => []);
      break;
    case 'pqueue-enqueue': {
      const item = document.getElementById('pqueue-item').value.trim();
      const priority = Number(document.getElementById('pqueue-priority').value);
      if (!item || Number.isNaN(priority)) break;
      state.pqueue.push({ item, priority });
      break;
    }
    case 'pqueue-dequeue':
      state.pqueue.sort((a, b) => b.priority - a.priority).shift();
      break;
    case 'pqueue-clear':
      state.pqueue = [];
      break;
    default:
      break;
  }

  renderAll();
});

renderAll();
