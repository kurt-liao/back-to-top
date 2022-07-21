const HAS_SCROLLBAR = window.innerWidth > document.body.clientWidth;
const STYLES = {
  backgroundColor: "#ffc107",
  color: "#000",
  width: "60px",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  bottom: "30px",
  right: "20px",
  borderRadius: "50%",
  outline: "none",
  border: "none",
  zIndex: "9999",
  userSelect: "none",
  cursor: "pointer",
};
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_PATH = "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z";
const SVG_ATTRS = {
  height: "26",
  width: "26",
  viewBox: "0 0 26 26",
  fill: "currentColor",
};

function setCss(ele, styles) {
  for (const key in styles) {
    ele.style[key] = styles[key];
  }
}

function setAttrs(ele, attrs) {
  for (const key in attrs) {
    ele.setAttribute(key, attrs[key]);
  }
}

if (HAS_SCROLLBAR) {
  const ele = document.createElement("div");
  setCss(ele, STYLES);
  ele.onclick = function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const svg = document.createElementNS(SVG_NS, "svg");
  setAttrs(svg, SVG_ATTRS);

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttributeNS(null, "d", SVG_PATH);

  svg.appendChild(path);
  ele.appendChild(svg);
  document.body.appendChild(ele);
}
