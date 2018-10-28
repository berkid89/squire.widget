import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showProduct } from '../../modules/widget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class App extends React.Component {
  constructor(props) {
    super(props)

    props.showProduct('023E806A-F6EC-4A7F-8242-00099888CB34');
  }

  render() {
    return <div>
      {this.props.isLoading && "loading..."}
      {this.props.product && <div>
        <FontAwesomeIcon icon="cog" />{this.props.product.latestVersion.versionNumber}
        <FontAwesomeIcon icon="cog" />
        <FontAwesomeIcon icon="cog" />
      </div>}
    </div>
  }
}

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
