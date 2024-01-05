import element from './element.js';

export default function popup(ui, callback) {
    let overlay = element('div', 'overlay', document.body);
    overlay.classList.add('shown');
    
    let container = element('div', 'popup', document.body);
    let content = element('div', 'popup-content', container);
    let buttons = element('div', 'popup-buttons', container);

    content.innerHTML = ui;

    let confirmBtn = element('div', 'btn', buttons, 'ok');
    let cancelBtn = element('div', 'btn', buttons, 'cancel');

    confirmBtn.addEventListener('click', function (){
        callback();

        overlay.parentNode.removeChild(overlay);
        container.parentNode.removeChild(container);
    });

    cancelBtn.addEventListener('click', function (){
        overlay.parentNode.removeChild(overlay);
        container.parentNode.removeChild(container);
    });
};