document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      // Check if this specific item is already open
      const isOpen = item.classList.contains('active');

      // Toggle the active class for colors/icons
      item.classList.toggle('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Handle the smooth height transition
      if (!isOpen) {
        // Opening: Set max-height to the actual content height
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      } else {
        // Closing: Remove max-height
        answerDiv.style.maxHeight = null;
      }
    });
  });
});

(function() {
  const diagram = document.getElementById('diagram');
  const svg = document.getElementById('connectors');

  function updateConnectors(){
    const containerRect = diagram.getBoundingClientRect();
    svg.innerHTML = '';

    document.querySelectorAll('.feature[data-dot]').forEach(feature => {
      const dot = document.getElementById(feature.dataset.dot);
      const anchor = feature.querySelector('.bullet') || feature;
      if(!dot) return;

      const a = anchor.getBoundingClientRect();
      const d = dot.getBoundingClientRect();

      const x1 = a.left + a.width/2 - containerRect.left;
      const y1 = a.top  + a.height/2 - containerRect.top;
      const x2 = d.left + d.width/2 - containerRect.left;
      const y2 = d.top  + d.height/2 - containerRect.top;

      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('class', 'connector-line');
      svg.appendChild(line);
    });
  }

  // Recalculate whenever layout could have changed
  window.addEventListener('load', updateConnectors);
  window.addEventListener('resize', debounce(updateConnectors, 40));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateConnectors);
  }
  new ResizeObserver(updateConnectors).observe(diagram);

  function debounce(fn, wait){
    let t;
    return function(){
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  updateConnectors();

})();