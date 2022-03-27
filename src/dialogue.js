export const insertDialogue = (dialogue) => {
  const box = document.querySelector('.dialogue-box');
  if (box.style.opacity == 0) {
    box.insertAdjacentHTML('beforeend', dialogue);
    box.style.opacity = 1;
    setTimeout(() => {
      box.style.opacity = 0;
      box.innerHTML = '';
    }, 3000);
  }
};
