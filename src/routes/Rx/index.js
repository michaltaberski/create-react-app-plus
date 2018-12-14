import Loadable from 'react-loadable';
import './CountersCollection';

export default Loadable({
  loader: () => import('./Rx'),
  loading: () => null
});
