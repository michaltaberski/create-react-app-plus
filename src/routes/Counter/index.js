import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Counter'),
  loading: () => null
});
