fetch('/data/objects.xml')
.then(response => response.text())
.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
.then(data => {
    const objects = data.getElementsByTagName('object');
    const container = document.getElementById('object-list');

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        const title = obj.getElementsByTagName('title')[0].textContent;
        const image = obj.getElementsByTagName('image')[0].textContent;
        const price = obj.getElementsByTagName('price')[0].textContent;
        const area = obj.getElementsByTagName('area')[0].textContent;
        const desc = obj.getElementsByTagName('desc')[0].textContent;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <p>${desc}</p>
        <p><strong>${area} м²</strong></p>
        <p class="price">${price} USD</p>
        <button onclick="location.href='detail.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}'">Подробнее</button>
        `;
        container.appendChild(card);
    }
})
.catch(err => console.error('Ошибка загрузки XML:', err));
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add("fade");
    setTimeout(() => {
      document.body.classList.add("visible");
    }, 10);
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const image = params.get('image');

    if (title && image) {
        document.getElementById('object-title').textContent = title;
        const img = document.getElementById('object-img');
        img.src = image;
        img.alt = title;
    }

    const form = document.getElementById('order-form');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    const message = document.getElementById('success-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        phoneInput.value = '';
        nameInput.value = '';

        message.style.display = 'block';

        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    });
});
  document.querySelectorAll("a[href]").forEach(link => {
    const isSameWindow = !link.target || link.target === "_self";
    const isInternal = link.hostname === window.location.hostname;

    if (isSameWindow && isInternal) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const url = this.href;
        document.body.classList.remove("visible");

        setTimeout(() => {
          window.location.href = url;
        }, 600);
      });
    }
  });