import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    pointColor: string;
    subColor: string;
    subColor2: string;
    textColor: string;
    textSubColor: string;
    blackColor: string;
    shadowColor: string;
    whiteColor: string;
    whiteOpacityColor: string;
    subColorHover: string;
    pointColorOpacity: string;
    blackColorOpacity: string;
    blackColorOpacity2: string;
    blackColorOpacity3: string;
    mainColorOpacity: string;
    mainColorDark: string;
  }
}
