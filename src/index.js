//::-> LIBS
import fs from 'fs'
import np from 'path'
import React, { PropTypes } from 'react'

//-> React
const { createClass, createFactory, createElement, cloneElement, } = React
const { string, number, func, bool, array, node, object, oneOf } = PropTypes

//::-> CSS FRAMEWORK
const getFoundation = function () {
  const cssPath = np.join(__dirname, './foundation.css')
  return fs.readFileSync(cssPath, 'utf8')
}

//::-> COMPONENTS
import {Table, TBody, TR, TD, Img, A, renderTemplate} from 'oy-vey'

//::-> INKY COMPONENTS
let Container = createClass({
  render(){
    return (
      <Table className="container">
        <TBody>
        <TR>
          <TD>

            { this.props.children }

          </TD>
        </TR>
        </TBody>
      </Table>
    )
  }
})

let Row = createClass({
  render(){
    return (
      <Table className="row">
        <TBody>
        <TR>
          { this.props.children }
        </TR>
        </TBody>
      </Table>
    )
  }
})

let Col = createClass({
  render(){
    return (
      <TD className="columns first last">
        <Table>
          <TR>
            <TD>
              { this.props.children }
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
  getDefaultProps(){
    return {
      align: 'left',
      smallAlign: '',
      className: '',
      style: {},
    }
  },
  render(){
    let { align, smallAlign, children, className, style, ...other } = this.props
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
  getDefaultProps(){
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
  renderButton(buttonProps, linkProps, children, expanded = false){
    let expander = []
    if (expanded){
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
  render(){
    let { to, size, className, style, expanded, radius, rounded, children, ...other } = this.props
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
  render(){
    return (
      <Table className="callout">
        <TR>
          <TD className="callout-inner secondary">
            { this.props.children }
          </TD>
          <th className="expander"></th>
        </TR>
      </Table>
    )
  }
})

let CalloutContainer = createClass({
  render(){
    return (
      <Table className="callout">
        <TR>
          <TD className="callout-inner primary">
            <Table className="row">
              <TBody>
              <TR>
                <TD className="small-12 large-12 columns first last">
                  <Table>
                    <TR>
                      <TD>
                        { this.props.children }
                      </TD>
                      <TD className="expander"></TD>
                    </TR>
                  </Table>
                </TD>
              </TR>
              </TBody>
            </Table>
          </TD>
          <TD className="expander"></TD>
        </TR>
      </Table>
    )
  }
})

let Menu = createClass({
  render(){
    return (
      <Table className="menu">
        <TR>
          <TD>
            <Table>
              <TR>
                { this.props.children }
              </TR>
            </Table>
          </TD>
        </TR>
      </Table>
    )
  }
})

let MenuItem = createClass({
  render(){
    return (
      <TD className="menu-item">
        <A href="http://zurb.com">Item</A>
      </TD>
    )
  }
})

let Spacer = createClass({
  render(){
    return (
      <Table className="spacer">
        <TBody>
        <TR>
          <TD height="100px" style={{fontSize:'100px',lineHeight:'100px'}}>&#xA0;</TD>
        </TR>
        </TBody>
      </Table>
    )
  }
})

let Wrapper = createClass({
  render(){
    return (
      <Table className="wrapper" align="center">
        <TR>
          <TD className="wrapper-inner">
            { this.props.children }
          </TD>
        </TR>
      </Table>
    )
  }
})

let Body = createClass({
  render(){
    return (
      <Table className="body">
        <TR>
          <TD className="center"
              align="center"
              valign="top">
            <center>
              { this.props.children }
            </center>
          </TD>
        </TR>
      </Table>
    )
  }
})

export default {
  renderTemplate,
  getFoundation,
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
}
