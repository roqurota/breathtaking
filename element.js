export default function newElement(tag, className, parent, content) {
    var el = document.createElement(tag);
    el.className = className;
    if (content)
        el.textContent = content;
    parent.appendChild(el);
    return el;
}