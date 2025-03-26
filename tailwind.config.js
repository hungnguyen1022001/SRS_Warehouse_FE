/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      colors: {
        primary: {
          100: "#ffcccf",
          300: "#f84d44",
          500: "#4A91E2",
          800: "#3861AF",
          50: '#ffebed',
          10:'#F1FFF4'
        },
        primaryV2: {
          100: "#b7ebf1",
          300: "#66d1de",
          500: "#4bbdcf",
          700: "#4A91E2",
          50: '#e2f7f9',
        },
        secondary: "#F1F1F4",
        white: "#FFFFFF",
        error: "#CF0D3C",
        error1: "#FFF5F5",
        grey: {
            50:'#979797',
          100:'#f1f2f5',
          200: "#f1f2f5",
          300: "#ebecee",
          400: "#c9cacd",
          500: '#abadaf',
          600: "#818285",
          700: "#6d6e70",
          800: "#4D4E50",
          900: "#2b2c2e",
        },
        success:'#439F6E',
        successBg:'#F1FFF4'
      },
      fontSize: {
        'xl': ['20px', {
          lineHeight: '22px',
          fontWeight: '600',
        }],
        'lg': ['18px', {
          lineHeight: '19.8px',
          fontWeight: '500',
        }],
        'md-semi': ['16px', {
          lineHeight: '17.6px',
          fontWeight: '600',
        }],
        'md-bold': ['16px', {
          lineHeight: '17.6px',
          fontWeight: '700',
        }],
        'md-light': ['16px', {
          lineHeight: '24px',
          fontWeight: '300',
        }],
        'md': ['16px', {
          lineHeight: '17.6px',
          fontWeight: '400',
        }],
        'base-semi': ['15px', {
          lineHeight: '16.5px',
          fontWeight: '600',
        }],
        'base-m': ['15px', {
          lineHeight: '16.5px',
          fontWeight: '500',
        }],
        'base': ['15px', {
          lineHeight: '16.5px',
          fontWeight: '400',
        }],
        'sm': ['14px', {
          lineHeight: '15.4px',
          fontWeight: '500',
        }],
        'sm-normal': ['14px', {
          lineHeight: '15.4px',
          fontWeight: '400',
        }],
        'sm-light': ['14px', {
          lineHeight: '15.4px',
          fontWeight: '300',
        }],
        'xs': ['13px', {
          lineHeight: '15.73px',
          fontWeight: '500',
        }],
        'xs1': ['12px', {
          lineHeight: '16px',
          fontWeight: '400',
        }],
        'xs1-m': ['12px', {
          lineHeight: '16px',
          fontWeight: '500',
        }],
      },
      extend: {},
    },
    plugins: [],
  };
  