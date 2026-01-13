import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { PinoLogger } from '@mastra/loggers';
import { DefaultExporter, Observability } from '@mastra/observability';

import { weatherAgent } from './agents/weather-agent';
import { LOG_LEVEL } from './constants';
import { weatherWorkflow } from './workflows/weather-workflow';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({
    id: 'mastra-storage',
    url: ':memory:',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: LOG_LEVEL,
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra',
        exporters: [new DefaultExporter()],
      },
    },
  }),
});
