import Loadable from 'react-loadable';
import './Collection';

export default Loadable({
  loader: () => import('./Rx'),
  loading: () => null
});
