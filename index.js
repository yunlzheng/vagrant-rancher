import PipelineRepoView from './PipelineRepoView'
import {requestMaterials} from 'modules/materials'
export default PipelineRepoView
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { materials, commitsMap } = state
  return {materials, commitsMap}
}

const mapActionCreators = {
  requestMaterials
}

export default connect(mapStateToProps, mapActionCreators)(PipelineRepoView)
