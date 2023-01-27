import Modal from "./components/common/Modal";
import ButtonBasic from "./components/common/ButtonBasic";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

html,
body {
  font-family: "Noto Sans", sans-serif;

}
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
menu,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
main,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
  display: none;
}
body {
  line-height: 1;
}
menu,
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a,
a:hover,
a:visited,
a:active,
a:link {
  text-decoration: none !important;
}`;

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Modal />
      {/* <ButtonBasic /> */}
      <Router />
      <Footer />
    </>
  );
}

export default App;
