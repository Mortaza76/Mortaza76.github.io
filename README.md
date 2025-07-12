# Modern React Portfolio Website

A beautiful, modern portfolio website built with React, Tailwind CSS, Framer Motion, and animated particles.

## 🚀 Features

- **React 18** - Latest React with modern hooks and features
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Powerful animation library for React
- **Animated Particles** - Interactive particle background using @tsparticles/react
- **Responsive Design** - Mobile-first responsive layout
- **Modern UI/UX** - Beautiful gradients, glassmorphism effects, and smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Particles**: @tsparticles/react
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Tailwind CSS Configuration
The project uses Tailwind CSS with a custom configuration in `tailwind.config.js`. You can extend the theme, add custom colors, or modify the configuration as needed.

### Framer Motion Animations
The app includes several Framer Motion animations:
- Fade-in animations on page load
- Hover effects on buttons and cards
- Floating animations for background cards
- Spring animations for interactive elements

### Particle Background
The particle background is configured in `src/App.js` with the following features:
- Interactive particles that respond to mouse hover and clicks
- Connected particles with customizable links
- Smooth movement and collision detection
- Customizable particle count, size, and colors

## 📁 Project Structure

```
website/
├── public/
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Application entry point
│   ├── index.css       # Tailwind CSS imports
│   └── ...
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 Next Steps

This is a basic setup that you can extend with:

1. **Additional Pages** - Add About, Projects, Contact pages
2. **Content Management** - Integrate with a CMS or add content sections
3. **SEO Optimization** - Add meta tags, sitemap, and SEO components
4. **Performance** - Implement lazy loading, code splitting, and optimization
5. **Deployment** - Deploy to Vercel, Netlify, or your preferred platform

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
