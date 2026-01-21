import { useContext } from 'react';

import { MastraClientContext } from '@/providers/mastra-provider';

export const useMastraClient = () => useContext(MastraClientContext);
