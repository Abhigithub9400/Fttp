import { ref } from 'vue';
import { apiService } from '@/service/apiService';

interface StreamObject {
  header: string;
  content: string | null;
  footer: string;
}

export function useChatStream() {
  const streamData = ref<StreamObject>({ header: '', content: null, footer: '' });
  const isStreaming = ref(false);
  let reader: ReadableStreamDefaultReader | null = null;
  let isCancelled = false;
  let abortController: AbortController | null = null;

  const fetchStream = async (query: string): Promise<void> => {
    isStreaming.value = true;
    isCancelled = false;

    abortController = new AbortController();
    const signal = abortController.signal;
    try {
      const stream: ReadableStream = await apiService.fetchStream(query, signal);
      reader = stream.getReader();
      const decoder: TextDecoder = new TextDecoder();

      let splicedJSONChunks: string = '';
      const regExp =
        /\{\s*"event"\s*:\s*"thread\.message\.delta",\s*"status"\s*:\s*null,\s*"isResponse"\s*:\s*true,\s*"response"\s*:\s*"(.*?)",\s*"threadId"\s*:\s*\d+,\s*"usage"\s*:\s*null\s*},/g;
      const current = { header: '', content: '', footer: '' };
      let responseAccumulator = '';
      let isHeader = true;
      let isContent = false;

      while (isStreaming.value) {
        const { done, value } = await reader.read();
        if (done) {
          isStreaming.value = false;
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        splicedJSONChunks += chunk;
        const matches = [...splicedJSONChunks.matchAll(regExp)];
        matches.forEach((match) => {
          try {
            const parsedObject = JSON.parse(match[0].replace(/,$/, ''));
            const response: string = parsedObject.response;
            responseAccumulator += response;
            if (isHeader) {
              const length = responseAccumulator.length;
              let index = 0;
              while (index < length) {
                const char = responseAccumulator[index];
                if (char !== '`') {
                  if (char === '\n') {
                    index++;
                    continue;
                  }
                  current.header += char;
                  index++;
                } else {
                  const index = responseAccumulator.indexOf('`');
                  responseAccumulator = responseAccumulator.substring(index);
                  isHeader = false;
                  isContent = true;
                  break;
                }
              }
              if (!response.includes('`')) {
                responseAccumulator = responseAccumulator.replace(response, '');
              }
              streamData.value = { ...streamData.value, header: current.header };
            } else if (isContent) {
              const contentRegExp = /\s*\n*`\s*\n*`\s*\n*`\s*\n*json\s*\n*([^`]*)`\s*\n*`\s*\n*`/m;
              if (contentRegExp.test(responseAccumulator)) {
                const matchedString = responseAccumulator.match(contentRegExp)?.[0] ?? '';
                current.content = JSON.parse(responseAccumulator.replace('```json', '').replace('```', ''));
                responseAccumulator = responseAccumulator.replace(matchedString, '');
                streamData.value = { ...streamData.value, content: current.content };
                isContent = false;
              }
            } else {
              const length = responseAccumulator.length;
              let index = 0;
              while (index < length) {
                debugger;
                const char = responseAccumulator[index];
                if (char === '\n') {
                  index++;
                  continue;
                }
                current.footer += char;
                index++;
              }
              responseAccumulator = responseAccumulator.replace(response, '');
              streamData.value = { ...streamData.value, footer: current.footer };
            }
            splicedJSONChunks = splicedJSONChunks.replace(match[0], '');
          } catch (parseError) {
            console.error('Error parsing matched JSON:', parseError);
          }
        });
      }
      isStreaming.value = false;
    } catch (error) {
      console.error('Error fetching stream:', error);
      isStreaming.value = false;
    }
  };

  const stopStream = () => {
    if (reader) {
      reader.cancel().finally(() => {
        console.error('Streaming stopped by the user.');
      });
      isStreaming.value = false;
    } else if (abortController) {
      abortController.abort();
      isStreaming.value = false;
    }
    isCancelled = true;
  };

  return {
    streamData,
    isStreaming,
    fetchStream,
    stopStream,
    isCancelled
  };
}
