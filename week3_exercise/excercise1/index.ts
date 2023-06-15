

const displayText = (): void => {
    const inputText = document.getElementById("inputField") as HTMLInputElement;
    const rootElement = document.getElementById("root");
    rootElement!.innerHTML = inputText.value;
};

const createInputField = (): void => {
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("id", "inputField");

    const button = document.createElement("button");
    button.innerHTML = "Display Text";
    button.addEventListener("click", displayText);

    const rootElement = document.getElementById("root");
    rootElement!.appendChild(inputField);
    rootElement!.appendChild(button);
};

createInputField();
