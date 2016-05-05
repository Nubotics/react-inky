//::-> LIBS
import fs from 'fs'
import np from 'path'
import React, { PropTypes } from 'react'
import Oy, { Table, TBody, TR, TD, Img, A } from 'oy-vey'

//-> React
const {createClass, createFactory, createElement, cloneElement, Children} = React
const {string, number, func, bool, array, node, object, oneOf} = PropTypes

//::-> CSS FRAMEWORK
const foundationCss = require('./foundation.js')
const getFoundation = function() {
  //const cssPath = np.resolve(np.join(__dirname, './foundation.css'))
  //return fs.readFileSync(cssPath, 'utf8')
  return foundationCss
}
const renderFoundationTemplate = function(component, options) {
  let {headCSS, ...other} = options
  headCSS = headCSS || ''
  let foundationCss = getFoundation()

  return Oy.renderTemplate(
    component,
    {
      headCSS: `
              ${foundationCss}
              ${headCSS}
              `,
      ...other
    }
  )
}

//::-> INKY COMPONENTS
let Container = createClass({
  propTypes: {
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
    }
  },
  render() {
    let {className, style, children, ...other} = this.props
    let containerProps = {
      className: `container ${className}`,
      style,
      ...other,
    }
    return (
      <Table {...containerProps}>
        <TBody>
        <TR>
          <TD>
            { children }
          </TD>
        </TR>
        </TBody>
      </Table>
    )
  }
})

let Row = createClass({
  propTypes: {
    collapse: bool,
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      collapse: false,
      className: '',
      style: {},
    }
  },
  render() {
    let {collapse, className, style, children, ...other} = this.props
    let rowProps = {
      className: `row ${collapse ? 'collapse' : ''} ${className}`,
      style,
      ...other,
    }
    let childCount = Children.count(children)
    let cols = []
    Children.forEach(children, (child, i) => {
      if (childCount === 0) {
        cols.push(cloneElement(child, {
          key: `col_${i}`,
          first: true,
          last: true
        }))
      } else if (i === 0) {
        cols.push(cloneElement(child, {
          key: `col_${i}`,
          first: true,
          last: false
        }))
      } else if (i === childCount - 1) {
        cols.push(cloneElement(child, {
          key: `col_${i}`,
          first: false,
          last: true
        }))
      } else {
        cols.push(cloneElement(child, {
          key: `col_${i}`,
          first: false,
          last: false
        }))
      }
    })

    return (
      <Table {...rowProps}>
        <TBody>
        <TR>
          { cols }
        </TR>
        </TBody>
      </Table>
    )
  }
})

let Col = createClass({
  propTypes: {
    small: number,
    large: number,
    first: bool,
    last: bool,
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      small: 12,
      large: 12,
      first: true,
      last: true,
      className: '',
      style: {},
    }
  },
  render() {
    let {small, large, first, last, className, style, children, ...other} = this.props
    let positionClassName = `${first ? 'first' : ''} ${last ? 'last' : ''}`
    let colProps = {
      className: `small-${small} large-${large} columns ${positionClassName} ${className}`,
      style,
      ...other,
    }
    return (
      <TD {...colProps}>
        <Table>
          <TR>
            <TD>
              { children }
            </TD>
            <TD className="expander"></TD>
          </TR>
        </Table>
      </TD>
    )
  }
})

let Text = createClass({
  propTypes: {
    align: oneOf(['left', 'center', 'right']),
    smallAlign: oneOf(['', 'left', 'center', 'right']),
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      align: 'left',
      smallAlign: '',
      className: '',
      style: {},
    }
  },
  render() {
    let {align, smallAlign, children, className, style, ...other} = this.props
    let textProps = {
      className: `text-${align} ${smallAlign.length > 0 ? `small-text-${smallAlign}` : ''} ${className}`,
      style,
      ...other,
    }
    return (
      <p {...textProps}>
        {children}
      </p>
    )
  }
})

let Button = createClass({
  propTypes: {
    to: string,
    size: oneOf(['', 'tiny', 'small', 'large']),
    className: string,
    style: object,
    expanded: bool,
    radius: bool,
    rounded: bool,
  },
  getDefaultProps() {
    return {
      to: '',
      size: '',
      className: '',
      style: {},
      expanded: false,
      radius: false,
      rounded: false,
    }
  },
  renderButton(buttonProps, linkProps, children, expanded = false) {
    let expander = []
    if (expanded) {
      expander = (<TD className="expander"></TD>)
    }
    return (
      <Table {...buttonProps}>
        <TR>
          <TD>
            <Table>
              <TR>
                <TD>
                  <center>
                    <A {...linkProps}>{ children }</A>
                  </center>
                </TD>
              </TR>
            </Table>
            { expander }
          </TD>
        </TR>
      </Table>
    )
  },
  render() {
    let {to, size, className, style, expanded, radius, rounded, children, ...other} = this.props
    let buttonProps = {
      className: `button ${size} ${radius ? 'radius' : ''} ${rounded ? 'rounded' : ''} ${className}`,
      style,
      ...other,
    }
    let linkProps = {
      href: to,
      target: '_blank',
      align: 'center',

    }
    let buttonComponent = []
    if (expanded) {
      linkProps.className = 'float-center'
      buttonComponent = (
        <Row>
          { this.renderButton(buttonProps, linkProps, children, expanded) }
        </Row>
      )
    } else {
      buttonComponent = this.renderButton(buttonProps, linkProps, children)
    }
    return buttonComponent
  }
})

let Callout = createClass({
  propTypes: {
    className: string,
    innerClassName: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      innerClassName: 'secondary',
      style: {},
    }
  },
  render() {
    let {className, innerClassName, style, children, ...other} = this.props
    let calloutProps = {
      className: `callout ${className}`,
      style,
      ...other,
    }
    let innerProps = {
      className: `callout-inner ${innerClassName}`,

    }
    return (
      <Table {...calloutProps}>
        <TR>
          <TD {...innerProps}>
            { children }
          </TD>
          <th className="expander"></th>
        </TR>
      </Table>
    )
  }
})

let CalloutContainer = createClass({
  propTypes: {
    className: string,
    innerClassName: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      innerClassName: 'primary',
      style: {},
    }
  },
  render() {
    let {className, innerClassName, style, children, ...other} = this.props
    let calloutProps = {
      className: `callout ${className}`,
      style,
      ...other,
    }
    let innerProps = {
      className: `callout-inner ${innerClassName}`,

    }
    return (
      <Table {...calloutProps}>
        <TR>
          <TD {...innerProps}>
            <Row>
              <Col small={12}
      large={12}>
                { children }
              </Col>
            </Row>
          </TD>
          <TD className="expander"></TD>
        </TR>
      </Table>
    )
  }
})

let Menu = createClass({
  propTypes: {
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
    }
  },
  render() {
    let {className, style, children, ...other} = this.props
    let menuProps = {
      className: `menu ${className}`,
      style,
      ...other,
    }
    return (
      <Table {...menuProps}>
        <TR>
          <TD>
            <Table>
              <TR>
                { children }
              </TR>
            </Table>
          </TD>
        </TR>
      </Table>
    )
  }
})

let MenuItem = createClass({
  propTypes: {
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
    }
  },
  render() {
    let {className, style, children, ...other} = this.props
    let itemProps = {
      className: `menu-item ${className}`,
      style,
      ...other,
    }

    return (
      <TD {...itemProps}>
        { children }
      </TD>
    )
  }
})

let Spacer = createClass({
  propTypes: {
    className: string,
    style: object,
    height: number,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
      height: 0,
    }
  },
  render() {
    let {className, style, height} = this.props
    let spacerProps = {
      className: `spacer ${className}`,
      style
    }
    let heightPx = `${height}px`
    let blockProps = {
      height: heightPx,
      style: {
        fontSize: heightPx,
        lineHeight: heightPx
      }
    }
    return (
      <Table {...spacerProps}>
        <TBody>
        <TR>
          <TD {...blockProps}> </TD>
        </TR>
        </TBody>
      </Table>
    )
  }
})

let Wrapper = createClass({
  propTypes: {
    className: string,
    innerClassName: string,
    style: object,
    align: oneOf(['left', 'center', 'right']),
  },
  getDefaultProps() {
    return {
      className: '',
      innerClassName: '',
      style: {},
      align: 'center'
    }
  },
  render() {
    let {className, innerClassName, style, align, children, ...other} = this.props
    let wrapperProps = {
      className: `wrapper ${className}`,
      style,
      align,
      ...other,
    }
    let innerProps = {
      className: `wrapper-inner ${innerClassName}`
    }
    return (
      <Table {...wrapperProps}>
        <TR>
          <TD {...innerProps}>
            { children }
          </TD>
        </TR>
      </Table>
    )
  }
})

let Body = createClass({
  propTypes: {
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
    }
  },
  render() {
    let {className, style, children, ...other} = this.props
    let bodyProps = {
      className: `body ${className}`,
      style,
      ...other,
    }
    return (
      <Table {...bodyProps}>
        <TR>
          <TD className="float-center"
      align="center"
      vAlign="top">
            <center>
              { children }
            </center>
          </TD>
        </TR>
      </Table>
    )
  }
})

//::-> PREFABS

let Header = createClass({
  propTypes: {
    className: string,
    style: object,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
    }
  },
  render() {
    let {className, style, children, ...other} = this.props
    let headerProps = {
      className: `header ${className}`,
      style,
      align: 'center',
      ...other,
    }
    return (
      <Wrapper {...headerProps}>
        <Container>
          <Row collapse={true}>
            { children }
          </Row>
        </Container>
      </Wrapper>
    )
  }
})

let Footer = createClass({
  propTypes: {
    className: string,
    style: object,
    vAlign: string,
  },
  getDefaultProps() {
    return {
      className: '',
      style: {},
      vAlign: 'bottom',
    }
  },
  render() {
    let {className, style, vAlign, children, ...other} = this.props
    let footerProps = {
      className: `footer ${className}`,
      style,
      align: 'center',
      vAlign,
      ...other,
    }
    return (
      <Wrapper {...footerProps}>
        <Container>
          <Row collapse={true}>
            { children }
          </Row>
        </Container>
      </Wrapper>
    )
  }
})

export default {
  renderTemplate: Oy.renderTemplate,
  getFoundation,
  renderFoundationTemplate,
  Table,
  TBody,
  TR,
  TD,
  Img,
  A,
  Container,
  Row,
  Col,
  Text,
  Button,
  Callout,
  CalloutContainer,
  Menu,
  MenuItem,
  Spacer,
  Wrapper,
  Body,
  Header,
  Footer,
}
