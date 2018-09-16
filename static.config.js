import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Wishop</title>
            <link rel="icon" type="image/png" href="./logo/wishop-icon.png" />
            {renderMeta.styleTags}
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat:600|Work+Sans:500"
              rel="stylesheet"
            />
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
