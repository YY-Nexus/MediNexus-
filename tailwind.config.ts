import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 医疗蓝色主题色彩系统
        medical: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // 主要蓝色
          700: "#1d4ed8", // 深蓝色
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // 重新定义默认颜色为蓝色系
        // border: "#bfdbfe", // 蓝色边框
        // input: "#bfdbfe", // 蓝色输入框边框
        // ring: "#2563eb", // 蓝色焦点环
        // background: "#ffffff", // 白色背景
        // foreground: "#1d4ed8", // 蓝色前景文字
        // primary: {
        //   DEFAULT: "#2563eb", // 主要蓝色
        //   foreground: "#ffffff", // 白色文字
        // },
        // secondary: {
        //   DEFAULT: "#eff6ff", // 浅蓝色背景
        //   foreground: "#1d4ed8", // 深蓝色文字
        // },
        // destructive: {
        //   DEFAULT: "#dc2626", // 保持红色用于错误状态
        //   foreground: "#ffffff",
        // },
        // muted: {
        //   DEFAULT: "#f1f5f9", // 浅灰蓝色
        //   foreground: "#64748b", // 中性蓝灰色
        // },
        // accent: {
        //   DEFAULT: "#dbeafe", // 蓝色强调
        //   foreground: "#1e40af", // 深蓝色文字
        // },
        // popover: {
        //   DEFAULT: "#ffffff",
        //   foreground: "#1d4ed8", // 蓝色文字
        // },
        // card: {
        //   DEFAULT: "#ffffff",
        //   foreground: "#1d4ed8", // 蓝色文字
        // },
      },
      boxShadow: {
        medical: "0 4px 14px 0 rgba(37, 99, 235, 0.25)", // 蓝色阴影
      },
      backgroundImage: {
        "medical-gradient": "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", // 蓝色渐变
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
