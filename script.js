if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then( () => {
    console.log('Service Worker Registered')
})
})
}

async function fetchVerse() {
    const verseText = document.querySelector('.verse');
    const referenceText = document.querySelector('.reference');

    try {
      
      verseText.textContent = 'Fetching a holy verse...';
      referenceText.textContent = '';

      const randomBooks = [
        'Genesis', 'Exodus', 'Psalms', 'Proverbs', 'Isaiah', 
        'Matthew', 'Mark', 'Luke', 'John', 'Romans'
      ];
      const randomBook = randomBooks[Math.floor(Math.random() * randomBooks.length)];
      const randomChapter = Math.ceil(Math.random() * 15); 
      const randomVerse = Math.ceil(Math.random() * 15); 

      const response = await fetch(`https://bible-api.com/${randomBook}%20${randomChapter}:${randomVerse}`);
      if (!response.ok) throw new Error('Failed to fetch the verse.');

      const data = await response.json();

      verseText.textContent = data.text.trim();
      referenceText.textContent = `- ${data.reference} (${data.translation_name})`;
    } catch (error) {
      console.error(error);
      verseText.textContent = 'Failed to fetch the verse. Please try again!';
      referenceText.textContent = '';
    }
  }