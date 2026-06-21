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