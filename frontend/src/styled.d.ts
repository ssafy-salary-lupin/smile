import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    pointColor: string;
    subColor: string;
    subColor2: string;
    textColor: strinf;
    textSubColor: string;
    blackColor: string;
    shadowColor: string;
    whiteColor: string;
    whiteOpacityColor: string;
    subColorHover: string;
  }
}
