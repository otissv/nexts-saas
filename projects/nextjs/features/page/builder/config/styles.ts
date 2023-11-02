export const styles = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  @layer base {
    :root {
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
  
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
  
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
  
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
  
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
  
      --primary: 222.2 47.4% 11.2%;
      --primary-foreground: 210 40% 98%;
  
      --secondary: 210 40% 96.1%;
      --secondary-foreground: 222.2 47.4% 11.2%;
  
      --accent: 210 40% 96.1%;
      --accent-foreground: 222.2 47.4% 11.2%;
  
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 40% 98%;
  
      --ring: 215 20.2% 65.1%;
  
      --radius: 0.5rem;
    }
  
    .dark {
      --background: 222.2 84% 4.9%;
      --foreground: 210 40% 98%;
  
      --muted: 217.2 32.6% 17.5%;
      --muted-foreground: 215 20.2% 65.1%;
  
      --popover: 222.2 84% 4.9%;
      --popover-foreground: 210 40% 98%;
  
      --card: 222.2 84% 4.9%;
      --card-foreground: 210 40% 98%;
  
      --border: 217.2 32.6% 17.5%;
      --input: 217.2 32.6% 17.5%;
  
      --primary: 210 40% 98%;
      --primary-foreground: 222.2 47.4% 11.2%;
  
      --secondary: 217.2 32.6% 17.5%;
      --secondary-foreground: 210 40% 98%;
  
      --accent: 217.2 32.6% 17.5%;
      --accent-foreground: 210 40% 98%;
  
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 85.7% 97.3%;
  
      --ring: 217.2 32.6% 17.5%;
    }
  }
  
  @layer base {
    * {
      @apply border-border;
    }
    body {
      @apply bg-background text-foreground;
    }
  }

  @layer utilities {
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }

    .editor-layout {
      grid-template-columns: 280px 1fr 280px;
    }

    .h-toolbar {
      height: 56px;
    }
    .h-app {
      height: calc(100vh - 56px);
    }
    .clip-path-r {
      clip-path: inset(0px -15px 0px 0px);
    }
    .image-placeholder {
      width: 100%;
      height: 300px;
      background-color: #ffffff;
      opacity: 0.5;
      background-size: 10px 10px;
      border: solid 1px #c4c4c4;
      background-image: repeating-linear-gradient(45deg, #c4c4c4 0, #c4c4c4 1px, #ffffff 0, #ffffff 50%);
    }
  }
`
