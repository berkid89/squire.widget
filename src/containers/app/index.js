import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showProduct } from '../../modules/widget'

const App = (props) => (
  <div>
    Hi! <p>{props.isLoading.toString()}</p>
  </div>
)

const mapStateToProps = ({ widget }) => ({
  product: widget.product,
  isLoading: widget.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showProduct
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
