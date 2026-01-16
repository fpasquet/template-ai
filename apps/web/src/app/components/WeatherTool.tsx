import type { ToolUIPart, UIMessage } from 'ai';

import { MessageResponse } from '@monorepo/ui/components/ai-elements/message';
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@monorepo/ui/components/ai-elements/tool';

export default function WeatherTool({ messages }: { messages: UIMessage[] }) {
  type WeatherToolInput = {
    location: string;
    units: 'celsius' | 'fahrenheit';
  };

  type WeatherToolOutput = {
    location: string;
    temperature: string;
    conditions: string;
    humidity: string;
    windSpeed: string;
    lastUpdated: string;
  };

  type WeatherToolUIPart = ToolUIPart<{
    fetch_weather_data: {
      input: WeatherToolInput;
      output: WeatherToolOutput;
    };
  }>;

  const latestMessage = messages[messages.length - 1];
  const weatherTool = latestMessage?.parts?.find((part) => part.type === 'tool-weatherTool') as
    | WeatherToolUIPart
    | undefined;

  function formatWeatherResult(result: WeatherToolOutput): string {
    return `**Weather for ${result.location}**

**Temperature:** ${result.temperature}  
**Conditions:** ${result.conditions}  
**Humidity:** ${result.humidity}  
**Wind Speed:** ${result.windSpeed}  

*Last updated: ${result.lastUpdated}*`;
  }

  if (!weatherTool) return undefined;

  return (
    <Tool>
      <ToolHeader type="tool-weatherTool" state={weatherTool.state} />
      <ToolContent>
        <ToolInput input={weatherTool.input} />
        {weatherTool.output && (
          <ToolOutput
            output={<MessageResponse>{formatWeatherResult(weatherTool.output)}</MessageResponse>}
            errorText={weatherTool.errorText}
          />
        )}
      </ToolContent>
    </Tool>
  );
}
