const contactInfoElement = document.querySelector(".map__contact-info");
const closeBtn = contactInfoElement.querySelector("#close-contacts-button");
closeBtn.addEventListener("click", (event) => {
  contactInfoElement.classList.add("closed");
});

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  const style = getComputedStyle(document.body);

  let breakpointS = parseInt(style.getPropertyValue("--breakpoint-s"));
  breakpointS = !Number.isNaN(breakpointS) ? breakpointS : 650;
  const mediaQueryS = window.matchMedia(`(max-width: ${breakpointS}px)`);

  let breakpointM = parseInt(style.getPropertyValue("--breakpoint-m"));
  breakpointM = !Number.isNaN(breakpointM) ? breakpointM : 800;
  const mediaQueryM = window.matchMedia(`(max-width: ${breakpointM}px)`);

  const centerL = [55.76031566, 37.60600904];
  const centerM = [55.76031566, 37.61600904];
  const centerS = [55.75931566, 37.62050904];

  let center = centerL;
  if (mediaQueryS.matches) {
    center = centerS;
  } else if (mediaQueryM.matches) {
    center = centerM;
  }

  // Создание карты.
  var myMap = new ymaps.Map(
    "map",
    {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center,
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 13,
      controls: [],
    },
    {
      suppressMapOpenBlock: true,
    }
  );

  var myPlacemark = new ymaps.Placemark(
    [55.76945557701307, 37.63995866403161],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./images/sprite.svg#marker",
      iconImageSize: [12, 12],
    }
  );
  myPlacemark.events.add(["click"], (event) => {
    contactInfoElement.classList.remove("closed");
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);

  mediaQueryM.addEventListener("change", (event) => {
    if (event.matches) {
      myMap.setCenter(centerM);
    } else {
      myMap.setCenter(centerL);
    }
  });

  mediaQueryS.addEventListener("change", (event) => {
    if (event.matches) {
      myMap.setCenter(centerS);
    } else {
      myMap.setCenter(centerM);
    }
  });
}
