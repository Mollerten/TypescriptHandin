export function setupGreeting(container: HTMLDivElement) {
    const input = document.createElement('input');
    const button = document.createElement('button');

    button.textContent = 'Click Me';
    button.addEventListener('click', () => {
        const inputName = input.value;
        alert(`Hello ${inputName}`);
    });

    container.appendChild(input);
    container.appendChild(button);
}
