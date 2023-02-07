import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
/* @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

html,
body {
  font-family: "Noto Sans", sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* -ms-overflow-style: none;  
  scrollbar-width: none; 
  ::-webkit-scrollbar {
    display: none; 
  } */
}
#root{
  width: 100%;
  height: 100%;
}
/* div,
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
} */
/* HTML5 display-role reset for older browsers */
/* article,
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
} */


/* menu,
ol,
ul {
  list-style: none;
} */
/* blockquote,
q {
  quotes: none;
} */
/* blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
} */
/* table {
  border-collapse: collapse;
  border-spacing: 0;
} */

/* a,
a:hover,
a:visited,
a:active,
a:link {
  text-decoration: none !important;
} */
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
  display: none;
}

body {
  line-height: 1;
}
* {
  box-sizing: border-box;
}
/* fullcalendar  start ====================================== */
.myCalendar {
    cursor: pointer;
}
.fc-event{
    cursor: pointer;
}
.fc-content {
    cursor: pointer;
}
/* 일요일 날짜: 빨간색 */
.fc-day-sun a {
    color: red;
}
  
/* 토요일 날짜: 파란색 */
.fc-day-sat a {
    color: blue;
}

// today 버튼 색상
.fc .fc-button-primary:disabled {
    background-color: #F5C82E;
    border: none;
    color: black;
}

.fc .fc-button-primary {
  background-color: #F5C82E;
    border: none;
    color: black;
}
/* fullcalendar  end ====================================== */
/* pagination  start ====================================== */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  
  ul {
    /* list-style: none; */
    padding: 0;
  }
  
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child{
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child{
    border-radius: 0 5px 5px 0;
  }
  
  ul.pagination li a {
    text-decoration: none;
    color: #314E8D;
    font-size: 1rem;
  }
  
  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #314E8D;
  }
  
  ul.pagination li a:hover,
  ul.pagination li a.active {
    /* background-color: #223661; */
  }
  
  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
  /* pagination  end ====================================== */


  /* editor =============================================== */
  .quill{
    height: 27.778vw;
    width: 100%;
    text-align: center;
  }

  .ql-toolbar.ql-snow{
    border: 1px solid #000000ae;
    height:2.778vw;
    background-color: #f6f6f6;;
  }

  .ql-container.ql-snow {
    border: 1px solid #000000ae;  
    height: 25vw;
    background-color: white;
  }

  blockquote{
    border-left: 0.556vw solid #ccc;
    margin: 0.694vw;
    padding-left:0.694vw; 
  }
`;

function App() {
  const curPath = window.location.pathname;
  // if (curPath === "/test2") {
  //   const bodyTag = document.querySelector("body");
  //   bodyTag?.classList.add("videoPage");
  // }
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        {curPath !== "/test2" && <NavBar curUrl={curPath} />}
        <Router />
        {curPath !== "/test2" && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
