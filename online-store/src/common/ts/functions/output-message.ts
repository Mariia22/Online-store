export function outputMessage(message: string, className: string): void {
  const target = document.querySelector(className);
  if (target) {
    target.innerHTML = message;
  }
}
