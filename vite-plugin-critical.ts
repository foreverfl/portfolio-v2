// @ts-ignore - Critters types issue
import Critters from 'critters';
import { Plugin } from 'vite';

export default function viteCritical(): Plugin {
  // @ts-ignore - Critters types issue
  const critters = new Critters({
    preload: 'swap',
    pruneSource: false,
    inlineFonts: true,
    fonts: true,
    compress: true,
    logLevel: 'info',
  });

  return {
    name: 'vite-plugin-critical',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: async (html: string) => {
      try {
        const result = await critters.process(html);
        return result;
      } catch (error) {
        console.error('Critical CSS generation failed:', error);
        return html;
      }
    },
  };
}