import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import ScrollTop from "components/common/ScrollTop";

const GlobalStyle = createGlobalStyle`
/* @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"); */
/* @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"); */

.swal2-container {
  z-index: 100000;
}

html,
body {
  /* font-family: "Noto Sans", sans-serif; */
  margin: 0;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  width: 100vw;
  height: 100vh;
  padding: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
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


 
`;

function App() {
  useEffect(() => {
    console.log("APP 렌더링");
  });

  const curPath = window.location.pathname;
  // if (curPath === "/test2") {
  //   const bodyTag = document.querySelector("body");
  //   bodyTag?.classList.add("videoPage");
  // }
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <GlobalStyle />
        {!curPath.includes("videoMeeting") && <NavBar curUrl={curPath} />}
        <Router />
        {!curPath.includes("videoMeeting") && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
