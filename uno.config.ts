import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        100: '#F0F4FF',
        95: '#DAE4FF',
        90: '#AEC3FF',
        80: '#82A2FF',
        70: '#5682FF',
        60: '#4071FF',
        50: '#2A61FF',
        10: '#1B1E25',
      },
      success: {
        100: '#F0FFFC',
        90: '#CCFFF6',
        50: '#00CCAA',
        10: '#00806A',
      },
      warning: {
        100: '#FDFEF0',
        90: '#F9FCCF',
        50: '#DDF00D',
        10: '#B2C20A',
      },
      info: {
        100: '#F0FFFC',
        90: '#CCFFF6',
        50: '#00CCAA',
        10: '#00806A',
      },
      error: {
        100: '#FEF0F0',
        90: '#FCCFCF',
        50: '#F53F3D',
        10: '#C20C0A',
      },
      neutral: {
        100: '#1B1E25',
        90: '#495268',
        80: '#818897',
        60: '#BABDC6',
        40: '#D6D8DE',
        20: '#F5F5F5',
        10: '#FAFAFA',
        5: '#FFFFFF',
      },
      secondary: {
        100: '#FFFAEF',
        90: '#FFEECC',
        70: '#FFC34D',
        50: '#FFAA00',
        10: '#B27700',
      },
      // 其他顏色保持不變...
    },
  },
})
