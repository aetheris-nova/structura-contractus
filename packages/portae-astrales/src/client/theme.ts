import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

export default createSystem(
  defaultConfig,
  defineConfig({
    globalCss: {
      '::-webkit-scrollbar': {
        display: 'none',
      },
      html: {
        bg: 'bg',
        colorPalette: 'gray',
        color: 'fg',
        lineHeight: '1.5',
        scrollbarWidth: 'none',
      },
      body: {
        msOverflowStyle: 'none',
      },
    },
    theme: {
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0,
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            DEFAULT: {
              value: {
                _light: '{colors.beige.50}',
                _dark: '{colors.gray.800}',
              },
            },
          },
          fg: {
            DEFAULT: {
              value: {
                _light: '{colors.gray.800}',
                _dark: '{colors.beige.50}',
              },
            },
          },
        },
      },
      tokens: {
        colors: {
          beige: {
            50: {
              value: '#FAF0E6',
            },
            100: {
              value: '#F5E8D7',
            },
            200: {
              value: '#F0E5CF',
            },
            300: {
              value: '#ECE2D0',
            },
            400: {
              value: '#EFE4D1',
            },
          },
          gray: {
            50: {
              value: '#f5f5f5',
            },
            100: {
              value: '#e8e8e8',
            },
            200: {
              value: '#cccccc',
            },
            300: {
              value: '#aaaaaa',
            },
            400: {
              value: '#888888',
            },
            500: {
              value: '#555555',
            },
            600: {
              value: '#3d3d3d',
            },
            700: {
              value: '#2b2b2b',
            },
            800: {
              value: '#222222',
            },
            900: {
              value: '#1a1a1a',
            },
          },
        },
        fonts: {
          heading: {
            value: '"Source Code Pro", serif',
          },
          body: {
            value: '"Anonymous Pro", sans-serif',
          },
          mono: {
            value: '"Cutive Mono", monospace',
          },
        },
      },
    },
  })
);
