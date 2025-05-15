
# Animation System

## Philosophy

The animation system in this portfolio follows these core principles:

1. **Enhance, Don't Distract**: Animations should improve the user experience without becoming a distraction
2. **Communicate Purpose**: Each animation should help communicate meaning or draw attention to important elements
3. **Performance First**: Animations must be performant and not cause layout thrashing or jank
4. **Consistent Language**: Similar elements should animate in similar ways for a cohesive experience

## Animation Types

### Page-Level Animations

- **Page Transitions**: Smooth transitions between routes
- **Section Reveals**: Elements animate in as they enter the viewport
- **Parallax Effects**: Subtle depth effects on scroll

### Component Animations

- **Mount/Unmount**: Elements smoothly appear and disappear
- **State Changes**: Visual feedback for state changes
- **Hover Effects**: Subtle transformations on hover
- **Focus States**: Clear visual indicators for focused elements

### Micro-Interactions

- **Button Feedbacks**: Visual confirmation of button interactions
- **Form Validation**: Animated indicators for form field states
- **Toggle Transitions**: Smooth transitions for toggles and switches
- **Loading States**: Engaging loading indicators

## Implementation

### Framer Motion

Most animations are implemented using Framer Motion, which provides:

- **Declarative Syntax**: Easy-to-understand animation definitions
- **Animation Variants**: Reusable animation patterns
- **Gesture Recognition**: Support for drag, hover, tap gestures
- **Layout Animations**: Automatic animations for layout changes
- **Spring Physics**: Natural-feeling motion

Example:
```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={variants}
>
  Content here
</motion.div>
```

### CSS Animations

Some simpler animations use CSS for better performance:

- **Transitions**: For simple state changes
- **Keyframes**: For repeating animations
- **Transform/Opacity**: GPU-accelerated properties

Example:
```css
.hover-scale {
  transition: transform 0.2s ease-out;
}
.hover-scale:hover {
  transform: scale(1.05);
}
```

### ScrollReveal Component

The custom ScrollReveal component handles viewport-based animations:

- Wraps Framer Motion and Intersection Observer
- Provides consistent reveal animations across the site
- Configurable animation styles and timing
- Performance optimized with appropriate thresholds

## Performance Considerations

To ensure smooth animations:

1. **Transform and Opacity**: Prefer these properties over others
2. **Will-change**: Used sparingly for complex animations
3. **Animation Throttling**: Reduce animation complexity on lower-end devices
4. **Lazy Initialization**: Only initialize animations when needed
5. **GPU Acceleration**: Force GPU rendering for complex animations
