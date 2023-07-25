export class CurrentYear extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "closed" });

    shadow.textContent = `${new Date().getFullYear()}`;
  }
}
