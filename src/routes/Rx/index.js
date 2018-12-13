import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Rx'),
  loading: () => null
});
