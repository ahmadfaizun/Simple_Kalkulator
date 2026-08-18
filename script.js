const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let current = '';

function updateDisplay(){
  display.value = current || '0';
}

function append(value){
  // prevent multiple dots
  if(value === '.' && /\./.test(current.split(/[-+*/%]/).pop())) return;
  current += value;
  updateDisplay();
}

function clearAll(){
  current = '';
  updateDisplay();
}

function delChar(){
  current = current.slice(0,-1);
  updateDisplay();
}

function evaluate(){
  if(!current) return;
  try{
    // replace chosen symbols with JS operators
    const expr = current.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g,'-');
    // eslint-disable-next-line no-eval
    const result = Function(`return (${expr})`)();
    current = String(result);
    updateDisplay();
  }catch(e){
    display.value = 'Error';
    current = '';
    setTimeout(updateDisplay,800);
  }
}

buttons.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if(action === 'clear') return clearAll();
  if(action === 'del') return delChar();
  if(action === 'evaluate') return evaluate();
  if(value) return append(value);
});

// keyboard support
window.addEventListener('keydown', (e)=>{
  if((/\d/).test(e.key) || e.key === '.') append(e.key);
  if(['+','-','*','/','%'].includes(e.key)) append(e.key);
  if(e.key === 'Enter') evaluate();
  if(e.key === 'Backspace') delChar();
  if(e.key === 'Escape') clearAll();
});

updateDisplay();
