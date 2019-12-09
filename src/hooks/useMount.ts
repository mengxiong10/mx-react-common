import { useEffect } from 'react';

const useMount = (mount: React.EffectCallback) => useEffect(mount, []);

export default useMount;
