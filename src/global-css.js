import { injectGlobal } from 'styled-components'

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  body * {
    font-family: 'Work Sans', sans-serif;
    letter-spacing: .004em;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Montserrat', sans-serif;
    color: black;
    margin: 0;
  }

  p {
    color: black;
    font-family: 'Work Sans', sans-serif;
    margin: 0;
  }

  a {
    font-family: 'Work Sans', sans-serif;
  }

  .ant-menu-item {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-layout-header {
    background: #fff;
  }

  .ant-menu-item {
    color: #000;
  }

  .ant-layout-content {
    min-height: 100vh;
    background: #f9f9f9;
  }

  .m-b-16 {
    margin-bottom: 16px;
  }
  .m-t-16 {
    margin-top: 16px;
  }
  .m-r-16 {
    margin-right: 16px;
  }
  .m-l-16 {
    margin-left: 16px;
  }

  .flex-col {
    flex-direction: column;
  }
`
