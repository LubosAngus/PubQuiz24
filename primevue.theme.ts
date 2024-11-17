import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const QuizTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
  },
  components: {
    button: {
      label: {
        font: {
          weight: 600,
        },
      },
      padding: {
        y: '0.5rem',
        x: '0.75rem',
      },
    },
    divider: {
      border: {
        color: '{surface.900}',
      },
      vertical: {
        margin: '0 1.5rem',
      },
      horizontal: {
        margin: '0.75rem 0',
      },
    },
  },
})

export default QuizTheme
